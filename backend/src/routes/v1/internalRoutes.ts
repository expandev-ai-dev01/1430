import { Router } from 'express';
import * as eventController from '@/api/v1/internal/event/controller';
import * as eventFeaturedController from '@/api/v1/internal/event/featured/controller';
import * as eventHistoryController from '@/api/v1/internal/event/history/controller';
import * as eventShareController from '@/api/v1/internal/event/share/controller';
import * as eventPrintController from '@/api/v1/internal/event/print/controller';

const router = Router();

router.get('/event', eventController.listHandler);
router.post('/event', eventController.createHandler);
router.get('/event/featured', eventFeaturedController.listHandler);
router.get('/event/history', eventHistoryController.listHandler);
router.get('/event/:id', eventController.getHandler);
router.put('/event/:id', eventController.updateHandler);
router.delete('/event/:id', eventController.deleteHandler);
router.post('/event/:id/share', eventShareController.postHandler);
router.post('/event/:id/print', eventPrintController.postHandler);

export default router;
