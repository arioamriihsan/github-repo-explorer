import React from 'react';
import { useReposValidator } from 'hooks';
import { useGlobalContext } from 'context/GlobalContextProvider';
import { RepoLoading, RepoDetailItem, RepoError } from './components';
import { Text } from 'common/text';
import { isEmpty } from 'utils';
import style from './ReposDetail.module.css';

export interface ReposDetailProps {
  username: string;
  active: boolean;
}

const ReposDetail: React.FC<ReposDetailProps> = ({ username, active }) => {
  const { reposOwnerHistory } = useGlobalContext();
  const { reposDataLoading, reposDataError } = useReposValidator(
    username,
    active
  );

  /** Filter repos detail by username */
  const filteredReposDetail = reposOwnerHistory?.filter(
    (repo) => repo?.username === username
  );

  const reposDetailData = filteredReposDetail[0]?.repos;
  
  return (
    <div className={style['repos__detail-wrapper']}>
      {/* Loading state */}
      {reposDataLoading && <RepoLoading />}

      {/* Error state */}
      {!reposDataLoading && reposDataError && (
        <RepoError username={username} active={active} />
      )}

      {/* Empty state */}
      {!reposDataLoading && !reposDataError && isEmpty(reposDetailData) && (
        <Text type="title" htmlTag="p" className={style['repos__empty']}>
          User Has No Repository
        </Text>
      )}

      {/* Repos detail item */}
      {!reposDataLoading &&
        !isEmpty(reposDetailData) &&
        !reposDataError &&
        [...reposDetailData].map((repo) => (
          <RepoDetailItem
            key={repo?.id}
            title={repo?.name || 'No Title'}
            star={repo?.stargazers_count || 0}
            desc={repo?.description || 'No Description'}
          />
        ))}
    </div>
  );
};

export default ReposDetail;
