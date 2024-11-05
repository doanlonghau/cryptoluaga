"use client";

import { GetReadingListPageQuery } from "../../__generated__/graphql";
import { FaustPage } from "@faustwp/core";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import { useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import Empty from "@/components/Empty";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import Card3 from "@/components/Card3/Card3";
import updatePostFromUpdateQuery from "@/utils/updatePostFromUpdateQuery";
import Card3Skeleton from "@/components/Card3/Card3Skeleton";
import { QUERY_GET_POSTS_BY } from "@/fragments/queries";
import { PostDataFragmentType } from "@/data/types";
import errorHandling from "@/utils/errorHandling";
import GraphqlError from "@/components/GraphqlError";
import getTrans from "@/utils/getTrans";

//

const ReadingListPageChild: FaustPage<GetReadingListPageQuery> = (props) => {
  // START ----------
  const { isReady, isAuthenticated } = useSelector(
    (state: RootState) => state.viewer.authorizedUser
  );
  const [refetchTimes, setRefetchTimes] = useState(0);
  const T = getTrans();

  // useLazyQuery get reading list posts
  const [queryGetPostsByPostIn, getPostsByPostInResult] = useLazyQuery(
    QUERY_GET_POSTS_BY,
    {
      notifyOnNetworkStatusChange: true,
      context: {
        fetchOptions: {
          method: process.env.NEXT_PUBLIC_SITE_API_METHOD || "GET",
        },
      },
      variables: {
        first: 20,
      },
      onError: (error) => {
        if (refetchTimes > 3) {
          errorHandling(error);
          return;
        }
        setRefetchTimes(refetchTimes + 1);
        getPostsByPostInResult.refetch();
      },
    }
  );

  const { viewer, viewerReactionPosts } = useSelector(
    (state: RootState) => state.viewer
  );
  const localSavedPostsList = useSelector(
    (state: RootState) => state.localPostsSavedList.localSavedPosts
  );

  // goi 1 lan duy nhat -
  useEffect(() => {
    if (getPostsByPostInResult.called || !isReady) {
      return;
    }

    // user da dang nhap nhung chua co reaction posts
    if (isAuthenticated && !viewerReactionPosts?.length) {
      return;
    }

    // user chua dang nhap va chua co localSavedPostsList
    if (isAuthenticated === false && !localSavedPostsList?.length) {
      return;
    }

    let ids: string[] | number[] = [];

    // phan nay danh cho user da dang nhap
    if (viewerReactionPosts?.length) {
      ids = viewerReactionPosts.map((item) =>
        (item.title || "").split(",")[0].trim()
      );
    }

    // phan nay danh cho user chua dang nhap
    if (isAuthenticated === false && !!localSavedPostsList?.length) {
      ids = localSavedPostsList;
    }

    if (!ids.length) {
      return;
    }

    queryGetPostsByPostIn({
      variables: {
        in: ids.map((id) => String(id)),
        after: null,
      },
    });
  }, [
    localSavedPostsList,
    viewer?.databaseId,
    getPostsByPostInResult.called,
    viewerReactionPosts,
    isReady,
    isAuthenticated,
  ]);

  //
  const handleClickLoadmore = () => {
    getPostsByPostInResult.fetchMore({
      variables: {
        after: getPostsByPostInResult.data?.posts?.pageInfo?.endCursor,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        return updatePostFromUpdateQuery(prev, fetchMoreResult);
      },
    });
  };

  // posts and render
  let hasNextPage = false;
  let loading = false;
  let currentPosts: PostDataFragmentType[] = [];

  loading =
    getPostsByPostInResult.loading ||
    !isReady ||
    (!!isAuthenticated && !viewer?.databaseId);

  hasNextPage = !!getPostsByPostInResult.data?.posts?.pageInfo?.hasNextPage;
  currentPosts =
    (getPostsByPostInResult.data?.posts?.nodes as PostDataFragmentType[]) || [];

  // phan nay danh cho user da dang nhap
  if (!!isAuthenticated) {
    currentPosts = currentPosts.filter((post) => {
      return viewerReactionPosts?.some((item) => {
        return item.title?.includes(post.databaseId + ",SAVE");
      });
    });
  }

  // phan nay danh cho user chua dang nhap
  if (isAuthenticated === false) {
    currentPosts = currentPosts.filter((post) => {
      return localSavedPostsList?.some((item) => {
        return item === post.databaseId;
      });
    });
  }

  const renderContent = () => {
    if (!currentPosts.length) {
      // fisrt time skeleton loading
      if (loading) {
        return (
          <div className="grid sm:grid-cols-1 gap-6 md:gap-8 mt-8 lg:mt-10">
            {[1, 1, 1, 1, 1, 1, 1, 1].map((_, i) => (
              <Card3Skeleton key={i} />
            ))}
          </div>
        );
      }

      // loading done and not have any posts
      return <Empty />;
    }

    // render posts
    return (
      <div className="grid sm:grid-cols-1 gap-6 md:gap-8 mt-8 lg:mt-10">
        {currentPosts.map((post) => (
          <Card3 key={post.databaseId} post={post} />
        ))}
      </div>
    );
  };

  return (
    <>
      {/* ERRR */}
      {!!getPostsByPostInResult.error && (
        <GraphqlError
          error={getPostsByPostInResult.error}
          hasRefetchBtn
          refetch={getPostsByPostInResult.refetch}
          loading={loading}
        />
      )}

      {/* CONTENT */}
      {renderContent()}

      {/* PAGINATION */}
      {hasNextPage ? (
        <div className="mt-12 lg:mt-16 flex justify-center">
          <ButtonPrimary loading={loading} onClick={handleClickLoadmore}>
            {T["Show me more"]}
          </ButtonPrimary>
        </div>
      ) : null}
    </>
  );
};

export default ReadingListPageChild;
