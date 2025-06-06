'use client'

import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import { Button } from 'components/button'
import { Field, Fieldset, Label } from 'components/fieldset'
import { Input, InputGroup } from 'components/input'
import { Popover, PopoverPanel } from 'components/popover'
import { Select } from 'components/select'
import { Text } from 'components/text'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { routes } from 'routes'

type SearchProps = {
    className?: string
}

const LOCATION_OPTIONS = [
    {
        id: '0',
        name: 'All Locations',
        value: '',
    },
    {
        id: '1',
        name: 'Nairobi',
        value: 'nairobi',
    },
    {
        id: '2',
        name: 'Mombasa',
        value: 'mombasa',
    },
]

const SelectLocation = ({
    value,
    onChange,
}: {
    value: string
    onChange: (value: string) => void
}) => {
    return (
        <Fieldset>
            <Label>Location</Label>
            <Select
                className="!mt-2"
                value={value}
                onChange={e => onChange(e.target.value)}
            >
                {LOCATION_OPTIONS.map(location => (
                    <option
                        key={`location-selector-${location.id}`}
                        value={location.value}
                    >
                        {location.name}
                    </option>
                ))}
            </Select>
        </Fieldset>
    )
}

export function Search({ className }: SearchProps) {
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedLocation, setSelectedLocation] = useState('')
    const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({
        min: 0,
        max: 1000,
    })
    const [isOpen, setIsOpen] = useState(false)

    const router = useRouter()

    const handleFocus = () => {
        setIsOpen(true)
    }

    const handleBlur = (e: React.FocusEvent) => {
        // Check if the new focus target is within the dropdown container
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
            setIsOpen(false)
        }
    }

    const handleSearch = () => {
        router.push(
            routes.search({
                params: {
                    q: searchQuery || undefined,
                    location: selectedLocation || undefined,
                    minPrice: priceRange.min || undefined,
                    maxPrice: priceRange.max || undefined,
                },
            }),
        )
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch()
        }
    }

    const clearFilters = () => {
        setSelectedLocation('')
        setPriceRange({ min: 0, max: 1000 })
    }

    return (
        <div className={clsx('relative', className)}>
            <Popover onBlur={handleBlur}>
                <div className="flex items-center" onClick={() => setIsOpen(true)}>
                    <InputGroup className="flex-1">
                        <MagnifyingGlassIcon data-slot="icon" />
                        <Input
                            type="text"
                            placeholder="Search items"
                            value={searchQuery}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setSearchQuery(e.target.value)
                            }
                            onKeyDown={handleKeyDown}
                            onFocus={handleFocus}
                            className="rounded-full border-0 bg-transparent"
                        />
                    </InputGroup>
                    <Button
                        color="blue"
                        onFocus={handleFocus}
                        onClick={handleSearch}
                        className="ml-2 rounded-full px-4 py-2"
                    >
                        <MagnifyingGlassIcon className="h-4 w-4" />
                    </Button>
                </div>

                <PopoverPanel
                    static={isOpen}
                    className="absolute top-full left-[50%] mt-2 w-[600px] max-w-[90vw] translate-x-[-50%] rounded-lg bg-white p-6 shadow-lg dark:bg-zinc-900"
                    onBlur={handleBlur}
                >
                    {/* Filters Section */}
                    <div className="mb-4">
                        <div className="flex items-center justify-between">
                            <Text className="text-sm font-medium text-zinc-950 dark:text-white">
                                Filters
                            </Text>
                            {(selectedLocation ||
                                priceRange.min > 0 ||
                                priceRange.max < 1000) && (
                                <button
                                    onClick={clearFilters}
                                    className="flex items-center text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                                >
                                    <XMarkIcon className="mr-1 h-4 w-4" />
                                    Clear
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="mb-6">
                        <div className="space-y-6">
                            {/* Location Filter */}
                            <SelectLocation
                                value={selectedLocation}
                                onChange={setSelectedLocation}
                            />

                            {/* Price Range Filter */}
                            <Field>
                                <Label>Price Range</Label>
                                <div className="flex items-center space-x-2">
                                    <Input
                                        type="number"
                                        placeholder="Min"
                                        value={priceRange.min.toString()}
                                        onChange={(
                                            e: React.ChangeEvent<HTMLInputElement>,
                                        ) =>
                                            setPriceRange(prev => ({
                                                ...prev,
                                                min: parseInt(e.target.value) || 0,
                                            }))
                                        }
                                    />
                                    <span className="text-zinc-400 dark:text-zinc-500">
                                        -
                                    </span>
                                    <Input
                                        type="number"
                                        placeholder="Max"
                                        value={priceRange.max.toString()}
                                        onChange={(
                                            e: React.ChangeEvent<HTMLInputElement>,
                                        ) =>
                                            setPriceRange(prev => ({
                                                ...prev,
                                                max: parseInt(e.target.value) || 1000,
                                            }))
                                        }
                                    />
                                </div>
                            </Field>
                        </div>
                    </div>
                </PopoverPanel>
            </Popover>
        </div>
    )
}
