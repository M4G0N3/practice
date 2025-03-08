
import {useState, useCallback, useEffect, useRef} from "react";



function App() {

  const [length, setLength] = useState(8)

  const [numAllow, setNumAllow] = useState(false)

  const [charAllow, setCharAllow] = useState(false)

  const [password, setPassword] = useState("")

  //useRef
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(fnCB, 
  [numAllow, charAllow, length])

  function fnCB() {
    
      let pass = ""
      let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
  
      if (numAllow) str += "0123456789"
      if (charAllow) str += "@!$&*=+-"
  
      for (let i=1; i <= length; i++) {
          let char = Math.floor(Math.random() * str.length)
          pass += str.charAt(char)
      }
      setPassword(pass)
  }

  const copyPass = useCallback(copyFn, [password])

  function copyFn() {
    passwordRef.current?.select()
    //passwordRef.current?.setSelectionRange(0, 3)
    window.navigator.clipboard.writeText(password)
  }


  useEffect(() => {
    passwordGenerator()
  }, [setLength, setNumAllow, setCharAllow, setPassword, passwordGenerator])
  

  return (
    <>
      <h1 className="text-4xl text-center m-10">Password Generator</h1>

      <div className="w-full max-w-md mx-auto shadow-md rounded-lg my-8 px-4 py-5 text-orange-100 bg-gray-700">
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
              type="text"
              value={password}
              className="outline-none w-full py-1 px-3 bg-white text-black"
              placeholder="Password"
              readOnly={true}
              ref={passwordRef}
          />

          <button onClick={copyPass} className="bg-blue-500 px-3 py-0.5 shrink-0">Copy</button>

        </div>

        <div className="flex text-sm gap-x-2">
            <div className="flex items-center gap-x-1">
                <input type="range"
                min="6"
                max="20"
                value={length}
                className="cursor-pointer"
                onChange={(e)  => {setLength(e.target.value)}}
                />

              <label>Length: {length}</label>

              <div className="flex items-center gap-x-1">
                <input 
                  type="checkbox" 
                  defaultChecked={numAllow} 
                  id="numInput"
                  onChange={() => {
                    setNumAllow((prev) => !prev)  
                  }} 
                />
                <label>Numbers</label>
              </div>

              
              <div className="flex items-center gap-x-1">
                <input 
                  type="checkbox" 
                  defaultChecked={charAllow} 
                  id="charInput"
                  onChange={() => {
                    setCharAllow((prev) => !prev)  
                  }} 
                />
                <label>Special</label>
              </div>

            </div>
        </div>

      </div>
    </>
  )
}

export default App
