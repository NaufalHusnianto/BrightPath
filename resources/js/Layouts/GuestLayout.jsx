import { Link } from "@inertiajs/react";

export default function Guest({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center py-24 justify-center">
            <div>
                <Link href="/">
                    <h1 className="text-4xl font-bold">
                        Bright<span className="text-amber-500">Path</span>
                    </h1>
                </Link>
            </div>

            <div className="mt-8 w-5/6 overflow-hidden bg-content2 px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
