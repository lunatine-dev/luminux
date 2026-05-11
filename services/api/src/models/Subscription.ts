import { Schema, model, InferSchemaType } from "mongoose";
import { BaseDoc } from "@defs/database";

const subscriptionSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },
        planId: {
            type: Schema.Types.ObjectId,
            ref: "Plan",
            required: true,
        },
        stripeSubscriptionId: {
            type: String,
            required: true,
            unique: true,
        },
        status: {
            type: String,
            enum: ["active", "trialing", "past_due", "canceled", "unpaid", "incomplete"],
            default: "incomplete",
        },
        currency: { type: String, required: true },
        currentPeriodEnd: { type: Date, required: true },
        cancelAtPeriodEnd: { type: Boolean, default: false },
    },
    { timestamps: true },
);

export type Subscription = BaseDoc<InferSchemaType<typeof subscriptionSchema>>;
export const SubscriptionModel = model<Subscription>("Subscription", subscriptionSchema);
