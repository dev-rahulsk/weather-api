import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Search from "./Search";

const Body = () => {
  const [city, setCity] = useState("Jodhpur");
  const [data, setData] = useState({ name: "", main: { temp: "", feels_like: "", humidity: "" }, weather: [{ description: "" }], wind: { speed: "" } })
  const [temp, setTemp] = useState(true);
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
    axios.get(`${baseURL}?q=${city}&appid=${key}&units=${unit}`)
      .then((res) => {
        setData(res.data);
      })
      .catch(() => {
        console.log("hug diya");
      })
  }, [city, unit]);

  return (
    <>
      <Search onSearchChange={handleOnSearchChange} />
      
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
            <button className="btn btn-warning" type="button" onClick={() => setTemp(true)}>C</button>
            <button className="btn btn-warning ms-3" type="button" onClick={() => setTemp(false)}>F</button>
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
    </>
  )
}

export default Body;