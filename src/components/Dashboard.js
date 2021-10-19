import { useState } from 'react';
import database, { auth } from '../utils/firebase';
import "./Dashboard.css";

const Dashboard = () => {
    const today = new Date();
    var date =  today.getFullYear() + " " + today.toLocaleString('default', { month: 'long' }) + " " + today.getDate() + ", " + today.getHours() + ":" + ("0"+String(today.getMinutes())).slice(-2);
    const diaryDate = date;
    const reference = auth.currentUser.displayName;
    const [diaryName , setdiaryName] = useState(date);
    const [diaryStory , setdiaryStory] = useState();
    const [isActive, setActive] = useState(true);

    // const [newstory , setnewstory] = useState({});
    const handleNewStory = () => {
    // database.ref(diaryDate).set(
    //     {
    //             diaryName : diaryName,
    //             diaryDate : diaryDate,
    //             diaryStory: diaryStory,
    //     }).catch(alert);
        setActive(false) 
      }
     
    return (
        <div className="Dashboard">
            <div className="Dashboard__Title"> 
            <p className="Dashboard__Greeting">Welcome Home {reference}</p>
            <p className="Dashboard__Today">{diaryDate}</p>
            </div>
            <div className={isActive ? "Dashboard__Container" : "Dashboard__Container active"}>
                <div className={isActive ? "Dashboard__DiaryName" : "Dashboard__DiaryName active"}>Today's Story&nbsp;&nbsp;&nbsp;&nbsp;<input placeholder={date} defaultValue={date} value={diaryName} onChange={(e) => setdiaryName(e.target.value)}/></div>
                <div className={isActive ? "Dashboard__DiaryStory" : "Dashboard__DiaryStory active"}><textarea  placeholder="Your Story" value={diaryStory} onChange={(e) => setdiaryStory(e.target.value)}/></div>
                <div className={isActive ? "Dashboard__Update" : "Dashboard__Update active"}><button onClick={handleNewStory}>Update Your Story</button></div>
                <div className={isActive ? "Dashboard__StoryUpdated" : "Dashboard__StoryUpdated active"}>
                    <div>
                        <p>Story Updated</p>
                        <button onClick={() => {setActive(true); console.log(isActive)}}>OK</button>
                    </div>
                </div>
            </div>
           
        </div>
    )
}

export default Dashboard
