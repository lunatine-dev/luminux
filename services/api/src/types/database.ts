// types/database.ts
import { Types } from "mongoose";

export type BaseDoc<T> = T & {
    _id: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
};
