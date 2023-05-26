import React from 'react';
import { ChevronDown, Star } from 'react-feather';
import classNames from 'classnames';
import { useToggle } from 'hooks';
import { Text } from 'common/text';
import style from './Accordion.module.css';

interface AccordionProps {
  username: string;
}

const Accordion: React.FC<AccordionProps> = ({ username }) => {
  const { active, toggleActive } = useToggle();

  return (
    <div className={style['accordion__wrapper']} onClick={toggleActive}>
      <div
        className={classNames(style['accordion__header'], {
          [style['active']]: active
        })}
      >
        <Text type="title" htmlTag="p">
          {username}
        </Text>
        <ChevronDown />
      </div>

      {active && (
        <div className={style['accordion__detail']}>
          <div className={style['accordion__detail-header']}>
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
          <Text type='body' htmlTag='p'>Repository Description</Text>
        </div>
      )}
    </div>
  );
};

export default Accordion;
