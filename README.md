# Playwright Login Automation — TypeScript + Mocha

A clean example project demonstrating end-to-end login automation using:

- **[Playwright](https://playwright.dev/)** — browser automation
- **TypeScript** — type-safe test code
- **[Mocha](https://mochajs.org/)** — test runner
- **Page Object Model (POM)** — maintainable test structure

Target site: [The Internet - Herokuapp](https://the-internet.herokuapp.com/login) (free public demo)

---

## Project Structure

```
playwright-login-demo/
├── pages/
│   └── LoginPage.ts        # Page Object — selectors & actions
├── tests/
│   └── login.spec.ts       # Mocha test suite (6 test cases)
├── utils/
│   └── BrowserHelper.ts    # Browser/context lifecycle manager
├── .mocharc.yml            # Mocha config (ts-node, timeout, reporter)
├── tsconfig.json
└── package.json
```

---

## Setup

```bash
npm install
npm run install:browsers
```

## Run Tests

```bash
# Headless (default)
npm test

# Headed (see the browser)
npm run test:headed
```

---

## Test Cases

| # | Test | Expected |
|---|------|----------|
| 1 | Page load | Login form is visible |
| 2 | Valid credentials | Success flash + redirect to /secure |
| 3 | Invalid username | "Your username is invalid!" |
| 4 | Logout | Logout flash + redirect to /login |

---

## Key Concepts Demonstrated

- **Page Object Model** — UI interactions are encapsulated in `LoginPage.ts`, keeping tests clean
- **Browser isolation** — each test gets a fresh `BrowserContext` (no shared cookies)
- **Mocha hooks** — `before/beforeEach/afterEach/after` for proper setup/teardown
- **Assertions** — using Node's built-in `assert` module
- **Headed/headless toggle** — via `HEADED=true` env variable
