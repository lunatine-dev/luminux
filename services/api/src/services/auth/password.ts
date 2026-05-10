import crypto from "node:crypto";
import argon2 from "argon2";

import { AppError } from "@core/errors";

const PEPPER = process.env.AUTH_PASSWORD_PEPPER;
const MEMORY_COST = parseInt(process.env.AUTH_ARGON_MEMORY || "65536", 10);
const TIME_COST = parseInt(process.env.AUTH_ARGON_TIME || "3", 10);
const PARELLELISM = parseInt(process.env.AUTH_ARGON_THREADS || "4", 10);

let DUMMY_HASH: string = "";
export const initPassword = async () => {
    if (!PEPPER) throw new Error("AUTH_PASSWORD_PEPPER is missing from Infisical");

    try {
        const decoyPassword = crypto.randomBytes(24).toString("hex");

        DUMMY_HASH = await argon2.hash(decoyPassword + PEPPER, {
            type: argon2.argon2id,
            memoryCost: MEMORY_COST,
            timeCost: TIME_COST,
            parallelism: PARELLELISM,
        });
    } catch (err) {
        throw err; // This kills the process
    }
};

export const hash = async (password: string): Promise<string> => {
    if (!PEPPER) throw new AppError("Failed to authenticate", 500);

    try {
        return argon2.hash(password + PEPPER, {
            type: argon2.argon2id,
            memoryCost: MEMORY_COST,
            timeCost: TIME_COST,
            parallelism: PARELLELISM,
        });
    } catch (err) {
        throw new AppError("Failed to authenticate", 500);
    }
};

export const verify = async (hash: string | null | undefined, password: string): Promise<boolean> => {
    if (!PEPPER) throw new AppError("Failed to authenticate", 500);

    try {
        const targetHash = hash ?? DUMMY_HASH;

        if (!targetHash) return false;

        return await argon2.verify(targetHash, password + PEPPER);
    } catch (err) {
        return false;
    }
};

export const getDummyHash = () => DUMMY_HASH;
