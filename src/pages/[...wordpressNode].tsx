import { getWordPressProps, WordPressTemplate } from "@faustwp/core";
import { GetStaticProps } from "next";
import { WordPressTemplateProps } from "../types";

export default function Page(props: WordPressTemplateProps) {
  return <WordPressTemplate {...props} />;
}

export async function myGetPaths() {
  const response = await fetch(
    process.env.NEXT_PUBLIC_WORDPRESS_URL?.replace(/\/$/, "") +
      "/wp-json/wp/v2/posts?per_page=50&_fields=slug"
  );
  const getAllCategories = await fetch(
    process.env.NEXT_PUBLIC_WORDPRESS_URL?.replace(/\/$/, "") +
      "/wp-json/wp/v2/categories?per_page=20&_fields=slug"
  );

  let posts = (await response.json()) as any[];
  let categories = (await getAllCategories.json()) as any[];

  if (!categories?.length) {
    categories = [{ slug: "uncategorized" }];
  }
  if (!posts?.length) {
    posts = [{ slug: "hello-world" }];
  }

  posts = [
    ...categories.map((category) => ({ slug: "category/" + category.slug })),
    ...posts,
    { slug: "home-2" },
    { slug: "home-3-podcast" },
    { slug: "home-4-video" },
    { slug: "home-5-gallery" },
    { slug: "home-6" },
    { slug: "search/posts/" },
  ];

  return posts.map((page) => ({
    params: { wordpressNode: [page.slug] },
  }));
}

export async function getStaticPaths() {
  const paths = await myGetPaths();

  return {
    paths,
    fallback: "blocking",
  };
}

export const getStaticProps: GetStaticProps = (ctx) => {
  return getWordPressProps({ ctx, revalidate: 900 });
};
