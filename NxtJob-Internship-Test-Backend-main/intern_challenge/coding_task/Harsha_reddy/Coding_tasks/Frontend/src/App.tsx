import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'
import TextEditor from "./TextEditor.jsx"

export default function App() {
  return (
    <header>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <TextEditor/>
        <UserButton />
      </SignedIn>
    </header>
  )
}