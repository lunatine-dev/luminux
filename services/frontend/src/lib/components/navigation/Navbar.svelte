<script lang="ts">
    import { page } from "$app/state";

    import { toggleMode } from "mode-watcher";

    import { Button } from "$lib/components/ui/button";
    import * as Sheet from "$lib/components/ui/sheet/index.js";

    import Brand from "$lib/utils/brand";
    import Nav from "$lib/utils/nav";
    import User from "$lib/components/navigation/User.svelte";

    import NavItem from "$lib/components/navigation/NavItem.svelte";
    import IconSun from "@tabler/icons-svelte/icons/sun";
    import IconMoon from "@tabler/icons-svelte/icons/moon";
    import IconMenu2 from "@tabler/icons-svelte/icons/menu-2";

    const { isHidden = false, user = null } = $props();
</script>

<nav
    class="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl transition-colors duration-500"
    class:hidden={isHidden}
>
    <div class="max-w-350 mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
        <div class="flex gap-4">
            <Sheet.Root>
                <Sheet.Trigger class="p-2 -ml-2 rounded-md hover:bg-muted transition-colors">
                    <IconMenu2 class="size-6 lg:hidden" />
                </Sheet.Trigger>

                <Sheet.Content side="left" class="w-70 sm:w-87.5 px-0">
                    <Sheet.Header class="px-6 border-b pb-4">
                        <Sheet.Title class="text-left font-bold text-xl tracking-tight">
                            {Brand.name}
                        </Sheet.Title>
                    </Sheet.Header>

                    <nav class="flex flex-col gap-1 p-4">
                        {#each Nav.items as item}
                            {@const Icon = item.Icon}
                            {#if !item.authenticated || user}
                                <a
                                    href={item.href}
                                    class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all
                               text-muted-foreground hover:text-foreground hover:bg-secondary/50 active:scale-[0.98]"
                                    class:bg-secondary={page.url.pathname === item.href}
                                    class:text-foreground={page.url.pathname === item.href}
                                    class:text-muted-foreground={page.url.pathname !== item.href}
                                >
                                    {#if Icon}
                                        <Icon class="size-5" />
                                    {/if}
                                    <span>{item.label}</span>
                                </a>
                            {/if}
                        {/each}
                    </nav>
                </Sheet.Content>
            </Sheet.Root>
            <a href="/" class="flex items-center gap-3 group cursor-pointer">
                <div
                    class="size-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 transition-transform group-hover:scale-105"
                >
                    <Brand.Icon class="size-6 text-primary-foreground stroke-3" />
                </div>
                <span class="text-2xl font-black uppercase tracking-tighter italic text-foreground hidden md:block">
                    {Brand.name}
                </span>
            </a>
        </div>

        <nav class="hidden lg:flex items-center gap-2">
            {#each Nav.items as item}
                {@const isVisible = !item.authenticated || user}
                {@const Icon = item.Icon}

                <NavItem {isVisible} {Icon} href={item.href}>
                    {item.label}
                </NavItem>
            {/each}
        </nav>

        <div class="flex items-center gap-3">
            <Button onclick={toggleMode} variant="ghost" size="icon" class="rounded-full text-muted-foreground">
                <IconSun class="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                <IconMoon
                    class="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0"
                />
                <span class="sr-only">Toggle theme</span>
            </Button>

            {#if !user}
                <div class="flex items-center gap-2">
                    <Button variant="ghost" class="font-bold hidden sm:flex" href="/login">Log In</Button>
                    <Button class="rounded-xl px-6 font-black shadow-lg shadow-primary/20" href="/signup">
                        Get Started
                    </Button>
                </div>
            {:else}
                <User {user} />
            {/if}
        </div>
    </div>
</nav>
