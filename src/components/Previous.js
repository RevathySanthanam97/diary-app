import React, {useState, useEffect} from 'react'
import Navbar from './Navbar'
import database, { auth } from '../utils/firebase';
import "./Previous.css"
const Previous = () => {
        const [Data, setData] = useState([]);
        useEffect(() => {
            const ref = database.ref("/diary-app-690a6-default-rtdb");

            ref.on("child_added", snapshot => {
              const array = [];
                console.log(ref)
              // For each data in the entry
              snapshot.forEach(el => {
                // Push the object to the array
                // If you also need to store the unique key from firebase,
                // You can use array.push({ ...el.val(), key: el.key });
                array.push(el.val());
              });
              setData(array);
              console.log(array)
            });
            // Clean-up function
            return () => ref.off("value");
          }, []);
        
    return (
        <div>
            <Navbar/>
            <div className="prevContainer">
                {/* <div>
                    {Data[0]},
                    {Data[1]},
                    {Data[2]}
                </div> */}
            </div>
        </div>
    )
}

export default Previous
