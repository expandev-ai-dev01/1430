import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { successResponse, errorResponse } from '@/utils/response';
import { HTTP_STATUS } from '@/constants';
import { eventList, eventGet, eventCreate, eventUpdate, eventDelete } from '@/services/event';

/**
 * @api {get} /api/v1/internal/event List Events
 * @apiName ListEvents
 * @apiGroup Event
 * @apiVersion 1.0.0
 *
 * @apiDescription Retrieves a list of events with optional filters
 *
 * @apiParam {String} [format] View format: 'mensal', 'semanal', 'lista'
 * @apiParam {String} [month] Selected month in MM/YYYY format
 * @apiParam {String} [category] Filter by category
 * @apiParam {String} [search] Search term
 * @apiParam {String} [date] Filter by specific date DD/MM/YYYY
 * @apiParam {String} [location] Filter by location
 *
 * @apiSuccess {Array} data List of events
 *
 * @apiError {String} ValidationError Invalid parameters provided
 * @apiError {String} InternalError Internal server error
 */
export async function listHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const querySchema = z.object({
      format: z.enum(['mensal', 'semanal', 'lista']).optional().default('mensal'),
      month: z.string().optional(),
      category: z.array(z.string()).optional(),
      search: z.string().max(100).optional(),
      date: z.string().optional(),
      location: z.string().max(100).optional(),
    });

    const validated = querySchema.parse(req.query);

    const events = await eventList(validated);

    res.json(successResponse(events));
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json(errorResponse('Validation failed', 'VALIDATION_ERROR', error.errors));
    } else {
      next(error);
    }
  }
}

/**
 * @api {get} /api/v1/internal/event/:id Get Event Details
 * @apiName GetEvent
 * @apiGroup Event
 * @apiVersion 1.0.0
 *
 * @apiDescription Retrieves detailed information about a specific event
 *
 * @apiParam {Number} id Event identifier
 *
 * @apiSuccess {Object} data Event details
 *
 * @apiError {String} NotFound Event not found
 * @apiError {String} ValidationError Invalid parameters
 */
export async function getHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const paramsSchema = z.object({
      id: z.coerce.number().int().positive(),
    });

    const validated = paramsSchema.parse(req.params);

    const event = await eventGet(validated.id);

    if (!event) {
      res.status(HTTP_STATUS.NOT_FOUND).json(errorResponse('Event not found', 'NOT_FOUND'));
      return;
    }

    res.json(successResponse(event));
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json(errorResponse('Validation failed', 'VALIDATION_ERROR', error.errors));
    } else {
      next(error);
    }
  }
}

/**
 * @api {post} /api/v1/internal/event Create Event
 * @apiName CreateEvent
 * @apiGroup Event
 * @apiVersion 1.0.0
 *
 * @apiDescription Creates a new event for approval
 *
 * @apiParam {String} title Event title (max 150 characters)
 * @apiParam {String} description Event description (max 5000 characters)
 * @apiParam {String} startDate Start date and time (DD/MM/YYYY HH:MM)
 * @apiParam {String} endDate End date and time (DD/MM/YYYY HH:MM)
 * @apiParam {String} location Event location (max 200 characters)
 * @apiParam {String} address Full address (max 300 characters)
 * @apiParam {Object} coordinates Geographic coordinates {latitude, longitude}
 * @apiParam {String} organizer Organizer name (max 200 characters)
 * @apiParam {String} contact Contact information
 * @apiParam {String} category Event category
 * @apiParam {String} howToGetThere Instructions on how to get there (max 1000 characters)
 *
 * @apiSuccess {Number} id Created event identifier
 *
 * @apiError {String} ValidationError Invalid parameters
 */
