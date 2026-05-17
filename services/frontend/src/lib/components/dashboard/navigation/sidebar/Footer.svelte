<script lang="ts">
    import * as Sidebar from "$lib/components/ui/sidebar";
    import * as Avatar from "$lib/components/ui/avatar";
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu";

    import DotsVerticalIcon from "@tabler/icons-svelte/icons/dots-vertical";
    import DevicesIcon from "@tabler/icons-svelte/icons/devices";
    import SettingsIcon from "@tabler/icons-svelte/icons/settings";
    import LogoutIcon from "@tabler/icons-svelte/icons/logout";

    const { user } = $props();
    const sidebar = Sidebar.useSidebar();
</script>

<Sidebar.Menu>
    <Sidebar.MenuItem>
        <DropdownMenu.Root>
            <DropdownMenu.Trigger>
                {#snippet child({ props })}
                    <Sidebar.MenuButton
                        {...props}
                        size="lg"
                        class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground  grayscale-90 hover:grayscale-0 transition transition-filter data-[state=open]:grayscale-0"
                    >
                        <Avatar.Root class="size-8 rounded-full">
                            <Avatar.Image src={user.avatar} alt={user.username} />
                            <Avatar.Fallback class="rounded-lg">{user.username.charAt(0)}</Avatar.Fallback>
                        </Avatar.Root>
                        <div class="grid flex-1 text-left text-sm leading-tight">
                            <span class="truncate font-medium">{user.username}</span>
                            <span class="text-muted-foreground truncate text-xs">
                                {user.subscription}
                            </span>
                        </div>
                        <DotsVerticalIcon class="ml-auto size-4" />
                    </Sidebar.MenuButton>
                {/snippet}
            </DropdownMenu.Trigger>
            <DropdownMenu.Content
                class="w-(--bits-dropdown-menu-anchor-width) min-w-56 rounded-lg"
                side={sidebar.isMobile ? "bottom" : "right"}
                align="end"
                sideOffset={4}
            >
                <DropdownMenu.Label class="p-0 font-normal">
                    <div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                        <Avatar.Root class="size-8 rounded-lg">
                            <Avatar.Image src={user.avatar} alt={user.username} />
                            <Avatar.Fallback class="rounded-lg">{user.username.charAt(0)}</Avatar.Fallback>
                        </Avatar.Root>
                        <div class="grid flex-1 text-left text-sm leading-tight">
                            <span class="truncate font-medium">{user.username}</span>
                            <span class="text-muted-foreground truncate text-xs">
                                {user.subscription}
                            </span>
                        </div>
                    </div>
                </DropdownMenu.Label>
                <DropdownMenu.Separator />
                <DropdownMenu.Group>
                    <DropdownMenu.Item>
                        {#snippet child({ props })}
                            <a {...props} href="/user/devices" class={`cursor-pointer ${props.class ?? ""}`}>
                                <DevicesIcon />
                                Devices
                            </a>
                        {/snippet}
                    </DropdownMenu.Item>
                    <DropdownMenu.Item>
                        {#snippet child({ props })}
                            <a {...props} href="/user/settings" class={`cursor-pointer ${props.class ?? ""}`}>
                                <SettingsIcon />
                                Settings</a
                            >
                        {/snippet}
                    </DropdownMenu.Item>
                </DropdownMenu.Group>
                <DropdownMenu.Separator />
                <DropdownMenu.Item>
                    {#snippet child({ props })}
                        <a {...props} href="/user/logout" class={`cursor-pointer ${props.class ?? ""}`}>
                            <LogoutIcon />
                            Log out
                        </a>
                    {/snippet}
                </DropdownMenu.Item>
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    </Sidebar.MenuItem>
</Sidebar.Menu>
