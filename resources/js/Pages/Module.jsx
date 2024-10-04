import { Head } from "@inertiajs/react";

export default function Module({ modules }) {
    console.log(modules);

    return (
        <>
            <Head title="Module" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: modules[0].materi,
                                }}
                                className="text-xl gap-3 flex flex-col"
                            />
                            {modules[0].materi}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
