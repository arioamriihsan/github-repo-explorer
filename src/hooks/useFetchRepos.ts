import { useQuery } from 'react-query';
import { useGlobalContext } from 'context/GlobalContextProvider';
import { getRepos } from 'network/services';
import { LIMIT_REPO_PER_PAGE } from 'network/constant';
import { isEmpty } from 'utils';

const useFetchRepo = (username: string, enabled = false) => {
  const { repoIdHistory, setRepoIdHistory } = useGlobalContext();

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
        const reposId: number[] = [];
        resp?.data?.forEach(data => reposId.push(data?.id));

        // Assuming init search
        if (isEmpty(repoIdHistory)) {
          return setRepoIdHistory(reposId);
        } 
        // Adding new repo id to repoIsHistory
        return setRepoIdHistory(prevState => prevState.concat(reposId));
      }
    }
  );
};

export default useFetchRepo;
