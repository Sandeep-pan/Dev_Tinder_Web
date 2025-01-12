
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addrequest, removerequest } from '../utils/requestSlice';

const Requests = () => {
    const requests = useSelector((store) => store.request)
    const [error, setError] = useState();
    const dispatch = useDispatch();
    const requestReview = async (staus, _id) => {
        try {
            await axios.post(BASE_URL + "/request/review/" + staus +"/"+ _id, 
                 {},{withCredentials:true}
            )
            dispatch(removerequest(_id));
        } catch (error) {
            setError(error?.response?.data)
        }
    }
    const fetchRequest = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/requests/recieved",
                { withCredentials: true });
            dispatch(addrequest(res.data.data))
            console.log(requests)
        } catch (error) {
            setError(error?.response?.data)
        }
    }
    useEffect(() => {
        fetchRequest();
    }, []);
    if (!requests) return <h1 className="flex justify-center my-10">loading...</h1>
    if (requests.length == 0) return <h1 className="flex justify-center my-10"> No Request Found </h1>
    return (
        <div className="text-center my-10">
            <h1 className="text-bold text-white text-3xl">CONNECTION REQUESTS</h1>
            {requests.map((request) => {
                const { _id, firstName, lastName, photoUrl, age, gender } = request.fromUserId;
                return (
                    <div key={_id} className="flex justify-between items-center m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto">
                        <div>
                            <img alt="photo" className="w-20 h-20" rounded-full="true" src={photoUrl} />
                        </div>
                        <div className="text-left mx-4">
                            <h2 className="font-bold text-xl">{firstName + " " + lastName}</h2>
                            {age && gender && <p>{age + " , " + gender}</p>}
                        </div>
                         <div>
                         <button className="btn btn-primary mx-2" 
                         onClick={() => requestReview("rejected",request._id)}>Reject</button>
                         <button className="btn btn-secondary mx-2"
                         onClick={() => requestReview("accepted",request._id)}>Accept</button>
                         </div>

                    </div>
                )
            })}
        </div>
    )
}


export default Requests
