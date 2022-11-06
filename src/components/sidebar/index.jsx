
import data from "./data.json"
import Icon from './Icon'
import * as Pages from "../../constants/Routes"
import IconBasic from "../IconBasic"
import { UserAuth } from "../../context/UserContext"
import { useNavigate } from "react-router-dom"

const Sidebar = () => {

  const { user, logout } = UserAuth();
  const Navigate = useNavigate();
  
  const handleSignOut = async (event) => {
    event.preventDefault()
    try {
        await logout()
        Navigate(Pages.HOME)
    } catch (error) {
        console.log(error.message)
    }
    
    
}
    
  return (

  <>

    
  <aside className="sidebar  w-20 border-r border-blue-900 md:shadow transform -translate-x-full md:translate-x-0 transition-transform duration-75">
        <div className="sidebar-expand flex items-center justify-center py-10">
        <IconBasic icon="M4 6h16M4 12h16M4 18h7" classes="font-bold" 
              size="6" />
        </div>

    <div className="sidebar-content flex mt-48 items-center justify-center px-4 py-6">
      <ul className="flex flex-col ">

        <Icon icon="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" link={Pages.HOME} />
        <Icon icon="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" link={Pages.SIGNUP} />
        <Icon icon="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" link={Pages.LOGIN} />
        
        <Icon icon="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" link={Pages.NOTFOUND} />

        <Icon icon="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" onClick={(e) => handleSignOut(e)} />
        
    
      </ul>
    </div>
  </aside>
    
  </>
    
  )
}

export default Sidebar