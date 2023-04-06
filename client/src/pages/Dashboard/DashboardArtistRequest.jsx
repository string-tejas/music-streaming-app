import React, { useEffect } from 'react'
import Dashboard from './index';
import DashboardUserCard from './DashboardUserCard';
import { getArtistRequests } from '../../api';

const DashboardArtistRequest = () => {
   
    useEffect(() => {
      getArtistRequests().then(data => console.log("data : ",data.data.requests))
    }, [])
    
  
    return (
    <>
     <Dashboard/>
     <br/>
     
     
    </>
  )
}

export default DashboardArtistRequest