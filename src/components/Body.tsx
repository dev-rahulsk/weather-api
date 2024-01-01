import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from "./Header";

const Body = () => {
  const [data, setData] = useState({ name: "", main: { temp: "", feels_like: "", humidity: "" }, weather: [{ description: "" }], wind: { speed: "" } })
  const [coords, setCoords] = useState({ lat: "", lon: "" })
  const [errorMsg, setErrorMsg] = useState("");
  const [temp, setTemp] = useState(true);
  const [city, setCity] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const baseURL = "https://api.openweathermap.org/data/2.5/weather";
  const key = "67cce3ca7ea02e2e91ee41eb4e6bf7f5";
  const handleOnSearchChange = (searchData: "") => {
    setCity(searchData);
  }

  useEffect(() => {
    setIsLoading(true)
    API();
  }, [city, coords])


  function API() {
    axios.get(`${baseURL}?lat=${coords.lat}&lon=${coords.lon}&appid=${key}&units=metric&q=${city}`)
      .then((res) => {
        setData(res.data);
        setErrorMsg("")
        setTimeout(() => {
          setIsLoading(false)
        }, 1000);
      })
      .catch(() => {
        if (city !== "")
          setErrorMsg("Not Found");
        else {
          navigator.geolocation.getCurrentPosition(showPosition, showError);
          setErrorMsg("Give access to location or Search by City")
        }
        setTimeout(() => {
          setIsLoading(false)
        }, 1000);
      })
  }

  function showPosition(pos: any) {
    console.log(pos);

    const obj = {
      lat: pos.coords.latitude,
      lon: pos.coords.longitude
    }
    setCoords(obj)
  }

  function showError(pos: any) {
    if (pos.code === 1)
      setErrorMsg("Location Blocked")
  }

  function Bracket() {
    return (
      <>
        <div className="container background mt-3">
          <div className="top">
            <div className="location">
              <p>{data.name}</p>
            </div>
            <div className="temp">
              <h1>{temp === true ? parseFloat(data.main.temp) + "°C" : parseFloat(data.main.temp + 32).toFixed(2) + "°F"}</h1>
            </div>
            <div className="desc">
              <p>{data.weather[0].description}</p>
            </div>
            <div className="">
              <button className="btn btn-warning btn-lg" type="submit" onClick={() => setTemp(true)}>C</button>
              <button className="btn btn-warning ms-3 btn-lg" type="submit" onClick={() => setTemp(false)}>F</button>
            </div>
          </div>
          <div className="bottom">
            <div className="feel">
              <p className='bold'>{temp === true ? parseFloat(data.main.feels_like) + "°C" : parseFloat(data.main.feels_like + 32).toFixed(2) + "°F"}</p>
              <p>Feels Like</p>
            </div>
            <div className="humid">
              <p className='bold'>{data.main.humidity}</p>
              <p>Humidity</p>
            </div>
            <div className="wind">
              <p className='bold'>{data.wind.speed}</p>
              <p>Km/Hr</p>
            </div>
          </div>
        </div>
      </>
    )
  }

  function ErrorBracket() {
    return (
      <>
        {errorMsg === "" ? <Bracket /> :
          <>
            <div className="d-flex justify-content-center">
              <img src={require('../assets/error.png')} alt="" className='img-fluid img-responsive' width={300} height={300} />
            </div>
            <div className="d-flex justify-content-center">
              <p className='text-white text-center p-2'>{errorMsg}</p>
            </div>
          </>
        }
      </>
    )
  }

  function Loader() {
    return (
      <>
        <section className='loader'>
          <img src={require('../assets/loader.png')} alt="" className='img-fluid img-responsive' />
        </section>
      </>
    )
  }

  return (
    <>
      <Header onSearchChange={handleOnSearchChange} />
      {isLoading === true ? <Loader /> : <ErrorBracket />}
    </>
  )
}

export default Body;