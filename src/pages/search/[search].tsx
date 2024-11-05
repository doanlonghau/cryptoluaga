import { FaustPage } from "@faustwp/core";
import { GetStaticPaths, GetStaticPropsContext } from "next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const Page: FaustPage<{}> = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/search/posts/" + router.query.search || "");
  }, []);

  return <div></div>;
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export function getStaticProps(ctx: GetStaticPropsContext) {
  return {
    props: {},
    revalidate: false,
  };
}

export default Page;
