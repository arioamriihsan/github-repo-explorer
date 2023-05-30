import { useQuery } from 'react-query';
import {
  useGlobalContext,
  ReposDataType
} from 'context/GlobalContextProvider';
import { getRepos } from 'network/services';
import { LIMIT_REPO_PER_PAGE } from 'network/constant';
import { isEmpty } from 'utils';
import { FetchRepoSuccessResponse } from 'network/types/response.types';

const useFetchRepo = (username: string, enabled = false) => {
  const { reposData, setReposData, setRepoRateLimit } =
    useGlobalContext();

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
        const reposArr: ReposDataType[] = [];
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
        
        // Output of reposArr be like 
        // [{username: 'arifitanto', repos: [{id: 1, name: 'Github Repo Explorer', ...}]}]
        reposArr.push({ username, repos: reposDetail });
        
        // Restore repos rate limit
        setRepoRateLimit(false);

        // Assuming init search
        if (isEmpty(reposData)) {
          return setReposData(reposArr);
        }

        // Concat to previous repos data
        return setReposData((prevState) =>
          prevState.concat(reposArr)
        );
      },
      onError: (err: any) => {
        const errStatus = err?.response?.status;

        // API rate limit
        if (errStatus === 403) {
          setRepoRateLimit(true);
        }
      }
    }
  );
};

export default useFetchRepo;
