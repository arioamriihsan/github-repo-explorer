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
  shouldFetch: boolean;
  setUsername: Dispatch<SetStateAction<string>>;
  setPrevSuccessUserName: Dispatch<SetStateAction<string>>;
  setShouldFetch: Dispatch<SetStateAction<boolean>>;
}

export const GlobalContext = createContext<GlobalContextType | undefined>(
  undefined
);

const GlobalProvider: React.FC<Props> = ({ children }) => {
  /** Username from input */
  const [username, setUsername] = useState<string>('');

  /** Get previous success username. Displayed in Explorer.tsx */
  const [prevSuccessUsername, setPrevSuccessUserName] = useState<string>('');

  /** Determine action to call API */
  const [shouldFetch, setShouldFetch] = useState<boolean>(false);

  const GlobalProviderValue = {
    username,
    prevSuccessUsername,
    shouldFetch,
    setUsername,
    setPrevSuccessUserName,
    setShouldFetch
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
