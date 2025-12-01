import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import dedent from "dedent";

const printError = (error) => {
  console.log(chalk.bgRed(" ERROR:  ") + error);
};

const printSuccess = (message) => {
  console.log(chalk.bgGreen(" SUCCESS:  ") + message);
};
const printHelp = () => {
  console.log(
    //dedent убирает отступы
    `${chalk.bgCyan(" HELP:  ")} 
    Без параметров - вывод погоды
    -s [CITY] для установки города
    -h [HELP] для вывода помощи
    -t [API_KEY] для сохранения токена 
    `
  );
};

const printWeather = (res, icon) => {
  console.log(chalk.bgGreen(" WEATHER:  "));
  const rainbow = chalkAnimation.rainbow("Погода в нашем колхозе");
  rainbow.start();

  console.log(
    //dedent убирает отступы

    `
+----------------------------------------+
|   ${chalk.italic.bold.underline.overline.greenBright(res.name)}
|
|    ${icon}     ${res.weather[0].description} 
|    🌡️     Температура: ${chalk.bold.red(res.main.temp)} 
|    ⚠️     Ощущается как: ${chalk.bold.red(res.main.feels_like)}
|    💧    Влажность: ${chalk.bold.cyan(res.main.humidity)} %
|    🌀    Скорость ветра: ${chalk.bold.cyan(res.wind.speed)} м/c
|
+----------------------------------------+
    `
  );
};
export { printError, printSuccess, printHelp, printWeather };
