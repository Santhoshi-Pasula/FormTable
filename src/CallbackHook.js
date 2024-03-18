import React, { useState, useCallback } from 'react';
import { Button } from 'antd';

const CallbackHook = () => {
  const [count, setCount] = useState(0);

  
  const handleClick = useCallback(() => {
    setCount(count + 1);
  }, [count]);

  return (
    <div>
      <center>
        <h3>useCallback example</h3>
      <p>Count: {count}</p>
      
      <Button onClick={handleClick}>Increment Count</Button>
      </center>
    </div>
  );
};

export default CallbackHook;
