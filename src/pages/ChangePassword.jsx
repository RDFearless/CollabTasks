import { useDispatch } from 'react-redux';
import authService from '../api/auth';
import {Input, Button, Container} from '../components'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { logout } from '../store/authSlice';
import { setCollection } from '../store/collectionSlice';

function ChangePassword() {
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
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
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError("")
        
        try {
            await authService.changePassword({oldPassword, newPassword})
            dispatch(logout())
            dispatch(setCollection(null))
            navigate('/login', {
                state: {
                    message: "Password changed successfully. Please login again.",
                    messageType: "info"
                }
            })
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }
    
    return (
        <div className="py-8">     
            <Container>
                <div className="max-w-3xl mx-auto">
                    <div className="bg-white shadow-md rounded-lg overflow-hidden">
                        {/* Profile Header */}
                        <div className="bg-gray-800 text-white p-6">
                            <h2 className="text-2xl font-bold">Change Password</h2>
                        </div>
                        
                        {/* Edit Form */}
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <div className="p-6 space-y-6">
                                <div className='flex justify-center'>
                                    {error && <p className="text-xl font-bold text-red-600">{error}</p>}
                                </div>
                                
                                <Input
                                    label= "Old Password"
                                    type="password"
                                    value = {oldPassword}
                                    placeholder="Enter your old password"
                                    onChange={(e) => setOldPassword(e.target.value)}
                                />
                                
                                <Input
                                    label= "New Password"
                                    type="password"
                                    value = {newPassword}
                                    placeholder="Enter your new password"
                                    onChange={(e) => setNewPassword(e.target.value)}
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

export default ChangePassword
