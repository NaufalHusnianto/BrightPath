import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import { Avatar, Card, CardBody, CardHeader, Divider } from "@nextui-org/react";

const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

export default function Classroom({ classroom_data }) {
    const combinedItems = [
        ...classroom_data.learning_modules.map((module) => ({
            id: module.id,
            type: "module",
            title: module.title,
            description: module.description,
            created_at: module.created_at,
        })),
        ...classroom_data.tasks.map((task) => ({
            id: task.id,
            type: "task",
            title: task.title,
            description: task.description,
            created_at: task.created_at,
        })),
    ].sort((a, b) => new Date(a.created_at) - new Date(b.created_at));

    const handleItemPress = (item) => {
        if (item.type === "module") {
            router.get(`/learning-module/${item.id}`);
        } else if (item.type === "task") {
            router.get(`/task/${item.id}`);
        }
    };

    return (
        <Authenticated>
            <Head title="Classroom" />

            <div className="w-full p-16 bg-content1 flex justify-between items-center">
                <div>
                    <h1 className="text-5xl font-bold">
                        {classroom_data.name}
                    </h1>
                    <p>{classroom_data.description}</p>

                    <p className="mt-8">
                        Teacher:{" "}
                        <span className="text-amber-500">
                            {classroom_data.teacher.name}
                        </span>
                    </p>
                </div>
                <Avatar
                    src={`http://brightpath.test/storage/${classroom_data.teacher.photo_profile}`}
                    size="lg"
                />
            </div>

            <div className="w-full p-8 space-y-6">
                {combinedItems.map((item) => (
                    <Card
                        key={item.id}
                        isPressable
                        isHoverable
                        fullWidth
                        onPress={() => handleItemPress(item)}
                    >
                        <CardHeader>
                            <h2 className="text-2xl font-bold">
                                {item.type === "module"
                                    ? `Module: ${item.title}`
                                    : `Task: ${item.title}`}
                            </h2>
                        </CardHeader>
                        <Divider />
                        <CardBody>
                            <p>{item.description}</p>
                            <div className="mt-8 flex justify-between text-gray-500">
                                <p>{formatDate(item.created_at)}</p>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="2"
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M9 5l7 7-7 7"
                                    />
                                </svg>
                            </div>
                        </CardBody>
                    </Card>
                ))}
            </div>
        </Authenticated>
    );
}
