#!/usr/bin/env node
import { getArgs } from "./helpers/args.js";
import { getWeather, getIcon } from "./services/api.services.js";
import { printHelp, printSuccess, printError, printWeather, printLsdWeather } from "./services/log.services.js";
import { saveKeyValue, TOKEN_DICTIONARY, getKeyValue } from "./services/storage.service.js";

const saveToken = async (token) => {
  if (!token.length) {
    printError("Нет переданного токена(token)");
    return;
  }
  try {
    await saveKeyValue(TOKEN_DICTIONARY.token, token);
    printSuccess("Токен сохранен");
  } catch (e) {
    printError(e.message);
  }
};

const saveCity = async (city) => {
  if (!city.length) {
    printError("Нет переданного города");
    return;
  }
  try {
    await saveKeyValue(TOKEN_DICTIONARY.city, city);
    printSuccess("Город сохранен");
  } catch (e) {
    printError(e.message);
  }
};

const getForcast = async () => {
  try {
    const city = process.env.CITY ?? (await getKeyValue(TOKEN_DICTIONARY.city));
    const weatherData = await getWeather(city);
    const icon = await getIcon(weatherData.weather[0].icon);
    printWeather(weatherData, icon);
  } catch (e) {
    if (e?.response?.status == 404) {
      printError("Неверно указан город!");
    } else if (e?.response?.status == 401) {
      printError("Неверно указан токен!");
    } else {
      printError("КАКОГО ХУЯ?:  " + e.message);
    }
  }
};

const getForcastLsd = async () => {
  try {
    const city = process.env.CITY ?? (await getKeyValue(TOKEN_DICTIONARY.city));
    const weatherData = await getWeather(city);
    const icon = await getIcon(weatherData.weather[0].icon);
    printLsdWeather(weatherData, icon);
  } catch (e) {
    if (e?.response?.status == 404) {
      printError("Неверно указан город!");
    } else if (e?.response?.status == 401) {
      printError("Неверно указан токен!");
    } else {
      printError("КАКОГО ХУЯ?:  " + e.message);
    }
  }
};

const initCLI = () => {
  const args = getArgs(process.argv);
  //console.log(args);
  //console.log(process.env);
  if (args.h) {
    return printHelp();
  }
  if (args.s) {
    return saveCity(args.s);
  }
  if (args.t) {
    return saveToken(args.t);
  }
  if (args.lsd) {
    return getForcastLsd();
  }
  return getForcast();
};

initCLI();
