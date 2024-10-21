import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Avatar,
    Button,
    Divider,
} from "@nextui-org/react";
import { useState } from "react";

export default function Dashboard({ classrooms }) {
    const [code, setCode] = useState("");

    const handleEnroll = async (e) => {
        e.preventDefault();

        try {
            await router.post("/enroll-classroom", { code });

            setCode("");
        } catch (error) {
            alert(error);
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="mx-auto w-full px-8 py-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">My Classroom</h1>
                    <form
                        onSubmit={handleEnroll}
                        className="flex items-center gap-2"
                    >
                        <TextInput
                            type="text"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            placeholder="Masukkan kode kelas"
                            required
                        />
                        <Button
                            type="submit"
                            variant="solid"
                            color="warning"
                            className="font-bold"
                        >
                            Enroll
                        </Button>
                    </form>
                </div>

                {classrooms.length === 0 && (
                    <p>You are not enrolled in any classrooms yet.</p>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {classrooms.map((classroom) => (
                        <Card
                            key={classroom.id}
                            isPressable
                            isHoverable
                            onPress={() =>
                                router.get(`/classrooms/${classroom.id}`)
                            }
                        >
                            <CardHeader className="justify-between">
                                <div className="flex gap-5">
                                    <Avatar
                                        isBordered
                                        radius="full"
                                        size="md"
                                        src={`http://brightpath.test/storage/${classroom.teacher.photo_profile}`}
                                    />
                                    <div className="flex flex-col gap-1 items-start justify-center">
                                        <h4 className="text-xl font-semibold leading-none text-amber-500">
                                            {classroom.name}
                                        </h4>
                                        <h5 className="text-small tracking-tight text-default-400">
                                            Teacher : {classroom.teacher.name}
                                        </h5>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardBody className="px-3 py-0 text-small text-default-400 mb-4">
                                {classroom.description}
                            </CardBody>
                            <Divider />
                            <CardFooter className="gap-3">
                                <div className="flex gap-1">
                                    <p className="font-semibold text-default-400 text-small">
                                        {classroom.learning_modules.length}
                                    </p>
                                    <p className=" text-default-400 text-small">
                                        Modul
                                    </p>
                                </div>
                                <div className="flex gap-1">
                                    <p className="font-semibold text-default-400 text-small">
                                        {classroom.tasks.length}
                                    </p>
                                    <p className="text-default-400 text-small">
                                        Tugas
                                    </p>
                                </div>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
