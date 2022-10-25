import React from 'react';
import Helmet from 'react-helmet';

const Title = (props) => {
  const { title } = props;
  
  return (
    <Helmet>
      <title>
        {title ? `Books | ${title}` : `Books – FEE Assessment Deall`}
      </title>
    </Helmet>
  );
};

export default Title;
