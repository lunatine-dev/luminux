<script lang="ts">
    let { title = "Login", children, footer } = $props();
</script>

<div
    class="relative flex min-h-screen w-full items-center justify-center bg-zinc-50 px-4 transition-colors duration-300 dark:bg-black overflow-hidden"
>
    <div class="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-primary/10 blur-[120px] dark:bg-primary/20"></div>
    <div
        class="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-primary/10 blur-[100px] dark:bg-primary/10"
    ></div>

    <div
        class="relative mx-auto w-full max-w-sm rounded-xl border border-zinc-200 bg-white p-6 shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all dark:border-white/10 dark:bg-zinc-950/50 dark:backdrop-blur-xl dark:shadow-primary/5"
    >
        <div class="flex flex-col items-center gap-1 pb-8 pt-4 text-center">
            <span class="text-3xl font-black italic tracking-tighter uppercase text-primary leading-none">
                Luminux
            </span>
            <div class="h-px w-12 bg-zinc-200 dark:bg-white/10 my-1"></div>
            <h2 class="text-sm font-bold tracking-[0.3em] uppercase text-zinc-400 dark:text-zinc-500">
                {title}
            </h2>
        </div>

        {@render children()}

        {#if footer}
            <div class="mt-6 text-center text-[12px] text-zinc-500 dark:text-zinc-400">
                {@render footer()}
            </div>
        {/if}
    </div>
</div>
