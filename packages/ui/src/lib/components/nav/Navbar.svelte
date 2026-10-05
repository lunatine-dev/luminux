<script>
    import { toggleMode } from "mode-watcher";

    // Icons
    import IconSun from "@tabler/icons-svelte/icons/sun";
    import IconMoon from "@tabler/icons-svelte/icons/moon";

    // Components
    import { Button } from "@luminux/ui";

    // Data
</script>

<Button
    onclick={toggleMode}
    variant="ghost"
    size="icon"
    class="rounded-full text-muted-foreground hover:text-foreground hover:bg-muted relative"
>
    <IconSun class="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
    <IconMoon class="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
    <span class="sr-only">Toggle theme</span>
</Button>

<div
    class="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl transition-colors duration-500"
></div>
