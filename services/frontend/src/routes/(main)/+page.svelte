<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import { Badge } from "$lib/components/ui/badge";

    import { metadata } from "$lib/components/metadata.svelte";
    metadata.setTitle("");

    import FeatureCard from "$lib/components/landing/FeatureCard.svelte";
    import FeatureLabel from "$lib/components/landing/FeatureLabel.svelte";
    import Preview from "$lib/components/landing/Preview.svelte";

    import IconArrowRight from "@tabler/icons-svelte/icons/arrow-right";
    import IconBolt from "@tabler/icons-svelte/icons/bolt";
    import IconChartBar from "@tabler/icons-svelte/icons/chart-bar";
    import IconVideo from "@tabler/icons-svelte/icons/video";
    import IconDeviceDesktop from "@tabler/icons-svelte/icons/device-desktop";
    import IconPlayerPlay from "@tabler/icons-svelte/icons/player-play";
    import IconDownload from "@tabler/icons-svelte/icons/download";
    import IconTarget from "@tabler/icons-svelte/icons/target";

    const { data } = $props();
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
                href={data.user ? "/studio" : "/signup"}
            >
                Start Streaming Now
                <IconArrowRight class="ml-2 size-6" />
            </Button>
        </div>
    </section>

    <Preview />

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
