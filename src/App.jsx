import React from 'react'
import "./App.css"
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './pages/home/Home'
import Header from './components/header/Header'
import Verify from './pages/auth/Verify'
import Register from './pages/auth/Register'
import Login from './pages/auth/Login'
import Footer from './components/footer/Footer'
import About from './pages/about/About'
import Account from './pages/Account/Account'
import {UserData} from './context/UserContext'
import Loading from './components/loading/Loading'
import Courses from './pages/courses/Courses'
import Coursedescription from './pages/Coursedescription/Coursedescription'
import Paymentsuccess from './pages/Paymentsuccess/Paymentsuccess'
import Dashboard from './dashboard/Dashboard'
import CourseStudy from './pages/coursestudy/CourseStudy'
import Lecture from './pages/Lecture/Lecture'
import AdminDashboard from './Admin/Dashboard/AdminDashboard'
import AdminCourses from './Admin/Courses/AdminCourses'
import Forgot from './pages/auth/Forgot'
import ResetPassword from './pages/auth/ResetPassword'
import AuthSuccess from './pages/auth/AuthSuccess'
import Bot from './pages/Bot/Bot'

const App = () => {
  const {isAuth,user,loading }=UserData()
  return (
    <>
   {loading?  (
   <Loading/>):(
   
   <BrowserRouter>
   <Header isAuth={isAuth}/>
   <Routes>
       <Route path="/" element={<Home/>}/>
       <Route path="/about" element={<About />}/>
       <Route path="bot" element={<Bot/>}></Route>
       <Route path="/courses" element={<Courses/>}/>
       <Route path="/login" element={ isAuth?<Home/> : <Login/>}/>
       <Route path="/account" element={ isAuth?<Account user={user}/> :<Login/>}/>
       <Route path="/register" element={ isAuth?<Home/> : <Register/>}/>
       <Route path="/verify" element={isAuth?<Home/> : <Verify/>}/>
       <Route path="/course/:id" element={isAuth?<Coursedescription user={user} />:<Login/>}/>
       <Route path="/payment-success/:id" element={isAuth?<Paymentsuccess user={user}/> :<Login/> } />
       <Route path="/:id/dashboard" element={isAuth?<Dashboard user={user}/> :<Login/> } />
       <Route path="/course/study/:id" element={isAuth?<CourseStudy user={user}/> :<Login/> } />
       <Route path="/lecture/:id" element={isAuth?<Lecture user={user}/> :<Login/> } />
       <Route path="/admin/dashboard" element={isAuth && user?.role === "admin" ? <AdminDashboard user={user} /> : isAuth && user ? <Home/> : <Login/> } />
       <Route path="/admin/course" element={isAuth && user?.role === "admin" ? <AdminCourses user={user} /> : isAuth && user ? <Home/> : <Login/> } />
       <Route path="/forgot" element={isAuth ?<Home/> : <Forgot/>}/>
       <Route path="/reset-password/:token" element={isAuth ?<Home/> : <ResetPassword/>}/>
       <Route path="/auth-success" element={<AuthSuccess/>}/>
   </Routes>
  
   <Footer/>
   </BrowserRouter>)}
   
  </>
  )
}

export default App
