import image from "../components/pexels-photo-220453.jpeg"
import IconBasic from "../components/IconBasic"
import Image from "./Image"
import InputBasic from "./InputBasic"
import * as Pages from "../constants/Routes"
import { Link } from "react-router-dom"
import { UserAuth } from "../context/UserContext"


const Header = () => {

  const {user} = UserAuth()

  
  
  return (
    <>
    
    
    <header className="header border-b border-blue-900 shadow py-4 px-4 md:py-8 transition-all duration-150 ease-in">
            <div className="header-content flex flex-center flex-row justify-between">
              <Link to={Pages.HOME}>
              <div className="logo flex flex-row justify-center items-center mx-2 md:mx-6  hover:bg-blue-900 p-2 rounded-lg">
                <div className="logo-img mr-4  font-bold">
                  <IconBasic icon="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </div>
                <div className="logo-title text-lg font-bold text-primary">
                  <h1 className="hidden sm:block">Chat APP</h1>
                </div>
              </div>
              </Link>
              
              <div className="flex flex-row justify-center items-center gap-4 mr-4 md:mr-8 transition-all duration-150 ease-in">
                <div className="form ">
                  <form>
                    <div className="hidden md:flex relative">
                      

                      <InputBasic id="search"
                        type="text"
                        name="search"
                        placeholder="Search"
                        w="48"
                        h="10"
                        pl="10"
                        />
                        
                        <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                          <IconBasic icon="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </div>
                      </div>
                      <div className="flex md:hidden">
                        <a href="#" className="flex items-center justify-center h-10 w-10 border-transparent">
                          <IconBasic icon="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </a>
                    </div>
                  </form>
                </div>

                <div className="notification cursor-pointer">
                  <IconBasic icon="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </div>

                <div className="profile-img flex ml-auto">
                  <a href className="flex flex-row items-center cursor-pointer">
                    <Image src={user?.photoURL} alt="profile image" size="8" />
                  </a>
                </div>

                <div className="mobile-menu mx-1 block md:hidden">
                <IconBasic icon="M4 6h16M4 12h16M4 18h7" />   
                
                </div>
              </div>
            </div>
    </header>

    </>
  )
}

export default Header