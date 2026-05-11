<script lang="ts">
    import { fade } from "svelte/transition";
    import { page } from "$app/state";

    import { toggleMode } from "mode-watcher";

    import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
    import { Button } from "$lib/components/ui/button";
    import * as Sheet from "$lib/components/ui/sheet/index.js";
    import * as Avatar from "$lib/components/ui/avatar";
    import { Badge } from "$lib/components/ui/badge";

    import Brand from "$lib/utils/brand";
    import Nav from "$lib/utils/nav";

    import {
        IconBolt,
        IconSettings,
        IconLayoutDashboard,
        IconLogout,
        IconBell,
        IconSun,
        IconMoon,
        IconVideo,
        IconChartBar,
        IconDatabase,
        IconLayersIntersect,
        IconMenu2,
    } from "@tabler/icons-svelte";

    let isAuthenticated = $state(false);
    let user = $state({
        name: "John Doe",
        initials: "JD",
        tier: "Premium",
        storageUsed: 65,
    });
</script>

<nav
    class="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl transition-colors duration-500"
>
    <div class="max-w-350 mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
        <div class="flex gap-4">
            <Sheet.Root>
                <Sheet.Trigger class="p-2 -ml-2 rounded-md hover:bg-muted transition-colors">
                    <IconMenu2 class="size-6 md:hidden" />
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
                            {#if !item.authenticated || isAuthenticated}
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
                {@const Icon = item.Icon}
                {@const isActive =
                    page.url.pathname === item.href || (page.url.pathname.startsWith(item.href) && item.href !== "/")}

                {#if !item.authenticated || isAuthenticated}
                    <a
                        href={item.href}
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
                            {item.label}
                        </span>

                        {#if isActive}
                            <div
                                class="absolute inset-0 border border-primary/10 dark:border-purple-500/10 rounded-lg -z-10"
                                transition:fade={{ duration: 150 }}
                            ></div>
                        {/if}
                    </a>
                {/if}
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

            {#if !isAuthenticated}
                <div class="flex items-center gap-2">
                    <Button variant="ghost" class="font-bold hidden sm:flex" onclick={() => (isAuthenticated = true)}
                        >Log In</Button
                    >
                    <Button class="rounded-xl px-6 font-black shadow-lg shadow-primary/20">Get Started</Button>
                </div>
            {:else}
                <div class="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        class="relative text-muted-foreground hover:text-primary rounded-full"
                    >
                        <IconBell class="size-5" />
                        <span
                            class="absolute top-2.5 right-2.5 size-2 bg-primary rounded-full border-2 border-background"
                        ></span>
                    </Button>

                    <DropdownMenu.Root>
                        <DropdownMenu.Trigger>
                            <Button
                                variant="ghost"
                                class="relative h-10 w-10 rounded-full p-0 ring-offset-background transition-all hover:ring-2 hover:ring-primary/20"
                            >
                                <Avatar.Root class="h-10 w-10 border-2 border-border transition-colors">
                                    <Avatar.Fallback
                                        class="bg-secondary text-secondary-foreground font-black text-xs uppercase italic"
                                    >
                                        {user.initials}
                                    </Avatar.Fallback>
                                </Avatar.Root>
                            </Button>
                        </DropdownMenu.Trigger>

                        <DropdownMenu.Content class="w-64 mt-2 p-2 rounded-2xl" align="end">
                            <DropdownMenu.Label class="font-normal p-2">
                                <div class="flex flex-col space-y-2">
                                    <div class="flex items-center justify-between">
                                        <p class="text-sm font-black uppercase italic tracking-tight">{user.name}</p>
                                        <Badge
                                            variant="outline"
                                            class="text-[9px] uppercase font-black px-1.5 py-0 border-primary/30 text-primary"
                                            >Premium</Badge
                                        >
                                    </div>

                                    <div class="space-y-1.5">
                                        <div
                                            class="flex justify-between text-[10px] font-bold text-muted-foreground uppercase"
                                        >
                                            <span class="flex items-center gap-1"
                                                ><IconDatabase class="size-3" /> Storage</span
                                            >
                                            <span>{user.storageUsed}%</span>
                                        </div>
                                        <div class="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                                            <div
                                                class="h-full bg-primary rounded-full"
                                                style="width: {user.storageUsed}%"
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            </DropdownMenu.Label>

                            <DropdownMenu.Separator class="my-2" />

                            <DropdownMenu.Group>
                                <DropdownMenu.Item class="cursor-pointer gap-3 p-2.5 font-bold rounded-xl">
                                    <IconLayoutDashboard class="size-4 fill-primary" />
                                    Studio
                                </DropdownMenu.Item>
                                <DropdownMenu.Item class="cursor-pointer gap-3 p-2.5 font-bold rounded-xl">
                                    <IconVideo class="size-4" />
                                    VOD Archive
                                </DropdownMenu.Item>
                                <DropdownMenu.Item class="cursor-pointer gap-3 p-2.5 font-bold rounded-xl">
                                    <IconSettings class="size-4" />
                                    Settings
                                </DropdownMenu.Item>
                            </DropdownMenu.Group>

                            <DropdownMenu.Separator class="my-2" />

                            <DropdownMenu.Item
                                class="cursor-pointer gap-3 p-2.5 font-bold text-destructive focus:text-destructive rounded-xl"
                                onclick={() => (isAuthenticated = false)}
                            >
                                <IconLogout class="size-4" />
                                Log out
                            </DropdownMenu.Item>
                        </DropdownMenu.Content>
                    </DropdownMenu.Root>
                </div>
            {/if}
        </div>
    </div>
</nav>

<style>
    /* Add this to your global CSS or a style tag */
    .nav-item span {
        display: inline-flex;
        align-items: center;
        line-height: 1; /* Prevents descenders from pushing the box up */
        margin-bottom: 1px; /* Optical nudge */
    }
</style>
