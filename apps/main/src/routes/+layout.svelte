<script>
    import "./layout.css";

    import { BaseLayout, Navbar, Button } from "@luminux/ui";

    import NavItems from "#lib/NavItems.js";

    let { children } = $props();
</script>

<BaseLayout>
    {#snippet navbar()}
        <Navbar items={NavItems}>
            {#snippet buttons()}
                <Button
                    class="rounded-xl px-6 font-black shadow-lg shadow-primary/20 tracking-wide uppercase text-xs h-10"
                    href="/signup"
                >
                    Get Started
                </Button>
            {/snippet}
        </Navbar>
    {/snippet}
    {@render children()}
</BaseLayout>
