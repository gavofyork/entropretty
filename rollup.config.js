import terser from "@rollup/plugin-terser";
import fs from "fs";

const files = fs
  .readdirSync("./designs")
  .filter((file) => file.endsWith(".js"))
  .map((file) => `./designs/${file}`);

export default {
  input: files,
  output: {
    dir: "out",
    format: "es",
  },
  plugins: [
    terser({
      mangle: {
        reserved: ["draw"],
      },
    }),
  ],
};
