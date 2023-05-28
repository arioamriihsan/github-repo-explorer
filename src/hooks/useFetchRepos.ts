import { useQuery } from 'react-query';
import { useGlobalContext } from 'context/GlobalContextProvider';
import { getRepos } from 'network/services';
import { LIMIT_REPO_PER_PAGE } from 'network/constant';
import { isEmpty } from 'utils';

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
      onSuccess: () => {
        const reposOwner: string[] = [];
        reposOwner.push(username);

        // Assuming init search
        if (isEmpty(reposOwnerHistory)) {
          return setReposOwnerHistory(reposOwner);
        } 
        // Adding new repo id to repoIsHistory
        return setReposOwnerHistory(prevState => prevState.concat(reposOwner));
      }
    }
  );
};

export default useFetchRepo;
