import React,{useState} from "react";
import { collection , query, where, getDocs } from "firebase/firestore";
import { db, auth } from "../../config/firebase";
const View = () => {
  const [myDays,setMyDays] = useState(["Monday", "tuesday", "Wednesday", "Thursday", "friday", "Saturday",
    "Sunday",
  ])
  const [task,setTask]= useState([]);
 
  
  
  const viewTasksForDay=async(e)=>{
    const activeDay = e.target.value;
    console.log("selected day",activeDay);
    const user =auth.currentUser.uid;
   
      setTask([]);
    try{
      const taskref = (collection(db, "notes"));
      const q= query( taskref,  where("uid","==",user) ,where("day","==",activeDay)
    );

  const querySnapshot = await getDocs(q);
  
if(querySnapshot.empty){
  console.log("no match found");
  setTask([]);
return;
}


  
    const fetchedtasks =  querySnapshot.docs.map((doc)=>{
    const taskdata= doc.data();
    const createdAt = taskdata.createdAt;

    return{
      content: taskdata.content,
    createdAt: createdAt instanceof Date ? createdAt : new Date(createdAt),
      
    };
  });
  setTask(fetchedtasks)
  }catch(e){
    console.log("error fetcing tasks:",e)
  }
  
  };
// get data from firebase
// loop through and find task for each day 
// set the tasks value of each day in the task array of respective object
  return (
    <>
      <div className="border border-black flex items-center justify-around h-[560px]">
        {/* {<Sidebar />} */}
          <div className="border  ">
        <div className="w-[760px] h-[100px] border  justify-around  flex">

          {myDays.length &&
            myDays.map((item) => {
              return (
                <button key={item} value={item} onClick={viewTasksForDay} className="inline-flex items-center justify-center h-12 px-4 text-lg font-mono text-white transition-transform transform bg-gradient-to-br from-cyan-400 to-blue-500 rounded-md shadow-lg shadow-cyan-500/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-cyan-500/50 active:translate-y-0.5 active:shadow-inner">
                  {item}
                </button>
              );
            })}
            </div>
          <div className="bg-[#E2E3F3] border border-cyan-950">
            {task.map((item , index) => {
              return (
                <div key={index} className="">
                     <p>{item.content}</p>
                {item.createdAt && (
                  <p className="text-sm text-gray-500 border border-cyan-950">
                    Created on: {item.createdAt.toLocaleDateString()} at {item.createdAt.toLocaleTimeString()}
                  </p>
                )}  
                </div>
              )
            })}
          
            </div>
          </div>
      </div>
    </>
  );
};

export default View;
