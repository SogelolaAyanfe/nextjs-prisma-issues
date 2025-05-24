type Currency = 'NGN'
type FormatNotation = 'compact' | 'full'
type FormatOptions = {
    notation?: FormatNotation
    minimumFractionDigits?: number
    maximumFractionDigits?: number
}

const NOTATION_TO_LOCALE_NOTATION = {
    compact: 'compact',
    full: 'standard',
} as const

export const format = (
    amount: number,
    currency: Currency = 'NGN',
    opt?: FormatOptions,
) => {
    const notation = opt?.notation ?? 'full'
    return amount
        .toLocaleString('en-GB', {
            style: 'currency',
            currency,
            minimumFractionDigits: opt?.minimumFractionDigits ?? 2,
            maximumFractionDigits: opt?.maximumFractionDigits ?? 2,
            notation: NOTATION_TO_LOCALE_NOTATION[notation],
            currencyDisplay: 'narrowSymbol',
        })
        .replace(/\.0+$/, '')
}

