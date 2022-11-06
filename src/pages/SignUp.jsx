
import { Link, useNavigate } from "react-router-dom"
import * as Pages from "../constants/Routes"
import { UserAuth } from "../context/UserContext"
import { useState } from "react"
import Content from "../components/Content"
import Header from "../components/Header"
import Main from "../components/Chat"
import InputBasic from "../components/InputBasic"
import Button from "../components/Button"
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"
import { FirebaseAuth } from "../context/FirebaseContext"
import { updateProfile } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"; 




const SignUp = (e) => {

  const [userName, setUserName] = useState("")
  const [emailAddress, setEmailAddress] = useState("")
  const [fullName, setFullName] = useState("")
  const [password, setPassword] = useState("")
  const [passwordRepeat, setPasswordRepeat] = useState("")
  const [file, setFile] = useState(null)
  
  
  const isInvalid = password !== passwordRepeat

  // user auth context
  const {createUser} = UserAuth()
  const {storage, db} = FirebaseAuth()
  const [error, setError] = useState("")
  const Navigate = useNavigate();
  
  
  
  const handleLogin = async (e) => {
    e.preventDefault()
    
    // try to sign up user
    try {
      const res = await createUser(emailAddress, password)
      
      //Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${userName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              userName,
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              userName,
              emailAddress,
              photoURL: downloadURL,
            });

            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
            Navigate(Pages.HOME)
            window.location.reload();
          } catch (err) {
            console.log(err);
            
          }
        });
      });

      
      // go to home page
      
    } catch (er) {
      console.log(er.code)
      if(er.code === "auth/email-already-in-use") {
        setError("This email already exists")
      }
      else if (er.code === "auth/weak-password") {
        setError("The password is too week (should consist of at least 6 characters)")
      }
    }
    
  }

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
        <form onSubmit={handleLogin} method="POST">
          <div class="flex flex-row items-center justify-center lg:justify-start rounded">
            <p class="text-lg mb-0 mr-4">Sign up with</p>
            
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
            
            <InputBasic name="username" type="text" w="full" classes="px-4 py-2" placeholder="Username" id="username" onChange={({target}) => setUserName(target.value)}  />
          </div>

          <div class="mb-6">
            
            <InputBasic name="full-name" type="text" w="full" classes="px-4 py-2" placeholder="Full name" id="full-name" onChange={({target}) => setFullName(target.value)}  />
          </div>

          
          <div class="mb-6">
          <InputBasic name="email" type="email" w="full" classes="px-4 py-2" placeholder="Email Address" id="email" onChange={({target}) => setEmailAddress(target.value)} />
          </div>

          <div class="mb-6">
          <InputBasic name="password" type="password" w="full" classes="px-4 py-2" placeholder="Password" id="password" onChange={({target}) => setPassword(target.value)} />
          </div>

          <div class="mb-6">
          <InputBasic name="password-repeat" type="password" w="full" classes="px-4 py-2" placeholder="Repeat password" id="password-repeat" onChange={({target}) => setPasswordRepeat(target.value)} />
          </div>

          <div class="mb-6">
          <InputBasic name="photo" type="file" w="full" classes="px-4 py-2"  id="file" onChange={({target}) => setFile(target.files[0])} />
          </div>


          <div class="text-center lg:text-left">
          
            <Button type="" paddingX="6" paddingY="2" rounded="lg" disabled={isInvalid} >
              Sign up
            </Button>
            <p class="text-sm font-semibold mt-2 pt-1 mb-0">
              Already have an account?
              <Link to={Pages.LOGIN} className="text-blue-900 hover:text-blue-700" >
                Login
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

export default SignUp