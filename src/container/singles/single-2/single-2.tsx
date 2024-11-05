import React, { FC } from "react";
import NcImage from "@/components/NcImage/NcImage";
import { getPostDataFromPostFragment } from "@/utils/getPostDataFromPostFragment";
import SingleHeader from "../SingleHeader";
import { SingleType1Props } from "../single/single";
interface Props extends SingleType1Props {}

const SingleType2: FC<Props> = ({ post }) => {
  //
  const {
    title,
    content,
    date,
    author,
    databaseId,
    excerpt,
    featuredImage,
    ncPostMetaData,
  } = getPostDataFromPostFragment(post || {});
  //

  const imgWidth = featuredImage?.mediaDetails?.width || 1000;
  const imgHeight = featuredImage?.mediaDetails?.height || 750;
  return (
    <div className={`pt-8 lg:pt-16`}>
      {/* SINGLE HEADER */}
      <header className="container rounded-xl">
        <div className="max-w-screen-md mx-auto">
          <SingleHeader post={{ ...post }} hiddenDesc />
          {!featuredImage?.sourceUrl && (
            <div className="my-5 border-b border-neutral-200 dark:border-neutral-800 "></div>
          )}
        </div>
      </header>

      {/* FEATURED IMAGE */}
      {featuredImage?.sourceUrl && (
        <NcImage
          alt={title}
          containerClassName="container my-10 sm:my-12"
          className={`rounded-xl mx-auto ${
            imgWidth <= 768 && ncPostMetaData?.showRightSidebar
              ? "w-full max-w-screen-md"
              : ""
          }`}
          src={featuredImage?.sourceUrl || ""}
          width={imgWidth}
          height={imgHeight}
          sizes={"(max-width: 1024px) 100vw, 1280px"}
          enableDefaultPlaceholder
          priority
        />
      )}
    </div>
  );
};

export default SingleType2;
