# TypeScript Migration Guide

This document guides you through setting up and using TypeScript in the Danvion project.

## Overview

TypeScript provides:

- ✅ Type safety and catching errors at compile time
- ✅ Better IDE autocomplete and intellisense
- ✅ Self-documenting code
- ✅ Easier refactoring

## Setup

TypeScript is already configured. Key files:

- `tsconfig.json` - TypeScript configuration
- `src/types/` - Type definitions
- `vitest.config.ts` - Test configuration

## Converting JavaScript to TypeScript

### Step 1: Rename File

```bash
# Before
src/components/MyComponent.jsx

# After
src/components/MyComponent.tsx
```

### Step 2: Add Types

#### Function Components

```typescript
// Before (JavaScript)
export default function Button({ onClick, children }) {
  return <button onClick={onClick}>{children}</button>;
}

// After (TypeScript)
import { ReactNode, MouseEventHandler } from "react";

interface ButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
}

export default function Button({ onClick, children }: ButtonProps) {
  return <button onClick={onClick}>{children}</button>;
}
```

#### Hooks

```typescript
// Before
const [count, setCount] = useState(0);

// After (with explicit type)
const [count, setCount] = useState<number>(0);
```

#### Props with React.FC

```typescript
// Before
function Card({ title, children }) {
  return <div>{title}{children}</div>;
}

// After
import { ReactNode, FC } from "react";

interface CardProps {
  title: string;
  children: ReactNode;
}

const Card: FC<CardProps> = ({ title, children }) => (
  <div>{title}{children}</div>
);
```

#### Redux State & Actions

```typescript
// redux/slices/productSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/types";

interface ProductState {
  items: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  items: [],
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload;
    },
  },
});

export default productSlice.reducer;
```

## Common Type Patterns

### Component Props

```typescript
interface ComponentProps {
  // Required prop
  title: string;

  // Optional prop
  description?: string;

  // Function prop
  onClick: (id: string) => void;

  // React node
  children: ReactNode;

  // HTML attributes
  className?: string;
  disabled?: boolean;
}
```

### API Responses

```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
}

const response: ApiResponse<Product[]> = {
  success: true,
  data: [],
};
```

### Event Handlers

```typescript
import { ChangeEvent, FormEvent } from "react";

const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value;
};

const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  // Submit logic
};
```

### Async Operations

```typescript
// Returning a promise
async function fetchProducts(): Promise<Product[]> {
  const response = await fetch("/api/products");
  return response.json();
}

// Using generics
const [data, setData] = useState<Product[] | null>(null);
const [error, setError] = useState<Error | null>(null);
```

## Existing Type Definitions

Located in `src/types/index.ts`:

```typescript
export interface Product { ... }
export interface Blog { ... }
export interface HomePage { ... }
export interface FormData { ... }
export interface User { ... }
export interface AdminUser { ... }
```

Use these types in your components:

```typescript
import { Product, Blog } from "@/types";

interface ProductCardProps {
  product: Product;
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  return <div>{product.name}</div>;
};
```

## Module Path Aliases

Configure in `tsconfig.json`:

```typescript
// Instead of
import { utils } from "../../../utils";

// Use
import { utils } from "@/utils";
```

Available aliases:

- `@/` - src directory
- `@components/` - src/components
- `@pages/` - src/pages
- `@redux/` - src/redux
- `@services/` - src/services
- `@utils/` - src/utils
- `@config/` - src/config
- `@types/` - src/types

## Strict Mode

TypeScript strict mode is enabled (`strict: true` in tsconfig.json):

```typescript
// ✅ Good
const user: User | null = getUser();
if (user) {
  console.log(user.name);
}

// ❌ Error - user might be null
const name = user.name;
```

## Error Handling

```typescript
import { AppErrorHandler } from "@/utils/errorHandler";

try {
  // Operation
} catch (error) {
  const appError: AppErrorHandler = handleError(error);
  console.log(appError.message);
}
```

## No Implicit Any

```typescript
// ❌ Error - parameter type is implicitly any
function greet(name) {
  return `Hello, ${name}`;
}

// ✅ Correct
function greet(name: string): string {
  return `Hello, ${name}`;
}
```

## Unused Variables

TypeScript flags unused variables:

```typescript
// ❌ Error - unused variable
const unusedVar = 42;

// ✅ Correct - either use it or prefix with _
const _unusedVar = 42;
```

## Type Assertions (Use Sparingly)

```typescript
// Type assertion (use as last resort)
const element = document.getElementById("root") as HTMLDivElement;

// Better - use type guards
const element = document.getElementById("root");
if (element instanceof HTMLDivElement) {
  // Now element is typed as HTMLDivElement
}
```

## Testing with TypeScript

```typescript
// src/components/__tests__/Button.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Button from '../Button';

describe('Button', () => {
  it('renders with text', () => {
    render(<Button onClick={() => {}}>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
});
```

## Common Errors & Solutions

### Error: Property does not exist

```typescript
// ❌ Error
const user = { name: "John" };
user.age; // Property 'age' does not exist

// ✅ Solution - add optional property to interface
interface User {
  name: string;
  age?: number;
}
```

### Error: Argument of type x is not assignable to type y

```typescript
// ❌ Error
const items: string[] = [1, 2, 3]; // Numbers not assignable to string

// ✅ Solution - use correct type
const items: number[] = [1, 2, 3];
```

### Error: null is not assignable to type

```typescript
// ❌ Error
const user: User = null;

// ✅ Solution - make type nullable
const user: User | null = null;
```

## Best Practices

1. **Define interfaces for all component props**

   ```typescript
   interface MyComponentProps {
     // props
   }
   ```

2. **Use type guards for runtime checks**

   ```typescript
   if (typeof value === "string") {
     // value is string here
   }
   ```

3. **Avoid `any` type**

   ```typescript
   // ❌ Avoid
   const data: any = fetchData();

   // ✅ Prefer
   const data: Product[] = fetchData();
   ```

4. **Use strict null checks**

   ```typescript
   // Check for null/undefined
   if (user != null) {
     console.log(user.name);
   }
   ```

5. **Leverage inference**
   ```typescript
   // TypeScript can infer the type
   const name = "John"; // type is string
   const count = 42; // type is number
   ```

## Resources

- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- [TypeScript for React Users](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes-func.html)

## Getting Help

Run type checking:

```bash
npm run type-check
```

This identifies TypeScript errors in your code.
