import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { successResponse, errorResponse } from '@/utils/response';
import { HTTP_STATUS } from '@/constants';
import { eventGenerateShareUrl } from '@/services/event';

/**
 * @api {post} /api/v1/internal/event/:id/share Generate Share URL
 * @apiName ShareEvent
 * @apiGroup Event
 * @apiVersion 1.0.0
 *
 * @apiDescription Generates sharing URL for specified platform
 *
 * @apiParam {Number} id Event identifier
 * @apiParam {String} platform Sharing platform: 'facebook', 'twitter', 'whatsapp', 'email', 'calendario'
 * @apiParam {String} [calendarFormat] Calendar format: 'google', 'outlook', 'ical' (required if platform is 'calendario')
 *
 * @apiSuccess {String} url Generated sharing URL
 *
 * @apiError {String} NotFound Event not found
 * @apiError {String} ValidationError Invalid parameters
 */
export async function postHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const paramsSchema = z.object({
      id: z.coerce.number().int().positive(),
    });

    const bodySchema = z.object({
      platform: z.enum(['facebook', 'twitter', 'whatsapp', 'email', 'calendario']),
      calendarFormat: z.enum(['google', 'outlook', 'ical']).optional().default('google'),
    });

    const validatedParams = paramsSchema.parse(req.params);
    const validatedBody = bodySchema.parse(req.body);

    /**
     * @validation Verify calendar format is provided when platform is 'calendario'
     * @throw {ValidationError}
     */
    if (validatedBody.platform === 'calendario' && !validatedBody.calendarFormat) {
      res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json(
          errorResponse(
            'Calendar format is required when platform is calendario',
            'VALIDATION_ERROR'
          )
        );
      return;
    }

    const shareUrl = await eventGenerateShareUrl(
      validatedParams.id,
      validatedBody.platform,
      validatedBody.calendarFormat
    );

    if (!shareUrl) {
      res.status(HTTP_STATUS.NOT_FOUND).json(errorResponse('Event not found', 'NOT_FOUND'));
      return;
    }

    res.json(successResponse({ url: shareUrl }));
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
