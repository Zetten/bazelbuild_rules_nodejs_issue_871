import resolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";


const {LERNA_ROOT_PATH} = process.env;
const PACKAGE_ROOT_PATH = process.cwd();

const rootDeps = Object.keys(require(LERNA_ROOT_PATH + "/package.json").dependencies);
const packageDeps = Object.keys(require(PACKAGE_ROOT_PATH + "/package.json").dependencies || {});

const babelConfig = require(LERNA_ROOT_PATH + "/babel.config.js");

export default {
    input: "index.js",
    output: {
        file: "dist/index.js",
        format: "es"
    },
    external: [...rootDeps, ...packageDeps],
    plugins: [
        resolve({
            extensions: [".tsx", ".js"],
            mainFields: ["module", "main", "browser"]
        }),
        babel({
            extensions: [".tsx", ".js"],
            babelrc: false,
            ...babelConfig
        }),
        commonjs({
            include: [/node_modules/, LERNA_ROOT_PATH + "/node_modules"]
        })
    ]
};
