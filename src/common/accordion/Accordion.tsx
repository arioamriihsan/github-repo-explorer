import React, {
  PropsWithChildren,
  ReactElement,
  Children,
  cloneElement
} from 'react';
import { ChevronDown, ChevronUp } from 'react-feather';
import { Text } from 'common';
import style from './Accordion.module.css';

interface AccordionProps {
  accordionLabel: string;
  active: boolean;
  onClick: () => void;
}

const Accordion: React.FC<PropsWithChildren<AccordionProps>> = ({
  accordionLabel,
  active,
  onClick,
  children
}) => {
  return (
    <div className={style['accordion__wrapper']}>
      <div className={style['accordion__header']}>
        <Text type="title" htmlTag="p">
          {accordionLabel}
        </Text>
        <span onClick={onClick}>
          {active ? <ChevronUp /> : <ChevronDown />}
        </span>
      </div>

      {/* Show accordion body when active is true */}
      {active && (
        <div className={style['accordion__body']}>
          {Children.map(children, (child) =>
            // Passing prop active to children
            cloneElement(child as ReactElement<any>, { active })
          )}
        </div>
      )}
    </div>
  );
};

export default Accordion;
