import { Router } from 'express';

// products route
const router = Router();
router.get('/', (req, res) => {
    res.send('list of the  products');
  });

router.get('/:id', (req, res) => {
    console.log(req.params);
    res.send('product with id ' + req.params.id);
   
  });
router.post('/', (req, res) => {
    res.send('new product created');
  });

  export default router;