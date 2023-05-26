import { useQuery } from 'react-query';
import { getUsers } from 'network/services';
import { useGlobalContext } from 'context/GlobalContextProvider';

const useFetchUser = () => {
  const {
    shouldFetch,
    username,
    prevSuccessUsername,
    setShouldFetch,
    setPrevSuccessUserName
  } = useGlobalContext();

  const fetchUser = useQuery(
    ['List Users'], // Query key
    () => getUsers({ q: username, page: 1, per_page: 5 }),
    {
      // Fetching with condition:
      // 1. username is not empty
      // 2. shouldFetch from GlobalContext is true
      // 3. username !== prevSuccessUsername
      enabled: !!username && shouldFetch && username !== prevSuccessUsername,

      // Honestly not best practice we use method GET triggered by button.
      // We can use useMutation for POST method.
      // For now, the solution is we set staleTime to zero to make request.
      staleTime: 0,

      onSuccess: () => {
        // SetShouldFetch to false, so if we click button again will hit API
        setShouldFetch(false);

        // Set previous success username to be displayed in Explorer.tsx
        setPrevSuccessUserName(username);
      },
      onError: () => setShouldFetch(false)
    }
  );

  // Destructuring
  const {
    data,
    isFetching: userListLoading,
    isFetched: userListFetched,
    isError: userListError
  } = fetchUser;

  /** User list data */
  const userListData = data?.data?.items;

  return {
    userListData,
    userListLoading,
    userListFetched,
    userListError
  };
};

export default useFetchUser;
