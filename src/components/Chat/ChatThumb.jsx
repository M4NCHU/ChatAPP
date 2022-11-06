import React from 'react'
import image from "../../components/pexels-photo-220453.jpeg"
import Image from '../Image'

const ChatThumb = ({name, img, onClick, lastMessage, chat}) => {

  
  return (
    <>
     <div  className="chat-thumb flex flex-row justify-between glass hover:bg-blue-900 w-full p-4 mb-4 rounded-lg cursor-pointer" onClick={onClick}>
      <div className="flex flex-row">
        <div className="chat-img ">
            <Image src={img} alt="profile image" size="12" />

        </div>
        
        <div className="chat-content flex flex-col justify-center ml-4">
          <div className="content-title font-bold text-sm">
              {name}
            </div>
            <div className="content-message opacity-80 text-sm ">
              {lastMessage}
            </div>
          </div>
        </div>
        <div className="chat-time hidden lg:flex text-sm items-center justify-end  ">
            12 min ago
        </div>
     </div>
    </>
  )
}

export default ChatThumb