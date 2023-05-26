import { QueryClient } from 'react-query';

/**
 * React Query setting client
 *
 * More info: https://react-query.tanstack.com/guides/important-defaults
 *
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10 * 1000, // 10 Second by default data will be stale
      refetchOnWindowFocus: false, // Prevent auto refetch on window focus
      retry: false // Prevent auto refresh if fetching data failed
    }
  }
});

export default queryClient;
