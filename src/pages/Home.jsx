
import Header from "../components/Header"
import Sidebar from "../components/sidebar"
import Main from "../components/Chat"
import Content from "../components/Content"
import ChatList from "../components/Chat/ChatList"
import Chat from "../components/Chat/Chat"



const Home = () => {
  return (
    <>
    
    <Content pageTitle="Home">
      <Header/>
      <Main>
        <ChatList/>
        <Chat/>
      </Main> 
    </Content>
    
    </>

  )
}

export default Home