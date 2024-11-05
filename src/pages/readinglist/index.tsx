import { gql } from "@/__generated__";
import {
  GetReadingListPageQuery,
  NcgeneralSettingsFieldsFragmentFragment,
} from "../../__generated__/graphql";
import { FaustPage, getNextStaticProps } from "@faustwp/core";
import { GetStaticPropsContext } from "next";
import { FOOTER_LOCATION, PRIMARY_LOCATION } from "@/contains/menu";
import PageLayout from "@/container/PageLayout";
import Heading from "@/components/Heading/Heading";
import getTrans from "@/utils/getTrans";
import ReadingListPageChild from "@/container/readinglist/ReadingListPageChild";

//

const Page: FaustPage<GetReadingListPageQuery> = (props) => {
  const T = getTrans();

  return (
    <>
      <PageLayout
        headerMenuItems={props.data?.primaryMenuItems?.nodes || []}
        footerMenuItems={props.data?.footerMenuItems?.nodes || []}
        pageFeaturedImageUrl={null}
        pageTitle={T["Reading list"]}
        generalSettings={
          props.data?.generalSettings as NcgeneralSettingsFieldsFragmentFragment
        }
      >
        <div className="container py-20">
          <main className="mx-auto max-w-4xl">
            <Heading desc="Let's read and save your favorite articles here ! 📚">
              {T["Reading list"]}
            </Heading>
            <div className="my-10 border-t border-neutral-100 dark:border-neutral-700"></div>

            {/* @ts-ignore */}
            <ReadingListPageChild {...(props || {})} />
          </main>
        </div>
      </PageLayout>
    </>
  );
};

Page.variables = () => {
  return {
    headerLocation: PRIMARY_LOCATION,
    footerLocation: FOOTER_LOCATION,
  };
};

// Note***: tat ca cac query trong cac page deu phai co generalSettings, no duoc su dung o compoent Wrap
Page.query = gql(`
  query GetReadingListPage($headerLocation: MenuLocationEnum!, $footerLocation: MenuLocationEnum!) {
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
  }
`);

export function getStaticProps(ctx: GetStaticPropsContext) {
  return getNextStaticProps(ctx, {
    Page,
    revalidate: 900,
  });
}

export default Page;
