import React, { useEffect, useState } from 'react'
import { Heading } from '../Landing'
import SectionHeading from '../../components/SectionHeading'
import { useStateValue } from '../../context/StateProvider';
import './RequestArtist.css';
import { requestArtist } from '../../api';
import AlertError from '../../components/AlertError';
import AlertSuccess from '../../components/AlertSuccess';

const RequestArtist = () => {
    const [{ user }] = useStateValue();
    const [success, setsuccess] = useState(false);
    const [error, seterror] = useState(false);
   
    console.log("user : ",user);

    const onSubmit = () => {
           const data = {
            user : user._id,
            isApproved : false,
           }

           console.log("data obj :",data);

         requestArtist(data)
         .then(data => setsuccess(true))
         .catch(error => seterror(true));  


    }
    
    return (
    <>
    <Heading/>
    <br/>
    <SectionHeading>Join the community of Amazing Artists</SectionHeading>
    <br/>
    {success ? <AlertSuccess msg="Artist request has been sent"/> : <> </>}
     { error ? <AlertError msg="Error in sending request"/> : <> </>}
      
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