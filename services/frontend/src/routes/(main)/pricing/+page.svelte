<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import { Card } from "$lib/components/ui/card";
    import { Badge } from "$lib/components/ui/badge";
    import IconCheck from "@tabler/icons-svelte/icons/check";
    import IconX from "@tabler/icons-svelte/icons/x";
    import IconBolt from "@tabler/icons-svelte/icons/bolt";
    import IconCrown from "@tabler/icons-svelte/icons/crown";
    import IconFlame from "@tabler/icons-svelte/icons/flame";

    let currentTier = $state("Core");

    const tiers = $state([
        {
            id: "Core",
            name: "Core",
            price: "£0",
            description: "Essential HUD and engine tracking.",
            features: [
                "Base Reactive HUD",
                "Instant Hero Swap Sync",
                "Live W/L/D Tracking",
                "Twitch Bot: Event Alerts",
                "Bounties (Points/Commands)",
                "Privacy Shield (Menu Blurring)",
            ],
            notIncluded: [
                "Twitch VOD Timestamping",
                "Match History Archive",
                "Automation Node Editor",
                "Pro Video Exports",
            ],
            buttonText: "Start for Free",
            variant: "outline",
            icon: IconBolt,
        },
        {
            id: "Basic",
            name: "Basic",
            price: "£4.99",
            period: "/mo",
            description: "Advanced automation and history.",
            features: [
                "Everything in Core",
                "Twitch VOD Timestamps (Kills, Deaths, etc)",
                "Full Match & Scoreboard History",
                "Auto-Update Stream Titles/Category",
                "Automated OBS Scene Switching",
                "Premium HUD Theme Library",
            ],
            notIncluded: ["Automation Node Editor", "Pro Video Suite Exports", "Clip Cloud Storage"],
            buttonText: "Upgrade to Basic",
            variant: "default",
            featured: true,
            icon: IconFlame,
        },
        {
            id: "Premium",
            name: "Premium",
            price: "£9.99",
            period: "/mo",
            description: "Professional creator workflow.",
            features: [
                "Everything in Basic",
                "Automation Node Editor (Custom Logic)",
                "Pro Video Exports (XML/EDL/JSON)",
                "50GB Clip Cloud Storage",
                "Rank Progress & Performance Trends",
                "In-App Clip Editor",
                "Custom HUD Designer (DIY)",
            ],
            notIncluded: [],
            buttonText: "Get Premium",
            variant: "outline",
            icon: IconCrown,
        },
    ]);

    const getButtonState = (tierId: string) => {
        const tierOrder = ["Core", "Basic", "Premium"];
        const currentIndex = tierOrder.indexOf(currentTier);
        const targetIndex = tierOrder.indexOf(tierId);

        if (currentIndex === targetIndex) return { text: "Current Plan", disabled: true };
        if (currentIndex > targetIndex) return { text: "Downgrade", disabled: false };
        return { text: tiers.find((t) => t.id === tierId)?.buttonText || "Upgrade", disabled: false };
    };

    const handleTierChange = (id: string) => {
        currentTier = id;
    };
</script>

<div class="fixed bottom-4 right-4 z-50 bg-background border border-border p-2 rounded-lg flex gap-2 shadow-2xl">
    <span class="text-[10px] font-bold uppercase self-center px-2">Preview Tier:</span>
    {#each ["Core", "Basic", "Premium"] as t}
        <button
            onclick={() => handleTierChange(t)}
            class="px-2 py-1 text-[10px] rounded {currentTier === t ? 'bg-primary text-white' : 'bg-muted'}"
        >
            {t}
        </button>
    {/each}
</div>

<div class="max-w-7xl mx-auto px-6 py-6 md:py-20">
    <div class="text-center space-y-4 mb-20">
        <Badge variant="outline" class="border-primary/50 text-primary px-4 py-1">Pricing Plans</Badge>
        <h1 class="text-4xl md:text-6xl font-black italic uppercase tracking-tight">
            Level up your <span class="text-primary">broadcast</span>
        </h1>
        <p class="text-muted-foreground text-lg max-w-2xl mx-auto">
            From reactive overlays to automated Twitch engagement. Choose the tier that fits your climb.
        </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {#each tiers as tier}
            {@const state = getButtonState(tier.id)}
            {@const Icon = tier.icon}
            <Card
                class="relative p-8 flex flex-col h-full transition-all duration-500 {currentTier === tier.id
                    ? 'border-primary shadow-[0_0_40px_rgba(var(--primary),0.15)] scale-105 z-10 bg-slate-300/50 dark:bg-none'
                    : 'bg-background/50 border-border hover:border-primary/30'}"
            >
                {#if currentTier === tier.id}
                    <div
                        class="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg"
                    >
                        Current Plan
                    </div>
                {/if}

                <div class="space-y-6 grow">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-3">
                            <div class="size-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                <Icon class="size-6 text-primary" />
                            </div>
                            <h3 class="text-2xl font-bold">{tier.name}</h3>
                        </div>
                        {#if currentTier === tier.id}
                            <Badge
                                class="bg-primary/20 text-primary hover:bg-primary/20 border-none uppercase text-[10px]"
                                >Active</Badge
                            >
                        {/if}
                    </div>

                    <div class="flex items-baseline gap-1">
                        <span class="text-4xl font-black tracking-tight">{tier.price}</span>
                        {#if tier.period}
                            <span class="text-muted-foreground font-medium">{tier.period}</span>
                        {/if}
                    </div>

                    <p class="text-sm text-muted-foreground leading-relaxed">{tier.description}</p>

                    <div class="space-y-4 pt-4 border-t border-border">
                        {#each tier.features as feature}
                            <div class="flex items-start gap-3 text-sm">
                                <IconCheck class="size-4 text-primary shrink-0 mt-0.5" />
                                <span class="text-foreground/90 font-medium">{feature}</span>
                            </div>
                        {/each}

                        {#each tier.notIncluded as feature}
                            <div class="flex items-start gap-3 text-sm opacity-30">
                                <IconX class="size-4 shrink-0 mt-0.5" />
                                <span>{feature}</span>
                            </div>
                        {/each}
                    </div>
                </div>

                <Button
                    variant={tier?.variant ?? "ghost"}
                    size="lg"
                    disabled={state.disabled}
                    onclick={() => handleTierChange(tier.id)}
                    class="w-full mt-8 rounded-xl font-bold {tier.featured
                        ? 'shadow-xl shadow-primary/20 hover:scale-[1.02]'
                        : 'hover:bg-secondary/80'} transition-all"
                >
                    {state.text}
                </Button>
            </Card>
        {/each}
    </div>

    <div class="mt-24 text-center space-y-6 p-12 rounded-[3rem] bg-zinc-50 dark:bg-zinc-950 border border-border">
        <h4 class="text-xl font-bold italic uppercase tracking-tight">Zero Performance Impact</h4>
        <p class="text-muted-foreground max-w-2xl mx-auto text-sm leading-relaxed">
            Luminux is a <span class="text-foreground font-bold italic">Zero-Impact</span> engine. We monitor game-state visuals
            and public profiles to ensure zero interference with Overwatch 2 performance or security.
        </p>
        <div class="flex flex-wrap justify-center gap-4 md:gap-8 pt-4">
            <div class="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-400">
                <div class="size-1.5 rounded-full bg-green-500"></div>
                Cancel Anytime
            </div>
            <div class="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-400">
                <div class="size-1.5 rounded-full bg-green-500"></div>
                Stripe Secure
            </div>
            <div class="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-400">
                <div class="size-1.5 rounded-full bg-green-500"></div>
                Alpha Support
            </div>
        </div>
    </div>
</div>
