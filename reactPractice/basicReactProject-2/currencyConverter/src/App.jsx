import { useState } from "react"
import { InputBox } from "./components"
import useCurrencyInfo from "./hooks/useCurrencyInfo"
import './index.css'



function App() {
  
  const [amount, setAmount] = useState(0)
  const [from, setFrom] = useState("usd")
  const [to, setTo] = useState("inr")
  const [convAmt, setConvAmt] = useState(0)

  const currencyInfo = useCurrencyInfo(from)

  const options = Object.keys(currencyInfo)

  const swap = () => {
    setFrom(to)
    setTo(from)
    setConvAmt(amount)
    setAmount(convAmt)
  }

  const convert = () => {
    if (!currencyInfo || Object.keys(currencyInfo).length === 0) {
      console.log("Currency data not loaded yet.");
      return;
    }
  
    if (!currencyInfo[to]) {
      console.log(`No conversion rate found for ${to}`);
      return;
    }
  
    setConvAmt(amount * currencyInfo[to]);
    console.log(`Converted ${amount} ${from} to ${convAmt} ${to}`);
  };
  


  return (
    <div
        className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
        style={{
            backgroundImage: `url('https://images.pexels.com/photos/998641/pexels-photo-998641.jpeg')`,
        }}
    >
        <div className="w-full">
            <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        convert()
                    }}
                >
                    <div className="w-full mb-1">
                        <InputBox
                            label="From"
                            amt={amount}
                            currOptions={options}
                            onCurrencyChange={(currency) => setFrom(currency)}
                            selectCurr={from}
                            onAmtChange={(amount) => setAmount(amount)}
                        />
                    </div>
                    <div className="relative w-full h-0.5">
                        <button
                            type="button"
                            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                            onClick={swap}
                        >
                            swap
                        </button>
                    </div>
                    <div className="w-full mt-1 mb-4">
                        <InputBox
                            label="To"
                            amt={convAmt}
                            currOptions={options}
                            onCurrencyChange={(currency) => setTo(currency)}
                            selectCurr={to}
                            onAmtChange={(amount) => setAmount(amount)}
                            
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg"
                    >
                        Convert {from.toUpperCase()} to {to.toUpperCase()}
                    </button>
                </form>
            </div>
        </div>
    </div>
  );
}

export default App
