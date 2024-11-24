import Footer from "@/Components/Footer";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

const Tasks = ({ tasks, appUrl }) => {
    return (
        <Authenticated
            header={<h1 className="text-2xl font-bold">My Tasks</h1>}
            appUrl={appUrl}
        >
            <Head title="Tasks" />

            <div className="mx-auto p-6 px-16 flex flex-col min-h-screen">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold mb-3">
                            Tugas Belum Selesai
                        </h2>
                        {tasks
                            .filter((task) => task.submissions.length === 0)
                            .map((task) => (
                                <Link
                                    href={`/task/${task.id}`}
                                    key={task.id}
                                    className="block p-4 border border-foreground-200 rounded-lg hover:bg-content1"
                                >
                                    <h3 className="font-bold text-lg">
                                        {task.title}
                                    </h3>
                                    <p className="text-gray-500">
                                        Kelas :{" "}
                                        <span className="font-bold">
                                            {task.classroom.name}
                                        </span>
                                    </p>
                                    <p className="text-sm text-amber-500 mt-3">
                                        Deadline: {task.deadline}
                                    </p>
                                </Link>
                            ))}
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold mb-3">
                            Tugas Selesai
                        </h2>
                        {tasks
                            .filter((task) => task.submissions.length > 0)
                            .map((task) => (
                                <Link
                                    href={`/task/${task.id}`}
                                    key={task.id}
                                    className="block p-4 border border-foreground-200 rounded-lg hover:bg-content1"
                                >
                                    <h3 className="font-bold text-lg">
                                        {task.title}
                                    </h3>
                                    <p className="text-gray-500">
                                        Kelas :{" "}
                                        <span className="font-bold text-foreground">
                                            {task.classroom.name}
                                        </span>
                                    </p>
                                    {/* <p className="text-gray-500">
                                        {task.description}
                                    </p> */}
                                    <div className="flex justify-between mt-4">
                                        {task.submissions[0].created_at >
                                        task.deadline ? (
                                            <p className="text-sm text-red-500">
                                                Terlambat
                                            </p>
                                        ) : (
                                            <p className="text-sm text-amber-500">
                                                Terkirim Tepat Waktu
                                            </p>
                                        )}
                                        {task.submissions[0].score ? (
                                            <p className="text-sm text-amber-500">
                                                Nilai:{" "}
                                                {task.submissions[0].score}
                                            </p>
                                        ) : (
                                            <p className="text-sm text-foreground-300">
                                                Belum dinilai
                                            </p>
                                        )}
                                    </div>
                                </Link>
                            ))}
                    </div>
                </div>
            </div>

            <Footer />
        </Authenticated>
    );
};

export default Tasks;
