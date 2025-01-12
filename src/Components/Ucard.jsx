import axios from 'axios';
import React from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { removeUserFromFeed } from '../utils/feedSlice';

const Ucard = ({user}) => {
  const dispatch = useDispatch();
    const { _id, firstName, lastName, photoUrl, age, gender} = user;

    const handleSendRequest = async (status, userId) => {
      try {
        const res =  await axios.post(BASE_URL + "/request/send/" + status + "/" + userId, 
          {},{withCredentials:true,
          })
    dispatch(removeUserFromFeed(userId))

      } catch (error) {
        console.error(error);
      }
    }
  return (
    <div>
    <div className="card card-compact bg-base-300 w-96 shadow-xl">
<figure>
  <img
    src={user.photoUrl}
    alt="Photo" />
</figure>
<div className="card-body">
  <h2 className="card-title">{firstName + " " + lastName}</h2>
  {age && gender && <p>{age + " " + gender}</p>}
  <div className="card-actions justify-center my-4">
    <button className="btn btn-secondary" 
    onClick={() => handleSendRequest("ignored", user._id)}>Ignore</button>
    <button className="btn btn-primary"
    onClick={() => handleSendRequest("interested", user._id)}>Interested</button>
  </div>
</div>
</div>
  </div>
  )
}

export default Ucard
