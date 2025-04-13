# createShortCodeGenerator

The `createShortCodeGenerator` function is a utility for generating random short codes, typically used for creating unique identifiers such as URL shortener codes. It allows you to specify the length of the generated short code and ensures randomness by using a predefined set of characters.

## File Location

This function is implemented in the file:  
[components/ShortCodeGenerator.js](components/ShortCodeGenerator.js)

## Function Signature

```javascript
const createShortCodeGenerator = (length = 7) => { ... };
```

## Parameters

- **`length`** _(optional)_:
  - **Type**: `Number`
  - **Default**: `7`
  - **Description**: Specifies the length of the short code to be generated. If not provided, the default length is 7 characters.

## Returns

The function returns an object with the following method:

### `generate`

- **Type**: `Function`
- **Description**: Generates a random short code of the specified length using alphanumeric characters.

#### Example Usage:

```javascript
const createShortCodeGenerator = require("./components/ShortCodeGenerator");

const shortCodeGenerator = createShortCodeGenerator(8); // Create a generator for 8-character codes
const shortCode = shortCodeGenerator.generate(); // Generate a random short code
console.log(shortCode); // Example output: "A1bC2dE3"
```

## Character Set

The short codes are generated using the following character set:

```
ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789
```

This includes:

- Uppercase letters (`A-Z`)
- Lowercase letters (`a-z`)
- Digits (`0-9`)

## Example

### Default Length

```javascript
const createShortCodeGenerator = require("./components/ShortCodeGenerator");

const shortCodeGenerator = createShortCodeGenerator(); // Default length is 7
console.log(shortCodeGenerator.generate()); // Example output: "aB3dE7F"
```

### Custom Length

```javascript
const createShortCodeGenerator = require("./components/ShortCodeGenerator");

const shortCodeGenerator = createShortCodeGenerator(10); // Custom length of 10
console.log(shortCodeGenerator.generate()); // Example output: "XyZ123AbCd"
```

## Use Cases

- Generating unique short codes for URL shortening services.
- Creating random identifiers for database entries.
- Generating temporary access codes or tokens.

## Notes

- The randomness of the generated short codes depends on the `Math.random()` function, which may not be suitable for cryptographic purposes.
- Ensure that the generated short codes are checked for uniqueness in your application if required.

## License

This utility is part of the `url-shortner-system-design` project and is licensed under the ISC license.
