import { User } from "@prisma/client"
import { prisma } from "../libs/prisma"

export const findMarketByUserId = async (id: number) => {

    const market = await prisma.market.findUnique({
        where: {
            userId: id
        }, select: {
            id: true,
            items: {
                include: {
                    product: {
                        select: {
                            name: true,
                            stock: true,
                            price: true,
                            category: true
                        }
                    }
                }
            }
        }
    })

    if (market) {
        return market;
    }

    return false;

}

type addItem = {
    productId: number,
    quantity: number,
    marketId: number
}

export const addItem = async ({ productId, quantity, marketId }: addItem) => {

    const item = await prisma.item.create({
        data: {
            quantity,
            marketId,
            productId
        }
    })

    if (!item) {
        return false;
    }

    return item;

}

export const deleteItemMarket = async (itemId: number) => {

    const item = await prisma.item.delete({
        where: {
            id: itemId
        }
    });

    if (!item) {
        return false;
    }

    return true

}