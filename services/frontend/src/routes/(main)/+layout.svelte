<script lang="ts">
    import Navbar from "$lib/components/Navigation/Navbar.svelte";
    import Footer from "$lib/components/Navigation/Footer.svelte";

    let { children } = $props();
</script>

<div
    class="min-h-screen bg-background text-foreground transition-colors duration-300 selection:bg-primary selection:text-primary-foreground font-sans"
>
    <div class="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div class="absolute top-0 right-0 w-1/3 h-screen bg-primary/5 -skew-x-12 translate-x-32"></div>
        <div class="absolute top-[-10%] left-[10%] w-200 h-200 bg-primary/5 blur-[140px] rounded-full"></div>
    </div>

    <Navbar />

    {@render children()}

    <Footer />
</div>
