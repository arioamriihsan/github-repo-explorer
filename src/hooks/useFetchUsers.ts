import { useQuery } from 'react-query';
import { getUsers } from 'network/services';
import { useGlobalContext } from 'context/GlobalContextProvider';
import { LIMIT_USER_PER_PAGE } from 'network/constant';

const useFetchUser = () => {
  const {
    username,
    shouldFetchUser,
    prevSuccessUsername,
    setShouldFetchUser,
    setPrevSuccessUserName,
    clearReposData
  } = useGlobalContext();

  const fetchUser = useQuery(
    ['List Users'], // Query key
    () => getUsers({ q: username, per_page: LIMIT_USER_PER_PAGE }),
    {
      // Fetching with condition:
      // 1. username is not empty
      // 2. shouldFetch from GlobalContext is true
      // 3. username !== prevSuccessUsername
      enabled:
        !!username && shouldFetchUser && username !== prevSuccessUsername,

      onSuccess: () => {
        // SetShouldFetch to false, so if we click button again will hit API
        setShouldFetchUser(false);

        // Set previous success username to be displayed in Explorer.tsx
        setPrevSuccessUserName(username);

        // Clear repos data to empty array, allow to fetch next detail repo user
        clearReposData();
      },
      onError: () => setShouldFetchUser(false)
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
