import React, { useEffect, useState } from 'react'
import { Heading } from './Landing'
import { getTrendingSongs } from '../api'
import SongCard from '../components/SongCard'


const Trending = () => {
const [songs, setSongs] = useState([]);
  useEffect(() => {
    getTrendingSongs()
    .then( data => setSongs(data.data.song))
    .catch( err => console.log( " error in trending : ",err));
  }, [])

  
  
  return (
    <>
    <Heading/>
    <div className='col-12'>
      <h3>Trending Songs</h3>
       <div className='row'>
        {songs.map((song, index) => {
          return(
            <div className='col-3'>
              <SongCard song={song}/>
            </div>
          )
        })}
       </div>
    </div>
    </>
  )
}

export default Trending