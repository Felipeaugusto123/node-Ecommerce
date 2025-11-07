import { prisma } from "../libs/prisma"

export const getAllProducts = async () => {

    return await prisma.product.findMany();

}

export const ProductById = async (id: number) => {

    const product = await prisma.product.findFirst({
        where: { id }
    });

    if (!product) {
        return false;
    }

    return product;

}

export const productByCategory = async (category: string) => {

    const product = await prisma.product.findMany({
        where: {
            category: {
                startsWith: category
            }
        }
    })


    if (!product) {
        return false;
    }

    return product;

}