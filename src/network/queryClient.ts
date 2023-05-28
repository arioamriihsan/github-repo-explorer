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
      // Honestly not best practice we use method GET triggered by button.
      // We can use useMutation for POST method.
      // For now, the solution is we set staleTime to zero to make request.
      staleTime: 0, 

      // Prevent auto refetch on window focus
      refetchOnWindowFocus: false, 

      // Prevent auto refresh if fetching data failed
      retry: false 
    }
  }
});

export default queryClient;
