<script>
    import { NavigationMenu, navigationMenuTriggerStyle, cn } from "@luminux/ui";

    const { label = "", Icon, items } = $props();
</script>

{#snippet ListItem({ title, content, href, class: className, ...restProps })}
    <li>
        <NavigationMenu.Link>
            {#snippet child()}
                <a
                    {href}
                    class={cn(
                        "hover:bg-accent/25 dark:hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block space-y-1 rounded-xl p-3 leading-none no-underline transition-all outline-none select-none group/item",
                        className,
                    )}
                    {...restProps}
                >
                    <div class="text-sm font-bold tracking-tight text-foreground transition-colors">
                        {title}
                    </div>
                    <p class="text-muted-foreground/80 line-clamp-2 text-xs leading-snug mt-1">
                        {content}
                    </p>
                </a>
            {/snippet}
        </NavigationMenu.Link>
    </li>
{/snippet}

<NavigationMenu.Item>
    <NavigationMenu.Trigger
        class={cn(
            navigationMenuTriggerStyle(),
            "text-muted-foreground dark:text-zinc-400 hover:text-foreground dark:hover:text-zinc-100 font-semibold uppercase tracking-wide text-xs gap-1.5",
        )}
    >
        <Icon class="size-4 stroke-[2px] opacity-80" />
        {label}
    </NavigationMenu.Trigger>
    <NavigationMenu.Content>
        <ul class="grid w-[300px] gap-2 p-2 sm:w-[400px] md:w-[500px] md:grid-cols-2 lg:w-[600px]">
            {#each items as item, i (i)}
                {@render ListItem({
                    href: item.href,
                    title: item.title,
                    content: item.description,
                })}
            {/each}
        </ul>
    </NavigationMenu.Content>
</NavigationMenu.Item>
