import { RequestHandler } from "express";
import { addItem, deleteItemMarket, findMarketByUserId } from "../services/market";
import { User } from "@prisma/client";
import { ProductById } from "../services/product";

export const getMarketController: RequestHandler = async (req, res) => {

    const userId = (req.user as User).id
    const market = await findMarketByUserId(userId);

    if (!market) {
        res.status(500).json({ error: "Erro tente novamente mais tarde" });
        return;
    }

    res.status(200).json({ market: market.items })

}

export const addItemInCart: RequestHandler = async (req, res) => {

    const userId = (req.user as User).id
    const market = await findMarketByUserId(userId);

    if (!market) {
        res.status(500).json({ error: "Erro tente novamente mais tarde" });
        return;
    }
    const marketId = market.id;

    const { productId, quantity } = req.body;

    const product = await ProductById(productId);

    if (!product) {
        res.status(404).json({ error: "PRODUTO NAO ENCONTRADO" });
        return;
    }

    const item = await addItem({ productId, quantity, marketId });

    if (!item) {
        res.status(400).json({ error: "ALGO DEU ERRADO TENTE NOVAMENTE MAIS TARDE" });
        return;
    }

    res.status(200).json({ message: "ITEM ADICIONADO COM SUCESSO" });
}

export const deleteItem: RequestHandler = async (req, res) => {

    const itemId = Number(req.params.id);

    if (isNaN(itemId)) {
        res.status(404).json({ error: "ID NAO ENCONTRADO" });
        return;
    }

    const deleteItem = await deleteItemMarket(itemId);

    if (!deleteItem) {
        res.status(404).json({ error: "ITEM NAO ENCONTRADO" });
        return;
    }

    res.status(200).json({ message: "ITEM DELETADO" });

}