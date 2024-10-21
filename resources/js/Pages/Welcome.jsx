import { Head } from "@inertiajs/react";
import { useState } from "react";
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem,
    Link,
    Button,
} from "@nextui-org/react";

export default function Welcome({ auth }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const menuItems = [
        "Profile",
        "Dashboard",
        "Activity",
        "Analytics",
        "System",
        "Deployments",
        "My Settings",
        "Team Settings",
        "Help & Feedback",
        "Log Out",
    ];

    return (
        <>
            <Head title="Welcome" />

            <main className="min-h-screen w-full">
                <Navbar onMenuOpenChange={setIsMenuOpen}>
                    <NavbarContent>
                        <NavbarMenuToggle
                            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                            className="sm:hidden"
                        />
                        <NavbarBrand>
                            <p className="font-extrabold text-xl text-inherit">
                                Bright
                                <span className="text-amber-500">Path</span>
                            </p>
                        </NavbarBrand>
                    </NavbarContent>

                    <NavbarContent
                        className="hidden sm:flex gap-8"
                        justify="center"
                    >
                        <NavbarItem>
                            <Link color="foreground" href="#">
                                Features
                            </Link>
                        </NavbarItem>
                        <NavbarItem isActive>
                            <Link href="#" color="foreground">
                                Customers
                            </Link>
                        </NavbarItem>
                        <NavbarItem>
                            <Link color="foreground" href="#">
                                Integrations
                            </Link>
                        </NavbarItem>
                    </NavbarContent>
                    <NavbarContent justify="end">
                        {auth.user ? (
                            <NavbarItem>
                                <Button
                                    as={Link}
                                    color="warning"
                                    variant="flat"
                                    href={route("dashboard")}
                                >
                                    Dashboard Class
                                </Button>
                            </NavbarItem>
                        ) : (
                            <NavbarItem>
                                <Button
                                    as={Link}
                                    color="warning"
                                    href={route("register")}
                                    variant="flat"
                                >
                                    Sign Up
                                </Button>
                            </NavbarItem>
                        )}
                    </NavbarContent>
                    <NavbarMenu>
                        {menuItems.map((item, index) => (
                            <NavbarMenuItem key={`${item}-${index}`}>
                                <Link
                                    color={
                                        index === 2
                                            ? "primary"
                                            : index === menuItems.length - 1
                                            ? "danger"
                                            : "foreground"
                                    }
                                    className="w-full"
                                    href="#"
                                    size="lg"
                                >
                                    {item}
                                </Link>
                            </NavbarMenuItem>
                        ))}
                    </NavbarMenu>
                </Navbar>

                <div className="max-w-6xl text-center py-20 mx-auto">
                    <h4 className="text-4xl font-bold">
                        Selamat Datang di{" "}
                        <span className="text-amber-500">BrightPath</span>
                    </h4>
                    <h1 className="text-6xl font-bold py-4 text-inherit">
                        Platform Pembelajaran Yang Membantu Anda Belajar Lebih
                        Efektif.
                    </h1>
                    <div className="py-4 space-x-4">
                        <Button
                            as={Link}
                            href={route("dashboard")}
                            color="warning"
                            variant="bordered"
                        >
                            Login Sebagai Siswa
                        </Button>
                        <Button
                            as={Link}
                            href={"/admin"}
                            color="warning"
                            variant="bordered"
                        >
                            Login Sebagai Guru
                        </Button>
                    </div>
                </div>

                <div className="py-20 max-w-5xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-10">Fitur Utama</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                        <div className="border p-5 rounded shadow">
                            <h3 className="text-xl font-semibold">
                                Pembelajaran yang Disesuaikan
                            </h3>
                            <p className="mt-2">
                                Deskripsi singkat tentang fitur ini.
                            </p>
                        </div>
                        <div className="border p-5 rounded shadow">
                            <h3 className="text-xl font-semibold">
                                Kelas Interaktif
                            </h3>
                            <p className="mt-2">
                                Deskripsi singkat tentang fitur ini.
                            </p>
                        </div>
                        <div className="border p-5 rounded shadow">
                            <h3 className="text-xl font-semibold">
                                Pengelolaan Tugas yang Mudah
                            </h3>
                            <p className="mt-2">
                                Deskripsi singkat tentang fitur ini.
                            </p>
                        </div>
                        <div className="border p-5 rounded shadow">
                            <h3 className="text-xl font-semibold">
                                Pelaporan dan Analitik
                            </h3>
                            <p className="mt-2">
                                Deskripsi singkat tentang fitur ini.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
