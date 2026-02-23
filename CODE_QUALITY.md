# Code Quality & Linting Guide

Guidelines for maintaining code quality, style consistency, and using linting tools.

## ESLint Configuration

ESLint enforces code quality rules. Configuration in `eslint.config.js`.

### Running ESLint

```bash
# Check for errors
npm run lint

# Fix auto-fixable errors
npm run lint -- --fix
```

## ESLint Rules

### Error Level (Must Fix)

These violations will cause the build to fail:

| Rule                         | Description                              | Example                                            |
| ---------------------------- | ---------------------------------------- | -------------------------------------------------- |
| `no-console`                 | Avoid console.log in production          | `console.log()` → Remove or use console.warn/error |
| `no-debugger`                | Remove debugger statements               | `debugger;` → Delete                               |
| `no-var`                     | Use let/const instead                    | `var x = 1;` → `const x = 1;`                      |
| `prefer-const`               | Use const when variable isn't reassigned | `let x = 1;` → `const x = 1;`                      |
| `no-unused-vars`             | Remove unused variables                  | `const unused = 1;` → Delete                       |
| `eqeqeq`                     | Use === instead of ==                    | `if (x == y)` → `if (x === y)`                     |
| `semi`                       | Add semicolons                           | `const x = 1` → `const x = 1;`                     |
| `quotes`                     | Use double quotes                        | `'text'` → `"text"`                                |
| `react-hooks/rules-of-hooks` | Call hooks at top level                  | Move hooks out of conditions                       |

### Warning Level (Should Fix)

These won't fail the build but should be addressed:

| Rule                           | Description               | Example                                                      |
| ------------------------------ | ------------------------- | ------------------------------------------------------------ |
| `no-console.warn`              | Allow console.warn/error  | `console.warn()` is OK                                       |
| `prefer-promise-reject-errors` | Promise.reject with Error | `Promise.reject("msg")` → `Promise.reject(new Error("msg"))` |
| `no-nested-ternary`            | Avoid nested ternaries    | Complex ternaries → Refactor to if/else                      |
| `react-hooks/exhaustive-deps`  | Dependencies complete     | Add missing dependencies to useEffect                        |

## Examples

### Auto-Fixable Issues

```javascript
// ❌ Before
var count = 0;
if (count == 1) {
  console.log("number");
}

// ✅ After (npm run lint -- --fix)
const count = 0;
if (count === 1) {
  console.warn("number");
}
```

### Common ESLint Fixes

#### Unused Variables

```javascript
// ❌ Error: 'unused' is defined but never used
const unused = 42;
const used = 10;

// ✅ Fix 1: Remove unused variable
const used = 10;

// ✅ Fix 2: Prefix with underscore if intentional
const _unused = 42;
const used = 10;
```

#### Missing useEffect Dependencies

```javascript
// ❌ Warning: Missing dependency 'data'
useEffect(() => {
  console.log(data);
}, []);

// ✅ Fix: Add to dependency array
useEffect(() => {
  console.log(data);
}, [data]);
```

#### Prefer const

```javascript
// ❌ Error: 'name' is never reassigned
let name = "John";

// ✅ Fix: Use const
const name = "John";
```

## Prettier Formatting

Prettier automatically formats code. Configuration in `.prettierrc.json`.

### Running Prettier

```bash
# Format all files
npm run prettier

# Format specific file (if script configured)
npm run prettier -- src/components/Button.jsx
```

### Configuration

Key settings in `.prettierrc.json`:

```json
{
  "semi": true, // Add semicolons
  "singleQuote": false, // Use double quotes
  "printWidth": 100, // Line length limit
  "tabWidth": 2, // Indent size
  "trailingComma": "all", // Add trailing commas
  "bracketSpacing": true, // Space in object brackets
  "arrowParens": "always" // Always wrap arrow params
}
```

### Examples

```javascript
// ❌ Before Prettier
const name = "John",
  age = 30,
  city = "NYC";
const greet = (p) => {
  console.log(p);
};
const obj = { a: 1, b: 2 };

// ✅ After Prettier
const name = "John",
  age = 30,
  city = "NYC";
const greet = (p) => {
  console.log(p);
};
const obj = { a: 1, b: 2 };
```

## TypeScript Type Checking

Check for type errors:

```bash
npm run type-check
```

### Common Type Errors

