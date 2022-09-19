import { useState } from 'react';
import './App.css';
const api={
  key:'1cc773e18932e9e04f1bdf66d38605ea',
  base: "https://api.openweathermap.org/data/2.5/"
}
function App() {
  const [query, setQuery]=useState("");
  const [weather, setWeather]=useState({});
  const search= evt=>{
    if (evt.key==="Enter"){
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then( res=> res.json())
      .then( result=>{
        setWeather(result)
        setQuery("")
        console.log(weather)
      })
    }
  }
   const Datebuilder=(d)=>{
    let months=['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let days= ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let day=days[d.getDay()];
    let date= d.getDate();
    let month=months[d.getMonth()];
    let year= d.getFullYear();
    return `${day} ${date} ${month} ${year}`
   }
  return (
    <div className='container'>
      <div className={(typeof weather.main !="undefined")
      ?((weather.main.temp>16)?'app':'app cold'):"app"}>
        <main>
          <div className='search-box'>
            <input 
            type="text"
            className='search-bar'
            placeholder='Search...'
            onChange={e=> setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
            ></input>
            {(typeof weather.main !="undefined")?(
              <div className='row'>
                <div className="location-box">
                  <div className='location'>{weather.name}, {weather.sys.country}</div>
                  <div className='date'>{Datebuilder(new Date())}</div>
                </div>
                <div className='weather-box'>
                  <div className='temp'>{Math.round(weather.main.temp)}°c</div>
                  <div className='weather'>{weather.weather[0].main}</div>
                </div>
              </div>):(" ")
            }
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
