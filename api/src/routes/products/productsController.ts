import { Request,Response} from "express";
import { db } from "../../db/index";
import { productsTable, createProductSchema } from "../../db/productsSchema";
import { eq } from "drizzle-orm";
import _ from "lodash";

export async function listProducts(req: Request, res: Response) {
    try {
        const products = await db.select().from(productsTable);
        res.json(products);
    }
    catch (error) {
        res.status(500).send('Failed to fetch products');
    }
    
}

export async function getProductById(req: Request, res: Response) {
  
try {
    const { id } = req.params;
    const [product] = await db.select().from(productsTable).where(eq(productsTable.id, Number(id)));
      
    if (!product) {
        return res.status(404).send({message: 'Product not found'});
    }
    res.json(product);
}
catch (error) {
    res.status(500).send('Failed to fetch product');
}

}

export async function createProduct(req: Request, res: Response) {

try{
    console.log(req.userId);
    const [product] = await db
    .insert(productsTable)
    .values(req.cleanBody as { 
        name: string; 
        description: string; 
        price: number; 
        image?: string; 
        category?: string; 
    })
    .returning();
    res.status(201).json(product);
}catch (error) {
    res.status(500).send( 'Failed to create product' );
    
}
}
export async function updateProduct(req: Request, res: Response) {
    try {
        const { id } = req.params;
        if (!req.cleanBody) {
            return res.status(400).send('Invalid request body');
        }
        const product = await db.update(productsTable).set(req.cleanBody as { 
            name?: string; 
            description?: string; 
            price?: number; 
            image?: string; 
            category?: string; 
        }).where(eq(productsTable.id, Number(id))).returning().then(rows => rows[0]);
        if (!product) {
            return res.status(404).send('Product not found');
        }
        res.json(product);
    }
    catch (error) {
        res.status(500).send('Failed to update product');
    }
   
   
} 
export async function deleteProduct(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const product = await db.delete(productsTable).where(eq(productsTable.id, Number(id))).returning().then(rows => rows[0]);
        if (!product) {
            return res.status(204).send('Product not found');
        }
        res.json(product);
      
    }
    catch (error) {
        res.status(500).send('Failed to delete product');
    }
   
}