import { GetStaticPropsContext } from "next";
import { FaustPage, getNextStaticProps } from "@faustwp/core";
import { gql } from "@/__generated__";
import { GetAuthorWithPostsQuery } from "@/__generated__/graphql";
import { GET_POSTS_FIRST_COMMON } from "@/contains/contants";
import React from "react";
import { FOOTER_LOCATION, PRIMARY_LOCATION } from "@/contains/menu";
import AuthorPostsChild from "@/container/author/AuthorPostsChild";
import Page404Content from "@/container/404Content";

const Page: FaustPage<GetAuthorWithPostsQuery> = (props) => {
  if (!props.data?.user) {
    return <Page404Content />;
  }

  return (
    <>
      {/* @ts-ignore */}
      <AuthorPostsChild {...(props || [])} />
    </>
  );
};

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}
export function getStaticProps(ctx: GetStaticPropsContext) {
  return getNextStaticProps(ctx, {
    Page,
    revalidate: 900,
  });
}

Page.variables = ({ params }) => {
  return {
    id: params?.slug,
    first: GET_POSTS_FIRST_COMMON,
    headerLocation: PRIMARY_LOCATION,
    footerLocation: FOOTER_LOCATION,
  };
};

Page.query = gql(`
  query GetAuthorWithPosts($id: ID!, $first: Int, $headerLocation: MenuLocationEnum!, $footerLocation: MenuLocationEnum!) {
    user(id: $id, idType: SLUG) {
      ...NcmazFcUserFullFields
      posts(first:  $first, where: {orderby: {field: DATE, order: DESC}}) {
        nodes {
          ...NcmazFcPostCardFields
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
    categories(first:10, where: { orderby: COUNT, order: DESC }) {
      nodes {
        ...NcmazFcCategoryFullFieldsFragment
      }
    }
    # common query for all page 
   generalSettings {
      ...NcgeneralSettingsFieldsFragment
    }
    primaryMenuItems: menuItems(where: { location:  $headerLocation  }, first: 80) {
      nodes {
        ...NcPrimaryMenuFieldsFragment
      }
    }
    footerMenuItems: menuItems(where: { location:  $footerLocation  }, first: 50) {
      nodes {
        ...NcFooterMenuFieldsFragment
      }
    }
    # end common query for all page
  }
`);

export default Page;
