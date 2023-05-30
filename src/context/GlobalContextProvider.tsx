import React, {
  useState,
  useCallback,
  useContext,
  createContext,
  PropsWithChildren,
  Dispatch,
  SetStateAction
} from 'react';
import { FetchRepoSuccessResponse } from 'network/types/response.types';

export interface ReposOwnerHistory {
  username: string;
  repos: FetchRepoSuccessResponse[];
}

interface GlobalContextType {
  username: string;
  prevSuccessUsername: string;
  shouldFetchUser: boolean;
  reposOwnerHistory: ReposOwnerHistory[];
  repoRateLimit: boolean;
  setUsername: Dispatch<SetStateAction<string>>;
  setShouldFetchUser: Dispatch<SetStateAction<boolean>>;
  setPrevSuccessUserName: Dispatch<SetStateAction<string>>;
  setReposOwnerHistory: Dispatch<SetStateAction<ReposOwnerHistory[]>>;
  setRepoRateLimit: Dispatch<SetStateAction<boolean>>;
  clearReposOwnerHistory: () => void;
}

export const GlobalContext = createContext<GlobalContextType | undefined>(
  undefined
);

const GlobalProvider: React.FC<PropsWithChildren> = ({ children }) => {
  // Username from input
  const [username, setUsername] = useState<string>('');

  // Get previous success username. Displayed in Explorer.tsx
  const [prevSuccessUsername, setPrevSuccessUserName] = useState<string>('');

  // Determine action to call API to get users
  const [shouldFetchUser, setShouldFetchUser] = useState<boolean>(false);

  // Tracking repo history to prevent double hit API when open accordion
  const [reposOwnerHistory, setReposOwnerHistory] = useState<
    ReposOwnerHistory[]
  >([]);

  /** State to prevent looping API to fetch repo when API throw an error */
  const [repoRateLimit, setRepoRateLimit] = useState<boolean>(false);

  /**
   * Function to clear repoIdHistory
   */
  const clearReposOwnerHistory = useCallback(() => {
    setReposOwnerHistory([]);
  }, []);

  const GlobalProviderValue = {
    username,
    prevSuccessUsername,
    shouldFetchUser,
    reposOwnerHistory,
    repoRateLimit,
    setUsername,
    setShouldFetchUser,
    setPrevSuccessUserName,
    setReposOwnerHistory,
    setRepoRateLimit,
    clearReposOwnerHistory
  };

  return (
    <GlobalContext.Provider value={GlobalProviderValue}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);

  // Guard if context used outside of GlobalProvider will throw error
  if (!context) {
    throw new Error('useGlobalContext must be used within GlobalProvider');
  }
  return context;
};
