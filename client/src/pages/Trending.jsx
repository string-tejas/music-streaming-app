import React, { useEffect } from 'react'
import { Heading } from './Landing'
import { getTrendingSongs } from '../api'

const Trending = () => {
  useEffect(() => {
    getTrendingSongs()
    .then( data => console.log(" data : ", data.data.song))
    .catch( err => console.log( " error in trending : ",err));
  }, [])
  
  return (
    <>
    <Heading/>
    <div className=''>
      <h3>Trending Songs</h3>
    </div>
    </>
  )
}

export default Trending