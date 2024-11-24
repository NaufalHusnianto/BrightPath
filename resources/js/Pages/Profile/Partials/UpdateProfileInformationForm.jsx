import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Transition } from "@headlessui/react";
import { Link, useForm, usePage } from "@inertiajs/react";
import { Avatar, Button } from "@nextui-org/react";
import { useState } from "react";

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = "",
}) {
    const user = usePage().props.auth.user;

    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
            photo: null,
        });

    const [fileName, setFileName] = useState("");
    const [preview, setPreview] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setData("photo", file);
        setFileName(file.name);

        if (file) {
            const objectUrl = URL.createObjectURL(file);
            setPreview(objectUrl);
        }
    };

    const submit = (e) => {
        e.preventDefault();

        console.log(data);

        post(route("profile.update"));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-amber-500">
                    Informasi Pribadi
                </h2>

                <p className="mt-1 text-sm">Perbarui informasi pribadi anda.</p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="name" value="Nama Lengkap" />

                    <TextInput
                        id="name"
                        className="mt-1 block w-full bg-content2"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full bg-content2"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        required
                        autoComplete="username"
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>

                <div className="p-4 flex flex-col items-center justify-center">
                    <InputLabel htmlFor="photo" value="Foto Profil" />

                    <div className="my-4">
                        {preview ? (
                            <img
                                src={preview}
                                alt="Preview"
                                className="h-32 w-32 object-cover rounded-full"
                            />
                        ) : (
                            <Avatar
                                isBordered
                                name={data.name}
                                size="lg"
                                className="text-amber-500 text-xl w-24 h-24"
                            />
                        )}
                    </div>

                    <div className="flex items-center">
                        <input
                            name="photo"
                            id="photo"
                            type="file"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                        <Button
                            onClick={() =>
                                document.getElementById("photo").click()
                            }
                        >
                            Upload Foto
                        </Button>
                    </div>
                    {fileName && <p>{fileName} selected</p>}
                    {errors.photo && <div>{errors.photo}</div>}
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="mt-2 text-sm text-gray-800">
                            Your email address is unverified.
                            <Link
                                href={route("verification.send")}
                                method="post"
                                as="button"
                                className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === "verification-link-sent" && (
                            <div className="mt-2 text-sm font-medium text-green-600">
                                A new verification link has been sent to your
                                email address.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <PrimaryButton
                        disabled={processing}
                        className="bg-amber-500"
                    >
                        Simpan
                    </PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Tersimpan</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
