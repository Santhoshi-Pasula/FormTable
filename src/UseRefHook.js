
import React, { useRef } from 'react'
import { Button } from 'antd';

const UseRefHook = () => {
    
    const count = useRef(0);
    const checkValue = () => {
        count.current++;
        console.log("count value :" + count.current)
    }
    return (
        <div>
            <center>
                <h3>useRef example</h3>
                {/* <h1>{count.current}</h1> */}
                <Button onClick={checkValue}>check value</Button>
            </center>
        </div>
    )
}

export default UseRefHook
