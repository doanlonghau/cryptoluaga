import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { FaustPage } from "@faustwp/core";
import { TDashBoardEditProfileTab } from "@/container/DashboardLayout";

const Page: FaustPage<{}> = () => {
  const router = useRouter();

  useEffect(() => {
    const tab: TDashBoardEditProfileTab = "general";
    router.push("/dashboard/edit-profile/" + tab);
  }, []);

  return <div></div>;
};

export default Page;
