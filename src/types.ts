import { WordPressTemplate } from "@faustwp/core";

export type WordPressTemplateProps = Parameters<typeof WordPressTemplate>[0];

export type ViewerType = {
  name?: string;
  username?: string;
  capabilities?: string[];
  databaseId?: number;
  description?: string;
  email?: string;
  firstName?: string;
  id?: number;
  lastName?: string;
  nickname?: string;
  locale?: string;
  registeredDate?: string;
  slug?: string;
  templates?: string[];
  uri?: string;
  url?: string;
  userId?: number;
  avatar?: {
    url?: string;
  };
};
