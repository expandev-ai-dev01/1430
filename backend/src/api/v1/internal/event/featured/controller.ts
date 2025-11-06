import { Request, Response, NextFunction } from 'express';
import { successResponse, errorResponse } from '@/utils/response';
import { HTTP_STATUS } from '@/constants';
import { eventListFeatured } from '@/services/event';

/**
 * @api {get} /api/v1/internal/event/featured List Featured Events
 * @apiName ListFeaturedEvents
 * @apiGroup Event
 * @apiVersion 1.0.0
 *
 * @apiDescription Retrieves list of featured events with countdown configuration
 *
 * @apiSuccess {Array} data List of featured events (max 5)
 *
 * @apiError {String} InternalError Internal server error
 */
export async function listHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const events = await eventListFeatured();

    res.json(successResponse(events));
  } catch (error: any) {
    next(error);
  }
}
