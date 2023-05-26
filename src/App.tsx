import { QueryClientProvider } from 'react-query';
import combineProviders from 'context/combineProviders';
import queryClient from 'network/queryClient';
import { Explorer, ListResult } from './components';
import GlobalProvider from 'context/GlobalContextProvider';
import './App.css';

function App() {

  /**
   * Combine providers
   */
  const Providers = combineProviders([
    [QueryClientProvider, { client: queryClient }],
    GlobalProvider,
  ]);

  return (
    <Providers>
      <div className='app__container'>
        <Explorer />
        <ListResult />
      </div>
    </Providers>
  );
};

export default App;
