import { IconApps, IconTag, IconGridDots } from "@tabler/icons-svelte";
import { PUBLIC_STATS_URL, PUBLIC_STUDIO_URL } from "$app/env/public";

export default [
    {
        label: "Platforms",
        type: "dropdown",
        Icon: IconApps,
        items: [
            {
                title: "Streamer Studio",
                href: PUBLIC_STUDIO_URL,
                description: "Automated reactive overlays & alerts",
            },
            {
                title: "Match Analytics",
                href: PUBLIC_STATS_URL,
                description: "Deep performance trends & match history",
            },
        ],
        side: "left",
    },
    {
        label: "Games",
        Icon: IconGridDots,
        href: "/games",
        side: "left",
    },
    {
        label: "Pricing",
        Icon: IconTag,
        href: "/pricing",
        side: "right",
    },
];
