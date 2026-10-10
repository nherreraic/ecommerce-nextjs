import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // reactStrictMode: false, // esto es para que el useEffect no se corra 2 veces rápido cuando se termina de renderizar el componente
};

export default nextConfig;
