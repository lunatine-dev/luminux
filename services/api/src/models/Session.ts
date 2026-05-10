import { Schema, model, InferSchemaType, Types } from "mongoose";
import type { User } from "./User";

const sessionSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },
        refreshToken: {
            type: String,
            required: true,
            unique: true,
            select: false,
        },
        oldTokenHash: { type: String, index: true, select: false },
        userAgent: { type: String },
        ipAddress: { type: String },
        isValid: { type: Boolean, default: true },
        expiresAt: { type: Date, required: true },
    },
    { timestamps: true },
);

sessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

type InferredSession = InferSchemaType<typeof sessionSchema>;

export interface Session extends Omit<InferredSession, "userId"> {
    _id: Types.ObjectId;
    userId: Types.ObjectId | User;
    createdAt: Date;
    updatedAt: Date;
}

export const SessionModel = model<Session>("Session", sessionSchema);
