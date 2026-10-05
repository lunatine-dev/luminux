<script>
    import { page } from "$app/state";
    import { PUBLIC_URL } from "$app/env/public";

    import { toggleMode } from "mode-watcher";

    // Icons
    import { IconSun, IconMoon, IconBolt, IconBrandDiscord, IconMenu2, IconArrowBack } from "@tabler/icons-svelte";

    // Components
    import { Button, IsMobile, Brand, NavigationMenu, Sheet } from "@luminux/ui";
    import NavItem from "./NavItem.svelte";
    import NavDropdown from "./NavDropdown.svelte";

    // Data
    let { user = null, items = [], discord = true, themeSwitcher = true, buttons, breadcrumb } = $props();

    let isMobile = new IsMobile();
    let mobileMenuOpen = $state(false);

    $effect(() => {
        if (page.url.pathname) {
            mobileMenuOpen = false;
        }
    });
</script>

{#snippet RenderItems({ side = "right", breadcrumb })}
    <NavigationMenu.Root viewport={isMobile.current}>
        <NavigationMenu.List class="flex-wrap gap-1 hidden lg:flex">
            {#if breadcrumb}
                <NavItem Icon={IconArrowBack} label="Hub" href={PUBLIC_URL} />
            {/if}
            {#each items.filter((item) => item.side === side) as item (item.label)}
                {#if !item?.type}
                    <NavItem {...item} />
                {:else if item.type === "dropdown"}
                    <NavDropdown {...item} />
                {/if}
            {/each}
        </NavigationMenu.List>
    </NavigationMenu.Root>
{/snippet}

<div
    class="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl transition-colors duration-500"
>
    <div class="max-w-350 mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
        <div class="flex items-center gap-8">
            <a href="/" class="flex items-center gap-3 group cursor-pointer" title="Back to Homepage">
                <div
                    class="size-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 transition-transform group-hover:scale-105 shrink-0"
                >
                    <IconBolt class="size-6 text-primary-foreground stroke-2" />
                </div>

                <div class="flex flex-col">
                    <span class="text-xl font-black uppercase tracking-tighter italic text-foreground leading-none">
                        {Brand.name}
                    </span>

                    {#if breadcrumb}
                        <span class="text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-1">
                            {breadcrumb}
                        </span>
                    {/if}
                </div>
            </a>

            <!-- Left side items -->
            {@render RenderItems({ side: "left", breadcrumb })}
        </div>
        <div class="hidden lg:flex items-center gap-3">
            <!-- Right side items -->
            {@render RenderItems({ side: "right" })}

            {#if discord || buttons || themeSwitcher}
                <div class="h-5 w-px bg-border/60 mx-1 hidden sm:block"></div>
            {/if}

            {#if buttons}
                {@render buttons()}
            {/if}

            {#if discord}
                <Button
                    variant="ghost"
                    size="icon"
                    class="rounded-full text-muted-foreground hover:text-foreground hover:bg-muted"
                    href="https://discord.luminux.app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <IconBrandDiscord class="size-5" />
                </Button>
            {/if}

            {#if themeSwitcher}
                <Button
                    onclick={toggleMode}
                    variant="ghost"
                    size="icon"
                    class="rounded-full text-muted-foreground hover:text-foreground hover:bg-muted relative"
                >
                    <IconSun
                        class="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90"
                    />
                    <IconMoon
                        class="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0"
                    />
                    <span class="sr-only">Toggle theme</span>
                </Button>
            {/if}
        </div>

        <div class="flex lg:hidden">
            <Sheet.Root bind:open={mobileMenuOpen}>
                <Sheet.Trigger class="p-2 -mr-2 rounded-md hover:bg-muted transition-colors">
                    <IconMenu2 class="size-6" />
                </Sheet.Trigger>

                <Sheet.Content
                    side="top"
                    class="w-full h-auto max-h-[92vh] px-0 bg-background border-b shadow-2xl flex flex-col rounded-b-3xl"
                >
                    <Sheet.Header class="px-6 border-b pb-4">
                        <Sheet.Title class="text-left font-bold text-xl tracking-tight">Navigation</Sheet.Title>
                    </Sheet.Header>

                    <nav class="overflow-y-auto px-6 pt-3 pb-6 space-y-6">
                        {#if breadcrumb}
                            <a
                                href={PUBLIC_URL}
                                class="flex items-center gap-3 p-4 rounded-xl border border-border/60 bg-card/30 hover:bg-accent hover:text-accent-foreground transition-all duration-150 text-left active:scale-[0.98] w-full"
                            >
                                <IconArrowBack class="w-5 h-5 text-muted-foreground" />
                                <span class="text-xs font-bold uppercase tracking-wider">Back to Hub</span>
                            </a>
                        {/if}
                        {#each items.filter((i) => i.type === "dropdown") as item, i (i)}
                            {@const Icon = item.Icon}

                            <div class="space-y-3">
                                <div
                                    class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground/70"
                                >
                                    {#if Icon}
                                        <Icon class="w-4 h-4" />
                                    {/if}
                                    <span>{item.label}</span>
                                </div>

                                <div class="grid grid-cols-1 gap-2">
                                    {#each item.items as subItem, i (i)}
                                        <a
                                            href={subItem.href}
                                            class="p-4 rounded-xl border border-border/60 bg-card/40 hover:bg-accent group transition-all duration-150 active:scale-[0.99]"
                                        >
                                            <div class="font-bold text-sm text-foreground transition-colors">
                                                {subItem.title}
                                            </div>
                                            {#if subItem.description}
                                                <p class="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                                                    {subItem.description}
                                                </p>
                                            {/if}
                                        </a>
                                    {/each}
                                </div>
                            </div>
                        {/each}

                        <div class="grid grid-cols-2 gap-3">
                            {#each items.filter((i) => i.type !== "dropdown" && i.label !== "Hub") as item, i (i)}
                                {@const Icon = item.Icon}
                                <a
                                    href={item.href}
                                    class="flex flex-col gap-2 p-4 rounded-xl border border-border/60 bg-card/30 hover:bg-accent hover:text-accent-foreground transition-all duration-150 text-left active:scale-[0.98]"
                                >
                                    {#if Icon}
                                        <Icon class="w-5 h-5 text-muted-foreground" />
                                    {/if}
                                    <span class="text-xs font-bold uppercase tracking-wider">{item.label}</span>
                                </a>
                            {/each}
                        </div>
                    </nav>
                </Sheet.Content>
            </Sheet.Root>
        </div>
    </div>
</div>
