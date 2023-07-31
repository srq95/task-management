import type { AppProps } from "next/app";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/globals.css";
import DashboardLayout from "@/layouts/DashboardLayout";
import SimpleLayout from "@/layouts/SimpleLayout";
import { MainProvider } from "@/context";

export default function App({ Component, pageProps, router }: AppProps) {
  const dashboardPath = "/dashboard";

  const isDashboardPage = router.pathname.includes(dashboardPath);

  const Layout = isDashboardPage ? DashboardLayout : SimpleLayout;

  return (
    <MainProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </MainProvider>
  );
}
