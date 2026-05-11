import { Schema, model, InferSchemaType, Types } from "mongoose";
import { BaseDoc } from "@defs/database";

const planSchema = new Schema({
    name: { type: String, required: true },
    stripeProductId: { type: String, required: true },
    stripePriceIds: {
        usd: { type: String, required: true },
        gbp: { type: String },
        eur: { type: String },
    },
    prices: {
        usd: { type: Number, required: true },
        gbp: { type: Number },
        eur: { type: Number },
    },
    interval: { type: String, enum: ["month", "year"], default: "month" },
    features: [
        {
            name: { type: String, required: true },
            included: { type: Boolean, required: true },
            value: { type: String },
            isNew: { type: Boolean, default: false },
        },
    ],
    active: { type: Boolean, default: true },
});

export type Plan = BaseDoc<InferSchemaType<typeof planSchema>>;
export const PlanModel = model<Plan>("Plan", planSchema);
