<script lang="ts">
    import { onMount } from "svelte";

    let token = $state("");
    let status = $state("");

    onMount(() => {
        token = localStorage.getItem("luminux_api_token") || "";
    });

    function saveSettings() {
        if (!token.trim()) {
            status = "Please enter a token";
            return;
        }

        // Save to local storage for persistence
        localStorage.setItem("luminux_api_token", token);

        // Notify the background page
        const bgWindow = overwolf.windows.getMainWindow() as any;
        if (bgWindow?.updateToken) {
            bgWindow.updateToken(token);
            status = "Settings Saved!";
        } else {
            status = "Saved";
        }

        setTimeout(() => {
            status = "";
        }, 3000);
    }

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
    class="flex flex-col h-screen bg-[#0f111a] text-[#e6edf3] border border-[#30363d] overflow-hidden select-none cursor-default rounded-lg"
>
    <!-- Header / Drag Region -->
    <header class="flex items-center p-3 bg-[#161b22] border-b border-[#30363d] drag">
        <img src="/logos/icon.png" alt="Luminux" class="w-5 h-5 mr-2 pointer-events-none" />
        <h1 class="text-sm font-semibold grow">Luminux Settings</h1>
        <button
            class="no-drag text-xl text-gray-500 hover:text-white transition-colors px-2"
            onclick={closeWindow}
            aria-label="Close"
        >
            &times;
        </button>
    </header>

    <!-- Body -->
    <section class="p-5 grow">
        <div class="flex flex-col gap-2">
            <label for="token" class="text-[10px] uppercase tracking-wider text-gray-500 font-bold">
                Luminux API Token
            </label>

            <input
                type="password"
                id="token"
                bind:value={token}
                placeholder="lnx-xxxxxxxxxxxx"
                class="bg-[#0d1117] border border-[#30363d] p-2.5 rounded-md font-mono text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all select-text cursor-text"
            />
            <div class="flex justify-between items-center mt-1">
                <p class="text-[11px] text-gray-600">Enter your secret key.</p>
                <button
                    type="button"
                    class="no-drag text-[11px] text-blue-500 hover:text-blue-400 hover:underline transition-all bg-transparent border-none p-0 cursor-pointer"
                    onclick={() => overwolf.utils.openUrlInDefaultBrowser("https://luminux.app/dashboard")}
                >
                    Luminux Dashboard &nearrow;
                </button>
            </div>
        </div>

        {#if status}
            <p class="text-xs mt-4 text-center {status.includes('enter') ? 'text-red-400' : 'text-green-400'}">
                {status}
            </p>
        {/if}
    </section>

    <!-- Footer -->
    <footer class="p-4 bg-[#161b22] flex justify-end">
        <button
            class="bg-teal-700 hover:bg-teal-600 text-white text-sm font-bold py-2 px-4 rounded-md transition-colors shadow-sm"
            onclick={saveSettings}
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
