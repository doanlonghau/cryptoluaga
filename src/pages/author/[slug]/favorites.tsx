import { GetStaticPropsContext } from "next";
import { FaustPage, getNextStaticProps } from "@faustwp/core";
import { gql } from "@/__generated__";
import { PageAuthorFavoritesGetDataQuery } from "@/__generated__/graphql";
import React from "react";
import { FOOTER_LOCATION, PRIMARY_LOCATION } from "@/contains/menu";
import AuthorFavoritesChild from "@/container/author/AuthorFavoritesChild";

const Page: FaustPage<PageAuthorFavoritesGetDataQuery> = (props) => {
  return (
    <>
      {/* @ts-ignore */}
      <AuthorFavoritesChild {...(props || {})} />
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
    headerLocation: PRIMARY_LOCATION,
    footerLocation: FOOTER_LOCATION,
  };
};

Page.query = gql(`
  query PageAuthorFavoritesGetData($id: ID!, $headerLocation: MenuLocationEnum!, $footerLocation: MenuLocationEnum!) {
    user(id: $id, idType: SLUG) {
      ...NcmazFcUserFullFields
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
