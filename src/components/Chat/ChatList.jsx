import IconBasic from "../IconBasic"
import Button from "../Button"
import ChatThumb from "./ChatThumb"
import { useEffect, useState } from "react"
import { collection, doc, getDoc, getDocs, onSnapshot, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore"
import { FirebaseAuth } from "../../context/FirebaseContext"
import Image from "../Image"
import { UserAuth } from "../../context/UserContext"
import { ChatAuth } from "../../context/ChatContext"

const ChatList = () => {

  const [username, setUsername] = useState("");
  const [SearchUserName, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const [chats, setChats] = useState([])

  const { db } = FirebaseAuth()
  const { user } = UserAuth()
  const { dispatch } = ChatAuth()
 console.log(SearchUserName)
  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("userName", "==", username)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      setErr(true);
      console.log("no SearchUserName")
    }
  };
  
  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  
  const handleSelect = async () => {
    //check whether the group(chats in firestore) exists, if not create
    const combinedId =
      user.uid > SearchUserName.uid
        ? user.uid + SearchUserName.uid
        : SearchUserName.uid + user.uid;
        
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create SearchUserName chats
        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: SearchUserName.uid,
            userName: SearchUserName.userName,
            photoURL: SearchUserName.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            userName: user.userName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
        
      }
    } catch (err) {}

    setUser(null);
    setUsername("")
  };

  const handleSelectChat = (u) => {
    dispatch({type:"CHANGE_USER", payload:u})
  }

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", user.uid), (doc) => {
          setChats(doc.data())
      });
    
      return () => { 
        unsub()
      }
    }
    
    user.uid && getChats()
  }, [user.uid])
  
  
 
  return (
    <>
    <div className="chat-list flex flex-col w-64 md:w-96 lg:w-128  transform -translate-x-more md:translate-x-0 transition-all duration-150 p-4 border-r border-blue-900">
      <div className="list-header flex flex-row justify-between items-center mb-4">
        <div className="list-title">
          <h1 className="font-bold text-2xl p-2">
              Chats
          </h1>
        </div>
        <div className="list-icons flex flex-row justify-between items-center mx-4">
          
              <IconBasic icon="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              <input
          type="text"
          placeholder="Find a SearchUserName"
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
          
          <div className="list-add bg-blue-900 p-1 rounded-lg">
            <IconBasic icon="M12 6v6m0 0v6m0-6h6m-6 0H6" nameClass="text-white font-black w-[8] h-[8]" />
          </div>
        </div>
      </div>

      <div className="list-categories p-2 flex flex-row flex-wrap items-center ">
        <Button weight="font-bold" rounded="xl" marginR="2" marginB="2">Open</Button>
        <Button weight="font-bold" rounded="xl" marginR="2" marginB="2">Open</Button>
        <Button weight="font-bold" rounded="xl" marginR="2" marginB="2">Open</Button>
        <Button weight="font-bold" rounded="xl" marginR="2" marginB="2">Open</Button>
        
        
        
      </div>
      
      <span class="w-full glass opacity-50 mb-4"></span>
        

      <div className="chats flex flex-col overflow-y-auto h-128 scrollbar">
      {err && <span>SearchUserName not found!</span>}
      {SearchUserName && (
        <div className="chat-thumb flex flex-row justify-between bg-blue-900 hover:bg-blue-900 w-full p-4 mb-4 rounded-lg cursor-pointer">
        <div className="flex flex-row">
          <div className="chat-img ">
              <Image src={SearchUserName.photoURL} alt="profile image" size="12" />
  
          </div>
          
          <div className="chat-content flex flex-col justify-center items-center ml-4">
              <div className="content-title font-bold text-sm">
                {SearchUserName.userName}
              </div>
              
            </div>
          </div>
          <div className=" hidden lg:flex text-sm items-center justify-end bg-green-500 rounded-lg" onClick={handleSelect}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>

          </div>
       </div>
      )} 
      
      {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat)=> (
        <ChatThumb 
          chat = {chat}
          key={chat[0]} 
          name={chat[1].userInfo.userName}
          img={chat[1].userInfo.photoURL}
          onClick={()=> handleSelectChat(chat[1].userInfo)}
          lastMessage={chat[1].lastMessage?.text
          } />
        ))}
        
      </div>
      
      <div className="feedback mt-12">
        <Button w="full" rounded="xl" weight="bold" marginT="12">
          Share feedback
        </Button>
      </div>
    </div>
    </>
    
  )
}

export default ChatList