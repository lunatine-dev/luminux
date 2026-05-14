<script>
    import { fade } from "svelte/transition";
    import { page } from "$app/state";

    const { href, Icon, isVisible = false, children } = $props();

    let isActive = $derived(page.url.pathname === href || (page.url.pathname.startsWith(href) && href !== "/"));
</script>

{#if isVisible}
    <a
        {href}
        class="group relative flex items-center gap-2.5 px-3 py-1.5 rounded-lg transition-all duration-200 ease-out
                {isActive
            ? 'bg-secondary/40 text-primary dark:bg-zinc-800/60 dark:text-purple-400'
            : 'text-muted-foreground dark:text-zinc-400 hover:text-foreground dark:hover:text-zinc-100 hover:bg-secondary/50 dark:hover:bg-zinc-800/40'}"
    >
        {#if Icon}
            <div class="flex items-center justify-center size-5">
                <Icon class="size-4 stroke-[2px]" />
            </div>
        {/if}

        <span class="text-sm font-semibold tracking-wide">
            {@render children()}
        </span>

        {#if isActive}
            <div
                class="absolute inset-0 border border-primary/10 dark:border-purple-500/10 rounded-lg -z-10"
                transition:fade={{ duration: 150 }}
            ></div>
        {/if}
    </a>
{/if}
