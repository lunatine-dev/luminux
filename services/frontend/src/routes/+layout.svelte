<script>
    import "./layout.css";

    import { ModeWatcher } from "mode-watcher";

    let { children } = $props();
</script>

<ModeWatcher />

<div class="text-slate-900 dark:text-slate-50 transition-colors duration-200">
    {@render children()}
</div>
