<script>
    import { PUBLIC_DISCORD_URL } from "$env/static/public";
    import { dev } from "$app/environment";
    import "./layout.css";

    import { ModeWatcher } from "mode-watcher";

    let { children } = $props();

    // prod timer
    let targetDate = null;

    let days = $state("--");
    let hours = $state("--");
    let minutes = $state("--");
    let seconds = $state("--");

    $effect(() => {
        if (!targetDate) {
            days = hours = minutes = seconds = "--";
            return;
        }

        const end = new Date(targetDate).getTime();

        if (isNaN(end)) {
            days = hours = minutes = seconds = "--";
            return;
        }

        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = end - now;

            if (distance < 0) {
                days = hours = minutes = seconds = "00";
                clearInterval(interval);
                return;
            }

            days = Math.floor(distance / (1000 * 60 * 60 * 24))
                .toString()
                .padStart(2, "0");
            hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
                .toString()
                .padStart(2, "0");
            minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
                .toString()
                .padStart(2, "0");
            seconds = Math.floor((distance % (1000 * 60)) / 1000)
                .toString()
                .padStart(2, "0");
        }, 1000);

        return () => clearInterval(interval);
    });
</script>

{#if dev}
    <ModeWatcher />

    <div class="text-slate-900 dark:text-slate-50 transition-colors duration-200">
        {@render children()}
    </div>
{:else}
    <div
        class="relative flex min-h-screen flex-col items-center justify-between overflow-hidden bg-[#0a0a0c] p-8 text-center font-sans text-[#e2e2e7]"
    >
        <!-- Glow Background Effect -->
        <div
            class="absolute top-1/2 left-1/2 h-150 w-150 -translate-x-1/2 -translate-y-1/2 rounded-full bg-radial-gradient from-[rgba(147,51,234,0.15)] to-transparent blur-[60px] filter"
        ></div>

        <header class="relative z-10">
            <h1 class="text-2xl font-extrabold tracking-tighter">LUMINUX</h1>
        </header>

        <main class="relative z-10 flex flex-col items-center">
            <section class="mb-12">
                <h2
                    class="mb-4 inline-block rounded-full bg-[rgba(147,51,234,0.1)] px-4 py-2 text-xs tracking-[2px] text-[#9333ea]"
                >
                    DEVELOPMENT IN PROGRESS
                </h2>
                <h1 class="mb-6 leading-[1.1] font-black text-[clamp(2.5rem,8vw,4.5rem)]">Coming Soon</h1>
            </section>

            <!-- Countdown Section (Hardcoded without JS) -->
            <div class="mb-12 flex gap-8">
                <div class="flex flex-col">
                    <span class="font-bold tabular-nums text-4xl md:text-5xl">{days}</span>
                    <label class="text-xs uppercase tracking-wider text-[#6b7280]">Days</label>
                </div>
                <div class="flex flex-col">
                    <span class="font-bold tabular-nums text-4xl md:text-5xl">{hours}</span>
                    <label class="text-xs uppercase tracking-wider text-[#6b7280]">Hours</label>
                </div>
                <div class="flex flex-col">
                    <span class="font-bold tabular-nums text-4xl md:text-5xl">{minutes}</span>
                    <label class="text-xs uppercase tracking-wider text-[#6b7280]">Mins</label>
                </div>
                <div class="flex flex-col">
                    <span class="font-bold tabular-nums text-4xl md:text-5xl">{seconds}</span>
                    <label class="text-xs uppercase tracking-wider text-[#6b7280]">Secs</label>
                </div>
            </div>
        </main>

        <footer class="relative z-10 text-sm text-[#6b7280]">
            <div class="flex flex-col gap-2 items-center">
                <span>Follow the journey</span>
                <div class="flex gap-6 justify-center">
                    <a
                        href={PUBLIC_DISCORD_URL}
                        class="text-[#e2e2e7] no-underline transition-colors hover:text-[#9333ea]">Discord</a
                    >
                </div>
            </div>
        </footer>
    </div>
{/if}
