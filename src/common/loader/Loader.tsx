import React from 'react';
import style from './Loader.module.css';

const Loader: React.FC = () => {
  return (
    <div className={style['loader__wrapper']}>
      <div className={style['loader']} />
    </div>
  );
};

export default Loader;
