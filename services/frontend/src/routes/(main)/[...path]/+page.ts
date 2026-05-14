import { error } from "@sveltejs/kit";

export const load = (event) => {
    error(404, "Page Not Found");
};
