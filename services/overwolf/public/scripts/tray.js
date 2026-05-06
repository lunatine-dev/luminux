const menu = {
    menu_items: [
        { label: "Settings", id: "settings" },
        {
            label: "Exit",
            id: "exti",
        },
    ],
};

export const registerTray = () => {
    overwolf.os.tray.setMenu(menu, (result) => {
        if (result.success) {
            console.log(`[TRAY] Tray menu created`);
        }
    });

    overwolf.os.tray.onMenuItemClicked.addListener((event) => {
        if (event.item === "settings") {
            const bgWindow = overwolf.windows.getMainWindow();

            if (bgWindow?.openSettings) {
                bgWindow.openSettings();
            }
        } else if (event.item === "exit") {
            // Exit
        }
    });
};
