<script lang="ts">
    import * as Sidebar from "$lib/components/ui/sidebar";
    import Header from "$lib/components/dashboard/navigation/sidebar/Header.svelte";
    import Content from "$lib/components/dashboard/navigation/sidebar/Content.svelte";
    import Footer from "$lib/components/dashboard/navigation/sidebar/Footer.svelte";

    const { user, ...restProps } = $props();
</script>

<Sidebar.Root collapsible="icon" {...restProps} class="dark:border-white/3">
    <Sidebar.Header>
        <Header />
    </Sidebar.Header>
    <Sidebar.Content>
        <Content {user} />
    </Sidebar.Content>
    <Sidebar.Footer>
        <Footer {user} />
    </Sidebar.Footer>
</Sidebar.Root>
