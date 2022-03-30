import React, {useState} from 'react';

const STATUS = {
  HOVERED: 'hovered',
  NORMAL: 'normal',
};

const Link = ({page, children}) => {


  return (
    <a
      href={page || '#'}
    >
      {children}
    </a>
  );
};

export default Link;