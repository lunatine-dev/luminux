// Move the logic out of the UI file
export function createSettings() {
    let token = $state(localStorage.getItem("luminux_api_token") || "");
    let status = $state("");

    function save() {
        if (!token.trim()) {
            status = "Please enter a token";
            return;
        }
        localStorage.setItem("luminux_api_token", token);

        const bgWindow = overwolf.windows.getMainWindow() as any;
        bgWindow?.updateToken?.(token);

        status = "Settings Saved!";
        setTimeout(() => (status = ""), 3000);
    }

    return {
        get token() { return token; },
        set token(v) { token = v; },
        get status() { return status; },
        save
    };
}