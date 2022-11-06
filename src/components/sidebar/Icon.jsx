import { Link, NavLink } from "react-router-dom"


const Icon = ({icon, link, onClick}) => {

  const NavLinkActive = ({isActive}) => {
    return {
      className: isActive ? "bg-black" : "bg-white"
    }

  }

  return (
    <li className="mb-4">
      
        <NavLink to={link} className={({isActive}) => {
          return (
             "flex items-center h-10 px-3 rounded-lg text-primary hover:bg-purple-500" + (isActive ? " bg-purple-500" : "")
             );
        }} end onClick={onClick}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} /></svg>
        </NavLink>
    </li>
  )
}

export default Icon