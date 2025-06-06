'use client'

import { HeartIcon, MapIcon, ShoppingCartIcon } from '@heroicons/react/20/solid'
import { Navbar, NavbarItem, NavbarLabel, NavbarSection } from 'components/navbar'
import { Search } from 'components/search'

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
                    <NavbarItem href="/explore">
                        <MapIcon data-slot="icon" />
                    </NavbarItem>
                    <NavbarItem href="/saved">
                        <HeartIcon data-slot="icon" />
                    </NavbarItem>
                    <NavbarItem href="/cart">
                        <ShoppingCartIcon data-slot="icon" />
                    </NavbarItem>
                </NavbarSection>
            </Navbar>
        </header>
    )
}
