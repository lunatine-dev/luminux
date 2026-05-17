<script lang="ts">
    import * as Sidebar from "$lib/components/ui/sidebar";

    import IconPlanet from "@tabler/icons-svelte/icons/planet";
    import Brand from "$lib/utils/brand";
</script>

<Sidebar.Menu>
    <Sidebar.MenuItem>
        <Sidebar.MenuButton class="data-[slot=sidebar-menu-button]:p-1.5! text-center w-full">
            {#snippet child({ props })}
                <a href="/" {...props} class="flex items-center gap-2 group cursor-pointe">
                    <img src="/favicon/favicon-96x96.png" class="w-7 h-auto" alt="logo" />
                    <span class="text-xl font-black uppercase tracking-tighter italic text-foreground">
                        {Brand.name}
                    </span>
                </a>
            {/snippet}
        </Sidebar.MenuButton>
    </Sidebar.MenuItem>
</Sidebar.Menu>
