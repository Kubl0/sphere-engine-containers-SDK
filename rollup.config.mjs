import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import {dts} from 'rollup-plugin-dts';


export default [
    {
        input: 'src/index.ts',
        output: [
            {
                file: "dist/cjs/index.js",
                format: 'cjs',
                sourcemap: true,
                name: "seco-sdk-react"
            },
            {
                file: "dist/esm/index.js",
                format: 'esm',
                sourcemap: true,
            },
        ],
        plugins: [
            external(),
            resolve(),
            commonjs(),
            typescript({tsconfig: './tsconfig.json', sourceMap: false}),
            postcss(),
            terser(),
        ],
    },
    {
        input: "dist/esm/types/index.d.ts",
        output: [{file: "dist/index.d.ts", format: "esm"}],
        external: [/\.css$/],
        plugins: [dts()],
    },
]