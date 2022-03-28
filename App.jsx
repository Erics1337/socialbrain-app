import * as React from "react";
import AuthNavigation from "./AuthNavigation";
import { UserProvider } from './context/userContext'
import { ChatProvider } from './context/chatContext'
import { MenuProvider } from 'react-native-popup-menu';


export default function App() {
  // Entire app is wrapped up inside this auth navigation
  return (
    <MenuProvider>
      <UserProvider>
        <ChatProvider>
          <AuthNavigation />
        </ChatProvider>
      </UserProvider>
    </MenuProvider>
  )
}
