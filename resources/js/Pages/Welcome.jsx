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

export default function Welcome({ auth, laravelVersion, phpVersion }) {
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
                                BrightPath
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
                                    color="primary"
                                    variant="solid"
                                    href={route("dashboard")}
                                >
                                    Dashboard
                                </Button>
                            </NavbarItem>
                        ) : (
                            <>
                                <NavbarItem className="hidden lg:flex">
                                    <Link
                                        href={route("login")}
                                        color="foreground"
                                    >
                                        Login
                                    </Link>
                                </NavbarItem>
                                <NavbarItem>
                                    <Button
                                        as={Link}
                                        color="primary"
                                        href={route("register")}
                                        variant="solid"
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
            </main>

            {/* <nav className="-mx-3 flex flex-1 justify-end">
                {auth.user ? (
                    <Link
                        href={route("dashboard")}
                        className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                    >
                        Dashboard
                    </Link>
                ) : (
                    <>
                        <Link
                            href={route("login")}
                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                        >
                            Log in
                        </Link>
                        <Link
                            href={route("register")}
                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                        >
                            Register
                        </Link>
                    </>
                )}
            </nav> */}
        </>
    );
}
