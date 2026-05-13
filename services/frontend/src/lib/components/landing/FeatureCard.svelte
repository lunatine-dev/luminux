<script lang="ts">
    let {
        icon: Icon,
        title,
        description,
    }: {
        icon: any;
        title: string;
        description: string;
    } = $props();
</script>

<div
    class="group space-y-5 p-6 rounded-3xl border border-transparent hover:border-border hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-all"
>
    <div
        class="size-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform"
    >
        <Icon size={24} />
    </div>
    <h3 class="text-2xl font-bold tracking-tight">{title}</h3>
    <p class="text-muted-foreground leading-relaxed">
        {description}
    </p>
</div>
