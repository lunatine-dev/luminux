<script lang="ts">
    import AuthLayout from "$lib/components/auth/Layout.svelte";
    import { Button } from "$lib/components/ui/button";
    import { Input } from "$lib/components/ui/input";
    import { FieldGroup, Field, FieldLabel } from "$lib/components/ui/field";
    import IconBrandTwitch from "@tabler/icons-svelte/icons/brand-twitch";

    let email = $state("");
    let username = $state("");
    let password = $state("");

    async function handleSignUp() {
        console.log("Signing up:", { email, username, password });
    }
</script>

<AuthLayout title="Sign Up">
    {#snippet children()}
        <form onsubmit={handleSignUp} class="space-y-5">
            <FieldGroup class="space-y-5">
                <Field>
                    <FieldLabel
                        class="font-bold text-zinc-500 dark:text-zinc-400 uppercase text-[10px] tracking-[0.2em]"
                    >
                        Username
                    </FieldLabel>
                    <Input
                        bind:value={username}
                        placeholder="vincenzo"
                        required
                        class="h-12 border-zinc-200 bg-white dark:border-white/10 dark:bg-white/12"
                    />
                </Field>

                <Field>
                    <FieldLabel
                        class="font-bold text-zinc-500 dark:text-zinc-400 uppercase text-[10px] tracking-[0.2em]"
                        >Email</FieldLabel
                    >
                    <Input
                        bind:value={email}
                        type="email"
                        placeholder="m@example.com"
                        required
                        class="h-12 border-zinc-200 bg-white dark:border-white/10 dark:bg-white/12"
                    />
                </Field>

                <Field>
                    <FieldLabel
                        class="font-bold text-zinc-500 dark:text-zinc-400 uppercase text-[10px] tracking-[0.2em]"
                        >Password</FieldLabel
                    >
                    <Input
                        bind:value={password}
                        type="password"
                        required
                        class="h-12 border-zinc-200 bg-white dark:border-white/10 dark:bg-white/12"
                    />
                </Field>

                <div class="pt-2 space-y-3">
                    <Button
                        type="submit"
                        class="w-full bg-primary text-white font-black italic tracking-tight hover:bg-primary/90 transition-all uppercase py-6 text-xl shadow-lg shadow-primary/30"
                    >
                        Create Account
                    </Button>

                    <Button
                        variant="outline"
                        class="w-full border-zinc-900 bg-zinc-900 text-white font-bold transition-all hover:bg-zinc-700 hover:text-zinc-300 dark:border-white/10 dark:bg-white/5 dark:hover:bg-[#9146FF]/20"
                    >
                        <IconBrandTwitch class="mr-2 h-5 w-5" />
                        Sign up with Twitch
                    </Button>
                </div>
            </FieldGroup>
        </form>
    {/snippet}

    {#snippet footer()}
        Already have an account?
        <a
            href="/login"
            class="text-primary hover:brightness-110 font-bold uppercase ml-1 underline underline-offset-4 decoration-primary/30"
            >Login</a
        >
    {/snippet}
</AuthLayout>
