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
    Divider,
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
                <Navbar onMenuOpenChange={setIsMenuOpen} maxWidth="xl">
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
                        <NavbarItem isActive>
                            <Link color="foreground" href="#features">
                                Features
                            </Link>
                        </NavbarItem>
                        <NavbarItem>
                            <Link href="#benefits" color="foreground">
                                Benefits
                            </Link>
                        </NavbarItem>
                        <NavbarItem>
                            <Link color="foreground" href="#cta">
                                Get Started
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
                            <>
                                <NavbarItem>
                                    <Button
                                        as={Link}
                                        color="warning"
                                        href={route("login")}
                                        variant="flat"
                                    >
                                        Sign In
                                    </Button>
                                </NavbarItem>
                                <NavbarItem>
                                    <Button
                                        as={Link}
                                        color="warning"
                                        href={route("register")}
                                        variant="light"
                                    >
                                        Sign Up
                                    </Button>
                                </NavbarItem>
                            </>
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

                <div className="max-w-7xl text-center py-32 px-2 mx-auto">
                    <h4 className="text-5xl font-bold">
                        Selamat Datang di{" "}
                        <span className="text-amber-500">BrightPath</span>
                    </h4>
                    <h1 className="text-4xl lg:text-7xl font-bold py-4 text-inherit">
                        Platform Pembelajaran Yang Membantu Belajar Lebih
                        Efektif.
                    </h1>
                    <div className="py-4 space-x-1 lg:space-x-4">
                        {!auth.user ? (
                            <>
                                <Button
                                    as={Link}
                                    href={route("dashboard")}
                                    color="warning"
                                    variant="solid"
                                    className="text-lg font-semibold"
                                >
                                    Login Sebagai Siswa
                                </Button>
                                <Button
                                    as={Link}
                                    href={"/admin"}
                                    color="warning"
                                    variant="solid"
                                    className="text-lg font-semibold"
                                >
                                    Login Sebagai Guru
                                </Button>
                            </>
                        ) : (
                            <Button
                                as={Link}
                                href={"/dashboard"}
                                color="warning"
                                variant="solid"
                                className="text-lg font-semibold"
                            >
                                Go to Dashboard
                            </Button>
                        )}
                    </div>
                </div>

                <div
                    className="py-20 px-8 max-w-7xl mx-auto text-center"
                    id="features"
                >
                    <h2 className="text-3xl font-bold mb-14">Fitur Utama</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                        <div className="border p-5 rounded shadow">
                            <h3 className="text-xl font-semibold">
                                Pembelajaran yang Disesuaikan
                            </h3>
                            <p className="mt-2">
                                Setiap siswa memiliki akses ke materi yang
                                disesuaikan dengan kebutuhan belajar mereka
                                memungkinkan mereka untuk belajar dalam ritme
                                dan gaya yang paling sesuai dengan kemampuan
                                mereka. Dapatkan pengalaman belajar yang
                                personal untuk hasil terbaik.
                            </p>
                        </div>
                        <div className="border p-5 rounded shadow">
                            <h3 className="text-xl font-semibold">
                                Kelas Interaktif
                            </h3>
                            <p className="mt-2">
                                Ciptakan pengalaman belajar yang hidup dengan
                                kelas interaktif di mana siswa dan guru dapat
                                berkomunikasi dan berdiskusi secara langsung.
                                Fitur video, kuis, dan diskusi online menjadikan
                                pembelajaran lebih menarik dan mendalam.
                            </p>
                        </div>
                        <div className="border p-5 rounded shadow">
                            <h3 className="text-xl font-semibold">
                                Pengelolaan Tugas yang Mudah
                            </h3>
                            <p className="mt-2">
                                Atur, unggah, dan kelola tugas dengan mudah.
                                Setiap tugas dilengkapi dengan panduan,
                                deadline, dan ruang untuk pengumpulan yang
                                memudahkan siswa serta guru dalam memantau
                                perkembangan dan memberikan umpan balik.
                            </p>
                        </div>
                        <div className="border p-5 rounded shadow">
                            <h3 className="text-xl font-semibold">
                                Pelaporan dan Analitik
                            </h3>
                            <p className="mt-2">
                                Pantau progres belajar dengan laporan dan
                                analitik yang detail. Fitur ini membantu guru
                                dan siswa untuk mengidentifikasi kekuatan,
                                kelemahan, dan area yang perlu ditingkatkan,
                                sehingga proses belajar menjadi lebih efektif.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-24 py-20 bg-content1" id="benefits">
                    <h1 className="text-3xl font-bold text-center">
                        Manfaat yang Akan Kamu Dapatkan
                    </h1>
                    <div className="p-12 pb-0 text-center text-xl space-y-2">
                        <p>Pembelajaran interaktif dan fleksibel.</p>
                        <p>
                            Mengembangkan keterampilan dan pemahaman lebih
                            mendalam.
                        </p>
                        <p>Pemantauan progres belajar secara real-time.</p>
                    </div>
                </div>

                {/* Call to Action Section */}
                <div className="py-36" id="cta">
                    <div className="text-center max-w-2xl mx-auto">
                        <h2 className="text-4xl font-bold">
                            Siap untuk Mulai Belajar dengan BrightPath?
                        </h2>
                        <p className="mt-4 text-lg text-foreground">
                            Bergabunglah dengan ribuan siswa lainnya yang telah
                            merasakan manfaat dari pembelajaran interaktif dan
                            fleksibel. Daftar sekarang dan tingkatkan
                            keterampilanmu!
                        </p>
                        <div className="mt-8 space-x-4">
                            <Button
                                as={Link}
                                href={route("register")}
                                color="warning"
                                variant="solid"
                                className="text-lg font-semibold"
                            >
                                Daftar Sekarang
                            </Button>
                            <Button
                                as={Link}
                                href={route("login")}
                                color="warning"
                                variant="flat"
                                className="text-lg font-semibold"
                            >
                                Masuk
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Footer Section */}
                <footer className="bg-gray-900 text-gray-200 py-12">
                    <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                            <h3 className="text-xl font-bold mb-4">
                                Tentang BrightPath
                            </h3>
                            <p className="text-gray-400">
                                BrightPath adalah platform pembelajaran terpadu
                                yang memberikan kemudahan bagi guru dan siswa
                                dalam mengelola proses belajar secara efektif,
                                interaktif, dan menyenangkan.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-4">Navigasi</h3>
                            <ul className="space-y-2 text-gray-400">
                                <li>
                                    <Link href="#" color="foreground">
                                        Tentang Kami
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" color="foreground">
                                        Fitur
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" color="foreground">
                                        FAQ
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" color="foreground">
                                        Kebijakan Privasi
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-4">
                                Hubungi Kami
                            </h3>
                            <p className="text-gray-400">
                                Email: support@brightpath.com
                            </p>
                            <p className="text-gray-400">
                                Telepon: 123-456-7890
                            </p>
                            <div className="mt-4 flex space-x-4">
                                <Link href="#">
                                    <i className="fab fa-facebook fa-lg text-gray-400 hover:text-amber-500"></i>
                                </Link>
                                <Link href="#">
                                    <i className="fab fa-twitter fa-lg text-gray-400 hover:text-amber-500"></i>
                                </Link>
                                <Link href="#">
                                    <i className="fab fa-instagram fa-lg text-gray-400 hover:text-amber-500"></i>
                                </Link>
                                <Link href="#">
                                    <i className="fab fa-linkedin fa-lg text-gray-400 hover:text-amber-500"></i>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <Divider className="my-8" />
                    <p className="text-center text-gray-500">
                        © 2024 BrightPath. All rights reserved.
                    </p>
                </footer>
            </main>
        </>
    );
}
