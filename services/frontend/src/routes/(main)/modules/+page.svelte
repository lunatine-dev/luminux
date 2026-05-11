<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import { Card } from "$lib/components/ui/card";
    import { Badge } from "$lib/components/ui/badge";
    import { Input } from "$lib/components/ui/input";

    import IconSearch from "@tabler/icons-svelte/icons/search";
    import IconLock from "@tabler/icons-svelte/icons/lock";
    import IconLayout from "@tabler/icons-svelte/icons/layout";
    import IconRobot from "@tabler/icons-svelte/icons/robot";
    import IconTrophy from "@tabler/icons-svelte/icons/trophy";
    import IconVideo from "@tabler/icons-svelte/icons/video";
    import IconSettings from "@tabler/icons-svelte/icons/settings";
    import IconBolt from "@tabler/icons-svelte/icons/bolt";

    let userTier = $state("Core");
    let searchQuery = $state("");

    const modules = [
        {
            id: "reactive-hud",
            name: "Reactive HUD",
            description: "Real-time overlay that morphs as you swap heroes.",
            category: "Overlay",
            tier: "Core",
            icon: IconLayout,
        },
        {
            id: "wld-tracker",
            name: "Match Tracker",
            description: "Live session W/L records updated directly from engine.",
            category: "Overlay",
            tier: "Core",
            icon: IconTrophy,
        },
        {
            id: "bounty-bot",
            name: "Engagement Bot",
            description: "Automated chat interactions and point-based goals.",
            category: "Bot",
            tier: "Core",
            icon: IconRobot,
        },
        {
            id: "vod-timestamps",
            name: "Tactical Timeline",
            description: "Direct Twitch VOD links for every kill and teamwipe.",
            category: "Utility",
            tier: "Basic",
            icon: IconVideo,
        },
        {
            id: "auto-scene",
            name: "Scene Automator",
            description: "Intelligent OBS scene switching based on game state.",
            category: "Automation",
            tier: "Basic",
            icon: IconBolt,
        },
        {
            id: "logic-node",
            name: "Logic Engine",
            description: "Custom node-based automation for unique stream flows.",
            category: "Automation",
            tier: "Premium",
            icon: IconSettings,
        },
    ];

    const filteredModules = $derived(
        modules.filter(
            (m) =>
                m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                m.category.toLowerCase().includes(searchQuery.toLowerCase()),
        ),
    );

    const isLocked = (moduleTier: string) => {
        const tiers = ["Core", "Basic", "Premium"];
        return tiers.indexOf(moduleTier) > tiers.indexOf(userTier);
    };
</script>

<div class="max-w-6xl mx-auto space-y-12 py-2 md:py-20">
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-border pb-8">
        <div class="space-y-1">
            <h1 class="text-4xl font-black italic uppercase tracking-tighter text-foreground">Modules</h1>
            <p class="text-muted-foreground font-medium">Power up your broadcast with engine-level precision.</p>
        </div>

        <div class="relative w-full md:w-80">
            <IconSearch class="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-500" />
            <Input
                placeholder="Search features..."
                bind:value={searchQuery}
                class="pl-10 h-12 rounded-2xl bg-zinc-900/50 border-zinc-800 focus:ring-primary/20"
            />
        </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {#each filteredModules as module}
            {@const locked = isLocked(module.tier)}
            {@const Icon = module.icon}
            <Card
                class="group relative flex flex-col justify-between overflow-hidden border-zinc-800 bg-zinc-950 p-0 transition-all duration-300 hover:border-primary/50"
            >
                <div class="p-6 space-y-4">
                    <div class="flex justify-between items-start">
                        <div
                            class="size-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center transition-colors group-hover:bg-primary/10 group-hover:border-primary/20"
                        >
                            <Icon class="size-6 text-zinc-400 group-hover:text-primary" />
                        </div>

                        {#if locked}
                            <Badge
                                variant="outline"
                                class="bg-zinc-900 text-zinc-500 border-zinc-800 font-bold uppercase text-[9px] tracking-widest gap-1 px-2 py-0.5"
                            >
                                <IconLock class="size-3" />
                                {module.tier}
                            </Badge>
                        {/if}
                    </div>

                    <div class="space-y-1.5">
                        <h3 class="text-xl font-bold tracking-tight text-zinc-100 italic uppercase">
                            {module.name}
                        </h3>
                        <p class="text-sm text-zinc-400 leading-relaxed font-medium">
                            {module.description}
                        </p>
                    </div>
                </div>

                <div
                    class="mt-auto px-6 py-4 bg-zinc-900/30 border-t border-zinc-900 flex items-center justify-between"
                >
                    <span class="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600">
                        {module.category}
                    </span>

                    {#if locked}
                        <a
                            href="/pricing"
                            class="text-xs font-black uppercase tracking-widest text-primary hover:underline"
                        >
                            Unlock
                        </a>
                    {:else}
                        <span class="text-[10px] font-black uppercase tracking-widest text-green-500/80"> Active </span>
                    {/if}
                </div>
            </Card>
        {/each}
    </div>
</div>
