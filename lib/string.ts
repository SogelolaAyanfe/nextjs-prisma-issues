export const truncate = (str: string, length: number) => {
    return str.length > length ? str.slice(0, length) + '...' : str
}

export const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)

export const removeUnderscores = (str: string) => str.replace(/_/g, ' ')
