import { useEffect, useState } from "react"
import Footer from "./components/Footer"
import Main from "./components/Main"
import SideBar from "./components/SideBar"

// Api key => i2GLki4jXimKVHx7TomuQBc66SLsu8qR0Kod7DC0 

function App() {

  const [ data, setData ] = useState(null)

  const [loading, setLoading ] = useState(false)
  
  const [showModal, setShowModal] = useState(false)

  function handleToggleModal() {
    setShowModal(!showModal)
  }

  // to call the API
  useEffect(() => {
    async function fetchAPIData() {
      const NASA_KEY = import.meta.env.VITE_NASA_API_KEY
      const url = 'https://api.nasa.gov/planetary/apod' + `?api_key=${NASA_KEY}`

      const today = (new Date()).toDateString()
      const localKey = `NASA-${today}`

        if (localStorage.getItem(localKey)) {
          const apiData = JSON.parse(localStorage.getItem(localKey))
          setData(apiData)
          console.log("FETCHED FROM CACHE TODAY");
          return
        }
        localStorage.clear()

      try {
        const res = await fetch(url)
        const apiData = await res.json()
        localStorage.setItem(localKey, JSON.stringify(apiData))
        setData(apiData)
        console.log("FETCHED FROM API TODAY");
      }catch (err) {
        console.log(err.message);
      }
    }
    fetchAPIData()
  }, [])

  return (
    <>
      {data ? (<Main data={data}  />): (
        <div className="loadingState">
          <i class="fa-solid fa-gear"></i>
        </div>
      )}
      {showModal && (
        <SideBar data={data} handleToggleModal={handleToggleModal} />
      )}
      {data && (
        <Footer data={data} handleToggleModal={handleToggleModal} />
      )}
    </>
  )
}

export default App
