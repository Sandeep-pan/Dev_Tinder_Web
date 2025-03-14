import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addConnection } from '../utils/connectionSlice';


const Connections = () => {
    const connections = useSelector((store) => store.connections);
    const dispatch = useDispatch();
    const [error, setError] = useState();
    const fetchConnections = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/connections",{withCredentials : true,})
            console.log(res.data.data);
            dispatch(addConnection(res.data.data));
        } catch (error) {
            setError(error?.response?.data);
        }

    }
    useEffect(()=>{
          fetchConnections();
        }, [])
        if(!connections) return
        if (connections.length == 0) return <h1 className="flex justify-center my-10">No Connections Found</h1>
  return (
    <div className="text-center my-10">
        <h1 className="text-bold text-white text-3xl">CONNECTIONS</h1>
        {connections.map((connection) => {
            const { _id, firstName, lastName, photoUrl, age, gender} = connection;
            return (
                <div key={_id} className="flex m-4 p-4 rounded-lg bg-base-300 w-1/3 mx-auto">
                <div>
                <img alt="photo" className="w-20 h-20" rounded-full="true" src={photoUrl} />
                </div>
                <div className="text-left mx-4">
                <h2 className="font-bold text-xl">{firstName +" "+ lastName}</h2>
                {age && gender && <p>{age +" , "+ gender}</p>}
                </div>
                    
                    
                </div>
            )
        })}
    </div>
  )
}

export default Connections
