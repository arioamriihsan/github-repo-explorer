import React, { ChangeEvent } from 'react';
import classNames from 'classnames';
import { Text } from 'common';
import { useFetchUsers } from 'hooks';
import { useGlobalContext } from 'context/GlobalContextProvider';
import { isEmpty } from 'utils';
import style from './Explorer.module.css';

/**
 * Explore component including:
 * - Input
 * - Button
 * - Display list of user text
 */
const Explorer: React.FC = () => {
  // Get value & function from context provider
  const { username, prevSuccessUsername, setUsername, setShouldFetchUser } =
    useGlobalContext();

  // Get user list data
  const { userListData, userListLoading } = useFetchUsers();
  
  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event?.target?.value);
  };

  const handleClick = () => {
    // Do nothing when :
    // 1. Username is empty
    // 2. Username === prevSuccessUsername
    if (!username || username === prevSuccessUsername) return;

    // Update shouldFetch value to true (see GlobalContextProvider.tsx)
    // Everytime value true, will trigger API call. if success / error value 
    // will be set to false (see useFetchUser hook)
    setShouldFetchUser(true);
  };

  return (
    <div className={style['explorer__wrapper']}>
      <input
        type="text"
        className={style['custom__input']}
        placeholder="Enter username"
        onChange={handleInput}
      />
      <button
        className={classNames(style['custom__btn'], {
          [style['disabled']]: userListLoading
        })}
        disabled={userListLoading}
        onClick={handleClick}
      >
        {userListLoading ? 'Loading' : 'Search'}
      </button>

      {!isEmpty(userListData) && prevSuccessUsername && (
        <Text type="body" htmlTag="p">
          Showing users of {`"${prevSuccessUsername}"`}
        </Text>
      )}
    </div>
  );
};

export default Explorer;
