import { Router } from 'express';
import { listProducts, getProductById, createProduct, updateProduct, deleteProduct } from './productsController';
import { validateData } from '../../middlewares/validationMiddleware';

import { createProductSchema, deleteProductSchema, getProductSchema, listProductSchema, updateProductSchema } from '../../db/productsSchema';

// products route
const router = Router();
router.get('/',validateData(listProductSchema), listProducts);
router.get('/:id',validateData(getProductSchema), getProductById);
router.post('/', validateData(createProductSchema), createProduct);
router.put('/:id',validateData(updateProductSchema), updateProduct);
router.delete('/:id',validateData(deleteProductSchema), deleteProduct);

export default router;
