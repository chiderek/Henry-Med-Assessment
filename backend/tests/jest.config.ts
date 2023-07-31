import type { Config } from "jest";

const config: Config = {
    transform: {
        "^.+\\.tsx?$": "ts-jest",
        "^.+\\.(js|jsx)$": "babel-jest",
    },
    testTimeout: 1000
}

export default config;