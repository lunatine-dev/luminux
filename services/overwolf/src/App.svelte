<script lang="ts">
    import { createSettings } from "./lib/settings.svelte";

    // Initialize the settings state
    const settings = createSettings();

    function closeWindow() {
        overwolf.windows.getCurrentWindow((result) => {
            overwolf.windows.close(result.window.id);
        });
    }
</script>

<svelte:head>
    <title>Luminux - Settings</title>
</svelte:head>

<main
    class="flex flex-col h-screen bg-[#050505] text-[#f4f4f5] border border-white/5 overflow-hidden select-none rounded-lg"
>
    <!-- Solid Black Header -->
    <header class="flex items-center px-4 py-3 bg-[#0a0a0a] border-b border-white/5 drag">
        <img src="/logos/luminux_256x256_v2.png" alt="Luminux" class="w-5 h-5 mr-2" />
        <h1 class="text-[11px] font-bold tracking-widest uppercase opacity-90 grow text-white">Luminux Settings</h1>
        <button class="no-drag opacity-40 hover:opacity-100 transition-opacity" onclick={closeWindow}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg
            >
        </button>
    </header>

    <section class="p-6 grow flex flex-col gap-6">
        <div class="space-y-3">
            <label for="token" class="text-[10px] uppercase tracking-widest font-black text-white/40">
                Luminux API Token
            </label>

            <input
                type="password"
                id="token"
                bind:value={settings.token}
                placeholder="lnx-xxxxxxxxxxxx"
                class="w-full bg-[#111111] border border-white/10 p-3 rounded-md font-mono text-sm text-white focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/20 transition-all placeholder:text-white/10"
            />

            <div class="flex justify-between items-center">
                <p class="text-[11px] text-white/30 italic">Required for match synchronization.</p>
                <button
                    class="no-drag text-[11px] font-bold text-primary hover:brightness-125 transition-all"
                    onclick={() => overwolf.utils.openUrlInDefaultBrowser("https://luminux.app/dashboard")}
                >
                    Get your Token &nearrow;
                </button>
            </div>
        </div>

        {#if settings.status}
            <div
                class="py-2 px-3 rounded-md bg-white/[0.03] border-l-2 {settings.status.includes('enter')
                    ? 'border-red-500'
                    : 'border-green-500'}"
            >
                <p
                    class="text-[11px] font-bold uppercase tracking-tight {settings.status.includes('enter')
                        ? 'text-red-400'
                        : 'text-green-400'}"
                >
                    {settings.status}
                </p>
            </div>
        {/if}
    </section>

    <footer class="p-5 bg-[#0a0a0a] flex justify-end border-t border-white/5">
        <button
            class="bg-primary hover:brightness-125 active:scale-95 text-white text-xs font-black uppercase tracking-wider py-2.5 px-6 rounded-md transition-all shadow-lg"
            onclick={() => settings.save()}
        >
            Save Changes
        </button>
    </footer>
</main>

<style>
    .drag {
        -webkit-app-region: drag;
    }
    .no-drag {
        -webkit-app-region: no-drag;
    }

    img {
        -webkit-user-drag: none;
    }

    main {
        border-radius: 8px;
        overflow: hidden;
        border: 1px solid rgba(255, 255, 255, 0.1);
    }
</style>
