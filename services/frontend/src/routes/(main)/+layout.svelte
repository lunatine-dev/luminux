<script lang="ts">
    import { fade } from "svelte/transition";
    import { page } from "$app/state";

    import { toggleMode } from "mode-watcher";
    import { Button } from "$lib/components/ui/button";

    import Navbar from "$lib/components/navigation/Navbar.svelte";
    import Footer from "$lib/components/navigation/Footer.svelte";

    import IconMoon from "@tabler/icons-svelte/icons/moon";
    import IconSun from "@tabler/icons-svelte/icons/sun";

    const FULL_PAGES = ["/login", "/signup"];
    let isHidden = $derived(FULL_PAGES.includes(page.url.pathname));

    let { children, data } = $props();
</script>

<div
    class="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300 selection:bg-primary selection:text-primary-foreground font-sans overflow-x-hidden"
>
    <div class="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div class="absolute top-0 right-0 w-1/3 h-screen bg-primary/5 -skew-x-12 translate-x-32"></div>
        <div class="absolute top-[-10%] left-[10%] w-200 h-200 bg-primary/5 blur-[140px] rounded-full"></div>
    </div>

    <Navbar {isHidden} user={data?.user} />

    <div class="page-container flex-1 {page.status !== 200 ? 'flex flex-col flex-1' : ''}">
        {#key page.url.pathname}
            <div
                in:fade={{ duration: 200, delay: 150 }}
                out:fade={{ duration: 150 }}
                class="page-wrapper {page.status !== 200 ? 'flex flex-col flex-1' : ''}"
            >
                {@render children()}
            </div>
        {/key}
    </div>

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

<style>
    .page-container {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 1fr;
        width: 100%;
    }

    .page-wrapper {
        grid-column: 1;
        grid-row: 1;
        width: 100%;
    }
</style>
