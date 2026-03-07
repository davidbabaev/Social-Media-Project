import { useEffect, useState } from "react";
import { banUser, deleteUser, getAllUsers, promoteUser} from "../services/apiService";

 function useUsers() {

    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)


    const getUsers = async () => {
        setLoading(true)
        try{
            const response = await getAllUsers();
            setUsers(response);
        }
        catch(err){
            console.log(err.message);
        }
        finally{
            setLoading(false)
        }
    }

    const handleDeleteUser = async (userId) => {
        try{
            await deleteUser(userId);
            setUsers(users.filter(user => user._id !== userId))

            return{
                success: true,
                message: "User deleted successfully"
            }
        }
        catch(err){
            return{
                success: false,
                message: err.message
            }
        }
    }

    const handleBanUser = async (userId) => {
        try{
            const response = await banUser(userId)
            setUsers(prev => prev.map((user) => {
                return user._id === userId ? response : user
            }))

            return{
                success: true,
                message: "User banned succefully"
            }
        }
        catch(err){
            return{
                success: false,
                message: err.message
            }
        }
    }

    const handlePromoteUser = async (userId) => {
        try{
            const response = await promoteUser(userId);
            setUsers(prev => prev.map((user) => {
                return user._id === userId ? response : user;
            }))

            return{
                success: true,
                message: 'User becam admin successfully'
            }
        }
        catch(err){
            return{
                success: false,
                message: err.message
            }
        }
    }

    useEffect(() => {
        getUsers();
    }, [])

  return {users, loading, getUsers, handleDeleteUser, handleBanUser, handlePromoteUser}
}

export default useUsers;
