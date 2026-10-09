import { Router } from 'express';
import { ProductsController } from '../controllers/products.controller';

const router = Router();
const controller = new ProductsController();

router.get('/getAll', controller.getAll.bind(controller));
router.get('/getById/:id', controller.getById.bind(controller));
router.post('/create', controller.create.bind(controller));
router.put('/update/:id', controller.update.bind(controller));
router.delete('/delete/:id', controller.delete.bind(controller));
router.patch('/change-price/:id', controller.changePrice.bind(controller));

export default router;