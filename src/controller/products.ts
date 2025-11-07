import { RequestHandler } from "express";
import { getAllProducts, productByCategory, ProductById } from "../services/product";


export const getProducts: RequestHandler = async (req, res) => {

    const products = await getAllProducts();

    res.status(200).json(products);

}

export const getProductById: RequestHandler = async (req, res) => {
    const productId = Number(req.params.id);

    if (isNaN(productId)) {

        res.status(400).json({ error: "ID INVALIDO" })

    }

    const product = await ProductById(productId);

    if (!product) {
        res.status(400).json({ error: "ITEM NAO ENCONTRADO" });
        return;
    }

    res.status(200).json({ product });
    return;




}

export const getProductByCategory: RequestHandler = async (req, res) => {

    const { category } = req.query;

    if (!category) {
        res.json({ erro: "ENVIE UMA CATEGORIA VALIDA" })
        return;
    }

    const products = await productByCategory(category?.toString());

    if (!products) {
        res.status(400).json({ error: "essa categoria nao existe" });
        return;
    }

    res.status(200).json({ products });

}