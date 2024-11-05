import { createGlobalState } from "react-hooks-global-state";

const initialState: {
  isOpen: boolean;
  isLogedIn: boolean;
  url?: string;
} = {
  isOpen: false,
  isLogedIn: false,
  url: undefined,
};

const { useGlobalState } = createGlobalState(initialState);

export const useLoginModal = () => {
  const [isOpen, setIsOpen] = useGlobalState("isOpen");
  const [isLogedIn, setIsLogedIn] = useGlobalState("isLogedIn");
  const [url, setUrl] = useGlobalState("url");

  return {
    isOpen,
    isLogedIn,
    setIsLogedIn,
    urlRiderect: url,
    openLoginModal: (url?: string) => {
      setIsOpen(true);
      url && setUrl(url);
    },
    closeLoginModal: () => {
      setIsOpen(false);
      setUrl(undefined);
    },
  };
};
