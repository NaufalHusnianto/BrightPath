import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import { Button, Divider } from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";

export default function Module({ modules, auth }) {
    const [processedContent, setProcessedContent] = useState("");
    const [data, setData] = useState("");

    const scrollRef = useRef(null);

    console.log(modules);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [modules.discussions]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await router.post(`/discuss/${modules.id}`, { data });

            setData("");
        } catch (error) {
            alert(error);
        }
    };

    useEffect(() => {
        if (modules.materi) {
            const parser = new DOMParser();
            const doc = parser.parseFromString(modules.materi, "text/html");

            doc.querySelectorAll("h2").forEach((h2) => {
                h2.style.setProperty("font-size", "2rem");
                h2.style.setProperty("font-weight", "bold");
            });

            doc.querySelectorAll("ul").forEach((ul) => {
                ul.style.setProperty("margin-left", "2rem");
            });

            doc.querySelectorAll("li").forEach((li) => {
                li.style.setProperty("list-style", "disc");
            });

            doc.querySelectorAll("a").forEach((li) => {
                li.style.setProperty("color", "#3490dc");
                li.style.setProperty("text-decoration", "underline");
                li.style.setProperty("cursor", "pointer");
            });

            doc.querySelectorAll("img").forEach((img) => {
                img.style.setProperty("width", "50%");
                img.style.setProperty("margin", "auto");
            });

            doc.querySelectorAll("figcaption").forEach((caption) => {
                caption.style.setProperty("visibility", "hidden");
            });

            setProcessedContent(doc.body.innerHTML);
        }
    }, [modules.materi]);

    const formatDate = (dateString) => {
        const options = {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <Authenticated>
            <Head title="Module" />

            <div className="w-full p-16 bg-content1 flex justify-between items-center">
                <div>
                    <h1 className="text-5xl font-bold">{modules.title}</h1>
                    <p>{modules.description}</p>

                    <p className="mt-8">
                        Kelas :{" "}
                        <span className="text-amber-500">
                            {modules.classroom.name}
                        </span>
                    </p>
                </div>
            </div>

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-8 text-conten1-foreground">
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: processedContent,
                                }}
                                className=" gap-3 flex flex-col"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-12 bg-content1">
                <h2 className="text-2xl font-bold">Diskusi</h2>
                <Divider className="mb-6 mt-2" />

                <div
                    className="max-h-96 overflow-y-auto scrollbar-default scroll-smooth"
                    ref={scrollRef}
                >
                    {modules.discussions.map((discussion) => (
                        <div
                            key={discussion.id}
                            className={`mb-4 flex ${
                                discussion.user_id === auth.user.id
                                    ? "justify-end"
                                    : "justify-start"
                            }`}
                        >
                            <div
                                className={`max-w-xl p-4 rounded-lg shadow ${
                                    discussion.user_id === auth.user.id
                                        ? "bg-content2"
                                        : "bg-content2"
                                }`}
                            >
                                <div className="flex items-start space-x-4">
                                    <div
                                        className={`font-bold ${
                                            discussion.user_id === auth.user.id
                                                ? "text-amber-500"
                                                : "text-foreground"
                                        }`}
                                    >
                                        {discussion.user.name}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        {formatDate(discussion.created_at)}
                                    </div>
                                </div>
                                <div className="mt-2">{discussion.content}</div>
                            </div>
                        </div>
                    ))}
                </div>

                <form onSubmit={handleSubmit} className="mt-16">
                    <textarea
                        className="w-full p-4 border rounded-lg shadow-sm bg-content2 text-content2-foreground"
                        value={data}
                        onChange={(e) => setData(e.target.value)}
                        placeholder="Tulis pesan..."
                        rows="3"
                    ></textarea>
                    <Button
                        type="submit"
                        color="warning"
                        fullWidth
                        className="mt-4 font-bold text-lg"
                    >
                        Kirim
                    </Button>
                </form>
            </div>
        </Authenticated>
    );
}
