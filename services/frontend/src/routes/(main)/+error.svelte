<script>
    import { page } from "$app/state";
    import { Button } from "$lib/components/ui/button";
    import { fade } from "svelte/transition";
</script>

<div in:fade={{ duration: 400 }} class="flex flex-1 flex-col px-6">
    <div class="my-auto mx-auto max-w-100 text-center">
        <h1 class="text-6xl font-bold tracking-tighter text-foreground mb-2">
            {page.status}
        </h1>

        <h2 class="text-xl font-medium text-muted-foreground mb-4">
            {page?.error?.message ?? "Page Not Found"}
        </h2>

        <p class="mb-10 text-muted-foreground/80 text-sm leading-relaxed">
            The page you're looking for doesn't exist or has been moved.
        </p>

        <div class="flex items-center justify-center gap-3">
            <Button
                variant="secondary"
                onclick={() => history.back()}
                class="rounded-xl px-6 h-11 transition-all hover:bg-secondary/80 cursor-pointer"
            >
                Go Back
            </Button>

            <Button
                href="/"
                class="rounded-xl px-6 h-11 bg-primary text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:opacity-90"
            >
                Take Me Home
            </Button>
        </div>
    </div>
</div>
