<script lang="ts">
    import { fly } from "svelte/transition";
    import { flip } from "svelte/animate";

    import { Card } from "$lib/components/ui/card";
    import { Button } from "$lib/components/ui/button";

    const scenes = {
        Bounties: {
            video: "bounty.mp4",
            events: [
                { time: 0.1, label: "Elimination", action: "Kill", context: "REIN" },
                { time: 3.9, label: "Elimination", action: "Double_Kill", context: "You" },
                { time: 3.91, label: "Elimination", action: "Bounty_Killed", context: "You" },
                { time: 6.07, label: "Elimination", action: "Triple_Kill", context: "You" },
            ],
        },
        "Hero Swaps": {
            video: "change_hero.mp4",
            events: [
                { time: 4.9, label: "Round_Start", action: "Lijiang", context: "Competitive" },
                { time: 6.6, label: "Hero_Swap", action: "Switch_to_Ana", context: "You" },
            ],
        },
        "Outcome Detection": {
            video: "loss.mp4",
            events: [
                { time: 0.5, label: "Elimination", action: "Kill", context: "Crisman300" },
                { time: 5, label: "Round_End", action: "Lijiang", context: "Competitive" },
                { time: 5.1, label: "Outcome", action: "Defeat", context: "Competitive" },
            ],
        },
    };

    let activeTab = $state<keyof typeof scenes>("Bounties");
    let time = $state(0);
    const currentScene = $derived(scenes[activeTab]);

    const activeEvents = $derived(currentScene.events.filter((e) => time >= e.time).slice(-3));

    $effect(() => {
        activeTab;
        time = 0;
    });
</script>

<div class="relative w-full mb-40 group">
    <div class="flex items-center justify-center gap-2 w-full mb-5 z-10">
        {#each Object.keys(scenes) as tab}
            <button
                onclick={() => (activeTab = tab)}
                class="px-6 py-2 text-sm font-medium transition-all duration-200
            rounded-full border-2
            {activeTab === tab
                    ? 'border-primary text-primary bg-primary/5'
                    : 'border-muted hover:border-muted-foreground text-muted-foreground'}"
            >
                {tab}
            </button>
        {/each}
    </div>

    <Card
        class="p-0 relative overflow-hidden rounded-[2.5rem] border border-border bg-white dark:bg-zinc-950 shadow-2xl flex flex-col pt-0 gap-0"
    >
        <div
            class="w-full h-11 shrink-0 bg-zinc-100/80 dark:bg-zinc-900/90 flex items-center px-6 gap-2 border-b border-border z-30"
        >
            <div class="flex gap-2">
                <div class="size-3 rounded-full bg-[#ff5f56]"></div>
                <div class="size-3 rounded-full bg-[#ffbd2e]"></div>
                <div class="size-3 rounded-full bg-[#27c93f]"></div>
            </div>
        </div>

        <div class="relative w-full aspect-video overflow-hidden bg-zinc-900">
            <div class="absolute bottom-6 left-6 z-20 flex-col-reverse gap-2 items-start hidden md:flex">
                {#each activeEvents as event (event.time + activeTab)}
                    <div
                        animate:flip={{ duration: 300 }}
                        transition:fly={{ x: -20, duration: 400 }}
                        class="flex items-center gap-3 px-4 py-2 bg-zinc-950/80 backdrop-blur-md border border-white/10 rounded-full shadow-lg"
                    >
                        <div class="flex items-center gap-2">
                            <div
                                class="size-1.5 rounded-full animate-pulse {event.context === 'You'
                                    ? 'bg-yellow-400 shadow-[0_0_8px_#facc15]'
                                    : 'bg-purple-500'}"
                            ></div>

                            <span
                                class="text-[9px] font-bold uppercase tracking-tighter {event.context === 'You'
                                    ? 'text-yellow-400'
                                    : 'text-purple-400'}"
                            >
                                {event.context === "You" ? "Personal" : "OW2"}
                            </span>
                        </div>

                        <div class="h-3 w-px bg-white/20"></div>

                        <p class="text-[11px] font-mono whitespace-nowrap">
                            {#if event.context && event.context !== "You"}
                                <span class="text-zinc-400 mr-1">[{event.context}]</span>
                            {/if}

                            <span class="text-white font-bold italic">{event.label}</span>
                            <span class="text-zinc-500 mx-1">→</span>
                            <span class="{event.context === 'You' ? 'text-yellow-400' : 'text-purple-400'} italic"
                                >{event.action}</span
                            >
                        </p>
                    </div>
                {/each}
            </div>

            <video
                bind:currentTime={time}
                src={"/videos/examples/" + currentScene.video}
                autoplay
                muted
                loop
                playsinline
                class="w-full h-full object-cover"
            >
                Your browser does not support the video tag.
            </video>
        </div>
    </Card>
</div>
