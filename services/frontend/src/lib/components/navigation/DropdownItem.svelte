<script>
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu";

    const { Icon, href, classes = "", children } = $props();
</script>

<DropdownMenu.Item class="p-0">
    <a {href} class="flex w-full items-center gap-3 p-2.5 font-bold cursor-pointer {classes}">
        <Icon class="size-4" />
        {@render children()}
    </a>
</DropdownMenu.Item>
