import * as React from "react";
import AuthNavigation from "./AuthNavigation";
import { UserProvider } from './context/userContext'
import { ChatProvider } from './context/chatContext'

export default function App() {
  // Entire app is wrapped up inside this auth navigation
  return (
    <UserProvider>
      <ChatProvider>
        <AuthNavigation />
      </ChatProvider>
    </UserProvider>
  )
}
