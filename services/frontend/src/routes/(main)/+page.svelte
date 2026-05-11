<script lang="ts">
    import { fly } from "svelte/transition";
    import { flip } from "svelte/animate";

    import { Button } from "$lib/components/ui/button";
    import { Card } from "$lib/components/ui/card";
    import { Badge } from "$lib/components/ui/badge";

    import FeatureCard from "$lib/components/landing/FeatureCard.svelte";
    import FeatureLabel from "$lib/components/landing/FeatureLabel.svelte";

    import IconArrowRight from "@tabler/icons-svelte/icons/arrow-right";
    import IconBolt from "@tabler/icons-svelte/icons/bolt";
    import IconChartBar from "@tabler/icons-svelte/icons/chart-bar";
    import IconVideo from "@tabler/icons-svelte/icons/video";
    import IconDeviceDesktop from "@tabler/icons-svelte/icons/device-desktop";
    import IconPlayerPlay from "@tabler/icons-svelte/icons/player-play";
    import IconDownload from "@tabler/icons-svelte/icons/download";
    import IconTarget from "@tabler/icons-svelte/icons/target";

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

<main class="max-w-350 mx-auto px-6 lg:px-12 pt-6 md:pt-20 pb-32 transition-colors duration-500">
    <section class="max-w-4xl mb-32 space-y-8">
        <div class="flex flex-wrap items-center gap-3">
            <FeatureLabel label="live" text="Alpha 0.1" />
            <FeatureLabel variant="icon" icon={IconTarget} label="Overwatch 2" text="Native Engine Integration" />
        </div>

        <h1 class="text-5xl md:text-8xl font-extrabold tracking-tight leading-[0.9] text-foreground">
            Your stream, <br />
            <span class="text-primary italic">synced</span> with the match.
        </h1>

        <p class="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
            The first reactive HUD built specifically for <span class="text-foreground font-semibold">Overwatch 2</span
            >. Automate your hero-swaps, trigger kill-streak overlays, and archive every Team Wipe automatically.
        </p>

        <div class="flex flex-wrap gap-4 pt-4">
            <Button
                size="lg"
                class="rounded-2xl px-10 h-16 text-xl font-bold shadow-2xl shadow-primary/30 hover:scale-[1.02] transition-transform"
            >
                Start Streaming Now
                <IconArrowRight class="ml-2 size-6" />
            </Button>
        </div>
    </section>

    <div class="relative w-full mb-40 group">
        <div
            class="absolute -inset-4 bg-primary/20 blur-[100px] opacity-30 transition duration-1000 group-hover:opacity-50"
        ></div>

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

                <div class="flex gap-4 ml-1 md:ml-16">
                    {#each Object.keys(scenes) as tab}
                        <button
                            onclick={() => (activeTab = tab)}
                            class="text-[10px] font-black uppercase tracking-widest transition-colors {activeTab === tab
                                ? 'text-primary'
                                : 'text-zinc-500 hover:text-zinc-400'}"
                        >
                            {tab}
                        </button>
                    {/each}
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

    <div class="grid md:grid-cols-3 gap-8 border-t border-border pt-24">
        <FeatureCard
            icon={IconBolt}
            title="Hero-Reactive HUD"
            description="Luminux detects your hero swap instantly. Show specific trackers for Genji blades, Ana sleeps, or Tank mitigation without touching OBS."
        />
        <FeatureCard
            icon={IconVideo}
            title="Auto-Clip Killfeeds"
            description="Never miss a highlight. Automatically tag your VODs with frame-accurate killfeed markers for every elimination and objective capture."
        />
        <FeatureCard
            icon={IconChartBar}
            title="Session breakdown"
            description="Export full match scoreboards and hero-specific performance stats directly from the Overwatch engine to your dashboard."
        />
    </div>

    <div class="mt-32 flex flex-col items-center text-center space-y-8">
        <div class="space-y-4">
            <Badge variant="outline" class="bg-primary/5 text-primary border-primary/20 px-4"
                >Instant Highlight Recovery</Badge
            >
            <h3 class="text-3xl md:text-5xl font-black italic uppercase tracking-tight text-foreground">
                Smart Killfeed Markers
            </h3>
            <p class="text-muted-foreground max-w-xl mx-auto">
                Don't waste hours looking for that 5K. We automatically tag every "Team Wipe" and "Play of the Game"
                moment in your local VOD.
            </p>
        </div>

        <div
            class="w-full max-w-3xl bg-zinc-50 dark:bg-zinc-950 border border-border rounded-3xl p-6 shadow-xl dark:shadow-2xl space-y-6 transition-colors"
        >
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div class="flex items-center gap-3">
                    <div class="size-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <IconPlayerPlay class="size-5 text-primary fill-primary" />
                    </div>
                    <div class="text-left">
                        <p class="text-xs font-black uppercase tracking-widest text-zinc-400">OW2 Session</p>
                        <p class="text-sm font-mono font-bold text-foreground italic">Comp_KingsRow_Win.mp4</p>
                    </div>
                </div>
                <Button variant="outline" size="sm" class="rounded-lg gap-2 border-border">
                    <IconDownload class="size-4" />
                    Export with Markers
                </Button>
            </div>

            <div class="relative h-2 w-full bg-zinc-200 dark:bg-zinc-800 rounded-full">
                <div class="absolute inset-y-0 left-0 w-[65%] bg-primary/30 rounded-full"></div>
                <div
                    class="absolute left-[15%] -top-1 h-4 w-1 bg-primary shadow-[0_0_10px_rgba(var(--primary),0.5)] rounded-full group transition-colors"
                >
                    <div
                        class="hidden group-hover:block absolute bottom-6 left-1/2 -translate-x-1/2 bg-zinc-900 dark:bg-white text-white dark:text-black text-[10px] font-bold px-2 py-1 rounded"
                    >
                        Triple Kill
                    </div>
                </div>
                <div
                    class="absolute left-[45%] -top-1 h-4 w-1 bg-primary shadow-[0_0_10px_rgba(var(--primary),0.5)] rounded-full group transition-colors"
                >
                    <div
                        class="hidden group-hover:block absolute bottom-6 left-1/2 -translate-x-1/2 bg-zinc-900 dark:bg-white text-white dark:text-black text-[10px] font-bold px-2 py-1 rounded"
                    >
                        Team Wipe
                    </div>
                </div>
                <div class="absolute left-[82%] -top-1 h-4 w-1 bg-zinc-300 dark:bg-zinc-600 rounded-full"></div>
            </div>

            <div class="flex justify-between text-[10px] font-mono text-zinc-500 uppercase tracking-[0.2em]">
                <span>00:00:00</span>
                <span>Match End</span>
            </div>
        </div>
    </div>

    <section class="mt-40 relative group">
        <div
            class="absolute inset-0 bg-primary/5 rounded-[3rem] -rotate-1 group-hover:rotate-0 transition-transform duration-500"
        ></div>
        <div
            class="relative bg-white dark:bg-zinc-950 border border-border p-8 md:p-16 rounded-[3rem] flex flex-col lg:flex-row items-center gap-12 overflow-hidden transition-colors"
        >
            <div class="flex-1 space-y-6 text-center lg:text-left z-10">
                <Badge variant="outline" class="border-primary/50 text-primary font-bold px-4 py-1">
                    Optional Studio Sync
                </Badge>
                <h2 class="text-4xl md:text-5xl font-black tracking-tight text-foreground italic uppercase">
                    Deep OBS Integration
                </h2>
                <p class="text-muted-foreground text-lg leading-relaxed max-w-xl">
                    Bridge the gap between game and broadcast. Use
                    <span class="text-foreground font-bold underline decoration-primary/30">Smart Scene Switching</span> to
                    toggle visibility or swap layouts the moment a match begins.
                </p>

                <div class="flex flex-wrap justify-center lg:justify-start gap-x-8 gap-y-4 pt-4">
                    {#each ["Source Toggling", "Scene Transitions", "Zero-Latency"] as tag}
                        <div
                            class="flex items-center gap-2 text-[10px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-[0.2em]"
                        >
                            <div class="size-1.5 rounded-full bg-primary"></div>
                            {tag}
                        </div>
                    {/each}
                </div>
            </div>

            <div class="lg:w-1/3 flex justify-center opacity-10 dark:opacity-40">
                <IconDeviceDesktop class="size-48 text-zinc-900 dark:text-zinc-100" stroke={1} />
            </div>
        </div>
    </section>
</main>
