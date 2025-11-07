import { RequestHandler } from "express";
import z from "zod";
import { createUser, verifyUser } from "../services/user";
import { generateToken } from "../libs/passport";

export const userControllerSingup: RequestHandler = async (req, res) => {

    const schema = z.object({
        email: z.email(),
        name: z.string(),
        password: z.string()
    })

    const data = schema.safeParse(req.body);

    if (!data.success) {
        res.json({ error: "Dados invalidos por favor revise" });
        return;
    }

    const newUser = await createUser(data.data);

    if (!newUser) {
        res.json({ error: "Erro ao criar usuario , tente novamente mais tarde" });
        return;
    }

    const token = generateToken({ id: newUser.id });

    res.status(201).json({
        user: {
            id: newUser.id,
            email: newUser.email,
            name: newUser.email,
        },
        token
    });

}

export const userControllerSignin: RequestHandler = async (req, res) => {

    const schema = z.object({
        email: z.email(),
        password: z.string()
    })

    const data = schema.safeParse(req.body);

    if (!data.success) {
        res.json({ error: data.error.flatten() });
        return;
    }

    const user = await verifyUser(data.data);

    if (!user) {
        res.json({ error: "Nao autorizado" });
        return;
    }

    const token = generateToken({ id: user.id });

    res.status(200).json({
        user: {
            id: user.id,
            name: user.name,
            email: user.email
        },
        token
    });

}