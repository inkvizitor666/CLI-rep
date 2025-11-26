#!/usr/bin/env node
import {} from "./helpers/args.js";
const initCLI = () => {
  const args = getArgs(process.argv);
  console.log(args);
};

initCLI();
