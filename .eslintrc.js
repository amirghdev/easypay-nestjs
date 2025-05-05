module.exports = {
    parser: "@typescript-eslint/parser",
    parserOptions: {
        project: "tsconfig.json",
        tsconfigRootDir: __dirname,
        sourceType: "module",
    },
    plugins: ["@typescript-eslint/eslint-plugin"],
    extends: ["plugin:@typescript-eslint/recommended", "plugin:prettier/recommended"],
    root: true,
    env: {
        node: true,
        jest: true,
    },
    ignorePatterns: [".eslintrc.js"],
    rules: {
        // TypeScript specific rules
        "@typescript-eslint/explicit-function-return-type": "error",
        "@typescript-eslint/explicit-module-boundary-types": "error",
        "@typescript-eslint/no-explicit-any": "error",
        "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
        "@typescript-eslint/no-non-null-assertion": "error",
        "@typescript-eslint/no-floating-promises": "error",
        "@typescript-eslint/unbound-method": "error",
        "@typescript-eslint/strict-boolean-expressions": "error",
        "@typescript-eslint/ban-types": "error",
        "@typescript-eslint/no-unnecessary-type-assertion": "error",
        "@typescript-eslint/prefer-readonly": "error",
        "@typescript-eslint/member-ordering": "error",
        "@typescript-eslint/naming-convention": [
            "error",
            {
                selector: "default",
                format: ["camelCase"],
            },
            {
                selector: "variable",
                format: ["camelCase", "UPPER_CASE"],
            },
            {
                selector: "parameter",
                format: ["camelCase"],
                leadingUnderscore: "allow",
            },
            {
                selector: "memberLike",
                modifiers: ["private"],
                format: ["camelCase"],
                leadingUnderscore: "require",
            },
            {
                selector: "typeLike",
                format: ["PascalCase"],
            },
            {
                selector: "interface",
                format: ["PascalCase"],
                prefix: ["I"],
            },
            {
                selector: "enum",
                format: ["PascalCase"],
                suffix: ["Enum"],
            },
        ],

        // NestJS specific
        "import/prefer-default-export": "off",
        "class-methods-use-this": "off",
        "max-classes-per-file": "off",

        // General rules
        "no-console": ["error", { allow: ["warn", "error"] }],
        "no-debugger": "error",
        "no-duplicate-imports": "error",
        "no-unused-expressions": "error",
        "no-var": "error",
        "prefer-const": "error",
        "prefer-template": "error",
        "no-multiple-empty-lines": ["error", { max: 1 }],
        "sonarjs/cognitive-complexity": ["error", 15],
        "sonarjs/no-duplicate-string": ["error", { threshold: 3 }],
        "sonarjs/no-identical-functions": "error",
        "promise/always-return": "error",
        "promise/no-callback-in-promise": "error",
        "promise/param-names": "error",
        "import/order": [
            "error",
            {
                groups: ["builtin", "external", "internal", ["parent", "sibling", "index"]],
                "newlines-between": "always",
                alphabetize: { order: "asc", caseInsensitive: true },
            },
        ],
        "prettier/prettier": [
            "error",
            {
                singleQuote: true,
                trailingComma: "all",
                printWidth: 100,
            },
        ],
    },
    "prettier/prettier": [
        "error",
        {
            singleQuote: false,
        },
    ],
};