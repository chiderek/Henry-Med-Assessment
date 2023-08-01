import type { Config } from "jest";

const config: Config = {
    testMatch: ["<rootDir>/api/**/*.spec.ts"],
    transform: {
        "^.+\\.tsx?$": "ts-jest",
    },
    testTimeout: 10000,
}

export default config;