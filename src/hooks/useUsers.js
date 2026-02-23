import { useEffect, useState } from "react";
import { getAllUsers, updateUser } from "../services/apiService";

 function useUsers() {

    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)


    useEffect(() => {
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
        getUsers();
    }, [])

    const editUser = async (userId, updatedFields) => {
        try{    
            const response = await updateUser(userId, updatedFields)
            setUsers(prev => prev.map((user) => {
                return user._id === userId ? response : user 
            }))
        }
        catch(err){
            console.log(err.message);
        }
    }

  return {users, loading, editUser}
}

export default useUsers;