```typescript
// ❌ Error: Type 'string' is not assignable to type 'number'
const count: number = "5";

// ✅ Fix: Use correct type
const count: number = 5;

// ❌ Error: Property 'x' does not exist
const data = { a: 1, b: 2 };
data.x; // Property 'x' does not exist

// ✅ Fix: Use correct property
data.a;
```

## Workflow

### Local Development

1. Write code
2. ESLint automatically checks (IDE integration)
3. Fix errors with `npm run lint -- --fix`
4. Prettier auto-formats on save (IDE integration)
5. Type check with `npm run type-check`

### Before Committing

```bash
# Check all quality metrics
npm run lint
npm run type-check
npm run test

# Fix auto-fixable issues
npm run lint -- --fix
```

### IDE Integration

#### VS Code Setup

Install extensions:

- **ESLint** (dbaeumer.vscode-eslint)
- **Prettier** (esbenp.prettier-vscode)

Configure in `.vscode/settings.json`:

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "eslint.validate": ["javascript", "javascriptreact", "typescript", "typescriptreact"],
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

## Project-Specific Rules

### No Console in Production

```javascript
// ❌ In production code
console.log("Debug");

// ✅ Use console.warn or console.error
console.warn("Warning");
console.error("Error");

// ✅ Or dev-only logs
if (import.meta.env.DEV) {
  console.log("Debug");
}
```

### React Hook Dependencies

```javascript
// ❌ Missing dependencies
const [count, setCount] = useState(0);
useEffect(() => {
  console.log(count);
}, []); // ESLint Error

// ✅ Include dependencies
const [count, setCount] = useState(0);
useEffect(() => {
  console.log(count);
}, [count]);

// ✅ Or disable if intentional
useEffect(() => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  console.log("Mount only");
}, []);
```

### Component Export

```javascript
// ❌ React Refresh warning
export const MyComponent = () => {
  return <div>Content</div>;
};

export default function App() {
  return <MyComponent />;
}

// ✅ Only export default component
export default function App() {
  return <div>Content</div>;
}

// Or use export const for non-main components
export const MyComponent = () => {
  return <div>Content</div>;
};
```

## Disabling Rules (Use Sparingly)

### File-Wide Disable

```javascript
/* eslint-disable no-console */
console.log("debug"); // OK here
/* eslint-enable no-console */
```

### Line-Specific Disable

```javascript
// eslint-disable-next-line no-console
console.log("debug");

console.warn("OK"); // Warning level is allowed
```

### Disable Specific Rule

```javascript
// eslint-disable react-hooks/exhaustive-deps
useEffect(() => {
  // Only use if you're certain dependencies aren't needed
}, []);
```

## Best Practices

### 1. Fix Issues Promptly

```bash
# Fix all auto-fixable issues regularly
npm run lint -- --fix
```

### 2. No Build Errors

All ESLint errors must be fixed before committing code.

### 3. Type Safety

```bash
# Always run type check
npm run type-check
```

### 4. Consistent Formatting

Rely on Prettier for formatting, not manual style choices.

### 5. Meaningful Variable Names

```javascript
// ❌ Bad
const x = data.map((d) => d.p);

// ✅ Good
const prices = products.map((product) => product.price);
```

## Troubleshooting

### ESLint Not Working in VS Code

1. Install ESLint extension
2. Reload VS Code
3. Check `.eslintignore` for excluded files
4. Run `npm run lint` to verify configuration

### Conflicts Between ESLint and Prettier

The configuration should be compatible. If issues arise:

1. Check both config files
2. Ensure Prettier is not enforcing style rules
3. ESLint handles logic, Prettier handles formatting

### Type Checking Fails

```bash
# Check specific file
npm run type-check src/components/Button.tsx

# View full error details
npm run type-check -- --noEmit
```

## Resources

- [ESLint Documentation](https://eslint.org/docs/)
- [Prettier Documentation](https://prettier.io/docs/)
- [React Hooks ESLint Rules](https://github.com/facebook/react/tree/main/packages/eslint-plugin-react-hooks)

## Continuous Integration

ESLint always runs before build in CI/CD pipeline:

```bash
npm run lint     # Must pass
npm run type-check  # Must pass
npm run test     # Optional but recommended
npm run build    # Must succeed
```

Failing any check prevents deployment.

## Support

For linting questions: support@danvion.com
