import { useEffect } from "react"
import Sidebar from "./sidebar"


const Content = ({children}) => {

  useEffect(() => {
    // Set up page title
    document.title = "Home - ChatAPP "
  })


  return (
    <>
    <div className="flex flex-row min-h-screen text-primary">
        <Sidebar/>
              
        <main className="main flex flex-col flex-grow -ml-20 md:ml-0 transition-all duration-150 ease-in">
            {children}
        </main>
    </div>
    </>
  )
}

export default Content