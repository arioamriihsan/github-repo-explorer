import { useMemo } from 'react';
import useFetchRepo from './useFetchRepos';
import { useGlobalContext } from 'context/GlobalContextProvider';
import { FetchRepoSuccessResponse } from 'network/types/response.types';

interface ReposValidatorResult {
  shouldFetchRepo: boolean;
  reposData: FetchRepoSuccessResponse[] | undefined;
  reposDataLoading: boolean;
  reposDataError: boolean;
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
  const { repoIdHistory } = useGlobalContext();

	console.log({ repoIdHistory });

  const shouldFetchRepo = useMemo(() => {
    if (!!username && active) return true;

    return false;
  }, [username, active]);

  const {
    data,
    isFetching: reposDataLoading,
    isError: reposDataError
  } = useFetchRepo(username, shouldFetchRepo);

  const reposData = data?.data;

  return {
    shouldFetchRepo,
    reposData,
    reposDataLoading,
    reposDataError
  };
};

export default useReposValidator;
