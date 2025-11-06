import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { successResponse, errorResponse } from '@/utils/response';
import { HTTP_STATUS } from '@/constants';
import { eventGeneratePrintVersion } from '@/services/event';

/**
 * @api {post} /api/v1/internal/event/:id/print Generate Print Version
 * @apiName PrintEvent
 * @apiGroup Event
 * @apiVersion 1.0.0
 *
 * @apiDescription Generates printable version of event details
 *
 * @apiParam {Number} id Event identifier
 * @apiParam {String} format Print format: 'completo', 'resumido'
 * @apiParam {Boolean} [includeMap] Include map in print (default: true)
 * @apiParam {Boolean} [includeImages] Include images in print (default: false)
 * @apiParam {String} [layout] Print layout: 'padrao', 'compacto', 'detalhado' (default: 'padrao')
 * @apiParam {String} [paperSize] Paper size: 'A4', 'Carta', 'A5' (default: 'A4')
 * @apiParam {String} [orientation] Paper orientation: 'retrato', 'paisagem' (default: 'retrato')
 *
 * @apiSuccess {Object} data Print configuration and content
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
      format: z.enum(['completo', 'resumido']).default('completo'),
      includeMap: z.boolean().default(true),
      includeImages: z.boolean().default(false),
      layout: z.enum(['padrao', 'compacto', 'detalhado']).default('padrao'),
      paperSize: z.enum(['A4', 'Carta', 'A5']).default('A4'),
      orientation: z.enum(['retrato', 'paisagem']).default('retrato'),
    });

    const validatedParams = paramsSchema.parse(req.params);
    const validatedBody = bodySchema.parse(req.body);

    const printData = await eventGeneratePrintVersion(validatedParams.id, validatedBody);

    if (!printData) {
      res.status(HTTP_STATUS.NOT_FOUND).json(errorResponse('Event not found', 'NOT_FOUND'));
      return;
    }

    res.json(successResponse(printData));
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
