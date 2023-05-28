import React from 'react';
import { Star } from 'react-feather';
import { Text } from 'common/text';
import style from './RepoDetailItem.module.css';

interface RepoDetailItemProps {
  title: string;
  star: number;
  desc: string;
}

const RepoDetailItem: React.FC<RepoDetailItemProps> = ({
  title,
  star,
  desc
}) => {
  return (
    <div className={style['repo__item-wrapper']}>
      <div className={style['repo__item-header']}>
        <Text type="title" htmlTag="p">
          {title}
        </Text>
        <div className={style['rating']}>
          <Text type="title" htmlTag="p">
            {star}
          </Text>
          <Star fill="#333" />
        </div>
      </div>
      <Text type="body" htmlTag="p">
        {desc}
      </Text>
    </div>
  );
};

export default RepoDetailItem;
