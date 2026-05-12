<script lang="ts">
    import { page } from "$app/state";

    import { toggleMode } from "mode-watcher";

    import { Button } from "$lib/components/ui/button";

    import Navbar from "$lib/components/Navigation/Navbar.svelte";
    import Footer from "$lib/components/Navigation/Footer.svelte";
    import { IconMoon, IconSun } from "@tabler/icons-svelte";

    const FULL_PAGES = ["/login", "/signup"];

    let isHidden = $derived(FULL_PAGES.includes(page.url.pathname));

    let { children, data } = $props();
</script>

<div
    class="min-h-screen bg-background text-foreground transition-colors duration-300 selection:bg-primary selection:text-primary-foreground font-sans"
>
    <div class="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div class="absolute top-0 right-0 w-1/3 h-screen bg-primary/5 -skew-x-12 translate-x-32"></div>
        <div class="absolute top-[-10%] left-[10%] w-200 h-200 bg-primary/5 blur-[140px] rounded-full"></div>
    </div>

    <Navbar {isHidden} user={data?.user} />

    {@render children()}

    <Footer {isHidden} />

    {#if isHidden}
        <div class="fixed top-5 right-5 md:top-15 md:right-15">
            <Button
                onclick={toggleMode}
                variant="ghost"
                size="icon"
                class="rounded-full text-muted-foreground bg-secondary dark:bg-secondary/50"
            >
                <IconSun class="h-[2.2rem] w-[2.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                <IconMoon
                    class="absolute h-[2.2rem] w-[2.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0"
                />
                <span class="sr-only">Toggle theme</span>
            </Button>
        </div>
    {/if}
</div>
