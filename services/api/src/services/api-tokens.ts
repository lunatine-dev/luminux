import crypto from "crypto";
import { API_KEY_PREFIX } from "@constants/security";

export const generateAPIToken = (type: "ow" | "ovl"): string => {
    const secret = crypto.randomBytes(24).toString("hex");

    return `${API_KEY_PREFIX}_${type}_${secret}`;
};
