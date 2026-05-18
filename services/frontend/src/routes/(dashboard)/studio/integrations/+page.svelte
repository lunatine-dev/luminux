<script lang="ts">
    import { getContext, onMount } from "svelte";
    import { useSocket } from "$lib/services/socket.svelte";
    import { page } from "$app/state";

    import * as Card from "$lib/components/ui/card";
    import { ScrollArea } from "$lib/components/ui/scroll-area";

    import Page from "$lib/components/dashboard/content/Page.svelte";

    import IconCopy from "@tabler/icons-svelte/icons/copy";
    import IconCheck from "@tabler/icons-svelte/icons/check";
    import IconEye from "@tabler/icons-svelte/icons/eye";
    import IconEyeOff from "@tabler/icons-svelte/icons/eye-off";
    import IconDownload from "@tabler/icons-svelte/icons/download";
    import IconRefresh from "@tabler/icons-svelte/icons/refresh";
    import Tabs from "$lib/components/dashboard/navigation/Tabs.svelte";

    let currentType = $state(page.url.searchParams.get("type") || "overwolf");
    const integrationTabs = [
        { id: "overwolf", label: "Overwolf Desktop App", href: "/studio/integrations?type=overwolf" },
    ];
    $effect(() => {
        const urlParam = page.url.searchParams.get("type");
        if (urlParam && urlParam !== currentType) {
            currentType = urlParam;
        }
    });

    let showToken = $state(false);
    let isCopied = $state(false);

    let logs = $state([]);

    let { data } = $props();

    const socket = useSocket();
    onMount(() => {
        const scoreboardUnsubscribe = socket.on("overwatch:scoreboard", (data) => {
            console.log("Scoreboard", data);
        });
        const heroSwapUnsubscribe = socket.on("overwatch:hero_swap", (data) => {
            logs = [
                {
                    timestamp: new Date().toLocaleDateString(),
                    type: "hero_swap",
                    title: "Hero Swap",
                    subtitle: `${data.btag ?? data.playerName} swapped to ${data.newHero} (was ${data.oldHero})`,
                },
                ...logs,
            ];
            console.log("Hero swap", data);
        });
        return () => {
            scoreboardUnsubscribe();
            heroSwapUnsubscribe();
        };
    });
</script>

