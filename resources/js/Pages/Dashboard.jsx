import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import { useState } from "react";

export default function Dashboard({ classrooms }) {
    const [code, setCode] = useState("");

    const handleEnroll = async (e) => {
        e.preventDefault();

        try {
            await router.post("/enroll-classroom", { code });

            alert("Anda telah berhasil mendaftar ke kelas");

            setCode("");
        } catch (error) {
            alert(error);
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <form onSubmit={handleEnroll} className="mb-4">
                <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Masukkan Kode Kelas"
                    required
                    className="border rounded p-2 mr-2"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white rounded px-4 py-2"
                >
                    Daftar
                </button>
            </form>

            <div className="container mx-auto">
                <h1 className="text-2xl font-bold mb-6">
                    Classrooms you are enrolled in
                </h1>

                {/* Jika classroom kosong */}
                {classrooms.length === 0 && (
                    <p>You are not enrolled in any classrooms yet.</p>
                )}

                {/* Tampilkan daftar classroom */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {classrooms.map((classroom) => (
                        <div
                            key={classroom.id}
                            className="bg-white p-4 rounded-lg shadow"
                        >
                            <h2 className="text-xl font-semibold">
                                {classroom.name}
                            </h2>
                            <p>{classroom.description}</p>
                            <p>Teacher: {classroom.teacher.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
