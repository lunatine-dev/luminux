<script lang="ts">
    import type { Snippet } from "svelte";
    import type { User } from "$lib/types/auth";

    import { page } from "$app/state";

    import * as Sidebar from "$lib/components/ui/sidebar";
    import { Button, type ButtonSize, type ButtonVariant } from "$lib/components/ui/button";
    import { Separator } from "$lib/components/ui/separator";
    import * as Breadcrumb from "$lib/components/ui/breadcrumb";
    import { toggleMode } from "mode-watcher";

    import { items } from "$lib/components/dashboard/navigation/sidebar/NavItems";
    import Brand from "$lib/utils/brand";

    import IconSun from "@tabler/icons-svelte/icons/sun";
    import IconMoon from "@tabler/icons-svelte/icons/moon";

    type ButtonType = {
        text: string;
        href: string;
        size?: ButtonSize;
        target: string;
        icon?: Snippet;
        variant?: ButtonVariant;
    };

    interface Props {
        children: Snippet;
        title: string;
        buttons?: ButtonType[];
        extraClasses?: string;
        classOverride?: string;
        blank?: boolean;
        buttonsSnippet?: Snippet;
        padding?: boolean;
        border?: boolean;
    }

    let {
        children,
        title,
        buttons = [],
        extraClasses,
        classOverride,
        blank = false,
        buttonsSnippet,
        padding = false,
        border = true,
    }: Props = $props();

    const currentUser = $derived(page.data.user);

    const crumbAliases: Record<string, string> = {
        apps: "Applications",
    };

    const autoCrumbs = $derived.by(() => {
        const pathname = page.url.pathname;
        const segments = pathname.split("/").filter((s) => Boolean(s) && s !== "studio");

        const result = pathname !== "/studio" ? [{ title: "Dashboard", href: "/studio" }] : [];

        let cumulativePath = "/studio";

        segments.forEach((segment, index) => {
            cumulativePath += `/${segment}`;
            const isLast = index === segments.length - 1;

            let foundTitle = "";
            let hasUrlInConfig = false;

            if (segment === "user" && currentUser) {
                foundTitle = currentUser.username;
            }

            if (!foundTitle) {
                for (const group of items) {
                    if (group.title.toLowerCase() === segment.toLowerCase()) foundTitle = group.title;
                    const item = group.items.find((i) => i.url === cumulativePath);
                    if (item) {
                        foundTitle = item.title;
                        hasUrlInConfig = true;
                    }
                }
            }

            const displayTitle = foundTitle || segment;

            const isProjectIdSegment = index === 1 && segments[0] === "projects";

            let finalHref = "";
            if (isProjectIdSegment) {
                finalHref = !isLast ? cumulativePath : "";
            } else if (!isLast && hasUrlInConfig) {
                finalHref = cumulativePath;
            }

            result.push({
                title: isLast && title ? title : displayTitle,
                href: finalHref,
            });
        });

        return result;
    });
</script>

<svelte:head>
    <title>{title ?? "Unknown"} - {Brand.name}</title>
    <meta property="og:title" content={`${title ?? "Unknown"} - ${Brand.name}`} />
</svelte:head>

<header
    class="h-14 lg:h-16 flex shrink-0 items-center transition-all ease-in-out
    {border ? 'border-b border-zinc-200 dark:border-white/5' : ''}
    bg-white dark:bg-[#080808] sticky top-0 z-50"
>
    <div class="flex w-full items-center gap-2 px-4 lg:px-6">
        <Sidebar.Trigger class="-ml-1 opacity-70 hover:opacity-100 transition-opacity" />

        <Separator orientation="vertical" class="mx-2 h-4 bg-zinc-200 dark:bg-white/10" />

        <div class="flex items-center min-w-0 overflow-hidden">
            {#if !autoCrumbs.length}
                <h1 class="text-sm font-black tracking-tight uppercase text-zinc-900 dark:text-white whitespace-nowrap">
                    {title ?? "Title"}
                </h1>
            {:else}
                <Breadcrumb.Root>
                    <Breadcrumb.List class="flex items-center gap-1.5">
                        {#each autoCrumbs as crumb, index}
                            {@const isLast = index === autoCrumbs.length - 1}
                            {@const displayTitle = crumbAliases[crumb.title.toLowerCase()] ?? crumb.title}

                            <Breadcrumb.Item class="flex items-center">
                                {#if isLast}
                                    <!-- The Active Page: Punchy, Purple period, Bold Italic -->
                                    <Breadcrumb.Page
                                        class="text-sm font-black uppercase tracking-tight text-zinc-900 dark:text-white leading-none"
                                    >
                                        {displayTitle}
                                    </Breadcrumb.Page>
                                {:else}
                                    <!-- The Path: Small, Muted, Flat -->
                                    <Breadcrumb.Link
                                        href={crumb.href}
                                        class="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500 hover:text-purple-500 transition-colors leading-none"
                                    >
                                        {displayTitle}
                                    </Breadcrumb.Link>
                                {/if}
                            </Breadcrumb.Item>

                            {#if !isLast}
                                <Breadcrumb.Separator class="text-zinc-300 dark:text-zinc-700 text-[10px]">
                                    <span class="mx-0.5">/</span>
                                </Breadcrumb.Separator>
                            {/if}
                        {/each}
                    </Breadcrumb.List>
                </Breadcrumb.Root>
            {/if}
        </div>

        <!-- Right Side Actions -->
        <div class="ml-auto flex items-center gap-2">
            {#each buttons as button}
                <Button
                    variant={button.variant ?? "ghost"}
                    size="sm"
                    class="hidden md:flex h-8 font-bold uppercase text-[10px] tracking-widest gap-2"
                    href={button.href}
                >
                    {#if button.icon}
                        <svelte:component this={button.icon} size={14} />
                    {/if}
                    {button.text}
                </Button>
            {/each}

            {@render buttonsSnippet?.()}

            <Button
                onclick={toggleMode}
                variant="ghost"
                size="icon"
                class="h-8 w-8 rounded-md text-zinc-500 hover:text-purple-500"
            >
                <IconSun class="h-4 w-4 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                <IconMoon class="absolute h-4 w-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                <span class="sr-only">Toggle theme</span>
            </Button>
        </div>
    </div>
</header>

<main class="flex flex-1 flex-col relative overflow-hidden bg-zinc-50 dark:bg-[#050505]">
    {#if !blank}
        <div class="flex flex-1 flex-col">
            <div class="@container/main flex flex-1 flex-col">
                <div
                    class={classOverride ??
                        `flex flex-col gap-4 py-6 md:gap-8 md:py-10 ${extraClasses} ${padding ? "px-4 lg:px-10" : ""}`}
                >
                    {@render children?.()}
                </div>
            </div>
        </div>
    {:else}
        <div class="flex flex-1 flex-col">
            <div class={padding ? `relative flex flex-col gap-4 overflow-auto px-4 lg:px-10 @container` : ""}>
                {@render children?.()}
            </div>
        </div>
    {/if}
</main>
