import Footer from "@/Components/Footer";
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

export default function Dashboard({ classrooms, appUrl }) {
    const [code, setCode] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [showLeaveModal, setShowLeaveModal] = useState(false);
    const [selectedClassroom, setSelectedClassroom] = useState(null);

    const handleEnroll = async (e) => {
        e.preventDefault();

        try {
            await router.post(
                "/enroll-classroom",
                { code },
                {
                    onError: () => setShowModal(true),
                }
            );

            setCode("");
        } catch (error) {
            alert(error);
        }
    };

    const handleLeaveClass = async () => {
        if (selectedClassroom) {
            try {
                await router.post(`/leave-classroom/${selectedClassroom.id}`);
                setShowLeaveModal(false);
                setSelectedClassroom(null);
            } catch (error) {
                alert("Error saat meninggalkan kelas");
            }
        }
    };

    const openLeaveModal = (classroom) => {
        setSelectedClassroom(classroom);
        setShowLeaveModal(true);
    };

    const closeModal = () => setShowModal(false);
    const closeLeaveModal = () => setShowLeaveModal(false);

    return (
        <AuthenticatedLayout appUrl={appUrl}>
            <Head title="Dashboard" />

            <div className="mx-auto w-full px-8 py-6 flex flex-col min-h-screen">
                <div className="flex flex-col lg:flex-row gap-2 justify-between items-center mb-6">
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

                {classrooms.length === 0 && <p>Tidak ada kelas</p>}

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
                                        src={`${appUrl}/storage/${classroom.teacher.photo_profile}`}
                                    />
                                    <div className="flex flex-col gap-1 items-start justify-center">
                                        <h4 className="text-xl font-semibold leading-none text-amber-500">
                                            {classroom.name}
                                        </h4>
                                        <h5 className="text-small tracking-tight text-default-400">
                                            Pengajar : {classroom.teacher.name}
                                        </h5>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardBody className="px-3 py-0 text-small text-default-400 mb-4">
                                {classroom.description}
                            </CardBody>
                            <Divider />
                            <CardFooter className="flex gap-3 justify-between">
                                <div className="flex gap-3">
                                    <p className="font-semibold text-default-400 text-small">
                                        {classroom.learning_modules.length}{" "}
                                        Modul
                                    </p>
                                    <p className="font-semibold text-default-400 text-small">
                                        {classroom.tasks.length} Tugas
                                    </p>
                                </div>
                                <Button
                                    size="sm"
                                    color="error"
                                    onClick={() => openLeaveModal(classroom)}
                                >
                                    Keluar
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>

                {/* Modal Kode Salah */}
                {showModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                            <h3 className="text-lg font-bold mb-4">
                                Kode Salah
                            </h3>
                            <p className="mb-4">
                                Kode kelas yang Anda masukkan tidak valid.
                            </p>
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                onClick={closeModal}
                            >
                                Tutup
                            </button>
                        </div>
                    </div>
                )}

                {/* Modal Konfirmasi Keluar Kelas */}
                {showLeaveModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
                        <div className="bg-content1 p-6 rounded-lg shadow-lg max-w-sm w-full">
                            <h3 className="text-lg font-bold mb-4">
                                Konfirmasi
                            </h3>
                            <p className="mb-4">
                                Apakah Anda yakin ingin keluar dari kelas "
                                {selectedClassroom?.name}"?
                            </p>
                            <div className="flex justify-end gap-2">
                                <button
                                    className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded"
                                    onClick={closeLeaveModal}
                                >
                                    Batal
                                </button>
                                <button
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                    onClick={handleLeaveClass}
                                >
                                    Keluar
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </AuthenticatedLayout>
    );
}
