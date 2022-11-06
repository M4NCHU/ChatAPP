
import Header from "../components/Header"
import Sidebar from "../components/sidebar"
import Main from "../components/Chat"



const Home = () => {
  return (
    <>
    
    <div className="flex flex-row min-h-screen text-primary">
        <Sidebar/>
              
        <main className="main flex flex-col flex-grow -ml-20 md:ml-0 transition-all duration-150 ease-in">
            <Header/>
            <Main/>
        </main>
    </div>
    </>

  )
}

export default Home