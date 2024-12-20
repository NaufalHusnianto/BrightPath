import "../css/app.css";
import "./bootstrap";

import { createInertiaApp } from "@inertiajs/react";
import { NextUIProvider } from "@nextui-org/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createRoot } from "react-dom/client";
import { DarkModeProvider } from "./Layouts/DarkModeProvider";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob("./Pages/**/*.jsx")
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <NextUIProvider>
                <DarkModeProvider>
                    <main className="text-foreground bg-background">
                        <App {...props} />
                    </main>
                </DarkModeProvider>
            </NextUIProvider>
        );
    },
    progress: {
        delay: 300,
        color: "#FFBF00",
        showSpinner: true,
    },
});
