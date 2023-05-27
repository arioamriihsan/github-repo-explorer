import React from 'react';
import { useFetchUsers } from 'hooks';
import { isEmpty } from 'utils';
import { Text } from 'common/text';
import { Loader } from 'common/loader';
import Accordion from 'common/accordion/Accordion';
import style from './ListResult.module.css';

const ListResult: React.FC = () => {
  // Get user list data
  const { userListData, userListFetched, userListLoading } = useFetchUsers();

  /** Empty state if username not found */
  const emptyState = userListFetched && isEmpty(userListData);

  return (
    <div className={style['list__result-wrapper']}>
      {userListLoading && <Loader />}
      {!userListLoading && emptyState && (
        <Text type="title" htmlTag="p">
          User Not Found
        </Text>
      )}
      {!userListLoading && !emptyState && (
        <>
          {userListData?.map((user) => (
            <Accordion key={user?.id} username={user?.login} />
          ))}
        </>
      )}
    </div>
  );
};

export default ListResult;
