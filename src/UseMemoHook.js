import React, { useMemo, useEffect, useState } from 'react'
import { Button } from 'antd'
const baseUrl = "https://jsonplaceholder.typicode.com/component";

const UseMemoHook = () => {
    const [data, setData] = useState([]);
    const [count, setCount] = useState(0);

    //useMemo
    useEffect(() => {
        fetch(baseUrl).then(response => response.json()).then(data => setData(data))
        console.log("useEffect is rendered")
    }, [])
    console.log("re redered")

    return (
        <div>
            <center>
                <div>
                    <h2>useMemo example</h2>
                    <h3>memo value</h3>
                    <h3>counter : {count}</h3>
                    <Button onClick={() => setCount(count - 1)}>-</Button>
                    <Button onClick={() => setCount(0)}>0</Button>
                    <Button onClick={() => setCount(count + 1)}>+</Button>
                </div>
            </center>
        </div>
    )
}

export default UseMemoHook
