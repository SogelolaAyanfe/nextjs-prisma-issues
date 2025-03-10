import {
    ArrowRightStartOnRectangleIcon,
    ChevronDownIcon,
    ChevronUpIcon,
    Cog8ToothIcon,
    LightBulbIcon,
    PlusIcon,
    ShieldCheckIcon,
    UserIcon,
} from '@heroicons/react/16/solid'
import { HomeIcon, QuestionMarkCircleIcon } from '@heroicons/react/20/solid'
import { Avatar } from 'components/avatar'
import {
    Dropdown,
    DropdownButton,
    DropdownDivider,
    DropdownItem,
    DropdownLabel,
    DropdownMenu,
} from 'components/dropdown'
import { Navbar, NavbarItem, NavbarSection, NavbarSpacer } from 'components/navbar'
import { ProtectedRoute } from 'components/protected-route'
import {
    Sidebar,
    SidebarBody,
    SidebarFooter,
    SidebarHeader,
    SidebarHeading,
    SidebarItem,
    SidebarLabel,
    SidebarSection,
    SidebarSpacer,
} from 'components/sidebar'
import { SidebarLayout } from 'components/sidebar-layout'
import { routes } from 'routes'

const sidebarMainMenu = [
    {
        label: 'Dashboard',
        href: routes.dashboard,
        icon: HomeIcon,
    },
]

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <ProtectedRoute>
            <SidebarLayout
                navbar={
                    <Navbar>
                        <NavbarSpacer />
                        <NavbarSection>
                            <Dropdown>
                                <DropdownButton as={NavbarItem}>
                                    <Avatar src="/profile-photo.jpg" square />
                                </DropdownButton>
                                <DropdownMenu className="min-w-64" anchor="bottom end">
                                    <DropdownItem href="/my-profile">
                                        <UserIcon />
                                        <DropdownLabel>My profile</DropdownLabel>
                                    </DropdownItem>
                                    <DropdownItem href="/settings">
                                        <Cog8ToothIcon />
                                        <DropdownLabel>Settings</DropdownLabel>
                                    </DropdownItem>
                                    <DropdownDivider />
                                    <DropdownItem href="/privacy-policy">
                                        <ShieldCheckIcon />
                                        <DropdownLabel>Privacy policy</DropdownLabel>
                                    </DropdownItem>
                                    <DropdownItem href="/share-feedback">
                                        <LightBulbIcon />
                                        <DropdownLabel>Share feedback</DropdownLabel>
                                    </DropdownItem>
                                    <DropdownDivider />
                                    <DropdownItem href="/logout">
                                        <ArrowRightStartOnRectangleIcon />
                                        <DropdownLabel>Sign out</DropdownLabel>
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </NavbarSection>
                    </Navbar>
                }
                sidebar={
                    <Sidebar>
                        <SidebarHeader>
                            <Dropdown>
                                <DropdownButton as={SidebarItem} className="lg:mb-2.5">
                                    <Avatar src="/tailwind-logo.svg" />
                                    {/* vendor name */}
                                    <SidebarLabel>Tailwind Labs</SidebarLabel>
                                    <ChevronDownIcon />
                                </DropdownButton>
                                <DropdownMenu
                                    className="min-w-80 lg:min-w-64"
                                    anchor="bottom start"
                                >
                                    <DropdownItem href="/teams/1/settings">
                                        <Cog8ToothIcon />
                                        <DropdownLabel>Settings</DropdownLabel>
                                    </DropdownItem>
                                    <DropdownDivider />
                                    <DropdownItem href="/teams/1">
                                        <Avatar slot="icon" src="/tailwind-logo.svg" />
                                        <DropdownLabel>Tailwind Labs</DropdownLabel>
                                    </DropdownItem>
                                    <DropdownItem href="/teams/2">
                                        <Avatar
                                            slot="icon"
                                            initials="WC"
                                            className="bg-purple-500 text-white"
                                        />
                                        <DropdownLabel>Workcation</DropdownLabel>
                                    </DropdownItem>
                                    <DropdownDivider />
                                    <DropdownItem href="/teams/create">
                                        <PlusIcon />
                                        <DropdownLabel>New team&hellip;</DropdownLabel>
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                            {/* <SidebarSection className="max-lg:hidden">
                            <SidebarItem href="/search">
                                <MagnifyingGlassIcon />
                                <SidebarLabel>Search</SidebarLabel>
                            </SidebarItem>
                            <SidebarItem href="/inbox">
                                <InboxIcon />
                                <SidebarLabel>Inbox</SidebarLabel>
                            </SidebarItem>
                        </SidebarSection> */}
                        </SidebarHeader>
                        <SidebarBody>
                            <SidebarSection>
                                {sidebarMainMenu.map(item => (
                                    <SidebarItem key={item.href} href={item.href}>
                                        <item.icon />
                                        <SidebarLabel>{item.label}</SidebarLabel>
                                    </SidebarItem>
                                ))}
                            </SidebarSection>
                            <SidebarSection className="max-lg:hidden">
                                <SidebarHeading>Apps</SidebarHeading>
                                <SidebarItem href="/events/2">
                                    Inventory Alerts
                                </SidebarItem>
                            </SidebarSection>
                            <SidebarSpacer />
                            <SidebarSection>
                                <SidebarItem href="/support">
                                    <QuestionMarkCircleIcon />
                                    <SidebarLabel>Support</SidebarLabel>
                                </SidebarItem>
                            </SidebarSection>
                        </SidebarBody>
                        <SidebarFooter className="max-lg:hidden">
                            <Dropdown>
                                <DropdownButton as={SidebarItem}>
                                    <span className="flex min-w-0 items-center gap-3">
                                        <Avatar
                                            src="/profile-photo.jpg"
                                            className="size-10"
                                            square
                                            alt=""
                                        />
                                        <span className="min-w-0">
                                            <span className="block truncate text-sm/5 font-medium text-zinc-950 dark:text-white">
                                                Erica
                                            </span>
                                            <span className="block truncate text-xs/5 font-normal text-zinc-500 dark:text-zinc-400">
                                                erica@example.com
                                            </span>
                                        </span>
                                    </span>
                                    <ChevronUpIcon />
                                </DropdownButton>
                                <DropdownMenu className="min-w-64" anchor="top start">
                                    <DropdownItem href="/my-profile">
                                        <UserIcon />
                                        <DropdownLabel>My profile</DropdownLabel>
                                    </DropdownItem>
                                    <DropdownItem href="/settings">
                                        <Cog8ToothIcon />
                                        <DropdownLabel>Settings</DropdownLabel>
                                    </DropdownItem>
                                    <DropdownDivider />
                                    <DropdownItem href="/privacy-policy">
                                        <ShieldCheckIcon />
                                        <DropdownLabel>Privacy policy</DropdownLabel>
                                    </DropdownItem>
                                    <DropdownItem href="/share-feedback">
                                        <LightBulbIcon />
                                        <DropdownLabel>Share feedback</DropdownLabel>
                                    </DropdownItem>
                                    <DropdownDivider />
                                    <DropdownItem href="/logout">
                                        <ArrowRightStartOnRectangleIcon />
                                        <DropdownLabel>Sign out</DropdownLabel>
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </SidebarFooter>
                    </Sidebar>
                }
            >
                <main className="flex h-full w-full flex-col">{children}</main>
            </SidebarLayout>
        </ProtectedRoute>
    )
}
