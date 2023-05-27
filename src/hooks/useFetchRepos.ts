import { useQuery } from 'react-query';
import { getRepos } from 'network/services';
import { LIMIT_REPO_PER_PAGE } from 'network/constant';

const useFetchRepo = (username: string) => {
  return useQuery(
    ['List Repos'], // Query key
    () =>
      getRepos(username, {
        per_page: LIMIT_REPO_PER_PAGE,
        sort: 'updated'
      }),
    {
      enabled: true
    }
  );
};

export default useFetchRepo;
