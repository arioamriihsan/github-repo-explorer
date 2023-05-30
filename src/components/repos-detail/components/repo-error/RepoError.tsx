import React from 'react';
import { useReposValidator } from 'hooks';
import { useGlobalContext } from 'context/GlobalContextProvider';
import { Text } from 'common';
import { ReposDetailProps } from 'components/repos-detail/ReposDetail';
import style from './RepoError.module.css';

interface RepoErrorProps extends ReposDetailProps {}

const RepoError: React.FC<RepoErrorProps> = ({ username, active }) => {
  const { repoRateLimit } = useGlobalContext();

  const { refetchRepos } = useReposValidator(username, active);
  
  return (
    <div className={style['repo__error']}>
      <Text type="title" htmlTag="p">
        {repoRateLimit ? 'API Rate Limit' : 'Something Went Wrong'}
      </Text>
      <Text type="body">Please Try Again</Text>
      <button className={style['repo__error-btn']} onClick={refetchRepos}>
        Reload
      </button>
    </div>
  );
};

export default RepoError;
