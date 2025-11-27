#!/usr/bin/env node
import { getArgs } from "./helpers/args.js";
const initCLI = () => {
  const args = getArgs(process.argv);
  console.log(args);
  if (args.h) {
    //Вывод хелпа -h это help
  }
  if (args.s) {
    //Сохранение города -s это sity
  }
  if (args.t) {
    //Сохранение токена -t это токен
  }
  //вывести погоду
};

initCLI();
