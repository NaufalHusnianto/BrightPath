import Footer from "@/Components/Footer";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import {
    Avatar,
    Card,
    CardBody,
    CardHeader,
    Divider,
    Button,
} from "@nextui-org/react";
import { useState } from "react";

const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

const truncateText = (htmlText, maxLength) => {
    const cleanText = htmlText.replace(/<\/?[^>]+(>|$)/g, " ");

    return cleanText.length > maxLength
        ? cleanText.substring(0, maxLength) + "..."
        : cleanText;
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
    ].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

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

            <div className="w-full p-16 bg-content1 flex justify-between items-center border-b border-foreground-200">
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
                    src={`http://192.168.43.49:8000/storage/${classroom_data.teacher.photo_profile}`}
                    size="lg"
                />
            </div>

            <div className="w-full p-8 space-y-6 flex flex-col min-h-screen">
                {combinedItems.length === 0 ? (
                    <div className="text-center text-gray-500 py-16">
                        <p className="text-2xl font-semibold">Kosong</p>
                        <p>Belum ada materi dan tugas</p>
                    </div>
                ) : (
                    combinedItems.map((item) => {
                        const [isExpanded, setIsExpanded] = useState(false);
                        const toggleExpand = () => setIsExpanded(!isExpanded);

                        return (
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
                                    <p>
                                        {isExpanded
                                            ? truncateText(
                                                  item.description,
                                                  1000
                                              )
                                            : truncateText(
                                                  item.description,
                                                  100
                                              )}
                                        {item.description.length > 100 && (
                                            <Button
                                                className="mt-2 ms-2 text-amber-500"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    toggleExpand();
                                                }}
                                                variant="light"
                                            >
                                                {isExpanded
                                                    ? "Tampilkan Lebih Sedikit"
                                                    : "Selengkapnya"}
                                            </Button>
                                        )}
                                    </p>
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
                        );
                    })
                )}
            </div>
            <Footer />
        </Authenticated>
    );
}
