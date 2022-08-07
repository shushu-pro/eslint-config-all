import React, { memo, useEffect, useState } from 'react';

export default memo(View);

function View(props) {
  const [name, setName] = useState('xx');

  useEffect(() => {
    setName('yyy');
  }, []);

  return <div>{name}</div>;
}
