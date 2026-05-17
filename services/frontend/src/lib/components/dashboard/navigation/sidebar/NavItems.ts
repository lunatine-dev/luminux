import IconHome from "@tabler/icons-svelte/icons/home";
import IconDashboard from "@tabler/icons-svelte/icons/dashboard";
import IconPlug from "@tabler/icons-svelte/icons/plug";

export const items = [
    {
        title: "Overview",
        items: [
            { title: "Home", url: "/home", icon: IconHome },
            { title: "Studio", url: "/", icon: IconDashboard },
        ],
    },
    {
        title: "System",
        items: [
            {
                title: "Integrations",
                url: "/integrations",
                icon: IconPlug,
            },
        ],
    },
];
