#!/usr/bin/env node
import { getArgs } from "./helpers/args.js";
import { getWether, getIcon } from "./services/api.services.js";
import { printHelp, printSuccess, printError, printWeather } from "./services/log.services.js";
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
    const weather = await getWether(city);
    printWeather(weather, getIcon(weather.weather[0].icon));
    //console.log(weather); //вывод погоды  в консоль
  } catch (e) {
    if (e?.response?.status == 404) {
      printError("Неверно указан город!");
    } else if (e?.response?.status == 401) {
      printError("Неверно указан токен!");
    } else {
      printError(e.message);
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
    //сохранение токена
    return saveToken(args.t);
  }
  return getForcast();
};

initCLI();
