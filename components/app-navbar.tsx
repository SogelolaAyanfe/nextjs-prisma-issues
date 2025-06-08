'use client'

import { ChevronUpIcon, PlusIcon } from '@heroicons/react/16/solid'
import { HeartIcon, ShoppingCartIcon } from '@heroicons/react/20/solid'

import { Avatar } from 'components/avatar'
import {
    Dropdown,
    DropdownButton,
    DropdownDivider,
    DropdownItem,
    DropdownLabel,
    DropdownMenu,
} from 'components/dropdown'
import { Navbar, NavbarItem, NavbarLabel, NavbarSection } from 'components/navbar'
import { Search } from 'components/search'
import { SidebarItem } from 'components/sidebar'
import { routes } from 'routes'

export const AppNavbar = () => {
    return (
        <header className="sticky top-0 z-30 w-full bg-white shadow-sm ring-1 ring-zinc-950/5 dark:bg-zinc-900 dark:ring-white/10">
            <Navbar className="mx-auto max-w-7xl">
                <NavbarSection className="flex-1">
                    <NavbarItem href="/">
                        <NavbarLabel>App Logo</NavbarLabel>
                    </NavbarItem>
                </NavbarSection>
                <div className="flex flex-3 justify-center">
                    <Search className="w-96" />
                </div>
                <NavbarSection className="flex-1 justify-end space-x-2">
                    <NavbarItem href={routes.wishlist()}>
                        <HeartIcon data-slot="icon" />
                    </NavbarItem>
                    <NavbarItem href="/cart">
                        <ShoppingCartIcon data-slot="icon" />
                    </NavbarItem>
                    <div className="flex items-center gap-2">
                        <Dropdown>
                            <DropdownButton as={SidebarItem}>
                                <Avatar
                                    src="https://images.pexels.com/photos/9072338/pexels-photo-9072338.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                                    className="size-10 overflow-hidden rounded-full"
                                    alt="avatar"
                                />
                                <ChevronUpIcon />
                            </DropdownButton>
                            <DropdownMenu className="min-w-64" anchor="top start">
                                <DropdownItem href="/my-orders">
                                    <DropdownLabel>My orders</DropdownLabel>
                                </DropdownItem>
                                <DropdownItem href="/my-profile">
                                    <DropdownLabel>My profile</DropdownLabel>
                                </DropdownItem>
                                <DropdownItem href="/settings">
                                    <DropdownLabel>Settings</DropdownLabel>
                                </DropdownItem>
                                <DropdownDivider />
                                <DropdownItem href="/settings">
                                    <DropdownLabel className="flex items-center gap-2">
                                        <PlusIcon data-slot="icon" className="size-4" />{' '}
                                        Create store
                                    </DropdownLabel>
                                </DropdownItem>
                                <DropdownDivider />

                                <form className="col-span-full grid grid-cols-[auto_1fr_1.5rem_.5rem_auto]">
                                    <DropdownItem>
                                        <DropdownLabel>Sign out</DropdownLabel>
                                    </DropdownItem>
                                </form>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </NavbarSection>
            </Navbar>
        </header>
    )
}
