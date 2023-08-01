import { MainContext } from "@/context";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";

const Dashboard = () => {
  const router = useRouter();
  const context = useContext(MainContext);

  useEffect(() => {
    if (context && context.userData && context.userData.rights) {
      context?.userData.rights !== "admin"
        ? router.push("/dashboard/tasks")
        : router.push("/dashboard/groups");
    }
  }, [context]);

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <></>
    </>
  );
};

export default Dashboard;
