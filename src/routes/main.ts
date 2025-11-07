import express from "express";
import { userControllerSignin, userControllerSingup, } from "../controller/user";
import { privateRoute } from "../libs/passport";
import { addItemInCart, deleteItem, getMarketController } from "../controller/market";
import { getProductByCategory, getProductById, getProducts } from "../controller/products";

const router = express.Router();

router.get('/ping', (req, res) => {
    res.json({ pong: true });
});


router.post('/auth/signup', userControllerSingup);
router.post('/auth/signin', userControllerSignin);

router.get('/market', privateRoute, getMarketController);
router.post('/market', privateRoute, addItemInCart);
router.delete('/market/:id', privateRoute, deleteItem);


router.get('/products', getProducts);
router.get('/products/category', getProductByCategory);
router.get('/products/:id', getProductById);



export default router;