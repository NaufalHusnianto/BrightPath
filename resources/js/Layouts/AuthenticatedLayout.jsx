import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link, usePage } from "@inertiajs/react";
import { Avatar } from "@nextui-org/react";
import { useState } from "react";
import { useDarkMode } from "./DarkModeProvider";
import ButtonDarkMode from "@/Components/ButtonDarkMode";

export default function Authenticated({ header, children }) {
    const user = usePage().props.auth.user;
    const { isDarkMode, toggleDarkMode } = useDarkMode();

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="min-h-screen">
            <nav className="border-b border-default">
                <div className="mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex">
                            <div className="flex shrink-0 items-center">
                                <Link href="/dashboard">
                                    <h1 className="text-2xl font-bold">
                                        Bright
                                        <span className="text-amber-500">
                                            Path
                                        </span>
                                    </h1>
                                </Link>
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink
                                    href={route("dashboard")}
                                    active={route().current("dashboard")}
                                >
                                    MyClassroom
                                </NavLink>
                                <NavLink
                                    href={route("tasks")}
                                    active={route().current("tasks")}
                                >
                                    MyTask
                                </NavLink>
                                <NavLink
                                    href={route("brighty")}
                                    active={route().current("brighty")}
                                >
                                    Ask Brighty
                                </NavLink>
                            </div>
                        </div>

                        <div className="hidden sm:ms-6 sm:flex sm:items-center">
                            <ButtonDarkMode />
                            <div className="relative ms-3">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center rounded-md border border-transparent px-3 py-2 text-sm font-medium leading-4 transition duration-150 ease-in-out hover:text-amber-500 focus:outline-none gap-3"
                                            >
                                                {user.name}

                                                {user.photo_profile ? (
                                                    <Avatar
                                                        src={`http://192.168.43.49:8000/storage/${user.photo_profile}`}
                                                        isBordered
                                                    />
                                                ) : (
                                                    <Avatar
                                                        name={user.name}
                                                        isBordered
                                                        className="text-amber-500"
                                                    />
                                                )}
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link
                                            href={route("profile.edit")}
                                        >
                                            Profile
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route("logout")}
                                            method="post"
                                            as="button"
                                        >
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <ButtonDarkMode />
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState
                                    )
                                }
                                className="inline-flex items-center justify-center rounded-md p-2 transition duration-150 ease-in-out hover:bg-amber-500 hover:text-background focus:bg-amber-500 focus:text-background focus:outline-none"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    className={
                        (showingNavigationDropdown ? "block" : "hidden") +
                        " sm:hidden"
                    }
                >
                    <div className="space-y-1 pb-3 pt-2">
                        <ResponsiveNavLink
                            href={route("dashboard")}
                            active={route().current("dashboard")}
                        >
                            My Classrooms
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href={route("tasks")}
                            active={route().current("tasks")}
                        >
                            My Tasks
                        </ResponsiveNavLink>
                    </div>

                    <div className="border-t border-b border-foreground-300 pb-1 pt-4">
                        <div className="px-4">
                            <div className="text-base font-medium text-foreground-800">
                                {user.name}
                            </div>
                            <div className="text-sm font-medium text-amber-500">
                                {user.email}
                            </div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink
                                href={route("profile.edit")}
                                active={route().current("profile.edit")}
                            >
                                Profile
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                method="post"
                                href={route("logout")}
                                as="button"
                            >
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="shadow bg-content1">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}