<Page title="Integrations" blank={true}>
    <div class="grid h-full w-full grid-cols-1 gap-6 p-6 lg:grid-cols-3 transition-colors duration-200">
        <Tabs items={integrationTabs} bind:active={currentType} />
        {#if currentType === "overwolf"}
            <div class="space-y-6 lg:col-span-1">
                <div
                    class="rounded-xl border border-zinc-200/60 bg-white/40 p-6 backdrop-blur-sm dark:border-zinc-800/60 dark:bg-zinc-900/20 space-y-4"
                >
                    <div>
                        <h3 class="text-sm font-semibold text-zinc-900 dark:text-zinc-200">Application Access Token</h3>
                        <p class="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                            Use this key to authorize the Luminux local desktop companion client link.
                        </p>
                    </div>

                    {#await data.streamed.sessions}
                        <div
                            class="w-full h-9 animate-pulse rounded-lg border border-zinc-200 bg-zinc-100/50 dark:border-zinc-800/80 dark:bg-zinc-950 flex items-center px-3"
                        >
                            <span class="text-[11px] tracking-wide text-zinc-400 dark:text-zinc-500 font-sans"
                                >Retrieving secure companion link...</span
                            >
                        </div>
                    {:then resolvedSessions}
                        {@const currentOverwolfToken = resolvedSessions?.overwolf || "No active token found"}

                        <div class="relative flex items-center">
                            <input
                                type={showToken ? "text" : "password"}
                                readonly
                                value={currentOverwolfToken}
                                class="w-full pr-24 pl-3 py-2 text-xs font-mono rounded-lg border border-zinc-200 bg-white/80 dark:border-zinc-800 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200 focus:outline-none"
                            />
                            <div class="absolute right-1.5 flex items-center gap-1">
                                <button
                                    onclick={() => (showToken = !showToken)}
                                    class="p-1.5 rounded text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors"
                                    title={showToken ? "Hide key" : "Show key"}
                                >
                                    {#if showToken}<IconEyeOff size={14} />{:else}<IconEye size={14} />{/if}
                                </button>
                                <button
                                    onclick={() => {
                                        navigator.clipboard.writeText(currentOverwolfToken);
                                        isCopied = true;
                                        setTimeout(() => (isCopied = false), 2000);
                                    }}
                                    class="p-1.5 rounded text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors"
                                    title="Copy Token"
                                >
                                    {#if isCopied}<IconCheck size={14} class="text-green-500" />{:else}<IconCopy
                                            size={14}
                                        />{/if}
                                </button>
                            </div>
                        </div>
                    {/await}

                    <div
                        class="flex items-center justify-between border-t border-zinc-200/40 dark:border-zinc-800/60 pt-3.5"
                    >
                        <span class="text-[11px] text-zinc-400 dark:text-zinc-500">Leaked or compromised?</span>
                        <button
                            class="flex items-center gap-1 text-[11px] font-semibold text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                        >
                            <IconRefresh size={12} /> Regenerate Key
                        </button>
                    </div>
                </div>

                <div
                    class="rounded-xl border border-zinc-200/60 bg-white/40 p-6 backdrop-blur-sm dark:border-zinc-800/60 dark:bg-zinc-900/20 space-y-4"
                >
                    <div>
                        <h3 class="text-sm font-semibold text-zinc-900 dark:text-zinc-200">Installation Sequence</h3>
                        <p class="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                            Follow these setup metrics to connect your match state telemetry tracking loop.
                        </p>
                    </div>

                    <div class="space-y-3 font-sans text-xs">
                        <div
                            class="flex items-start gap-3 p-2.5 rounded-lg border border-dashed border-zinc-200 dark:border-zinc-800"
                        >
                            <span
                                class="h-5 w-5 rounded bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center font-bold text-[10px] text-zinc-500"
                                >1</span
                            >
                            <div class="flex-1 space-y-2">
                                <p class="text-zinc-700 dark:text-zinc-300 font-medium">
                                    Download the local app overlay layer engine.
                                </p>
                                <button
                                    class="flex items-center gap-1.5 rounded-md bg-primary px-2.5 py-1.5 text-[11px] font-semibold text-white shadow-sm hover:opacity-95 transition-all"
                                >
                                    <IconDownload size={12} /> Get Luminux Companion
                                </button>
                            </div>
                        </div>

                        <div
                            class="flex items-start gap-3 p-2.5 rounded-lg border border-dashed border-zinc-200 dark:border-zinc-800"
                        >
                            <span
                                class="h-5 w-5 rounded bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center font-bold text-[10px] text-zinc-500"
                                >2</span
                            >
                            <p class="text-zinc-700 dark:text-zinc-300 font-medium pt-0.5">
                                Launch Overwolf, open the Luminux Settings panel tab, and paste your active secure key
                                generated above.
                            </p>
                        </div>

                        <div
                            class="flex items-start gap-3 p-2.5 rounded-lg border border-dashed border-zinc-200 dark:border-zinc-800"
                        >
                            <span
                                class="h-5 w-5 rounded bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center font-bold text-[10px] text-zinc-500"
                                >3</span
                            >
                            <p class="text-zinc-700 dark:text-zinc-300 font-medium pt-0.5">
                                Fire up your game client. The status bubble on top will dynamically illuminate green
                                when telemetry synchronizes.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="lg:col-span-2 flex flex-col h-130">
                <div
                    class="rounded-xl border border-zinc-200/60 bg-white/40 backdrop-blur-sm dark:border-zinc-800/60 dark:bg-zinc-900/20 flex flex-col overflow-hidden h-full"
                >
                    <div
                        class="p-5 border-b border-zinc-200/60 dark:border-zinc-800 flex flex-row items-center justify-between"
                    >
                        <div class="space-y-0.5">
                            <h3 class="text-sm font-semibold tracking-wide text-zinc-900 dark:text-zinc-200">
                                Diagnostics Event Streaming
                            </h3>
                            <p class="text-xs text-zinc-500 dark:text-zinc-400">
                                Incoming data blocks processed through your active game thread tracker
                            </p>
                        </div>
                    </div>

                    <div class="flex-1 overflow-hidden">
                        <ScrollArea class="h-full p-5 font-mono text-xs">
                            {#if logs.length === 0}
                                <div
                                    class="h-full flex flex-col items-center justify-center text-zinc-400 dark:text-zinc-500 font-sans space-y-1 py-20"
                                >
                                    <p class="text-sm font-medium">Waiting for logs...</p>
                                    <p class="text-[11px]">Boot up the desktop companion to start seeing logs</p>
                                </div>
                            {:else}
                                <div class="space-y-3 pr-2">
                                    {#each logs as log}
                                        <div
                                            class="group flex items-start gap-4 rounded-lg border border-zinc-200/60 bg-white/40 p-3.5 transition-colors hover:bg-zinc-50/80 dark:border-zinc-800/40 dark:bg-zinc-950/40 dark:hover:bg-zinc-900/40"
                                        >
                                            <span class="text-zinc-400 dark:text-zinc-600 select-none pt-0.5"
                                                >{log.timestamp}</span
                                            >
                                            <div class="flex-1 space-y-1.5">
                                                <span
                                                    class="px-1.5 py-0.5 rounded text-[10px] font-bold bg-zinc-100 text-zinc-700 border border-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:border-zinc-700/80 tracking-wider"
                                                >
                                                    {log.type}
                                                </span>
                                                <div class="font-sans">
                                                    <p
                                                        class="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 font-mono break-all"
                                                    >
                                                        {log.subtitle}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    {/each}
                                </div>
                            {/if}
                        </ScrollArea>
                    </div>
                </div>
            </div>
        {:else}
            <div
                class="lg:col-span-3 rounded-xl border border-zinc-200/60 bg-white/40 p-12 text-center backdrop-blur-sm dark:border-zinc-800/60 dark:bg-zinc-900/20"
            >
                <p class="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                    Integration type "{currentType}" not found
                </p>
            </div>
        {/if}
    </div>
</Page>
