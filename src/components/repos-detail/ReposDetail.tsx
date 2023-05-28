import React from 'react';
import { Star } from 'react-feather';
import { Text } from 'common/text';
import style from './ReposDetail.module.css';

interface ReposDetailProps {
	active: boolean;
}

const ReposDetail: React.FC<ReposDetailProps> = ({ active }) => {
  return (
    <div className={style['repos__detail']}>
      <div className={style['repos__detail-header']}>
        <Text type="title" htmlTag="p">
          Repository Title
        </Text>
        <div className={style['rating']}>
          <Text type="title" htmlTag="p">
            12
          </Text>
          <Star fill="#333" />
        </div>
      </div>
      <Text type="body" htmlTag="p">
        Repository Description
      </Text>
    </div>
  );
};

export default ReposDetail;
