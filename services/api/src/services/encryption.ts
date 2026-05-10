import crypto from "node:crypto";

const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 12;
const KEY = Buffer.from(process.env.ENCRYPTION_KEY!, "utf8");

export const encrypt = (text: string): string => {
    const input = String(text);

    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv(ALGORITHM, KEY, iv);

    const encrypted = Buffer.concat([cipher.update(input, "utf8"), cipher.final()]);
    const tag = cipher.getAuthTag();

    return `${iv.toString("hex")}:${tag.toString("hex")}:${encrypted.toString("hex")}`;
};

export const decrypt = (hash: string): string => {
    const [iv, tag, content] = hash.split(":");

    if (!iv || !tag || !content) throw new Error("Invalid hash");

    try {
        const decipher = crypto.createDecipheriv(ALGORITHM, KEY, Buffer.from(iv, "hex"));
        decipher.setAuthTag(Buffer.from(tag, "hex"));

        const decrypted = Buffer.concat([decipher.update(Buffer.from(content, "hex")), decipher.final()]);

        return decrypted.toString("utf8");
    } catch (err) {
        throw new Error("Decryption failed: Data may be corrupted or key is incorrect.");
    }
};
