import { arrayUnion, doc, onSnapshot, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import IconBasic from "../../components/IconBasic"
import { ChatAuth } from '../../context/ChatContext'
import { FirebaseAuth } from '../../context/FirebaseContext'
import { UserAuth } from '../../context/UserContext'
import InputBasic from '../InputBasic'
import Message from './Message'
import { v4 as uuid } from "uuid"
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { storage } from '../../lib/Firebase'

const Chat = () => {
  const {user} = UserAuth()
  const { data } = ChatAuth()
  const { db } = FirebaseAuth()
  const [message, setMessages] = useState([])
  const [image, setImage] = useState(null)
  const [text, setText] = useState("");


  const handleMessage = async () => {
    if (image) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        (error) => {
          //TODO:Handle Error
        },
        () => {
          
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: user.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      console.log(data.chatId)
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: user.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", user.uid), {
      [data.chatId+".lastMessage"]:{
        text
      },
      [data.chatId+".date"]: serverTimestamp(),
    })
    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId+".lastMessage"]:{
        text
      },
      [data.chatId+".date"]: serverTimestamp(),
    })
    setText("")
    setImage(null)
  }

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);
  

  return (
    <>
        <div className="flex flex-col flex-grow -ml-64 md:ml-0 p-4 justify-between">
        <div className="flex flex-row items-center justify-between h-1/6">
          <div className='flex flex-row items-center '>
            <div className="chat-expand">
            <svg className="w-12 h-12 mr-4 block md:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z" /></svg>
            </div>
            <div className='chat-title'>
                <h1 className="text-2xl font-bold p-2">
                  {data.user?.userName}
                </h1>
            </div>
          </div>
          
          <div className="file-button ">
            <IconBasic icon="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </div>
          
              
          </div>

          <div className="Chat-section h-128 overflow-y-auto scrollbar">
            {message.map((m) => (
              <Message message={m} key={m.id}/>
              ))}
          </div>

          <div className="bottom-8 h-1/6 flex items-center justify-center">
            
              <div className="send-file mr-4 ml-4">
                <input type="file" id="file-upload" className='hidden' onChange={(e)=>setImage(e.target.files[0])} />
                <label htmlFor="file-upload" className='cursor-pointer'>
                  <IconBasic icon="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </label>
              </div>
              
              <InputBasic type="text" placeholder="Write a message..." h="10" w="full" pl="2" onChange={(e)=>setText(e.target.value)} value={text}/>

              
              <button type="submit " onClick={handleMessage}>
              <IconBasic icon="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" classes="ml-4 mr-4" 
              size="6"  />
              
              </button>
            
          </div>
        </div>
    </>
    
  )
}

export default Chat