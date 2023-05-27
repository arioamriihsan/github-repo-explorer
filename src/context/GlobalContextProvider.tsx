import React, {
  createContext,
  useState,
  useContext,
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
  setUsername: Dispatch<SetStateAction<string>>;
  setPrevSuccessUserName: Dispatch<SetStateAction<string>>;
  setShouldFetchUser: Dispatch<SetStateAction<boolean>>;
}

export const GlobalContext = createContext<GlobalContextType | undefined>(
  undefined
);

const GlobalProvider: React.FC<Props> = ({ children }) => {
  /** Username from input */
  const [username, setUsername] = useState<string>('');

  /** Get previous success username. Displayed in Explorer.tsx */
  const [prevSuccessUsername, setPrevSuccessUserName] = useState<string>('');

  /** Determine action to call API get users */
  const [shouldFetchUser, setShouldFetchUser] = useState<boolean>(false);

  const GlobalProviderValue = {
    username,
    prevSuccessUsername,
    shouldFetchUser,
    setUsername,
    setPrevSuccessUserName,
    setShouldFetchUser
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
