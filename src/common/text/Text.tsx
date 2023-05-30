import * as React from 'react';
import classNames from 'classnames';
import style from './Text.module.css';

type TextTypes = 'title' | 'body' | 'desc';

interface TextProps {
  /**
   * Text type. Default to 'body'
   */
  type?: TextTypes;

  /**
   * Custom html tag used if needed
   */
  htmlTag?: keyof JSX.IntrinsicElements;

  /**
   * Additional className you want to add to the html tag
   */
  className?: string;

	/**
	 * For the purpose of testing
	 */
	testid?: string;
};

/**
 * Common text component. This generalise styling for every text in app
 */
const Text: React.FC<React.PropsWithChildren<TextProps>> = ({
  children,
  type = 'body',
  htmlTag = 'p',
  className,
  testid
}) => {
  /**
   * Basically react does not support expression for defining tags, so we
   * need to define the variable again
   *
   * @see {@link https://reactjs.org/docs/jsx-in-depth.html#choosing-the-type-at-runtime}
   */
  const CustomTag = htmlTag;

  return (
    <CustomTag
      className={classNames(style[type], className)}
      data-testid={testid}
    >
      {children}
    </CustomTag>
  );
};

export default Text;
