import { Schema, model, InferSchemaType, Types } from "mongoose";

const userSchema = new Schema(
    {
        twitchId: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        login: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
        },
        display_name: { type: String, required: true },
        email: {
            type: String,
            required: true,
            lowercase: true,
        },
        profile_image_url: { type: String },
        offline_image_url: { type: String },
        description: { type: String },
        broadcaster_type: {
            type: String,
            enum: ["partner", "affiliate", ""],
            default: "",
        },
        refreshToken: {
            type: String,
            required: true,
        },
        lastLogin: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    },
);

export type User = InferSchemaType<typeof userSchema> & {
    _id: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
};
export const UserModel = model<User>("User", userSchema);
