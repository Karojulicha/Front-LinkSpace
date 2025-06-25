import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../Hooks/useUser";
import { useNavigate } from "react-router-dom";
import type { WeatherResponse } from "../types/Weather";
import { TiWeatherPartlySunny } from "react-icons/ti";

export const Header = () => {
  const { username } = useUser();
  const navigate = useNavigate();
  const [weather, setWeather] = useState<WeatherResponse | "">("");

  const urlBogota =
    "https://api.open-meteo.com/v1/forecast?latitude=4.711&longitude=-74.0721&current=temperature_2m&timezone=America/Bogota";

    const fetchTemperature = (url: string) => {
      try {
        const encodedUrl = encodeURIComponent(url);

        axios
          .get(`http://localhost:7520/api/Weather/url?url=${encodedUrl}`)
          .then((res) => {
            setWeather({
              weather: res.data.weather,
              timeZone: res.data.timeZone,
            });
          });
      } catch {
        console.log("Error al obtener el clima");
      }
    };

  const handleUsernameClick = () => {
    navigate("/"); 
  };

  useEffect(() => {
    fetchTemperature(urlBogota);
  }, [useUser]);
  

  return (
    <header className="d-flex justify-content-between align-items-center ">
      <div className=" fw-normal medium">
        Hola{" "}
        <span
          className=" text-decoration-underline"
          role="button"
          onClick={handleUsernameClick}
        >
          {username}
        </span>
      </div>

      {weather && (
        <div className=" d-grid gap-0">
          <div className="d-flex justify-content-center text-light small">
            <TiWeatherPartlySunny size={16} /> {weather.weather} °C
          </div>
          <div className="mb-1 " style={{ fontSize: "0.75rem" }}>
            {weather.timeZone}
          </div>
        </div>
      )}
    </header>
  );
};

