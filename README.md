# Qualtive Client Library for Web – Sentry

Sentry additions for the [Qualtive client library for web](https://github.com/nightshift-habits/qualtive-client-web).

## Installation

```
npm install qualtive-web-sentry
```

TypeScript types are included in this package.

## Usage

This package exposes a Sentry integration which can be installed when you initialize Sentry.

Example:

```typescript
import { qualtiveIntegration } from "qualtive-web-sentry"
import * as Sentry from "@sentry/browser"

Sentry.init({
  ...otherSentryOptions,
  integrations: [
    qualtiveIntegration(),
  ],
})
```

