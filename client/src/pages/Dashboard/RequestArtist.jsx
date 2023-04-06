import React, { useEffect } from 'react'
import { Heading } from '../Landing'
import SectionHeading from '../../components/SectionHeading'
import { useStateValue } from '../../context/StateProvider';
import './RequestArtist.css';
import { requestArtist } from '../../api';

const RequestArtist = () => {
    const [{ user }] = useStateValue();
   
    
    console.log("user : ",user);

    const onSubmit = () => {
           const data = {
            user : user._id,
            isApproved : false,
           }

           console.log("data obj :",data);

         requestArtist(data)
         .then(data => console.log("data of request  : ",data))
         .catch(error => console.log("eror in console : ",error));  


    }
    
    return (
    <>
    <Heading/>
    <br/>
    <SectionHeading>Join the community of Amazing Artists</SectionHeading>
    <br/>
    <div className='artist-div'>
        <h3 className='artist-content'> <b>Name :</b>  {user && user.name ? user.name : ""} </h3>
        <h3 className='artist-content'> <b>Current Role :</b> {user && user.role ? user.role : ""} </h3>
        <h3 className='artist-content'> <b>Email </b>: {user && user.email ? user.email : ""} </h3>
        <br/>
        <button className='submit-btn' onClick={onSubmit}>Submit Request </button>
    </div>
    </>
  )
}

export default RequestArtist