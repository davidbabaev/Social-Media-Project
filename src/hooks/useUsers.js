import { useEffect, useState } from "react";
import { getAllUsers} from "../services/apiService";

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

    useEffect(() => {
        getUsers();
    }, [])

  return {users, loading, getUsers}
}

export default useUsers;
