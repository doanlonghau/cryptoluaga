import { QueryGetAllReactionPostsByUserAndReactionQuery } from "@/__generated__/graphql";
import { GET_USER_REACTION_POSTS_FIRST_COMMON } from "@/contains/contants";
import { GET_ALL_REACTION_POSTS_BY_USER_AND_REACTION } from "@/fragments/queries";
import { getApolloClient } from "@faustwp/core";
import type { NextApiRequest, NextApiResponse } from "next";

export type CMSReactionPostsResponseData = {
  data?: QueryGetAllReactionPostsByUserAndReactionQuery | null;
  error?: string | null;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CMSReactionPostsResponseData>
) {
  const client = getApolloClient();
  const param = req.query.param || null;

  const userID = param?.[0];
  const reaction = param?.[1];

  if (!userID || !reaction) {
    res.status(400).send({ error: "Param is required and must like: /1/save" });
    return;
  }

  try {
    const { data, error, errors } = await client
      .query({
        query: GET_ALL_REACTION_POSTS_BY_USER_AND_REACTION,
        variables: {
          search: reaction,
          first: GET_USER_REACTION_POSTS_FIRST_COMMON,
          id: userID,
        },
      })
      .then((result) => result);
    if (error || errors) {
      res.status(500).send({ error: "Failed to fetch data" });
      return;
    }
    res.status(200).send({ data });
  } catch (err) {
    res.status(500).send({ error: "Failed to fetch data" });
  }
}
