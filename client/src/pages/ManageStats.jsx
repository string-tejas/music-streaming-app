import React, { useEffect, useState } from "react";
import { getSongsByArtistName } from "../api";
import { useAuth } from "../context/AuthContext";
import { SongContainer } from "./Dashboard/DashboardSongs";

const ManageStats = () => {
    const [loading, setLoading] = useState(true);
    const [songsByThisArtist, setSongsByThisArtist] = useState([]);
    const { firebaseAuth } = useAuth();

    useEffect(() => {
        const user = firebaseAuth.currentUser;
        setLoading(true);

        getSongsByArtistName(user?.name || user?.displayName)
            .then((res) => {
                console.log(res);
                setSongsByThisArtist(res.song);
            })
            .finally(() => setLoading(false));
    }, []);

   

    return (
        <>
            <div className="mx-4 my-4 p-4 rounded-xl shadow-sm  bg-white">
                <span className="text-2xl ml-8 font-semibold">Look how your songs have performed on Musify</span>
                <br/><br/>
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
                    Album
                </th>

                <th  className="table-content">
                    Count
                </th>
                
            </tr>
        </thead>
        <tbody>
        {songsByThisArtist && songsByThisArtist.map((song, index) => {
          return(
            <tr class="table-row">
            <th className="table-row-content">
               {index + 1}
            </th>
            
            <td className="table-row-content">
            <center>   {song.name} </center>
            </td>
            <td className="table-row-content">
               <center> {song.album} </center> 
            </td>
            <td className="table-row-content">
            <center>{song.count} </center>
            </td>
            
            
        </tr>
          )
        })} 
            
        </tbody>
        <br/><br/>
    </table> </center>
</div>
            
            </div>
        
        </>
    );
};

export default ManageStats;
