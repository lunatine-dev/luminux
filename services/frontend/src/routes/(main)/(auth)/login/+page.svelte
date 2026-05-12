<script lang="ts">
    import { PUBLIC_BACKEND_URL } from "$env/static/public";

    import AuthLayout from "$lib/components/auth/Layout.svelte";
    import { Button } from "$lib/components/ui/button";
    import { Input } from "$lib/components/ui/input";
    import { FieldGroup, Field, FieldLabel } from "$lib/components/ui/field";
    import IconBrandTwitch from "@tabler/icons-svelte/icons/brand-twitch";

    let email = $state("");
    let password = $state("");

    async function handleLogin() {
        // Your login logic / Fastify API call
        console.log("Logging in:", { email, password });
    }
</script>

<AuthLayout title="Login">
    {#snippet children()}
        <form onsubmit={handleLogin} class="space-y-5">
            <FieldGroup class="space-y-5">
                <Field>
                    <FieldLabel
                        class="font-bold text-zinc-500 dark:text-zinc-400 uppercase text-[10px] tracking-[0.2em]"
                    >
                        Email
                    </FieldLabel>
                    <Input
                        bind:value={email}
                        type="email"
                        placeholder="m@example.com"
                        required
                        class="h-12 border-zinc-200 bg-white dark:border-white/10 dark:bg-white/12 transition-all focus:border-primary/50"
                    />
                </Field>

                <Field>
                    <div class="flex items-center">
                        <FieldLabel
                            class="font-bold text-zinc-500 dark:text-zinc-400 uppercase text-[10px] tracking-[0.2em]"
                            >Password</FieldLabel
                        >
                        <a
                            href="/forgot-password"
                            class="ms-auto inline-block text-[10px] uppercase tracking-wider text-primary hover:brightness-110 transition-all font-black italic"
                        >
                            Forgot Password?
                        </a>
                    </div>
                    <Input
                        bind:value={password}
                        type="password"
                        required
                        class="h-12 border-zinc-200 bg-white dark:border-white/10 dark:bg-white/12 transition-all focus:border-primary/50"
                    />
                </Field>

                <div class="pt-2 space-y-3">
                    <Button
                        type="submit"
                        class="w-full bg-primary text-white font-black italic tracking-tight hover:bg-primary/90 transition-all uppercase py-6 text-xl shadow-lg shadow-primary/30"
                    >
                        Login
                    </Button>

                    <Button
                        href={`${PUBLIC_BACKEND_URL}/auth/twitch`}
                        variant="outline"
                        class="w-full border-zinc-900 bg-zinc-900 text-white font-bold transition-all hover:bg-zinc-700 hover:text-zinc-300 dark:border-white/10 dark:bg-white/5 dark:hover:bg-[#9146FF]/20"
                    >
                        <IconBrandTwitch class="mr-2 h-5 w-5" />
                        Login with Twitch
                    </Button>
                </div>
            </FieldGroup>
        </form>
    {/snippet}

    {#snippet footer()}
        Don't have an account?
        <a
            href="/signup"
            class="text-primary hover:brightness-110 font-bold uppercase ml-1 underline underline-offset-4 decoration-primary/30"
            >Sign up</a
        >
    {/snippet}
</AuthLayout>
