import { Button } from 'antd';
import React, { useEffect, useState } from 'react'
import Unmount from './Unmount';

const LifecyclePage = () => {
  const [mount, setMount] = useState(false)
  const [count, setCount] = useState(0);
  function incrementCount() {
    setCount(prevState => prevState + 1);
  }
  //mounting phase

  useEffect(() => {
    setMount(true)
    console.log("component mounted");

    return () => {
      setMount(false);
      console.log("component unmounted")
    }
  }, []);

  //updating phase

  useEffect(() => {
    if (mount) {
      console.log("component updated");
    }

  }, [count, mount]);

  //unmounting phase

  // useEffect(() => {
  //   return () => {
  //     console.log("unmounting phase");
  //   }
  // }, [count]);

  return (
    <div>
      <center>
        <h3>Lifecycle  methods Example</h3>
        <p>Count: {count}</p>
        <Button onClick={() => incrementCount()}>Increment count</Button>
        <h2>{count}</h2>
        {/* <Unmount/> */}
      </center>
    </div>
  )
}

export default LifecyclePage