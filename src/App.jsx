import { Outlet } from "react-router-dom"
import { Footer, Header } from "./components"
import { useDispatch } from "react-redux"
import authService from "./api/auth"
import { useState, useEffect } from "react"
import { login, logout } from "./store/authSlice"

function App() {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    authService.getCurrentUser()
    .then((response) => {
      if(response) {
        dispatch(login(response.data.data))
      } else {
        dispatch(logout())
      }
    })
    
    setLoading(false)
  }, [])
  
  return (
    loading ? <div className="flex justify-center items-center h-screen">Loading...</div> :
    <>
      <Header/>
        <Outlet/>
      <Footer/>
    </>
  )
}

export default App
