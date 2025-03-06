import { Effect } from 'effect'

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

// Generic repository type
export type GenericRepository<TEntity, TWhereInput, TError extends Error> = {
    // Select a single entity by ID
    select: (id: string) => Effect.Effect<TEntity, TError>

    // Select many entities with optional filtering and field selection
    selectMany: <T extends FindManyArgs<TEntity, TWhereInput>>(
        args: T,
    ) => Effect.Effect<
        T['select'] extends object
            ? Array<
                  Pick<
                      TEntity & RepoWithMany,
                      Extract<
                          keyof NonNullable<T['select']>,
                          keyof (TEntity & RepoWithMany)
                      >
                  >
              >
            : Array<TEntity>,
        TError
    >

    // Delete an entity by ID
    delete: (id: string) => Effect.Effect<TEntity, TError>

    // Update an entity by ID
    update: (id: string, data: Partial<TEntity>) => Effect.Effect<TEntity, TError>

    // Update many entities matching a filter
    updateMany: (
        where: TWhereInput,
        data: Partial<TEntity>,
    ) => Effect.Effect<number, TError>

    // Create a new entity
    create: (
        data: Omit<TEntity, 'id' | 'createdAt' | 'updatedAt'>,
    ) => Effect.Effect<TEntity, TError>

    // Create many entities
    createMany: (
        data: Omit<TEntity, 'id' | 'createdAt' | 'updatedAt'>[],
    ) => Effect.Effect<number, TError>

    // Count entities matching a filter
    count: (where?: TWhereInput) => Effect.Effect<number, TError>
}
