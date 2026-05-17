<script lang="ts">
    import * as Sidebar from "$lib/components/ui/sidebar";
    import SidebarMain from "$lib/components/dashboard/navigation/sidebar/SidebarMain.svelte";

    const { data, children } = $props();
</script>

<Sidebar.Provider style="--sidebar-width: calc(var(--spacing) * 72); --header-height: calc(var(--spacing) * 12);">
    <SidebarMain variant="sidebar" user={data?.user} />
    <Sidebar.Inset>
        {@render children()}
    </Sidebar.Inset>
</Sidebar.Provider>
