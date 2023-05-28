import React from 'react';
import { useReposValidator } from 'hooks';
import { Text } from 'common/text';
import { ReposDetailProps } from 'components/repos-detail/ReposDetail';
import style from './RepoError.module.css';

interface RepoErrorProps extends ReposDetailProps {}

const RepoError: React.FC<RepoErrorProps> = ({ username, active }) => {
  const { refetchRepos } = useReposValidator(username, active);

  return (
    <div className={style['repo__error']}>
      <Text type="title" htmlTag="p">
        Something Went Wrong
      </Text>
      <Text type="body">Please Try Again</Text>
      <button className={style['repo__error-btn']} onClick={refetchRepos}>
        Reload
      </button>
    </div>
  );
};

export default RepoError;
