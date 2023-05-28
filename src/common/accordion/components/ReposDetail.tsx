import React from 'react';
import { Star } from 'react-feather';
import { useReposValidator } from 'hooks';
import { Text } from 'common/text';
import { AccordionProps } from 'common/accordion/Accordion';
import style from './ReposDetail.module.css';

interface ReposDetailProps extends AccordionProps {
  active: boolean;
}

const ReposDetail: React.FC<ReposDetailProps> = ({ username, active }) => {
  const { shouldFetchRepo } = useReposValidator(username, active);

  if (!shouldFetchRepo) return null;

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
