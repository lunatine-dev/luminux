import IconLayoutDashboard from "@tabler/icons-svelte/icons/layout-dashboard";
import IconLayersIntersect from "@tabler/icons-svelte/icons/layers-intersect";
import IconChartBar from "@tabler/icons-svelte/icons/chart-bar";

export default {
    items: [
        {
            label: "Studio",
            authenticated: true,
            href: "/studio",
            Icon: IconLayoutDashboard,
        },
        {
            label: "Modules",
            href: "/modules",
            Icon: IconLayersIntersect,
        },
        {
            label: "Pricing",
            href: "/pricing",
            Icon: IconChartBar,
        },
    ],
};
