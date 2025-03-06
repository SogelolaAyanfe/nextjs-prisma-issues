// Type for counting related fields
export type RepoWithMany = {
    _count: number
}

// Generic find many arguments type
export type FindManyArgs<TEntity, TWhereInput> = {
    where?: TWhereInput
    select?: {
        [K in keyof TEntity]?: boolean
    }
}

export type FindResult<TEntity, TSelect> = TSelect extends object
    ? Pick<TEntity, Extract<keyof NonNullable<TSelect>, keyof TEntity>>
    : TEntity
