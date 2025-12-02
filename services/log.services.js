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
    -s [CITY] для установки города (если название из 2 и более слов то пишется в кавычках "[CITY]")
    -h [HELP] для вывода помощи
    -t [API_KEY] для сохранения токена 
    -lsd RAINBOW WEATHER
    `
  );
};

const printWeather = (res, icon) => {
  console.log(chalk.bgGreen(" WEATHER:  "));
  console.log(
    //dedent убирает отступы
    `
+-------------------------------------------------------------------------+
|   Страна ${chalk.bold(res.sys.country)}
|   Город: ${chalk.italic.bold.underline.overline.greenBright(res.name)}  
|   Координаты ( Длина:${chalk.bold.magenta(res.coord.lon)} Широта:${chalk.bold.magenta(res.coord.lat)})
|
|    ${icon}     ${res.weather[0].description} 
|    🌡️     Температура: ${chalk.bold.red(res.main.temp)}
|             Max:  ${chalk.bold.red(res.main.temp_max)}
|             Min:  ${chalk.bold.red(res.main.temp_min)}
|    ⚠️     Ощущается как: ${chalk.bold.red(res.main.feels_like)}
|    💧    Влажность: ${chalk.bold.cyan(res.main.humidity)} %
|    🌀    Скорость ветра: ${chalk.bold.cyan(res.wind.speed)} м/c
|             Deg:  ${chalk.bold.cyan(res.wind.deg)}  
|             Gust: ${chalk.bold.cyan(res.wind.gust)}
|    🌊    Высота над уровнем моря: ${chalk.bold.cyan(res.main.sea_level)} м
|
+--------------------------------------------------------------------------+
    `
  );
  const rainbow = chalkAnimation.rainbow("Спасибо что посмотрели погоду в колхозе " + res.name + " через мою CLI");
  rainbow.start();
};

const printLsdWeather = (res, icon) => {
  const rainbow = chalkAnimation.rainbow(`
+-------------------------------------------------------------------------+
|   Страна ${res.sys.country}
|   Город: ${res.name}  
|   Координаты ( Длина:${res.coord.lon} Широта:${res.coord.lat})
|
|    ${icon}     ${res.weather[0].description} 
|    🌡️     Температура: ${res.main.temp}
|             Max:  ${res.main.temp_max}
|             Min:  ${res.main.temp_min}
|    ⚠️     Ощущается как: ${res.main.feels_like}
|    💧    Влажность: ${res.main.humidity} %
|    🌀    Скорость ветра: ${res.wind.speed} м/c
|             Deg:  ${res.wind.deg}  
|             Gust: ${res.wind.gust}
|    🌊    Высота над уровнем моря: ${res.main.sea_level} м
|
+--------------------------------------------------------------------------+

Спасибо что посмотрели погоду в колхозе ${res.name}  через мою CLI
    `);

  setTimeout(() => {
    rainbow.render();
    console.clear();
  }, 100);
};
export { printError, printSuccess, printHelp, printWeather, printLsdWeather };
