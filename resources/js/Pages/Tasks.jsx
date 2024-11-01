import Footer from "@/Components/Footer";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

const Tasks = ({ tasks }) => {
    return (
        <Authenticated>
            <Head title="Tasks" />

            <div className="mx-auto p-6 px-14">
                <h1 className="text-2xl font-bold mb-6">My Task</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h2 className="text-xl font-semibold mb-3">
                            Tugas Belum Selesai
                        </h2>
                        {tasks
                            .filter((task) => task.submissions.length === 0)
                            .map((task) => (
                                <Link
                                    href={`/task/${task.id}`}
                                    key={task.id}
                                    className="block p-4 border rounded-lg hover:bg-content1"
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
                                    <p className="text-gray-500">
                                        {task.description}
                                    </p>
                                    <p className="text-sm text-red-500">
                                        Deadline: {task.deadline}
                                    </p>
                                </Link>
                            ))}
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold mb-3">
                            Tugas Selesai
                        </h2>
                        {tasks
                            .filter((task) => task.submissions.length > 0)
                            .map((task) => (
                                <Link
                                    href={`/task/${task.id}`}
                                    key={task.id}
                                    className="block p-4 border rounded-lg hover:bg-content1"
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
                                    <p className="text-gray-500">
                                        {task.description}
                                    </p>
                                    <p className="text-sm text-green-500">
                                        Sudah dikumpulkan
                                    </p>
                                    <p className="text-sm text-green-500">
                                        Nilai: {task.submissions[0].score}
                                    </p>
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