export async function createHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const bodySchema = z.object({
      title: z.string().min(1).max(150),
      description: z.string().min(1).max(5000),
      startDate: z.string(),
      endDate: z.string(),
      location: z.string().min(1).max(200),
      address: z.string().min(1).max(300),
      coordinates: z.object({
        latitude: z.number(),
        longitude: z.number(),
      }),
      organizer: z.string().min(1).max(200),
      contact: z.string().min(1),
      category: z.enum([
        'cultural',
        'cívico',
        'esportivo',
        'administrativo',
        'educacional',
        'saúde',
        'meio ambiente',
        'turístico',
      ]),
      howToGetThere: z.string().min(1).max(1000),
      ticketInfo: z.string().max(1000).nullable().optional(),
      externalLink: z.string().url().nullable().optional(),
      images: z.array(z.string().url()).max(20).optional(),
      galleryConfig: z
        .object({
          displayType: z.enum(['carrossel', 'grade', 'slideshow']).default('carrossel'),
          autoPlay: z.boolean().default(true),
          transitionInterval: z.number().default(5),
        })
        .optional(),
    });

    const validated = bodySchema.parse(req.body);

    const eventId = await eventCreate(validated);

    res.status(HTTP_STATUS.CREATED).json(successResponse({ id: eventId }));
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json(errorResponse('Validation failed', 'VALIDATION_ERROR', error.errors));
    } else {
      next(error);
    }
  }
}

/**
 * @api {put} /api/v1/internal/event/:id Update Event
 * @apiName UpdateEvent
 * @apiGroup Event
 * @apiVersion 1.0.0
 *
 * @apiDescription Updates an existing event
 *
 * @apiParam {Number} id Event identifier
 * @apiParam {String} [title] Event title
 * @apiParam {String} [description] Event description
 * @apiParam {String} [startDate] Start date and time
 * @apiParam {String} [endDate] End date and time
 *
 * @apiSuccess {Object} data Updated event
 *
 * @apiError {String} NotFound Event not found
 * @apiError {String} ValidationError Invalid parameters
 */
export async function updateHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const paramsSchema = z.object({
      id: z.coerce.number().int().positive(),
    });

    const bodySchema = z.object({
      title: z.string().min(1).max(150).optional(),
      description: z.string().min(1).max(5000).optional(),
      startDate: z.string().optional(),
      endDate: z.string().optional(),
      location: z.string().min(1).max(200).optional(),
      address: z.string().min(1).max(300).optional(),
      coordinates: z
        .object({
          latitude: z.number(),
          longitude: z.number(),
        })
        .optional(),
      organizer: z.string().min(1).max(200).optional(),
      contact: z.string().min(1).optional(),
      category: z
        .enum([
          'cultural',
          'cívico',
          'esportivo',
          'administrativo',
          'educacional',
          'saúde',
          'meio ambiente',
          'turístico',
        ])
        .optional(),
      howToGetThere: z.string().min(1).max(1000).optional(),
      ticketInfo: z.string().max(1000).nullable().optional(),
      externalLink: z.string().url().nullable().optional(),
      images: z.array(z.string().url()).max(20).optional(),
      galleryConfig: z
        .object({
          displayType: z.enum(['carrossel', 'grade', 'slideshow']),
          autoPlay: z.boolean(),
          transitionInterval: z.number(),
        })
        .optional(),
      featured: z.boolean().optional(),
    });

    const validatedParams = paramsSchema.parse(req.params);
    const validatedBody = bodySchema.parse(req.body);

    const updated = await eventUpdate(validatedParams.id, validatedBody);

    if (!updated) {
      res.status(HTTP_STATUS.NOT_FOUND).json(errorResponse('Event not found', 'NOT_FOUND'));
      return;
    }

    res.json(successResponse(updated));
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json(errorResponse('Validation failed', 'VALIDATION_ERROR', error.errors));
    } else {
      next(error);
    }
  }
}

/**
 * @api {delete} /api/v1/internal/event/:id Delete Event
 * @apiName DeleteEvent
 * @apiGroup Event
 * @apiVersion 1.0.0
 *
 * @apiDescription Deletes an event
 *
 * @apiParam {Number} id Event identifier
 *
 * @apiSuccess {Object} data Success message
 *
 * @apiError {String} NotFound Event not found
 */
export async function deleteHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const paramsSchema = z.object({
      id: z.coerce.number().int().positive(),
    });

    const validated = paramsSchema.parse(req.params);

    const deleted = await eventDelete(validated.id);

    if (!deleted) {
      res.status(HTTP_STATUS.NOT_FOUND).json(errorResponse('Event not found', 'NOT_FOUND'));
      return;
    }

    res.status(HTTP_STATUS.NO_CONTENT).send();
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json(errorResponse('Validation failed', 'VALIDATION_ERROR', error.errors));
    } else {
      next(error);
    }
  }
}
