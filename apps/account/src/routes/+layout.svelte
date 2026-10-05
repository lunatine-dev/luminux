<script>
    import "./layout.css";

    import { BaseLayout, Navbar } from "@luminux/ui";

    let { children } = $props();
</script>

<BaseLayout>
    {#snippet navbar()}
        <Navbar />
    {/snippet}
    {@render children()}
</BaseLayout>
