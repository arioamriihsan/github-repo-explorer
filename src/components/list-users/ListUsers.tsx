import React, { useState } from 'react';
import { useFetchUsers } from 'hooks';
import { ReposDetail } from 'components/repos-detail';
import { Text } from 'common/text';
import { Loader } from 'common/loader';
import Accordion from 'common/accordion/Accordion';
import { isEmpty } from 'utils';
import style from './ListUsers.module.css';

const ListResult: React.FC = () => {
  // State to track accordion states
  const [activeAccordionId, setActiveAccordionId] = useState<number | null>(
    null
  );

  // Get user list data
  const { userListData, userListFetched, userListLoading, userListError } =
    useFetchUsers();

  /**
   * Handle click accordion. One active accordion will closed another.
   *
   * @example Accordion1 is active, so Accordion2 & Accordion3 will be close.
   * @param {number} accordionId - The ID of the accordion being clicked.
   * @returns {void}
   */
  const handleAccordionClick = (accordionId: number): void => {
    setActiveAccordionId((prevId) =>
      prevId === accordionId ? null : accordionId
    );
  };

  /** Empty state if username not found */
  const emptyState = userListFetched && isEmpty(userListData);

  return (
    <div className={style['list__users-wrapper']}>
      {userListLoading && <Loader />}

      {/* Loading state */}
      {!userListLoading && !userListError && emptyState && (
        <Text type="title" htmlTag="p">
          User Not Found
        </Text>
      )}

      {/* Error state */}
      {!userListLoading && userListError && (
        <Text type="title" htmlTag="p">
          Something Went Wrong
        </Text>
      )}

      {/* User list */}
      {!userListLoading && !emptyState && !userListError && (
        <>
          {userListData?.map((user) => (
            <Accordion
              key={user?.id}
              accordionLabel={user?.login}
              active={user?.id === activeAccordionId}
              onClick={() => handleAccordionClick(user?.id)}
            >
              <ReposDetail
                username={user?.login}
                active={user?.id === activeAccordionId}
              />
            </Accordion>
          ))}
        </>
      )}
    </div>
  );
};

export default ListResult;
