import React from 'react'
import image from "../../components/pexels-photo-220453.jpeg"
import { ChatAuth } from '../../context/ChatContext'
import { UserAuth } from '../../context/UserContext'
import Image from '../Image'

const Message = (message) => {

    const {user} = UserAuth()
    const {data} = ChatAuth()

    console.log(message)
  return (
    <>
    <div className={`message flex ${message.senderId === user.uid ? "flex-row" : "flex-row-reverse"} `}>
        <div className="message-img px-4 ">
            <Image src={message.senderId === user.uid ? user.photoURL : data.user.photoURL} alt="profile image" size="8" />
        </div>
        <div className="message-content flex flex-col">
            <p className={`${message.senderId === user.uid ? "glass" : "bg-blue-900"} w-full text-purple-200 font-bold py-1 px-4 border border-none rounded-xl mr-2 mb-2`}>
                {message?.message.text}
            </p>
            {message?.message.img && <img src={message?.message.img} alt="profile image"  />}
        </div>
    </div>
    
    </>
  )
}

export default Message