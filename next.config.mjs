/** @type {import('next').NextConfig} */
// One worker keeps builds modest on the VPS. Preserve output only when explicitly
// requested for restricted Windows environments that deny nested worker mkdirs.
const nextConfig = {
  typedRoutes: false,
  cleanDistDir: process.env.PIECEWISE_PRESERVE_BUILD !== '1',
  experimental: { cpus: 1 },
};
export default nextConfig;
