import https from "https";
import { getKeyValue, TOKEN_DICTIONARY } from "./storage.service.js";
import axios from "axios";

const getIcon = async (icon) => {
  switch (icon.slice(0, -1)) {
    case "01":
      return "☀️";
    case "02":
      return "🌤️";
    case "03":
      return "⛅";
    case "04":
      return "☁️";
    case "09":
      return "🌧️";
    case "10":
      return "🌦️";
    case "11":
      return "🌩️";
    case "13":
      return "❄️";
    case "50":
      return "🌫️";
  }
};

const getWeather = async (city) => {
  const token = process.env.TOKEN ?? (await getKeyValue(TOKEN_DICTIONARY.token)); //если есть токен TOKEN то берём его если нет то берём из TOKEN_DICTIONARY
  if (!token) {
    throw new Error("Не задан ключ API, -t [API_KEY]");
  }
  const { data } = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
    params: {
      q: city,
      appid: token,
      lang: "ru",
      units: "metric",
    },
  });
  //console.log(data);
  return data;

  /*   const url = new URL("https://api.openweathermap.org/data/2.5/weather");
  url.searchParams.append("q", city);
  url.searchParams.append("appid", token);
  url.searchParams.append("lang", "ru");
  url.searchParams.append("units", "metric");

  https.get(url, (response) => {
    let res = "";
    response.on("data", (chunk) => {
      res += chunk;
    });
    response.on("end", () => {
      console.log(res);
    });
  }); */
};

export { getWeather, getIcon };
