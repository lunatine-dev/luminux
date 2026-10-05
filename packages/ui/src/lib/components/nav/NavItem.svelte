<script>
    import { NavigationMenu, navigationMenuTriggerStyle, cn } from "@luminux/ui";

    const { label = "", Icon, href } = $props();
</script>

<NavigationMenu.Item>
    <NavigationMenu.Link>
        {#snippet child()}
            <a
                {href}
                class={cn(
                    navigationMenuTriggerStyle(),
                    "text-muted-foreground dark:text-zinc-400 hover:text-foreground dark:hover:text-zinc-100 font-semibold uppercase tracking-wide text-xs gap-1.5",
                )}
            >
                <Icon class="size-4 stroke-[2px] opacity-80" />
                {label}
            </a>
        {/snippet}
    </NavigationMenu.Link>
</NavigationMenu.Item>
