import Footer from "@/Components/Footer";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function Task({ tasks }) {
    const { data, setData, post, errors } = useForm({
        submission: null,
    });
    const [processedContent, setProcessedContent] = useState("");

    const [fileName, setFileName] = useState("");

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

    const isLate = (submissionDate, deadline) => {
        return new Date(submissionDate) > new Date(deadline);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setData("submission", file);
        setFileName(file.name);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route("submissions.store", { taskId: tasks.id }));
    };

    useEffect(() => {
        if (tasks.description) {
            const parser = new DOMParser();
            const doc = parser.parseFromString(tasks.description, "text/html");

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

            setProcessedContent(doc.body.innerHTML);
        }
    }, [tasks.description]);

    return (
        <Authenticated>
            <Head title="Task" />

            <div className="w-full p-16 bg-content1 flex justify-between items-center border-b border-foreground-200">
                <div>
                    <h1 className="text-5xl font-bold">{tasks.title}</h1>
                    <p className="mt-2">Deadline : {tasks.deadline}</p>

                    <p className="mt-8">
                        Kelas :{" "}
                        <span className="text-amber-500">
                            {tasks.classroom.name}
                        </span>
                    </p>
                </div>
            </div>

            <div className="w-full p-16 lg:px-40 flex justify-between items-center border-b border-foreground-200">
                <div>
                    <h1 className="text-3xl font-bold mb-4">{tasks.title}</h1>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: processedContent,
                        }}
                        className=" gap-3 flex flex-col"
                    />
                </div>
            </div>

            <div className="p-8 px-16 bg-content1">
                <h2 className="text-3xl font-bold mt-8 mb-4">Upload Tugas</h2>

                {tasks.submissions[0] ? (
                    <div className="p-4">
                        <div className="text-amber-500 font-bold">
                            Task has been submitted{" "}
                            {formatDate(tasks.submissions[0].created_at)}.
                        </div>

                        {isLate(
                            tasks.submissions[0].created_at,
                            tasks.deadline
                        ) ? (
                            <p className="text-red-500 font-bold">
                                submitted late
                            </p>
                        ) : (
                            <p className="text-green-500 font-bold">
                                Submitted on Time
                            </p>
                        )}

                        <a
                            href={"/storage/" + tasks.submissions[0].file_path}
                            className="text-blue-500 mt-5"
                        >
                            Open File Submission
                        </a>
                        <div className="bg-content2 p-5 rounded-lg mt-8 mb-4">
                            <h2 className="text-3xl font-bold">
                                Score :{" "}
                                <span className="text-amber-500">
                                    {tasks.submissions[0].score ??
                                        "Not Scored Yet"}
                                </span>
                            </h2>
                            <p>{tasks.submissions[0].feedback}</p>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={submit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Upload Submission
                            </label>
                            <input
                                type="file"
                                onChange={handleFileChange}
                                className="mt-2"
                            />
                            {fileName && (
                                <p className="text-sm text-green-600 mt-2">
                                    {fileName} selected.
                                </p>
                            )}
                            {errors.submission && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.submission}
                                </p>
                            )}
                        </div>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded"
                        >
                            Submit Tugas
                        </button>
                    </form>
                )}
            </div>
            <Footer />
        </Authenticated>
    );
}
