import { Schema, model, InferSchemaType, Types } from "mongoose";
import { adjectives, nouns, uniqueUsernameGenerator } from "unique-username-generator";

const userSchema = new Schema(
    {
        email: { type: String, unique: true, sparse: true, lowercase: true },
        email_verified: { type: Boolean, default: false },
        password: { type: String, select: false },

        role: { type: String, enum: ["user", "admin", "dev"], default: "user" },

        username: {
            type: String,
            unique: true,
            default: () =>
                uniqueUsernameGenerator({
                    style: "pascalCase",
                    randomDigits: 3,
                    dictionaries: [adjectives, nouns],
                }),
        },
        avatar: { type: String },

        connections: {
            twitch: {
                id: { type: String, index: true, unique: true },
                profile: {
                    login: String,
                    display_name: String,
                    type: String,
                    broadcaster_type: String,
                    description: String,
                    profile_image_url: String,
                    offline_image_url: String,
                    created_at: String,
                },
                refreshToken: { type: String, select: false },
                lastSync: { type: Date, default: Date.now },
            },
        },
    },
    { timestamps: true },
);

export type User = InferSchemaType<typeof userSchema> & {
    _id: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
};
export const UserModel = model<User>("User", userSchema);
