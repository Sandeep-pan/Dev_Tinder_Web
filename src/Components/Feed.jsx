import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { addFeed } from '../utils/feedSlice'
import { useDispatch, useSelector } from 'react-redux'
import UCard from './Ucard';

const Feed = () => {
const feed = useSelector((store) => store.feed);
console.log(feed);
const dispatch = useDispatch();
  const getFeed = async () => {
    if(feed) return 
    try {
      const res = await axios.get(BASE_URL + "/feed",{
        withCredentials : true,
      });
     // console.log(res)
      dispatch(addFeed(res?.data?.data));
    } catch (error) {
      console.error(error);
    }
   
  }
   useEffect(()=>{
      getFeed();
    }, [])
    if(!feed) return ;
    if(feed.length <= 0) return <h1 className="flex justify-center my-20">No New Users Found</h1>
  return (
    feed?.length >0 && (
    <div className='flex justify-center my-10'>
      <UCard user ={feed[0]} />
    </div>
    )
  );
};

export default Feed
