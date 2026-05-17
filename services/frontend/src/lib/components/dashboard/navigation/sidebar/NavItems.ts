import IconHome from "@tabler/icons-svelte/icons/home";
import IconDashboard from "@tabler/icons-svelte/icons/dashboard";
import IconDeviceTv from "@tabler/icons-svelte/icons/device-tv";
import IconGraph from "@tabler/icons-svelte/icons/graph";
import IconUsers from "@tabler/icons-svelte/icons/users";
import IconSettings from "@tabler/icons-svelte/icons/settings";
import IconCloudLock from "@tabler/icons-svelte/icons/cloud-lock";
import IconVideo from "@tabler/icons-svelte/icons/video";
import IconPalette from "@tabler/icons-svelte/icons/palette";

export const items = [
    {
        title: "Overview",
        items: [
            { title: "Home", url: "/home", icon: IconHome },
            { title: "Studio", url: "/", icon: IconDashboard },
        ],
    },
    {
        title: "Live Tools",
        items: [
            { title: "Stream Control", url: "/studio/live", icon: IconDeviceTv },
            { title: "Overlays", url: "/studio/overlays", icon: IconPalette },
            { title: "Alerts", url: "/studio/alerts", icon: IconCloudLock },
        ],
    },
    {
        title: "Management",
        items: [
            { title: "Clips & VODs", url: "/studio/content", icon: IconVideo },
            { title: "Community", url: "/studio/community", icon: IconUsers },
        ],
    },
    {
        title: "Analytics",
        items: [{ title: "Performance", url: "/studio/stats", icon: IconGraph }],
    },
    {
        title: "System",
        items: [{ title: "Settings", url: "/settings", icon: IconSettings }],
    },
];
