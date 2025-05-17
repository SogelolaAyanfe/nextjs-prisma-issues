'use client'

import {
    BookmarkIcon,
    HomeIcon,
    MapIcon,
    ShoppingCartIcon,
    UserCircleIcon,
} from '@heroicons/react/20/solid'
import {
    Sidebar,
    SidebarBody,
    SidebarFooter,
    SidebarHeader,
    SidebarItem,
    SidebarLabel,
    SidebarSection,
} from 'components/sidebar'
import { SidebarLayout } from 'components/sidebar-layout'

const AppSidebar = () => {
    return (
        <Sidebar>
            <SidebarHeader>
                <SidebarSection>
                    <SidebarItem href="/">
                        <SidebarLabel>App</SidebarLabel>
                    </SidebarItem>
                </SidebarSection>
            </SidebarHeader>
            <SidebarBody>
                <SidebarSection>
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
        <SidebarLayout
            sidebar={<AppSidebar />}
            navbar={<div className="text-lg font-semibold">My App</div>}
        >
            <main>{children}</main>
        </SidebarLayout>
    )
}
