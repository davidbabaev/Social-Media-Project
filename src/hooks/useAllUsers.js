import { useAuth } from "../providers/AuthProvider";
import useUsers from "./useUsers";

function useAllUsers() {
    const{users: apiUsers, loading} = useUsers();
    const{registeredUsers} = useAuth();

    // combine both arrays
    const allUsers = [...apiUsers, ...registeredUsers];

    return{allUsers, loading}
}

export default useAllUsers;
