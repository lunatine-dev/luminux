<script lang="ts">
    import { onMount, setContext } from "svelte";

    import { SocketService, SOCKET_KEY } from "$lib/services/socket.svelte";

    import * as Sidebar from "$lib/components/ui/sidebar";
    import SidebarMain from "$lib/components/dashboard/navigation/sidebar/SidebarMain.svelte";

    const { data, children } = $props();

    const socketService = new SocketService();
    setContext(SOCKET_KEY, socketService);
    onMount(() => {
        socketService.connect();

        return () => socketService.disconnect();
    });
</script>

<Sidebar.Provider style="--sidebar-width: calc(var(--spacing) * 72); --header-height: calc(var(--spacing) * 12);">
    <SidebarMain variant="sidebar" user={data?.user} />
    <Sidebar.Inset>
        {@render children()}
    </Sidebar.Inset>
</Sidebar.Provider>
