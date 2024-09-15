import { Route, Routes, Navigate } from "react-router-dom"
import { v4 as uuidV4 } from "uuid"
import QuillEditor from "./components/QuillEditor"


function App() {
  

  return (
    <>
      <Routes>
      <Route path="/" element={<Navigate to= {`/document/${uuidV4()}`} />} />

      <Route path="/document/:id" element= {<QuillEditor />} />
      </Routes>
    </>
  )
}

export default App
