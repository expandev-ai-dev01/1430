import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { successResponse, errorResponse } from '@/utils/response';
import { HTTP_STATUS } from '@/constants';
import { eventListHistory } from '@/services/event';

/**
 * @api {get} /api/v1/internal/event/history List Past Events
 * @apiName ListPastEvents
 * @apiGroup Event
 * @apiVersion 1.0.0
 *
 * @apiDescription Retrieves paginated list of past events with filters
 *
 * @apiParam {String} startDate Start date for search period (DD/MM/YYYY)
 * @apiParam {String} endDate End date for search period (DD/MM/YYYY)
 * @apiParam {String} [category] Filter by category
 * @apiParam {String} [search] Search term
 * @apiParam {Number} [page] Page number (default: 1)
 * @apiParam {Number} [pageSize] Results per page (default: 20)
 *
 * @apiSuccess {Array} data List of past events
 * @apiSuccess {Object} metadata Pagination metadata
 *
 * @apiError {String} ValidationError Invalid parameters
 */
export async function listHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const querySchema = z.object({
      startDate: z.string(),
      endDate: z.string(),
      category: z.array(z.string()).optional(),
      search: z.string().max(100).optional(),
      page: z.coerce.number().int().min(1).default(1),
      pageSize: z.coerce.number().int().min(10).max(100).default(20),
    });

    const validated = querySchema.parse(req.query);

    /**
     * @validation Verify search period does not exceed 1 year
     * @throw {ValidationError}
     */
    const startDate = new Date(validated.startDate.split('/').reverse().join('-'));
    const endDate = new Date(validated.endDate.split('/').reverse().join('-'));
    const daysDiff = Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

    if (daysDiff > 365) {
      res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json(errorResponse('Search period cannot exceed 1 year', 'VALIDATION_ERROR'));
      return;
    }

    const result = await eventListHistory(validated);

    res.json(successResponse(result.data, result.metadata));
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
