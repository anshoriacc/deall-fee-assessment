import React from 'react';
import Helmet from 'react-helmet';

const Title = (props) => {
  const { title } = props;
  
  return (
    <Helmet>
      <title>
        {title ? `BluBooks | ${title}` : `BluBooks – Deall's FEE Assessment`}
      </title>
    </Helmet>
  );
};

export default Title;
