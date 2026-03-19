import { useEffect, useMemo, useState } from "react";
import { getNotifications } from "../services/apiService";

function useNotifications() {

    const [notifications, setNotifications] = useState([])
    const [loading, setLoading] = useState(false)
    
    const unreadCount = useMemo(() => {
        return notifications.filter(notification => notification.isRead === false).length
    }, [notifications])

    const getUserNotifications = async () => {
        setLoading(true)
        try{
            const response = await getNotifications();
            setNotifications(response)
        }
        catch(err){
            console.log(err.message);
            
        }
        finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        getUserNotifications();
    }, [])

  return {}
}

export default useNotifications;
