import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function Task({ tasks }) {
    const { data, setData, post, errors } = useForm({
        submission: null,
    });

    console.log(tasks);

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

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setData("submission", file);
        setFileName(file.name);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route("submissions.store", { taskId: tasks.id }));
    };

    return (
        <Authenticated>
            <Head title="Task" />

            <div className="w-full p-16 bg-content1 flex justify-between items-center">
                <div>
                    <h1 className="text-5xl font-bold">{tasks.title}</h1>
                    <p>{tasks.description}</p>

                    <p className="mt-8">
                        Kelas :{" "}
                        <span className="text-amber-500">
                            {tasks.classroom.name}
                        </span>
                    </p>
                </div>
            </div>

            <div className="p-8 px-16">
                <h2 className="text-3xl font-bold mt-8 mb-4">Upload Tugas</h2>

                {tasks.submissions[0] ? (
                    <div className="p-4">
                        <div className="text-amber-500 font-bold">
                            Task has been submitted{" "}
                            {formatDate(tasks.submissions[0].created_at)}.
                        </div>
                        <a
                            href={"/storage/" + tasks.submissions[0].file_path}
                            className="text-blue-500 mt-5"
                        >
                            Open File Submission
                        </a>
                        <div className="bg-content1 p-5 rounded-lg mt-8 mb-4">
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
        </Authenticated>
    );
}
