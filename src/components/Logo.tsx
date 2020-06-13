import React from 'react';

function Logo(props: JSX.IntrinsicAttributes & React.ClassAttributes<HTMLImageElement> & React.ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <img
      alt="Logo"
      src="/static/logo.png"
      {...props}
    />
  );
}

export default Logo;