import { QueryGetPostsNcmazMetadataByIdsQuery } from "@/__generated__/graphql";
import { GET_POSTS_NCMAZ_META_BY_IDS } from "@/fragments/queries";
import { getApolloClient } from "@faustwp/core";
import type { NextApiRequest, NextApiResponse } from "next";

export type CMSPostsNcmazMetaByIdsResponseData = {
  data?: QueryGetPostsNcmazMetadataByIdsQuery | null;
  error?: string | null;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CMSPostsNcmazMetaByIdsResponseData>
) {
  const client = getApolloClient();
  const ids = req.query.ids || null;

  if (!ids) {
    res
      .status(400)
      .send({ error: "Param is required and must like: [1,2,3,...]" });
    return;
  }

  const IDS = typeof ids === "string" ? [ids] : ids.map((id: string) => id);

  try {
    const { data, error, errors } = await client
      .query({
        query: GET_POSTS_NCMAZ_META_BY_IDS,
        variables: {
          in: IDS,
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
