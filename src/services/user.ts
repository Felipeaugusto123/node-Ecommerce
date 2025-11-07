import { prisma } from "../libs/prisma";
import * as bcrypt from 'bcrypt';

type createUser = {
    email: string,
    password: string,
    name: string
}

export const createUser = async ({ email, password, name }: createUser) => {
    email = email.toLowerCase();

    const user = await prisma.user.findUnique({
        where: { email }
    });

    if (!user) {
        const hashPassword = bcrypt.hashSync(password, 10);

        const newUser = await prisma.user.create({
            data: {
                email, name, password: hashPassword,
                market: { create: {} }
            }
        });

        if (newUser) {
            return newUser;
        }
    }
    return false
}

type signinUser = {
    email: string,
    password: string
}

export const verifyUser = async ({ email, password }: signinUser) => {

    const user = await prisma.user.findUnique({
        where: { email }
    })

    if (!user) {
        return false;
    }

    if (!bcrypt.compareSync(password, user.password)) {
        return false;
    }

    return user;

}

export const findUserById = async (id: number) => {

    const user = await prisma.user.findUnique({
        where: { id }
    });

    if (user) {
        return user;
    }


    return false;
}