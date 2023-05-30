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

export interface ReposDataType {
  username: string;
  repos: FetchRepoSuccessResponse[];
}

interface GlobalContextType {
  username: string;
  prevSuccessUsername: string;
  shouldFetchUser: boolean;
  reposData: ReposDataType[];
  repoRateLimit: boolean;
  setUsername: Dispatch<SetStateAction<string>>;
  setShouldFetchUser: Dispatch<SetStateAction<boolean>>;
  setPrevSuccessUserName: Dispatch<SetStateAction<string>>;
  setReposData: Dispatch<SetStateAction<ReposDataType[]>>;
  setRepoRateLimit: Dispatch<SetStateAction<boolean>>;
  clearReposData: () => void;
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

  // Display repos detail by username. Please note we set data from useFetchRepos.tsx
  const [reposData, setReposData] = useState<ReposDataType[]>([]);

  // State to prevent looping API to fetch repo when API throw an error
  const [repoRateLimit, setRepoRateLimit] = useState<boolean>(false);

  /** Function to clear repos data */
  const clearReposData = useCallback(() => {
    setReposData([]);
  }, []);

  const GlobalProviderValue = {
    username,
    prevSuccessUsername,
    shouldFetchUser,
    reposData,
    repoRateLimit,
    setUsername,
    setShouldFetchUser,
    setPrevSuccessUserName,
    setReposData,
    setRepoRateLimit,
    clearReposData
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
