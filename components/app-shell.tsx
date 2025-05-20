'use client'

import {
    BookmarkIcon,
    HomeIcon,
    MapIcon,
    ShoppingCartIcon,
    UserCircleIcon,
} from '@heroicons/react/20/solid'
import { Input } from 'components/input'
import { Navbar, NavbarItem, NavbarLabel, NavbarSection } from 'components/navbar'
import {
    Sidebar,
    SidebarBody,
    SidebarFooter,
    SidebarHeader,
    SidebarItem,
    SidebarLabel,
    SidebarSection,
} from 'components/sidebar'

const AppSidebar = () => {
    return (
        <Sidebar className="space-y-3 pt-5">
            <SidebarHeader className="border-none">
                <SidebarSection>
                    <SidebarItem href="/">
                        <SidebarLabel>App Logo</SidebarLabel>
                    </SidebarItem>
                </SidebarSection>
            </SidebarHeader>
            <SidebarBody>
                <SidebarSection className="space-y-5">
                    <SidebarItem href="/">
                        <HomeIcon data-slot="icon" />
                        <SidebarLabel>Home</SidebarLabel>
                    </SidebarItem>
                    <SidebarItem href="/explore">
                        <MapIcon data-slot="icon" />
                        <SidebarLabel>Explore</SidebarLabel>
                    </SidebarItem>
                    <SidebarItem href="/saved">
                        <BookmarkIcon data-slot="icon" />
                        <SidebarLabel>Saved</SidebarLabel>
                    </SidebarItem>
                    <SidebarItem href="/cart">
                        <ShoppingCartIcon data-slot="icon" />
                        <SidebarLabel>Cart</SidebarLabel>
                    </SidebarItem>
                </SidebarSection>
            </SidebarBody>
            <SidebarFooter>
                <SidebarSection>
                    <SidebarItem href="/profile">
                        <UserCircleIcon data-slot="icon" />
                        <SidebarLabel>Profile</SidebarLabel>
                    </SidebarItem>
                </SidebarSection>
            </SidebarFooter>
        </Sidebar>
    )
}

export function AppShell({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative isolate flex min-h-svh w-full flex-col bg-white max-lg:flex-col lg:bg-zinc-100 dark:bg-zinc-900 dark:lg:bg-zinc-950">
            {/* Navbar */}
            <header className="sticky top-0 z-30 w-full bg-white shadow-sm ring-1 ring-zinc-950/5 dark:bg-zinc-900 dark:ring-white/10">
                <Navbar className="mx-auto max-w-7xl">
                    <NavbarSection className="flex-1">
                        <NavbarItem href="/">
                            <NavbarLabel>App Logo</NavbarLabel>
                        </NavbarItem>
                    </NavbarSection>
                    <div className="flex-3 flex justify-center">
                        <Input placeholder="Search" type="search" className="!w-96" />
                    </div>
                    <NavbarSection className="space-x-2 flex-1">
                        <NavbarItem href="/home">
                            <HomeIcon data-slot="icon" />
                        </NavbarItem>
                        <NavbarItem href="/explore">
                            <MapIcon data-slot="icon" />
                        </NavbarItem>
                        <NavbarItem href="/saved">
                            <BookmarkIcon data-slot="icon" />
                        </NavbarItem>
                        <NavbarItem href="/cart">
                            <ShoppingCartIcon data-slot="icon" />
                        </NavbarItem>
                    </NavbarSection>
                </Navbar>
            </header>

            {/* Content */}
            <main className="flex flex-1 flex-col">
                <div className="grow p-6 lg:bg-white lg:p-10 lg:shadow-xs lg:ring-1 lg:ring-zinc-950/5 dark:lg:bg-zinc-900 dark:lg:ring-white/10">
                    <div className="mx-auto max-w-7xl">{children}</div>
                </div>
            </main>
        </div>
    )
}
