<script>
    let {
        title,
        description = "The ultimate multi-game platform for creators and competitors. Power your streams with reactive overlays and track deep competitive statistics across top esports titles.",
        image = "https://luminux.app/favicon/web-app-manifest-512x512.png",
        type = "website",
        url = "https://luminux.app",
        siteName = "Luminux",
    } = $props();

    let fullTitle = $derived(title ? `${title} - ${siteName}` : siteName);
</script>

<svelte:head>
    <!-- Standard Meta -->
    <title>{fullTitle}</title>
    <meta name="description" content={description} />

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content={type} />
    <meta property="og:title" content={fullTitle} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={image} />
    {#if url}
        <meta property="og:url" content={url} />
    {/if}
    <meta property="og:site_name" content={siteName} />

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={fullTitle} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={image} />
</svelte:head>
