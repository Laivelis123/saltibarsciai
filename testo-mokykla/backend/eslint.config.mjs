import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import length from "./variable-length/index.js"

export default [
    { languageOptions: { globals: globals.node } },
    {
        settings: {
            react: {
                version: "detect",
            },
        },
    },
    {
        plugins: { length }
    },
    {
        rules: {
            "length/min-var-length": 'warn'
        }
    },
  pluginJs.configs.recommended,
  pluginReactConfig,
];