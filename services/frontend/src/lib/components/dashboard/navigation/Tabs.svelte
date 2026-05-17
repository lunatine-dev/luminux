<script lang="ts">
    interface TabItem {
        id: string;
        label: string;
        href?: string;
    }

    interface Props {
        items: TabItem[];
        active: string;
    }

    let { items, active = $bindable() }: Props = $props();
</script>

<div class="lg:col-span-3 flex border-b border-zinc-200/60 dark:border-zinc-800/80 gap-6 w-full">
    {#each items as item}
        {#if item.href}
            <a
                href={item.href}
                onclick={() => (active = item.id)}
                class="pb-3 text-sm font-semibold transition-all border-b-2 relative -mb-0.5 select-none
                {active === item.id
                    ? 'text-primary border-primary'
                    : 'text-zinc-400 border-transparent hover:text-zinc-600 dark:hover:text-zinc-300'}"
            >
                {item.label}
            </a>
        {:else}
            <button
                type="button"
                onclick={() => (active = item.id)}
                class="pb-3 text-sm font-semibold transition-all border-b-2 relative -mb-0.5 text-left bg-transparent border-none outline-none cursor-pointer select-none
                {active === item.id
                    ? 'text-primary border-primary'
                    : 'text-zinc-400 border-transparent hover:text-zinc-600 dark:hover:text-zinc-300'}"
            >
                {item.label}
            </button>
        {/if}
    {/each}
</div>
