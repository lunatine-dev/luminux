<script>
    import Page from "$lib/components/dashboard/content/Page.svelte";

    import * as Card from "$lib/components/ui/card";
    import { Badge } from "$lib/components/ui/badge";
    import { ScrollArea } from "$lib/components/ui/scroll-area";
    import { Switch } from "$lib/components/ui/switch";
    import { Label } from "$lib/components/ui/label";
    import { onMount } from "svelte";

    let isOverwolfOnline = $state(true);
    let isObsConnected = $state(true);
    let isMockFeedActive = $state(false);

    function parseLogTelemetry(incomingPayload) {
        let rawEvent = incomingPayload;

        let title = "Update";
        let subtitle = "";

        if (rawEvent.data.feature === "roster") {
            let roster = rawEvent.data.info.roster;
            let firstRoster = JSON.parse(roster[Object.keys(roster)[0]]);
            title = "Scoreboard";
            subtitle = `${firstRoster.player_name} (${firstRoster.hero_name}): K/D/A: ${firstRoster.kills}/${firstRoster.deaths}/${firstRoster.assists}`;
        }

        return {
            timestamp: incomingPayload.timestamp,
            type: incomingPayload.event,
            title,
            subtitle,
            tagType: incomingPayload.event,
            rawPayload: incomingPayload,
        };
    }

    let logs = $state([]);
    let id = 0;
    const newEvent = (data) => {
        logs = [data, ...logs];

        if (logs.length > 100) {
            logs = logs.slice(0, 100);
        }
    };

    let testEvents = [
        {
            timestamp: "2026-05-08T18:02:54.643Z",
            event: "info_update",
            data: {
                feature: "roster",
                info: {
                    roster: {
                        roster_4:
                            '{"player_name":"YOKAPI","is_local":false,"hero_name":"LIFEWEAVER","hero_role":"SUPPORT","team":1,"kills":0,"deaths":0,"damage":64.8,"assists":0,"healed":0,"mitigated":0,"battlenet_tag":"Yokapi#2331","hero_id":657,"is_teammate":true}',
                    },
                },
            },
        },
    ];

    let sessionWins = $state(0);
    let sessionLosses = $state(0);
    let sessionDraws = $state(0);

    function adjustStat(type, amount) {
        if (type === "wins") sessionWins = Math.max(0, sessionWins + amount);
        if (type === "losses") sessionLosses = Math.max(0, sessionLosses + amount);
        if (type === "draws") sessionDraws = Math.max(0, sessionDraws + amount);
    }

    function fireTestAlert(type) {
        console.log(`Triggering test overlay animation for: ${type}`);
    }

    function refreshOverlayCache() {
        console.log("Purging local browser source cache objects...");
    }
    let int;
    onMount(() => {
        int = setInterval(() => {
            let item = testEvents[Math.floor(Math.random() * testEvents.length)];
            newEvent(item);
        }, 5000);

        return () => clearInterval(int);
    });
</script>

