import { Button, Input } from 'antd'
import React, { useEffect, useState, useLayoutEffect, useRef } from 'react'
const baseUrl = "https://jsonplaceholder.typicode.com/component";

const Hooks = () => {
    const [number, setNumber] = useState(0);

    const [data, setData] = useState([]);

    useEffect(() => {
        console.log("useeffect is executed" + number)
    }, [])

    useLayoutEffect(() => {
        console.log("useLayouteffect is executed" + number)
    }, [number])




    return (
        <div>
            <center>
                <div>
                    <h3>difference between useEffect and useLayoutEffect</h3>
                    <h3>input value: {number}</h3>
                    <Input type='number' onChange={(e) => setNumber(e.target.value)} />
                </div>
            </center>


        </div>
    )
}

export default Hooks