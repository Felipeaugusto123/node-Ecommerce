import passport, { use } from "passport";
import { ExtractJwt, Strategy as JWTStrategy } from "passport-jwt";
import { findUserById } from "../services/user";
import { RequestHandler } from "express";
import jwt from 'jsonwebtoken';
import { User } from "@prisma/client";

const options = {

    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT as string
}

passport.use(new JWTStrategy(options, async (payload: any, done: any) => {

    const user = await findUserById(payload.id);

    if (user) {
        return done(null, user);
    } else {
        return done(null, null);
    }

}));

export const privateRoute: RequestHandler = (req, res, next) => {

    passport.authenticate('jwt', (err: any, user: any) => {

        req.user = user;

        if (user) {
            return next();
        } else {
            return res.status(401).json({ message: "nao autorizado" });
        }

    })(req, res, next);

}

export const generateToken = (data: object) => {

    return jwt.sign(data, process.env.JWT as string);

}

export default passport