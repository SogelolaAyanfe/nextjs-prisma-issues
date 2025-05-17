# [Title] - Key Commands and Conventions

## Table of Contents

- [Your Role](#your-role)
- [Local Documentation](#local-documentation)
- [Naming Conventions](#naming-conventions)
- [Basic Script Example](#basic-script-example)
- [Running Tests](#running-tests)
- [Rules to Create Tests](#rules-to-create-tests)
- [Build and Test Commands](#build-and-test-commands)
- [Code Style](#code-style)
- [Inner/Outer Component Pattern for React Components](#innerouter-component-pattern-for-react-components)
- [Notes on Writing Code](#notes-on-writing-code)
- [Effect-TS (library) Specific Code Rules](#effect-ts-library-specific-code-rules)
- [Basic Effect.ts Module Structure](#basic-effectts-module-structure)
- [Parsing and Validating JSON](#parsing-and-validating-json)
- [Working with the Database](#working-with-the-database)

## Your role

You work for a multi-vendor marketplace platform. The platform enables multiple vendors to list and sell their products or services through a unified interface. The company is committed to creating a seamless experience for both vendors and customers, with a strong focus on scalability, user experience, and technological innovation.

## Local documentation

There is some local documentation available, use it when in doubt:

- `llm/documentation/effect` - Effect documentation
- `llm/documentation/effect/overview.md` - General description of the main concepts of Effect and links to detailed documentation
- `llm/documentation/effect/docs.md` - This is the abridged developer documentation for Effect
- `llm/documentation/effect/docs-full.md` - Full Effect documentation

This could be not the most recent documentation, alert immediately in caps lock if you think it's outdated.

## Naming Conventions

- Files that contain evals for ai pieces should end with `.eval.ts`
- Scripts should end with `.script.ts`
- Unit tests should end with `.test.ts` for Jest
- Integration tests should end with `.integration.test.ts`
- Storybook files should end with `.stories.tsx`

## Basic Script example

We use scripts as a way to quickly test small pieces of code.
(Not to be confused with files in the `scripts` folder, which are used for other tasks.)

```ts
// basic.script.ts
import { Effect } from 'effect'
import { createCli } from 'lib/cli'

const program = Effect.log('Very basic script')

createCli(program)
```

To run the script, use `npx tsx basic.script.ts`

## Running tests

- `npx vitest run *test-file*` to run a single test file with `.vitest.test.ts` extension
- `npx jest *test-file*` to run a single test file with `.test.ts` or `.integration.test.ts` extension

## Rules to create tests

- If we want to test a function in file `x.ts`, create a file `x.vitest.test.ts`

## Build and Test Commands

- `npm run dev` - Start the development server
- `npm run lint` - Run ESLint
- `npm run ts-lint` - Run TypeScript type checking
- `npm run test` - Run all tests (`*.test.ts` files for Jest and `*.vitest.test.ts` files for Vitest)
- `npm run test-specific-module 'ModuleName'` - Run specific test module
- `npm run prettier-check` - Check formatting
- `npm run prettier-reformat` - Fix formatting

## Code Style

- **Imports**: Ordered by: React, Tailwind, Next, third party, project modules
- **Formatting**: 90 char width, 4 spaces, single quotes, no semicolons
- **Naming**: PascalCase for components, camelCase for functions/variables
- **React Components**: Use functional components with TypeScript interfaces
- **No relative imports**: Always use absolute imports (enforced by ESLint)
- **Type Safety**: Prefer Zod for runtime validation, TypeScript for static types
- **Error Handling**: Always provide meaningful error messages and specific error classes
- **Interface design**: Use "noun-first" or "property-style" convention for interface functions 
    e.g., just `foo` (rather than `getFoo`), or just `bars` (rather than `listBars`)

## Inner/Outer Component Pattern for React Components

This codebase follows a consistent pattern of separating components into "inner" and "outer" versions to enhance testability, reusability, and separation of concerns.

### Pattern Overview

- **Outer Component**: Handles data fetching, state management, and data interactions
  - Fetches data using TRPC hooks OR consumes data from context providers
  - Manages loading/error states
  - Passes fetched data to the inner component

- **Inner Component**: Purely presentational
  - Receives data via props
  - Handles rendering based on different states (loading, error, success)
  - Has no knowledge of API, context providers, or data sources
  - Can be easily tested in isolation through Storybook

### Example Implementation

```tsx
// UserKYCStatusInner.tsx - Presentational component
export const UserKYCStatusInner = ({ 
    kycStatus, 
    isLoading 
}: { 
    kycStatus?: 'PENDING' | 'COMPLETE',
    isLoading: boolean
}) => {
    if (isLoading) {
        return <Skeleton height="24px" width="100px" />
    }
    
    return (
        <Flex alignItems="center">
            <Icon
                as={kycStatus === 'COMPLETE' ? Check : X}
                color={kycStatus === 'COMPLETE' ? 'green.default' : 'orange.100'}
            />
            <Text>{kycStatus === 'COMPLETE' ? 'Completed' : 'Pending'}</Text>
        </Flex>
    )
}

// Example with API data fetching
export const UserKYCStatus = ({ userId }: { userId: string }) => {
    const { data, isLoading } = trpc.someEndpoint.useQuery({ userId })
    
    return <UserKYCStatusInner kycStatus={data?.status} isLoading={isLoading} />
}

// Alternative example with context provider
export const UserKYCStatusFromContext = () => {
    const { userData, isLoading } = useUserContext()
    
    return <UserKYCStatusInner kycStatus={userData?.kycStatus} isLoading={isLoading} />
}
```

### When to Use This Pattern

- When components need to fetch data from API endpoints or context providers
- When components have complex loading/error states
- When you want to create Storybook stories without mocking API calls or contexts
- For components that might be reused with different data sources
- When building complex UIs where the same presentation might need different data sources

## Notes on writing code

- Only add comments when you think that adding clarification would be necessary for other developers to understand the code
- When updating existing code, check if there are error messages that need to be updated as well
- Prefer clear naming conventions to enhance code readability
- Always add meaningful annotations and spans
- Ensure proper error handling practices throughout the codebase
- Do not hand-write database migrations, use Prisma (`npx prisma migrate dev` after the `*.prisma` file is created/updated)
- Always add empty lines at the end of files
- When designing an interface function that returns an array, consider using pagination. There are pagination types and helpers in `lib/pagination.ts`

## Effect-TS (library) specific code rules

- Do not use `Effect.fail` to wrap instances of error classes that extend `EffectError`; yield* directly (e.g., `yield* new FinancialReportProviderError(...)`)
- When using `Effect.all` always set `{ concurrency: 'inherit' }` as the second argument

## Basic Effect.ts module structure

- **interface.ts**: Defines service contracts and Context.Tag
- **main.ts**: Main layer that implements interface using Effect.Layer pattern
- **error.ts**: Module-specific error classes (usually just a single class per module e.g. `InvoiceManager` would use `InvoiceManagerError`)
- **live.ts**: Live layer that provides all dependencies to the main layer
- **index.ts**: Exports interface and live layer and entities
- **entities folder**: Contains all entities for the module
- **entities/entity.ts**: Entity schema and type
- **entities/index.ts**: Exports all entities

```typescript
import { Context, Effect, Layer } from 'effect'
import { Config } from 'server/generic/config/interface'
import { ConfigLayerLive } from 'server/generic/config/live'
import { EffectError } from 'lib/effect/error'

import { z } from 'zod'

// entities/financial-report.ts
export const FinancialReportSchema = z.object({
    date: z.date(),
    companyId: z.string(),
    // ... other entities fields ...
})
export type FinancialReport = z.infer<typeof FinancialReportSchema>

// entities/index.ts
export * from '<project path to module>/entities/financial-report'

// error.ts
export class FinancialReportProviderError extends EffectError(
    'FinancialReportProviderError',
) {}

// interface.ts
type FinancialReportProvider = {
    reports: (args: { companyId: string; date?: Date }) => Effect.Effect<
        FinancialReport[],
        FinancialReportProviderError
    >
}

export const FinancialReportProvider = Context.GenericTag<FinancialReportProvider>(
    'financial-report-provider',
)

// main.ts
export const FinancialReportProviderLayer = Layer.effect(
    FinancialReportProvider,
    Effect.gen(function* () {
        // this is how you can yield* a Context.Tag
        const config = yield* Config

        const reports: FinancialReportProvider['reports'] = ({
            companyId,
        }) =>
            Effect.gen(function* () {
                // always add meaningful annotations
                yield* Effect.annotateCurrentSpan({
                    companyId,
                })

                yield* Effect.logDebug(`Env: ${config.environment}`)

                return []
            }).pipe(
                // always add meaningful spans
                Effect.withSpan('FinancialReportProvider.reports'),
                // always add meaningful error handling
                Effect.catchAll(
                    error =>
                        new FinancialReportProviderError({
                            error,
                            message: `Failed to get reports`,
                        }),
                ),
            )

        return {
            reports,
        }
    }),
)

// live.ts
// live layer is a layer that has all dependencies (that we yield in main.ts) provided
export const FinancialReportProviderLayerLive = FinancialReportProviderLayer.pipe(
    Layer.provide(ConfigLayerLive),
)
```

## Parsing and validating JSON

### If inside an Effect

```typescript
import { parseWithSchema } from 'lib/zod'

yield* parseWithSchema(z.object({
    name: z.string(),
    age: z.number(),
}), '{"name": "John", "age": 30}') 
```

### If outside an Effect

You can use zod directly to parse and validate JSON


## Working with the database

You can read all the database schema files, that are `*.prisma` files throughout the `modules` directory. These describe the entities as they are stored in the PostgreSQL database.
