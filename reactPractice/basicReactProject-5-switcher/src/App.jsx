
import { useState, useEffect } from 'react'
import './App.css'
import { ThemeProvider } from './contexts/Theme.js'
import ThemeBtn from './components/ThemeButton.jsx'
import Card from './components/Card.jsx'

function App() {
  
  const [themeMode, setThememode] = useState("light")
  
  const lightTheme = () => {
    setThememode("light")
  }

  const darkTheme = () => {
    setThememode("dark")
  }

  //
  useEffect(() => {

    const htmlTheme = document.querySelector('html')

    htmlTheme.classList.remove("light", "dark")
    htmlTheme.classList.add(themeMode)
  }, [themeMode])
  


  return (

      <ThemeProvider value={ {themeMode, lightTheme, darkTheme} }>
        <div className="flex flex-wrap min-h-screen items-center">
          <div className="w-full">
              <div className="w-full max-w-sm mx-auto flex justify-end mb-4">
                  {<ThemeBtn/>}
              </div>

              <div className="w-full max-w-sm mx-auto">
                  {<Card/>}
                  
              </div>
          </div>
        </div>
      </ThemeProvider>

  )
}

export default App
