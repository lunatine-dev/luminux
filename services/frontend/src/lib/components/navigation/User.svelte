<script>
    import * as Avatar from "$lib/components/ui/avatar";
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
    import { Button } from "$lib/components/ui/button";
    import { Badge } from "$lib/components/ui/badge";

    import Brand from "$lib/utils/brand";

    import DropdownItem from "$lib/components/navigation/DropdownItem.svelte";

    import IconSettings from "@tabler/icons-svelte/icons/settings";
    import IconLayoutDashboard from "@tabler/icons-svelte/icons/layout-dashboard";
    import IconLogout from "@tabler/icons-svelte/icons/logout";
    import IconBell from "@tabler/icons-svelte/icons/bell";
    import IconDatabase from "@tabler/icons-svelte/icons/database";
    import IconKey from "@tabler/icons-svelte/icons/key";

    const { user } = $props();
</script>

<div class="flex items-center gap-2">
    <Button variant="ghost" size="icon" class="relative text-muted-foreground hover:text-primary rounded-full">
        <IconBell class="size-5" />
        <span class="absolute top-2.5 right-2.5 size-2 bg-primary rounded-full border-2 border-background"></span>
    </Button>

    <DropdownMenu.Root>
        <DropdownMenu.Trigger>
            <Button
                variant="ghost"
                class="relative h-10 w-10 rounded-full p-0 ring-offset-background transition-all hover:ring-2 hover:ring-primary/20"
            >
                <Avatar.Root
                    class="h-10 w-10 border-2 border-border transition-colors"
                    style={"border-color:" + (Brand.colors[user?.role] ?? "var(--color-border)")}
                >
                    <Avatar.Image src={user.avatar} />
                    <Avatar.Fallback class="bg-secondary text-secondary-foreground font-black text-xs uppercase italic">
                        {user.username.charAt(0)}
                    </Avatar.Fallback>
                </Avatar.Root>
            </Button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Content class="w-64 mt-2 p-2 rounded-2xl" align="end">
            <DropdownMenu.Label class="font-normal p-2">
                <div class="flex flex-col space-y-2">
                    <div class="flex items-center justify-between">
                        <p class="text-sm font-black uppercase tracking-tight">
                            {user.username}
                        </p>
                        <Badge
                            variant="outline"
                            class="text-[9px] uppercase font-black px-1.5 py-0 border-primary/30 text-primary"
                        >
                            {user.subscription}
                        </Badge>
                    </div>

                    {#if user.subscription === "premium"}
                        <div class="space-y-1.5">
                            <div class="flex justify-between text-[10px] font-bold text-muted-foreground uppercase">
                                <span class="flex items-center gap-1"><IconDatabase class="size-3" /> Storage</span>
                                <span>0%</span>
                            </div>
                            <div class="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                                <div class="h-full bg-primary rounded-full" style="width: 0%"></div>
                            </div>
                        </div>
                    {/if}
                </div>
            </DropdownMenu.Label>

            <DropdownMenu.Separator class="my-2" />

            <DropdownMenu.Group>
                <DropdownItem href="/studio" Icon={IconLayoutDashboard}>Studio</DropdownItem>
                {#if ["dev", "admin"].includes(user.role)}
                    <DropdownItem href="/studio/admin" Icon={IconKey}>Admin</DropdownItem>
                {/if}
                <DropdownItem href="/user/settings" Icon={IconSettings}>Settings</DropdownItem>
            </DropdownMenu.Group>

            <DropdownMenu.Separator class="my-2" />

            <DropdownItem href="/api/logout" Icon={IconLogout} classes="text-destructive">Logout</DropdownItem>
        </DropdownMenu.Content>
    </DropdownMenu.Root>
</div>
