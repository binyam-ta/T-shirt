import { Request,Response  } from "express";

export function listProducts(req: Request, res: Response) {
    res.send('list of the  products');
}

export function getProductById(req: Request, res: Response) {
    res.send('product with id ' + req.params.id);
}

export function createProduct(req: Request, res: Response) {
    console.log(req.body);
    res.send('new product created');
}
export function updateProduct(req: Request, res: Response) {
    res.send('product with id ' + req.params.id + ' updated');
} 
export function deleteProduct(req: Request, res: Response) {
    res.send('product with id ' + req.params.id + ' deleted');
}