
import { Link, useNavigate } from "react-router-dom"
import * as Pages from "../constants/Routes"
import { useEffect, useState } from "react"
import { UserAuth } from "../context/UserContext"
import Header from "../components/Header"
import Content from "../components/Content"
import Main from "../components/Chat"
import InputBasic from "../components/InputBasic"
import Button from "../components/Button"
import IconBasic from "../components/IconBasic"




const LogIn = () => {

  

  const [emailAddress, setEmailAddress] = useState("")
  const [password, setPassword] = useState("")

  const isInvalid = password === "" || emailAddress === ""

  const {logIn} = UserAuth()
  const [error, setError] = useState("")
  const Navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault()
    // Set error state to empty
    setError('');

    // try to sign up user
    try {
      e.preventDefault()
      // Create user function which is located in User context
      const ref = await logIn(emailAddress, password)
      

      // go to home page
      Navigate(Pages.HOME)
      window.location.reload();
    } catch (er) {
      // console log error messages
      setError(er.message)
    }
  }

  useEffect(() => {
    // Set up page title
    document.title = "Login - ChatAPP "
  })

  return (
    <>
    <Content>
      <Header/>
      <Main classes="items-center justify-center w-full">
        <section class="">
  <div class="px-6 h-full text-primary">
    <div
      class="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6"
    >
      <div
        class="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0"
      >
        <img
          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          class="w-full"
          alt="Sample image"
        />
      </div>
      <div class="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
        <form onSubmit={handleLogin}>
          <div class="flex flex-row items-center justify-center lg:justify-start rounded">
            <p class="text-lg mb-0 mr-4">Sign in with</p>
            
            <button
              type="button"
              data-mdb-ripple="true"
              data-mdb-ripple-color="light"
              class="inline-block p-3 bg-primary text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out mx-1"
            >
              
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="w-4 h-4">
                
                <path
                  fill="currentColor"
                  d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
                />
              </svg>
            </button>

            
          </div>

          <div
            class="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
          >
            <p class="text-center font-semibold mx-4 mb-0">Or</p>
          </div>

          
          <div class="mb-6">
            
            <InputBasic name="email" type="email" w="full" classes="px-4 py-2" placeholder="Email address" id="email" onChange={({target}) => setEmailAddress(target.value)}  />
          </div>

          
          <div class="mb-6">
          <InputBasic name="password" type="password" w="full" classes="px-4 py-2" placeholder="Password" id="password" onChange={({target}) => setPassword(target.value)} />
          </div>

          <div class="flex justify-between items-center mb-6">
            <a href="#!" class="text-primary">Forgot password?</a>
          </div>

          <div class="text-center lg:text-left">
          
            <Button type="" paddingX="6" paddingY="2" rounded="lg" disabled={isInvalid}>
              Login
            </Button>
            <p class="text-sm font-semibold mt-2 pt-1 mb-0">
              Don't have an account?
              <Link to={Pages.SIGNUP} className="text-blue-900 hover:text-blue-700" >
                Register
              </Link>
              
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</section>
      </Main>
    </Content>
    </>
  )
}

export default LogIn