import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { FaustPage } from "@faustwp/core";
import { TDashBoardPostTab } from "@/container/DashboardLayout";

const Page: FaustPage<{}> = () => {
  const router = useRouter();

  useEffect(() => {
    const tab: TDashBoardPostTab = "published";
    router.push("/dashboard/posts/" + tab);
  }, []);

  return <div></div>;
};

export default Page;
