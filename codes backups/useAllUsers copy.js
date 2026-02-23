import { useAuth } from "../providers/AuthProvider";
import useUsers from "./useUsers";

function useAllUsers() {
    const{users: apiUsers, loading , editApiUser} = useUsers();
    const{registeredUsers, editUser} = useAuth();

    // combine both arrays
    const allUsers = [...apiUsers, ...registeredUsers];
    
    const editAnyUser = (userId, updatedFields) => {
        const foundUser = allUsers.find((user) => user.userId === userId);

        if(foundUser.source === "API"){
            editApiUser(userId, updatedFields);
        }
        else if(foundUser.source === 'REGISTERED'){
            editUser(userId, updatedFields);
        }
    }

    return{allUsers, loading, editAnyUser}
}

export default useAllUsers;
