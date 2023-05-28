import React, { PropsWithChildren } from 'react';
import { ChevronDown } from 'react-feather';
import classNames from 'classnames';
import { Text } from 'common/text';
import { useToggle } from 'hooks';
import { ReposDetail } from './components';
import style from './Accordion.module.css';

export interface AccordionProps {
  username: string;
}

const Accordion: React.FC<PropsWithChildren<AccordionProps>> = ({
  username
}) => {
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

      {active && <ReposDetail username={username} active={active} />}
    </div>
  );
};

export default Accordion;
