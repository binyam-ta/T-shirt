import { Router } from 'express';
import { listProducts, getProductById, createProduct, updateProduct, deleteProduct } from './productsController.js';
import { validateData } from '../../middlewares/validationMiddleware.js';
import { verifyToken, verifyseller } from '../../middlewares/authMiddleware.js';
import { createProductSchema, deleteProductSchema, getProductSchema, listProductSchema, updateProductSchema } from '../../db/productsSchema.js';

// products route
const router = Router();
router.get('/',validateData(listProductSchema), listProducts);
router.get('/:id',validateData(getProductSchema), getProductById);
router.post('/',verifyToken,verifyseller, validateData(createProductSchema), createProduct);
router.put('/:id',verifyToken,verifyseller,validateData(updateProductSchema), updateProduct);
router.delete('/:id',verifyToken,verifyseller,validateData(deleteProductSchema), deleteProduct);

export default router;
