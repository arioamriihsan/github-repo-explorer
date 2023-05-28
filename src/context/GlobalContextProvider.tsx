import React, {
  useState,
  useContext,
  createContext,
  ReactNode,
  Dispatch,
  SetStateAction
} from 'react';

interface Props {
  children: ReactNode;
}

interface GlobalContextType {
  username: string;
  prevSuccessUsername: string;
  shouldFetchUser: boolean;
  repoIdHistory: number[];
  setUsername: Dispatch<SetStateAction<string>>;
  setShouldFetchUser: Dispatch<SetStateAction<boolean>>;
  setPrevSuccessUserName: Dispatch<SetStateAction<string>>;
  setRepoIdHistory: Dispatch<SetStateAction<number[]>>
}

export const GlobalContext = createContext<GlobalContextType | undefined>(
  undefined
);

const GlobalProvider: React.FC<Props> = ({ children }) => {
  // Username from input
  const [username, setUsername] = useState<string>('');

  // Get previous success username. Displayed in Explorer.tsx 
  const [prevSuccessUsername, setPrevSuccessUserName] = useState<string>('');

  // Determine action to call API to get users
  const [shouldFetchUser, setShouldFetchUser] = useState<boolean>(false);

  // Tracking repo history to prevent double hit API when open accordion
  const [repoIdHistory, setRepoIdHistory] = useState<number[]>([]);

  const GlobalProviderValue = {
    username,
    prevSuccessUsername,
    shouldFetchUser,
    repoIdHistory,
    setUsername,
    setShouldFetchUser,
    setPrevSuccessUserName,
    setRepoIdHistory
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
