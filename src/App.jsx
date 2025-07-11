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
      setTimeout(() => {}, 2000)
      if(response) {
        dispatch(login(response.data))
      } else {
        dispatch(logout())
      }
    })
    
    setLoading(false)
  }, [])
  
  return (
    loading ? <p className="text-green-500 text-3xl">Loading...</p> :
    <div>
      <Header/>
        <Outlet/>
      <Footer/>
    </div>
  )
}

export default App
