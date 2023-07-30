import type { AppProps } from "next/app";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/globals.css";
import DashboardLayout from "@/layouts/DashboardLayout";
import SimpleLayout from "@/layouts/SimpleLayout";

export default function App({ Component, pageProps, router }: AppProps) {
  const dashboardPath = ["/dashboard"];

  const isDashboardPage = dashboardPath.includes(router.pathname);

  const Layout = isDashboardPage ? DashboardLayout : SimpleLayout;

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
