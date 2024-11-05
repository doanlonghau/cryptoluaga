import { TPostCard } from "@/components/Card2/Card2";
import { CMSPostsNcmazMetaByIdsResponseData } from "@/pages/api/posts-ncmaz-meta-by-ids/[...ids]";
import { updatePostsNcmazMetaDataOk } from "@/stores/postsNcmazMetaDataOk/postsNcmazMetaDataOkSlice";
import { RootState } from "@/stores/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface Props {
  posts?: TPostCard[];
}

export default function useGetPostsNcmazMetaByIds(props: Props) {
  const { isReady, isAuthenticated } = useSelector(
    (state: RootState) => state.viewer.authorizedUser
  );

  const isLogedIn = isReady && isAuthenticated === true;

  const [isLoading, setIsLoading] = useState(false);
  const [isFetchAPI, setIsFetchAPI] = useState(false);

  const dispatch = useDispatch();

  const IDS = props.posts?.map((post) => post.databaseId.toString());
  const IDsString = IDS?.join("/") || "";

  const loading = isLoading;
  const DOM_ID_LOADING = IDS?.length
    ? "getPostsNcmazMetaByIds_loading_" + IDS.join("_")
    : null;

  // Why?
  // With the ISR feature of nextjs, when liking, saving, updating... posts, it can take up to 15 minutes for the data to update
  // This affects post-like, so every time a post is rendered, you need to retrieve the PostLike data (count, isLiked,...)
  useEffect(() => {
    if (!isLogedIn || isFetchAPI || !IDsString) {
      return;
    }
    setIsFetchAPI(true);

    const getPosts = async () => {
      setIsLoading(true);
      await fetch(`/api/posts-ncmaz-meta-by-ids/${IDsString}`)
        .then((res) => res.json())
        .then((data: CMSPostsNcmazMetaByIdsResponseData) => {
          if (data?.data?.posts?.nodes?.length) {
            dispatch(updatePostsNcmazMetaDataOk(data?.data?.posts));
          }
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };

    getPosts();
  }, [IDsString, isLogedIn, isFetchAPI]);

  useEffect(() => {
    if (typeof window === "undefined" || !DOM_ID_LOADING || !isLogedIn) {
      return;
    }

    if (!loading) {
      const loadingDom = document.getElementById(DOM_ID_LOADING);
      if (loadingDom) {
        document.body.removeChild(loadingDom);
      }
      return;
    }

    // tao 1 DOM node de button like action co the dua vao do ma xac dinh la co dang loading hay khong.
    const likeActionNode = document.createElement("div");
    likeActionNode.id = DOM_ID_LOADING;
    likeActionNode.classList.add("getPostsNcmazMetaByIds_is_loading");
    document.body.appendChild(likeActionNode);

    return () => {
      // remove likeActionNode when unmount
      const loadingDom = document.getElementById(DOM_ID_LOADING);
      if (loadingDom) {
        document.body.removeChild(loadingDom);
      }
    };
  }, [loading, isLogedIn]);

  return {
    loading,
  };
}
