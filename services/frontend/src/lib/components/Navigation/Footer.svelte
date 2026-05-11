<script lang="ts">
    import Footer from "$lib/utils/footer";
    import Brand from "$lib/utils/brand";

    import IconBolt from "@tabler/icons-svelte/icons/bolt";
    import IconBrandDiscord from "@tabler/icons-svelte/icons/brand-discord";
    import IconBrandGithub from "@tabler/icons-svelte/icons/brand-github";
    import IconHeart from "@tabler/icons-svelte/icons/heart";
</script>

<footer class="w-full border-t border-border bg-white dark:bg-zinc-950 transition-colors duration-500">
    <div class="max-w-350 mx-auto px-6 lg:px-12 py-16">
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 lg:gap-8">
            <div class="col-span-2 lg:col-span-2 space-y-6">
                <div class="flex items-center gap-3">
                    <div
                        class="size-8 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/20"
                    >
                        <Brand.Icon class="size-5 text-primary-foreground stroke-3" />
                    </div>
                    <span class="text-xl font-black uppercase tracking-tighter italic text-foreground">
                        {Brand.name}
                    </span>
                </div>
                <p class="text-muted-foreground text-sm max-w-xs leading-relaxed">
                    The open-source backbone for competitive streamers. Real-time match intelligence, automated VODs,
                    and reactive HUDs.
                </p>
                <div class="flex items-center gap-4">
                    <a
                        href={Footer.links.github}
                        class="flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-900 text-foreground hover:bg-primary/10 hover:text-primary transition-all"
                    >
                        <IconBrandGithub class="size-4" />
                        <span>Star on GitHub</span>
                    </a>
                    <a href={Footer.links.discord} class="text-muted-foreground hover:text-primary transition-colors">
                        <IconBrandDiscord class="size-5" />
                    </a>
                </div>
            </div>
            {#each Footer.categories as category}
                <div class="space-y-4">
                    <h4 class="text-xs font-black uppercase tracking-widest text-foreground">{category.title}</h4>
                    <ul class="space-y-2 text-sm text-muted-foreground">
                        {#each category.items as item}
                            <li>
                                <a href={item.href} class="hover:text-primary transition-colors text-xs font-bold">
                                    {item.label}
                                </a>
                            </li>
                        {/each}
                    </ul>
                </div>
            {/each}
        </div>

        <div class="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6">
            <div class="flex items-center gap-2 text-[10px] font-mono text-muted-foreground uppercase tracking-[0.2em]">
                <span>&copy; {Footer.copyright}</span>
                <span class="text-zinc-300 dark:text-zinc-800">/</span>
                <span class="flex items-center gap-1">
                    Built for creators
                    <IconHeart class="size-3 text-primary fill-primary/20" />
                </span>
            </div>

            <a
                href="/status"
                class="group flex items-center gap-3 px-4 py-2 rounded-full bg-zinc-50 dark:bg-zinc-900 border border-border hover:border-primary/30 transition-all duration-300"
            >
                <div class="relative flex items-center justify-center size-2">
                    <div class="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-75"></div>
                    <div class="relative size-2 rounded-full bg-emerald-500"></div>
                </div>
                <span
                    class="text-[10px] font-black uppercase tracking-widest text-zinc-600 dark:text-zinc-400 group-hover:text-primary transition-colors"
                >
                    Systems Online
                </span>
            </a>
        </div>
    </div>
</footer>
