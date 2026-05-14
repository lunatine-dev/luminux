<script>
    import "./layout.css";

    import { dev } from "$app/environment";

    import { ModeWatcher } from "mode-watcher";

    import Brand from "$lib/utils/brand";
    import { metadata } from "$lib/components/metadata.svelte";
    import Timer from "$lib/components/landing/Timer.svelte";

    let { children } = $props();
</script>

<svelte:head>
    <meta name="theme-color" content="#7008e7" />
    <meta name="msapplication-TileColor" content="#7008e7" />

    <link rel="icon" type="image/png" href="/favicon/favicon-96x96.png" sizes="96x96" />
    <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
    <link rel="shortcut icon" href="/favicon/favicon.ico" />
    <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
    <meta name="apple-mobile-web-app-title" content="Luminux" />
    <link rel="manifest" href="/favicon/site.webmanifest" />

    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://luminux.app" />
    <meta property="og:image" content="/favicon/web-app-manifest-512x512.png" />
    <meta
        property="og:description"
        content="Sync your Overwatch 2 stream with a reactive HUD. Automate hero-swaps, trigger kill-streak overlays, and archive every Team Wipe automatically."
    />
    <meta property="og:title" content={metadata.title ? `${metadata.title} - ${Brand.name}` : Brand.name} />

    <title>{metadata.title ? `${metadata.title} - ${Brand.name}` : Brand.name}</title>
</svelte:head>

{#if dev}
    <ModeWatcher />

    <div class="text-slate-900 dark:text-slate-50 transition-colors duration-200">
        {@render children()}
    </div>
{:else}
    <Timer targetDate={new Date("10/31/2026")} />
{/if}
