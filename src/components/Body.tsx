import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from "./Header";

const Body = () => {
  const [data, setData] = useState({ name: "", main: { temp: "", feels_like: "", humidity: "" }, weather: [{ description: "" }], wind: { speed: "" } })
  const [coords, setCoords] = useState({ lat: "", lon: "" })
  const [loc, setLoc] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [temp, setTemp] = useState(true);
  const [city, setCity] = useState("");
  const [unit, setUnit] = useState("metric");
  const [deg, setDeg] = useState("");

  const baseURL = "https://api.openweathermap.org/data/2.5/weather";
  const key = "67cce3ca7ea02e2e91ee41eb4e6bf7f5";
  const handleOnSearchChange = (searchData: any) => {
    setCity(searchData)
  }

  useEffect(() => {
    setUnit(temp === true ? "metric" : "imperial");
    setDeg(temp === true ? "°C" : "°F");
  }, [temp, city])

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    }
    setErrorMsg("Give access to location or Search by City")
    axios.get(`${baseURL}?lat=${coords.lat}&lon=${coords.lon}&appid=${key}&units=${unit}&q=${city}`)
      .then((res) => {
        setLoc(false)
        setData(res.data);
      })
      .catch(() => {
        setLoc(true)
      })
  }, [coords, unit, city, loc]);

  function showPosition(pos: any) {
    console.log(pos);
    const obj = {
      lat: pos.coords.latitude,
      lon: pos.coords.longitude
    }
    setCoords(obj);
    setErrorMsg("Not Found");
  }

  function showError(pos) {
    console.log(pos);
    
    if (pos.code !== 1) setErrorMsg("Give access to location or Search by City")
    else {
      loc ? setErrorMsg("Location Blocked") : setErrorMsg("Not Found")
    }
  }

  return (
    <>
      <Header onSearchChange={handleOnSearchChange} />
      {(coords.lat === "" && city === "") || loc === true ? <ErrorBracket /> : <Bracket />}
    </>
  )

  function Bracket() {
    return (
      <>
        {
          coords.lat === "" && city === "" ? <ErrorBracket /> :
            <div className="container background mt-3">
              <div className="top">
                <div className="location">
                  <p>{data.name}</p>
                </div>
                <div className="temp">
                  <h1>{data.main.temp}{deg}</h1>
                </div>
                <div className="desc">
                  <p>{data.weather[0].description}</p>
                </div>
                <div className="">
                  <button className="btn btn-warning btn-lg" type="button" onClick={() => setTemp(true)}>C</button>
                  <button className="btn btn-warning ms-3 btn-lg" type="button" onClick={() => setTemp(false)}>F</button>
                </div>
              </div>
              <div className="bottom">
                <div className="feel">
                  <p className='bold'>{data.main.feels_like}{deg}</p>
                  <p>Feels Like</p>
                </div>
                <div className="humid">
                  <p className='bold'>{data.main.humidity}</p>
                  <p>Humidity</p>
                </div>
                <div className="wind">
                  <p className='bold'>{data.wind.speed}</p>
                  <p> Km/Hr</p>
                </div>
              </div>
            </div>
        }
      </>
    )
  }

  function ErrorBracket() {
    return (
      <>
        <div className="d-flex justify-content-center">
          <img src={require('../assets/error.png')} alt="" className='img-fluid img-responsive' width={300} height={300} />
        </div>
        <div className="d-flex justify-content-center">
          <p className='text-white text-center p-2'>{errorMsg}</p>
        </div>
      </>
    )
  }
}

export default Body;