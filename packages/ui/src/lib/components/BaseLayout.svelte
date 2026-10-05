<script>
    import { ModeWatcher } from "mode-watcher";
    import { fade } from "svelte/transition";
    import { page } from "$app/state";

    let { children, navbar, footer } = $props();
</script>

<ModeWatcher />

<div
    class="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300 selection:bg-primary selection:text-primary-foreground font-sans"
>
    {#if navbar}
        {@render navbar()}
    {/if}

    <main class="page-container flex-1">
        {#key page.url.pathname}
            <div in:fade={{ duration: 200, delay: 150 }} out:fade={{ duration: 150 }} class="page-wrapper">
                {@render children()}
            </div>
        {/key}
    </main>

    {#if footer}
        {@render footer()}
    {/if}
</div>
