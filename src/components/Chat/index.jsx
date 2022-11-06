import Chat from './Chat'
import ChatList from './ChatList'

const Main = ({classes, children}) => {
  return (
    <div className={`main-content flex flex-row flex-grow transition-all duration-150 ease-in ${classes}`}>
        {children}
    </div>
  )
}

export default Main