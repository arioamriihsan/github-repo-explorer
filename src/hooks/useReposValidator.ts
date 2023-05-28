import { useMemo } from 'react';
import useFetchRepo from './useFetchRepos';
import { useGlobalContext } from 'context/GlobalContextProvider';

interface ReposValidatorResult {
  shouldFetchRepo: boolean;
  reposDataLoading: boolean;
  reposDataError: boolean;
  refetchRepos: any;
}

/**
 * Hook to validate whether fetch repo is needed or not.
 * Useful to prevent double hit API
 *
 * @param {string} username
 * @param {boolean} active
 * @returns {Object}
 */
const useReposValidator = (
  username: string,
  active: boolean
): ReposValidatorResult => {
  const { reposOwnerHistory } = useGlobalContext();

  /**
   * Tracking if username has been searched. As long as user has not input new username yet
   * 
   * @example const reposOwnerHistory = [username: 'arifitanto', repos: [{id: 1, name: 'Github Repo Explorer'}]]
   * @summary As long as we don't input new username, it won't double hit API repos with username 'arifitanto'
   */
  const usernameHasBeenSearched = reposOwnerHistory.some(
    (value) => value?.username === username
  );

  const shouldFetchRepo = useMemo(() => {
    if (!!username && active && !usernameHasBeenSearched) return true;

    // Fallback
    return false;
  }, [username, active, usernameHasBeenSearched]);

  const {
    isFetching: reposDataLoading,
    isError: reposDataError,
    refetch: refetchRepos
  } = useFetchRepo(username, shouldFetchRepo);

  return {
    shouldFetchRepo,
    reposDataLoading,
    reposDataError,
    refetchRepos
  };
};

export default useReposValidator;
