import { createContext } from "react";


const NotificationContext = createContext({
    notification: null,
    showNotificaion: function(){},
    hideNotification: function(){}
})

export function NotificationContextProvider(props){
    return <NotificationContext.Provider>{props.children}</NotificationContext.Provider>
}


export default NotificationContext