<Page title="Studio" blank={true}>
    <div
        class="grid h-full w-full grid-cols-1 gap-6 p-6 lg:grid-cols-3 xl:grid-rows-[auto_1fr] transition-colors duration-200"
    >
        <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:col-span-3 xl:grid-cols-4">
            <div
                class="rounded-xl border border-zinc-200/60 bg-white/40 p-6 backdrop-blur-sm transition-all hover:border-zinc-300 dark:border-zinc-800/60 dark:bg-zinc-900/20 dark:hover:border-zinc-700/40 flex items-center justify-between"
            >
                <div class="space-y-1">
                    <p class="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                        Game Integration
                    </p>
                    <h3 class="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                        {isOverwolfOnline ? "Live Tracking" : "Offline"}
                    </h3>
                </div>
                <div class="relative flex h-3 w-3">
                    {#if isOverwolfOnline}
                        <span
                            class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/75 opacity-75"
                        ></span>
                        <span class="relative inline-flex rounded-full h-3 w-3 bg-green-600"></span>
                    {:else}
                        <span class="relative inline-flex rounded-full h-3 w-3 bg-zinc-400 dark:bg-zinc-600"></span>
                    {/if}
                </div>
            </div>

            <div
                class="rounded-xl border border-zinc-200/60 bg-white/40 p-6 backdrop-blur-sm transition-all hover:border-zinc-300 dark:border-zinc-800/60 dark:bg-zinc-900/20 dark:hover:border-zinc-700/40 flex items-center justify-between"
            >
                <div class="space-y-1">
                    <p class="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                        HUD Overlay
                    </p>
                    <h3 class="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                        {isObsConnected ? "Connected" : "Not Found"}
                    </h3>
                </div>
                <Badge
                    variant="outline"
                    class="border-primary/30 bg-primary/10 text-primary font-sans px-2.5 py-0.5 text-xs"
                >
                    Active
                </Badge>
            </div>

            <div
                class="rounded-xl border border-zinc-200/60 bg-white/40 p-6 backdrop-blur-sm transition-all hover:border-zinc-300 dark:border-zinc-800/60 dark:bg-zinc-900/20 dark:hover:border-zinc-700/40 flex items-center justify-between"
            >
                <div class="space-y-1">
                    <p class="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                        Stream Session
                    </p>
                    <h3 class="text-xl font-bold tracking-tight font-mono text-zinc-900 dark:text-zinc-100">
                        01:42:19
                    </h3>
                </div>
                <Badge
                    variant="secondary"
                    class="bg-zinc-200/80 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300 font-medium">Live</Badge
                >
            </div>

            <div
                class="rounded-xl border border-zinc-200/60 bg-white/40 p-6 backdrop-blur-sm transition-all hover:border-zinc-300 dark:border-zinc-800/60 dark:bg-zinc-900/20 dark:hover:border-zinc-700/40 flex items-center justify-between"
            >
                <div class="space-y-1">
                    <p class="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                        Automated Clips
                    </p>
                    <h3 class="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">24 Saved</h3>
                </div>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="text-zinc-400 dark:text-zinc-500"
                >
                    <path d="m22 8-6 4 6 4V8Z" /><rect width="14" height="12" x="2" y="6" rx="2" ry="2" />
                </svg>
            </div>
        </div>

        <div class="lg:col-span-2 flex flex-col h-[580px]">
            <div
                class="rounded-xl border border-zinc-200/60 bg-white/40 backdrop-blur-sm dark:border-zinc-800/60 dark:bg-zinc-900/20 flex flex-col overflow-hidden h-full"
            >
                <div
                    class="p-5 border-b border-zinc-200/60 dark:border-zinc-800 flex flex-row items-center justify-between"
                >
                    <div class="space-y-0.5">
                        <h3 class="text-sm font-semibold tracking-wide text-zinc-900 dark:text-zinc-200">
                            Live Game Feed
                        </h3>
                        <p class="text-xs text-zinc-500 dark:text-zinc-400">
                            Real-time match events processed from your match engine
                        </p>
                    </div>
                    <span
                        class="px-2.5 py-0.5 font-mono text-[10px] font-bold rounded-full animate-pulse bg-primary/10 text-primary border border-primary/20"
                    >
                        ● LIVE TRACKING
                    </span>
                </div>

                <div class="flex-1 overflow-hidden">
                    <ScrollArea class="h-full p-5 font-mono text-xs">
                        <div class="space-y-3 pr-2">
                            {#each logs.map((l) => parseLogTelemetry(l)) as log}
                                <div
                                    class="group flex items-start gap-4 rounded-lg border border-zinc-200/60 bg-white/40 p-3.5 transition-colors hover:bg-zinc-50/80 dark:border-zinc-800/40 dark:bg-zinc-950/40 dark:hover:bg-zinc-900/40"
                                >
                                    <span class="text-zinc-400 dark:text-zinc-600 select-none pt-0.5"
                                        >{log.timestamp}</span
                                    >

                                    <div class="flex-1 space-y-1.5">
                                        <div class="flex items-center gap-2">
                                            {#if log.tagType === "primary"}
                                                <span
                                                    class="px-1.5 py-0.5 rounded text-[10px] font-bold bg-primary/10 text-primary border border-primary/20 tracking-wider"
                                                >
                                                    {log.type}
                                                </span>
                                            {:else}
                                                <span
                                                    class="px-1.5 py-0.5 rounded text-[10px] font-bold bg-zinc-100 text-zinc-700 border border-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:border-zinc-700/80 tracking-wider"
                                                >
                                                    {log.type}
                                                </span>
                                            {/if}
                                        </div>

                                        <div class="font-sans">
                                            <p
                                                class="text-sm font-semibold text-zinc-900 dark:text-zinc-100 capitalize"
                                            >
                                                {log.title}
                                            </p>
                                            {#if log.subtitle}
                                                <p class="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 font-mono">
                                                    {log.subtitle}
                                                </p>
                                            {/if}
                                        </div>
                                    </div>

                                    <button
                                        onclick={() => console.log(log.rawPayload)}
                                        class="opacity-0 group-hover:opacity-100 text-zinc-400 hover:text-primary dark:text-zinc-500 dark:hover:text-primary text-[11px] font-sans transition-all"
                                    >
                                        Inspect
                                    </button>
                                </div>
                            {/each}
                        </div>
                    </ScrollArea>
                </div>
            </div>
        </div>

        <div class="flex flex-col h-[580px]">
            <div
                class="rounded-xl border border-zinc-200/60 bg-white/40 backdrop-blur-sm dark:border-zinc-800/60 dark:bg-zinc-900/20 flex flex-col h-full"
            >
                <div class="p-5 border-b border-zinc-200/60 dark:border-zinc-800">
                    <h3 class="text-sm font-semibold tracking-wide text-zinc-900 dark:text-zinc-200">
                        Broadcast Toolbox
                    </h3>
                    <p class="text-xs text-zinc-500 dark:text-zinc-400">
                        Manual interventions and live control triggers
                    </p>
                </div>

                <div class="p-6 space-y-6 flex-1 flex flex-col justify-between overflow-y-auto">
                    <div class="space-y-4">
                        <h4 class="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                            Manual Scoreboard Override
                        </h4>
                        <div
                            class="space-y-3 rounded-xl border border-zinc-200/60 bg-white/80 p-4 dark:border-zinc-800/40 dark:bg-zinc-950/30"
                        >
                            <div class="flex items-center justify-between">
                                <span class="text-sm font-medium text-zinc-700 dark:text-zinc-300"
                                    >Session Wins: <strong
                                        class="text-zinc-900 dark:text-zinc-100 font-mono text-base ml-1"
                                        >{sessionWins}</strong
                                    ></span
                                >
                                <div class="flex gap-1.5">
                                    <button
                                        onclick={() => adjustStat("wins", -1)}
                                        class="h-7 w-7 flex items-center justify-center rounded bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700 text-sm font-bold transition-colors"
                                        >-</button
                                    >
                                    <button
                                        onclick={() => adjustStat("wins", 1)}
                                        class="h-7 w-7 flex items-center justify-center rounded bg-primary/10 text-primary hover:bg-primary/20 text-sm font-bold transition-colors"
                                        >+</button
                                    >
                                </div>
                            </div>
                            <div
                                class="flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800/60 pt-3"
                            >
                                <span class="text-sm font-medium text-zinc-700 dark:text-zinc-300"
                                    >Session Losses: <strong
                                        class="text-zinc-900 dark:text-zinc-100 font-mono text-base ml-1"
                                        >{sessionLosses}</strong
                                    ></span
                                >
                                <div class="flex gap-1.5">
                                    <button
                                        onclick={() => adjustStat("losses", -1)}
                                        class="h-7 w-7 flex items-center justify-center rounded bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700 text-sm font-bold transition-colors"
                                        >-</button
                                    >
                                    <button
                                        onclick={() => adjustStat("losses", 1)}
                                        class="h-7 w-7 flex items-center justify-center rounded bg-primary/10 text-primary hover:bg-primary/20 text-sm font-bold transition-colors"
                                        >+</button
                                    >
                                </div>
                            </div>
                            <div
                                class="flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800/60 pt-3"
                            >
                                <span class="text-sm font-medium text-zinc-700 dark:text-zinc-300"
                                    >Session Draws: <strong
                                        class="text-zinc-900 dark:text-zinc-100 font-mono text-base ml-1"
                                        >{sessionDraws}</strong
                                    ></span
                                >
                                <div class="flex gap-1.5">
                                    <button
                                        onclick={() => adjustStat("draws", -1)}
                                        class="h-7 w-7 flex items-center justify-center rounded bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700 text-sm font-bold transition-colors"
                                        >-</button
                                    >
                                    <button
                                        onclick={() => adjustStat("draws", 1)}
                                        class="h-7 w-7 flex items-center justify-center rounded bg-primary/10 text-primary hover:bg-primary/20 text-sm font-bold transition-colors"
                                        >+</button
                                    >
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="space-y-3">
                        <h4 class="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                            Quick Actions
                        </h4>

                        <div class="grid grid-cols-2 gap-2">
                            <button
                                onclick={() => fireTestAlert("Follow")}
                                class="flex justify-center items-center rounded-lg border border-zinc-200 bg-white px-3 py-2 text-xs font-semibold text-zinc-700 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300 dark:hover:bg-zinc-900/60 active:scale-[0.98] transition-all"
                            >
                                Test Follow Alert
                            </button>
                            <button
                                onclick={() => fireTestAlert("Donation")}
                                class="flex justify-center items-center rounded-lg border border-zinc-200 bg-white px-3 py-2 text-xs font-semibold text-zinc-700 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300 dark:hover:bg-zinc-900/60 active:scale-[0.98] transition-all"
                            >
                                Test Tip Alert
                            </button>
                        </div>

                        <button
                            onclick={refreshOverlayCache}
                            class="w-full justify-center rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm font-semibold text-zinc-700 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300 dark:hover:bg-zinc-900/60 active:scale-[0.99] transition-all"
                        >
                            Force Refresh Overlay Layer
                        </button>

                        <button
                            class="w-full justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:opacity-90 active:scale-[0.99] transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                        >
                            Save Session Timestamp Marker
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</Page>
