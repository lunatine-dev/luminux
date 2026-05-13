<script lang="ts">
    import { Badge } from "$lib/components/ui/badge";

    interface Props {
        text: string;
        label?: string;
        icon?: any;
        variant?: "badge" | "icon";
        class?: string;
    }

    let { text, label = "", icon: Icon, variant = "badge", class: className = "" }: Props = $props();
</script>

<div class="inline-flex items-center gap-3 px-3 py-1.5 rounded-full bg-secondary/50 border border-border {className}">
    <div class="flex items-center gap-2">
        {#if variant === "icon" && Icon}
            <Icon class="size-3 text-primary" />
            {#if label}
                <span class="text-xs font-black uppercase tracking-widest text-foreground">{label}</span>
            {/if}
        {:else if label}
            <Badge class="font-black px-2 py-0">{label.toUpperCase()}</Badge>
        {/if}
    </div>

    {#if Icon}
        <div class="h-3 w-px bg-border" aria-hidden="true"></div>
    {/if}

    <span class="text-[10px] font-medium uppercase tracking-widest text-muted-foreground/60">
        {text}
    </span>
</div>
