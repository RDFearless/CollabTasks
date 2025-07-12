import { useSelector, useDispatch } from "react-redux"
import authService from '../api/auth';
import {Input, Button, Container} from '../components'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from "../store/authSlice"

// TODO: Add validation for inputs
// Optionally, add error message below the input fields
function EditProfile() {
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const userData = useSelector((state) => state.auth.userData);
    const [fullname, setFullname] = useState(userData?.fullname || '');
    const [username, setUsername] = useState(userData?.username || '');
    const [email, setEmail] = useState(userData?.email || '');
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true);
        setError("");
        const editedInfo = {
            fullname,
            email,
            username
        }
        
        try {
            const updsatedUserInfo = await authService.updateUser(editedInfo)
            dispatch(login(updsatedUserInfo.data))
            navigate("/profile")
        } catch (error) {
            if(error.statusCode === 500) {
                setError("Username or email already exists. Please try again with different credentials.");
            } else {
                setError(error.message || "An error occurred while updating profile.");
            }
        } finally {
            setLoading(false);
        }
    }
    
    if(loading) {
        return (
          <Container>
            <div className="flex flex-col items-center justify-center min-h-[60vh] py-8">
              <h2 className="text-2xl font-bold text-gray-600">
                Updating Information...
              </h2>
            </div>
          </Container>
        );
    }
    return (
        <div className="py-8">     
            <Container>
                <div className="max-w-3xl mx-auto">
                    <div className="bg-white shadow-md rounded-lg overflow-hidden">
                        {/* Profile Header */}
                        <div className="bg-gray-800 text-white p-6">
                            <h2 className="text-2xl font-bold">Edit Profile</h2>
                        </div>
                        
                        {/* Edit Form */}
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <div className="p-6 space-y-6">
                                <div className='flex justify-center'>
                                    {error && <p className="text-xl font-bold text-red-600">{error}</p>}
                                </div>
                                
                                <Input
                                    label= "Edit Full Name"
                                    value = {fullname}
                                    onChange={(e) => setFullname(e.target.value)}
                                />
                        
                                <Input
                                    label= "Edit Username"
                                    value = {username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                                
                                <Input
                                    label= "Edit Email"
                                    value = {email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                
                                <div className='flex justify-center mt-8'>
                                    <Button type='submit'>
                                        Save Changes
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </Container>
        </div>
        
    )
}

export default EditProfile
