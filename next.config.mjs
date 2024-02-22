/** @type {import('next').NextConfig} */
import removeImports from 'next-remove-imports'

/** @type {function(import("next").NextConfig): import("next").NextConfig}} */
const removeImportsFun = removeImports({
  // test: /node_modules([\s\S]*?)\.(tsx|ts|js|mjs|jsx)$/,
  // matchImports: "\\.(less|css|scss|sass|styl)$"
  reactStrictMode: true,
});

export default removeImportsFun({
  webpack(config, options) {
    return config
  },
});
