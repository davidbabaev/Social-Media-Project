import { useEffect, useState } from "react";
import { deleteUser, getAllUsers} from "../services/apiService";

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

    useEffect(() => {
        getUsers();
    }, [])

  return {users, loading, getUsers, handleDeleteUser}
}

export default useUsers;
