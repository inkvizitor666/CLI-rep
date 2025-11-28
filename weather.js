#!/usr/bin/env node
import { getArgs } from "./helpers/args.js";
import { printHelp, printSuccess, printError } from "./services/log.services.js";
import { saveKeyValue, TOKEN_DICTIONARY } from "./services/storage.service.js";

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

const initCLI = () => {
  const args = getArgs(process.argv);
  //console.log(args);
  if (args.h) {
    printHelp();
  }
  if (args.s) {
    printSuccess();
  }
  if (args.t) {
    return saveToken(args.t);
  }
  //вывести погоду
};

initCLI();
