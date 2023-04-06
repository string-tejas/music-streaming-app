import React, { useEffect, useState } from 'react'
import Dashboard from './index';
import DashboardUserCard from './DashboardUserCard';
import { approveRequestProperty, changeUserToArtist, getArtistRequests } from '../../api';
import SectionHeading from '../../components/SectionHeading';
import './DashboardArtistRequest.css';
import AlertSuccess from '../../components/AlertSuccess';
import AlertError from '../../components/AlertError';

const DashboardArtistRequest = () => {

    const [requests, setRequests] = useState([]);
    const [success, setsuccess] = useState(false);
    const [error, seterror] = useState(false);
   
    useEffect(() => {
      getArtistRequests().then(data => setRequests(data.data.requests));
   
    }, [])
    
    console.log("requests : ", requests);

    const approveArtist = (request) => {
       console.log(" id :" , request.user._id);
       changeUserToArtist(request.user._id)
       .then( data => setsuccess(true))
       .catch(err => seterror(true))
       approveRequestProperty(request._id)
       .then( data => console.log("success in update property : ", data))
       .catch(err => console.log("err in role 2 : ", err))
    }
  
    return (
    <>
     <Dashboard/>
     {success ? <AlertSuccess msg="Artist request has been approved"/> : <> </>}
     { error ? <AlertError msg="Error in approving Artist"/> : <> </>}
      
     <SectionHeading>Approve Requests </SectionHeading>

     <div class="">
    <center><table class="main-div">
        <thead class="table-head">
            <tr>
                <th  className="table-content">
                    Sr. No
                </th>
                <th  className="table-content">
                    Name
                </th>
                <th  className="table-content">
                    Email
                </th>
                <th  className="table-content">
                    Approval Status
                </th>
                <th  className="table-content">
                    Approve
                </th>
                
            </tr>
        </thead>
        <tbody>
        {requests && requests.map((request, index) => {
          return(
            <tr class="table-row">
            <th className="table-row-content">
               {index + 1}
            </th>
            <td className="table-row-content">
            <center>   {request.user.name} </center>
            </td>
            <td className="table-row-content">
               <center> {request.user.email} </center> 
            </td>
            <td className="table-row-content">
            <center>{"Not Approved "} </center>
            </td>
            <td className="table-row-content">
            <center> <button className='approve-btn' onClick={ ()=> approveArtist(request)}>Approve</button> </center>
            </td>
            
        </tr>
          )
        })} 
            
        </tbody>
    </table> </center>
</div>

     
    </>
  )
}

export default DashboardArtistRequest

/*
<tr class="">
                <th scope="row" class="">
                    Apple MacBook Pro 17"
                </th>
                <td class="px-6 py-4">
                    Silver
                </td>
                <td class="px-6 py-4">
                    Laptop
                </td>
                <td class="px-6 py-4">
                    $2999
                </td>
                <td class="px-6 py-4 text-right">
                    <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                </td>
            </tr>
            
            */
/* 
     <ol>
        <div>
              <span className='request-content'>Sr. No.</span>
              <span className='request-content'>Name</span>
              <span className='request-content'>Email</span>
              <span className='request-content'>Status</span>
        </div>
        {requests && requests.map((request, index) => {
          return(
            <li key={index}> 
              <span className='request-content'>{index + 1}</span>
              <span className='request-content'>{request.user.name}</span>
              <span className='request-content'>{request.user.email}</span>
              <span className='request-content'>
                <button className='' onClick={ ()=> approveArtist(request)}>Approve</button></span>
               </li>
          )
        })}
      </ol>
*/