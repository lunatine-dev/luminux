<script lang="ts">
    import { page } from "$app/state";

    import * as Sidebar from "$lib/components/ui/sidebar";
    import * as Collapsible from "$lib/components/ui/collapsible";

    import { items } from "$lib/components/dashboard/navigation/sidebar/NavItems";

    import IconChevronRight from "@tabler/icons-svelte/icons/chevron-right";

    let { user } = $props();

    const isLinkActive = (url: string) => {
        return url === "/" ? page.url.pathname === "/studio" : page.url.pathname.startsWith(url);
    };
</script>

{#snippet NavLink(navItem)}
    {@const Icon = navItem.icon}
    <Sidebar.MenuButton tooltipContent={navItem.title} isActive={isLinkActive(navItem.url)}>
        {#snippet child({ props })}
            <a href={navItem.title === "Home" ? "/" : `/studio${navItem.url}`} {...props}>
                {#if Icon}<Icon />{/if}
                <span>{navItem.title}</span>
            </a>
        {/snippet}
    </Sidebar.MenuButton>
{/snippet}

{#each items as group (group.title)}
    {#if !group.roles || group.roles.includes(user?.role)}
        <Sidebar.Group>
            <Sidebar.GroupLabel>{group.title}</Sidebar.GroupLabel>
            <Sidebar.GroupContent class="flex flex-col gap-2">
                <Sidebar.Menu>
                    {#each group.items as navItem (navItem.title)}
                        {#if navItem.type === "collapse"}
                            <Collapsible.Root
                                open={navItem.items?.some((c) => isLinkActive(c.url))}
                                class="group/collapsible"
                            >
                                <Sidebar.MenuItem>
                                    <Collapsible.Trigger>
                                        {#snippet child({ props })}
                                            <Sidebar.MenuButton {...props}>
                                                {#if navItem.icon}<navItem.icon />{/if}
                                                <span>{navItem.title}</span>
                                                <IconChevronRight
                                                    class="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
                                                />
                                            </Sidebar.MenuButton>
                                        {/snippet}
                                    </Collapsible.Trigger>
                                    <Collapsible.Content>
                                        <Sidebar.MenuSub>
                                            {#each navItem.items as subItem (subItem.title)}
                                                <Sidebar.MenuSubItem>
                                                    {@render NavLink(subItem)}
                                                </Sidebar.MenuSubItem>
                                            {/each}
                                        </Sidebar.MenuSub>
                                    </Collapsible.Content>
                                </Sidebar.MenuItem>
                            </Collapsible.Root>
                        {:else}
                            <Sidebar.MenuItem>
                                {@render NavLink(navItem)}
                            </Sidebar.MenuItem>
                        {/if}
                    {/each}
                </Sidebar.Menu>
            </Sidebar.GroupContent>
        </Sidebar.Group>
    {/if}
{/each}
