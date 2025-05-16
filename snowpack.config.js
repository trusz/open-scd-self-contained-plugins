export default {
  packageOptions: {
    external: [
      "@web/dev-server-core",
      "@web/dev-server-esbuild",
      "esbuild",
      "crypto",
      "lit-html/is-server.js"
    ],
    knownEntrypoints: [
      "lit-html",
      "lit-element"
    ]
  },
  exclude: [
    "**/*.@(spec|test).@(js|mjs)",
    "**/test/**/*",
    "**/out-tsc/**/*",
    "**/.editorconfig",
    "**/.eslintrc.cjs",
    "**/.git/**/*",
    "**/.gitignore",
    "**/.idea/**/*",
    "**/.travis.yml",
    "**/package*",
    "**/tsconfig.json",
    "**/web-test-runner.config.mjs",
    "**/node_modules/**/*"
  ],
  workspaceRoot: "../../",
  mount: {
    "./": "/",
    "../plugins/": "/plugins/",
    "../openscd/": "/openscd/"
  },
  alias: {
    "@openscd/open-scd": "../openscd/",
    "@openscd/plugins": "../plugins/"
  },
  devOptions: {
    cors: true
  },
  buildOptions: {
    baseUrl: process.env.PUBLIC_URL || "/"
  }
};
