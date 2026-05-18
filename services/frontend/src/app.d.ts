import type { User } from "$lib/types/auth";
// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
    namespace App {
        // interface Error {}
        interface Locals {
            user: User | null;
            token: String | null;
            api: {
                get: <T>(path: string) => Promise<T>;
                post: <T>(path: string, body: any) => Promise<T>;
                put: <T>(path: string, body: any) => Promise<T>;
                delete: <T>(path: string) => Promise<T>;
            };
        }
        interface PageData {
            user?: User;
        }
        // interface PageState {}
        // interface Platform {}
    }
}

export {};
