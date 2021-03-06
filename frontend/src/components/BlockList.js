import React, { useState, useEffect, useRef } from "react";
import Block from './Block';
import { fetchJson } from '../utils';

function BlockList() {
    let [requestCount, setRequestCount] = useState(0);
    const [data, setData] = useState([]);
    let variables = JSON.stringify({item: requestCount});
    const url = `http://127.0.0.1:8080/block/list?variables=${variables}`;

    const delay = 1000;
    useInterval(() => {
        // Send a limited number of requests just to show the concept
        if (requestCount < 10) {
            fetchData(url, setData);
            setRequestCount(requestCount + 1);
        }
    }, delay);

    return (
        <section>
            <table className='table'>
                <thead>
                    <tr>
                        <th scope='col'>Hash</th>
                        <th scope='col'>Time</th>
                        <th scope='col'>Height</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((block, index) => (
                        <Block key={index} {...block} />
                    ))}
                </tbody>
            </table>
        </section>
    );
}


async function fetchData(url, setData) {
    try {
        let apiData = await fetchJson(url);
        if (apiData) {
            setData(oldData => [apiData, ...oldData]);
        }
    } catch (e) {
        console.log(e.message);
    }
}


function useInterval(callback, delay) {
    const savedCallback = useRef();

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        function tick() {
          savedCallback.current();
        }

        if (delay !== null) {
          const id = setInterval(tick, delay);
          return () => clearInterval(id);
        }
    }, [delay]);
}

export default BlockList;
