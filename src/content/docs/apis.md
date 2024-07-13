---
title: Official Flamewolf APIs
description: We've added a lot of new APIs to Flamewolf. Here's a brief introduction to them
---

## Official APIs

### `navigator.whoami()`
The first API on this list, is `navigator.whoami`. As the name suggests, it's used for getting the user's username, securely.

#### Specification
- **Arguments**: None
- **Returns**: `String`; Empty String if not allowed

#### Example
```js title="navigator.whoami.js"
// Returns the user's username, if allowed. An empty string otherwise.
console.log(navigator.whoami());
```

#### Meta
- **Status**: This API is enabled. You can disable it via `flamewolf.api.whoami.enabled` toggle in `about:config`.
- **Safety**: This API is heavily guarded with an on-demand permission prompt. Every use of it requires the user to authorize so.
- **Stability**: This API is considered stable.

### `navigator.isEnabled()`
The second one is `navigator.isEnabled`. It's used for checking whether a Flamewolf-specific API is enabled.  

:::caution
It is not an alternative of checking the returned value. Even if an API is enabled, the user can still forbid it's usage.  
Such cases should also be handled explicitly.
:::

#### Specification
- **Arguments**:
  1. **`api`**: `String`; The name of the Flamewolf API to check for.
- **Returns**: `Boolean`

#### Example
```js title="navigator.isEnabled.js"
console.log(navigator.isEnabled("whoami"));
```

#### Meta
- **Status**: Enabled by default, with plans to add support for disabling.
- **Safety**: Generally considered safe. More safety options are planned.
- **Stability**: Considered Stable.

### `navigator.isFlame`
Returns `true` if the browser is Flame.

#### Specification
- **Arguments**: None
- **Returns**: `Boolean`

#### Example
```js title="navigator.isFlame.js"
// Check if the browser is Flamewolf
if (navigator.isFlame && navigator.isFlame()) {
    // Check if the whoami() API is enabled
    const isEnabled = navigator.isEnabled("whoami");
    if (isEnabled) {
        const username = navigator.whoami();
        if (username) {
            console.log("Your username is:", username);
        } else {
            console.warn("User denied access, or there was a problem!");
        }
    } else {
        console.warn("The whoami API is not enabled!");
    }
} else {
    console.warn("The browser is not Flamewolf!")
}
```

#### Meta
- **Status**: Enabled by default. Currently, there's no option to disable it.
- **Safety**: Safe.
- **Stability**: Stable.

## Easter Eggs

### `navigator.arch`
A reference to Arch Linux users' `arch btw`.  
Returns `(btw)`

#### Specification
- **Arguments**: None
- **Returns**: `String`; `"(btw)"`

#### Example
```js title="navigator.arch.js"
console.log(navigator.arch()); // prints: "(btw)"
```

#### Meta
- **Status**: Enabled by default. Options to disable are planned.
- **Safety**: Safe.
- **Stability**: It's an easter egg.
