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

    <link rel="icon" type="image/png" href="/favicon/favicon-96x96.png" sizes="96x96" />
    <link rel="icon" href="/favicon/favicon.ico" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <link rel="manifest" href="/favicon/site.webmanifest" />

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
