import React, { useEffect, useState } from "react"
import axios from "axios"
import dividerImageMobile from "./assets/images/pattern-divider-mobile.svg"
import dividerImageDesktop from "./assets/images/pattern-divider-desktop.svg"
import diceImage from "./assets/images/icon-dice.svg"
// import { isMobile } from "react-device-detect"
import "./App.css"

const App = () => {
  // console.log(isMobile)
  const url = "https://api.adviceslip.com/advice"
  const [advice, setAdvice] = useState("")
  const [adviceText, setAdviceText] = useState(
    "It is easy to sit up and take notice, what's difficult is to getting up and taking action."
  )
  const [id, setId] = useState(117)
  const [image, setImage] = useState()

  useEffect(() => {
    // Function to update message based on viewport size
    const updateMessage = () => {
      if (window.innerWidth <= 768) {
        setImage(dividerImageMobile)
      } else {
        setImage(dividerImageDesktop)
      }
    }

    // Update message initially
    updateMessage()

    // Add event listener for resize and orientation change events
    window.addEventListener("resize", updateMessage)
    window.addEventListener("orientationchange", updateMessage)

    // Cleanup function to remove event listeners when component unmounts
    return () => {
      window.removeEventListener("resize", updateMessage)
      window.removeEventListener("orientationchange", updateMessage)
    }
  }, [])

  const handleClick = async () => {
    let response = await axios(url)
    // console.log(response.data)
    if (advice && advice.slip.id === response.data.slip.id) {
      // response = await axios(url)
      window.alert("Fetched same advice")
      // console.log(response.data)
    }
    const adviceData = response.data
    setAdvice(adviceData)
    if (adviceData && adviceData.slip) {
      setAdviceText(adviceData.slip.advice)
      setId(adviceData.slip.id)
    }
  }
  // console.log(advice)
  // console.log(adviceText, id)
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-gray-800 font-Monrope">
      <div className="min-h-[20rem] max-h-screen max-w-[24rem] min-w-[2rem] bg-gray-700 flex flex-col items-center rounded-lg pt-8 pl-8 pr-8 relative md:min-w-[30rem]">
        <p className="flex-grow-0 flex-shrink-0 text-xs tracking-[0.2em] mb-4">
          <span className="uppercase  text-emerald-300">advice </span>
          <span className="text-emerald-300">#{id}</span>
        </p>
        <p className="text-slate-300 font-bold text-center tracking-wider mb-4 text-[26px]">
          "{adviceText}"
        </p>
        <img src={image} alt="divider" className="" />
        <div
          className="circle h-[3rem] w-[3rem] rounded-full bg-emerald-300 flex justify-center items-center self-auto absolute -bottom-6 cursor-pointer  hover:outline-none "
          onClick={handleClick}
        >
          <img src={diceImage} alt="dice" className="w-[1.3rem] " />
        </div>
      </div>
    </div>
  )
}

export default App
