import { useMemo } from 'react';
import useFetchRepo from './useFetchRepos';
import { useGlobalContext } from 'context/GlobalContextProvider';

interface ReposValidatorResult {
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
  const { reposData, repoRateLimit } = useGlobalContext();

  /**
   * Tracking if username has been searched. As long as user has not input new username yet
   *
   * @example const reposData = [{username: 'arifitanto', repos: [{id: 1, name: 'Github Repo Explorer'}]}]
   * @summary As long as we don't input new username, it won't double hit API repos with username 'arifitanto'
   */
  const usernameHasBeenSearched = reposData.some(
    (value) => value?.username === username
  );

  /**
   * Determine fetch repo with condition
   * - Requires username
   * - Accordion active state
   * - Username has not been searched before
   * - Within rate limit API
   * @see GlobalContextProvider.tsx - Why we need repoRateLimit state
   * @returns {boolean}
   */
  const shouldFetchRepo = useMemo(() => {
    if (!!username && active && !usernameHasBeenSearched && !repoRateLimit)
      return true;

    // Fallback
    return false;
  }, [username, active, usernameHasBeenSearched, repoRateLimit]);

  const {
    isFetching: reposDataLoading,
    isError: reposDataError,
    refetch: refetchRepos
  } = useFetchRepo(username, shouldFetchRepo);

  return {
    reposDataLoading,
    reposDataError,
    refetchRepos
  };
};

export default useReposValidator;
