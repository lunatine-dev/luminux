// SEO
export { default as SEO } from "./components/SEO.svelte";

// layouts
export { default as BaseLayout } from "./components/BaseLayout.svelte";

// navigation
export { default as Navbar } from "./components/nav/Navbar.svelte";

// shad-cn components
export * as Card from "./components/ui/card/index.js";
export * as NavigationMenu from "./components/ui/navigation-menu/index.js";
export * as Sheet from "./components/ui/sheet/index.js";
export { Button, buttonVariants } from "./components/ui/button/index.js";
export { Input } from "./components/ui/input/index.js";
export { Label } from "./components/ui/label/index.js";

// helpers
export { cn } from "./utils.js";
export { navigationMenuTriggerStyle } from "./components/ui/navigation-menu/navigation-menu-trigger.svelte";
export { IsMobile } from "./hooks/is-mobile.svelte.js";

// brand
export const Brand = {
    name: "Luminux",
    colors: {
        user: "var(--color-border)",
        admin: "var(--color-primary)",
        dev: "var(--color-rose-900)",
    },
};
