import React from 'react';
import { Star } from 'react-feather';
import classNames from 'classnames';
import style from './RepoLoading.module.css';

const RepoLoading: React.FC = () => {
  return (
    <div className={style['repo__loader-wrapper']}>
      <div className={style['repo__loader-header']}>
        <div
          className={classNames([style['repo__loader']], [style['title']])}
        />
        <div className={style['rating__loader']}>
          <div
            className={classNames([style['repo__loader']], [style['rating']])}
          />
          <Star fill="#333" />
        </div>
      </div>
      <div className={style['repo__loader-desc']}>
        <div className={classNames([style['repo__loader']], [style['desc1']])} />
        <div className={classNames([style['repo__loader']], [style['desc2']])} />
        <div className={classNames([style['repo__loader']], [style['desc3']])} />
      </div>
    </div>
  );
};

export default RepoLoading;
