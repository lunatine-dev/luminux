<script>
    import "./layout.css";

    import { BaseLayout, Navbar } from "@luminux/ui";

    import NavItems from "#lib/NavItems.js";

    let { children } = $props();
</script>

<BaseLayout>
    {#snippet navbar()}
        <Navbar items={NavItems} breadcrumb="Studio" />
    {/snippet}
    {@render children()}
</BaseLayout>
