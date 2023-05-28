import { useQuery } from 'react-query';
import {
  useGlobalContext,
  ReposOwnerHistory
} from 'context/GlobalContextProvider';
import { getRepos } from 'network/services';
import { LIMIT_REPO_PER_PAGE } from 'network/constant';
import { isEmpty } from 'utils';
import { FetchRepoSuccessResponse } from 'network/types/response.types';

const useFetchRepo = (username: string, enabled = false) => {
  const { reposOwnerHistory, setReposOwnerHistory } = useGlobalContext();

  return useQuery(
    ['List Repos'], // Query key
    () =>
      getRepos(username, {
        per_page: LIMIT_REPO_PER_PAGE,
        sort: 'updated'
      }),
    {
      enabled,
      onSuccess: (resp) => {
        const reposHistory: ReposOwnerHistory[] = [];
        const reposDetail = resp?.data?.map(
          ({
            id,
            name,
            stargazers_count,
            description,
            owner
          }: FetchRepoSuccessResponse) => ({
            id,
            name,
            stargazers_count,
            description,
            owner
          })
        );
        reposHistory.push({ username, repos: reposDetail });

        // Assuming init search
        if (isEmpty(reposOwnerHistory)) {
          return setReposOwnerHistory(reposHistory);
        }
        // Adding new repo id to repoIsHistory
        return setReposOwnerHistory((prevState) =>
          prevState.concat(reposHistory)
        );
      }
    }
  );
};

export default useFetchRepo;
