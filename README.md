# Стартовый шаблон для верстки
## Установка

Необходимо иметь [Node.js](https://nodejs.org/) для запуска и [Yarn](https://yarnpkg.com/).
В качестве локального сервера используется плагин Live Server в VS CODE

Клонируем репозиторий себе на компьютер:
```sh
git clone https://github.com/acr0matic/boilerplate
```

Переходим в каталог с проектом:
```sh
cd boilerplate
```

Установливаем все зависимости командой:
```sh
yarn
```

## Разработка

Если работаем через Live Server, то открывем через локальный сервер index.html в корневом каталоге и пишем в консоли:
```sh
gulp
```
Если используется какая-то другая среда разработки, тогда пишем в консоли
```sh
gulp serve
```

Чтобы собрать билд:
```sh
gulp build
```

Для отправки на удаленный хост необходимо в файле [deploy.js](gulp_tasks/deploy.js) прописать доступы.\
После чего используем команду:

```sh
gulp deploy
```

## Файловая структура

```
boilerplate
├── dist
├── gulp_tasks
├── src
│   ├── assets
│   │   ├── fonts
│   │   ├── img
│   │   ├── misc
│   │   ├── scripts
│   │   ├── scss
│   ├── layout
│   └── index.html
├── gulpfile.js
├── package.json
├── .browserslistrc
├── .postcssrc
├── .eslintrc
├── .stylelintrc
├── .stylelintignore
├── .gitignore
└── .webpack.config.js
```

* Корень папки:
    * ```.browserslistrc``` – список поддерживаемых браузеров
    * ```.eslintrc``` — настройки ESLint
    * ```.postcssrc``` — настройки PostCSS
    * ```.stylelintrc``` — настройки Stylelint
    * ```.stylelintignore``` – запрет на отслеживание файлов Stylelint'ом
    * ```.gitignore``` – запрет на отслеживание файлов Git'ом
    * ```gulpfile.js``` — настройки Gulp
    * ```webpack.config.js``` — настройки Webpack
    * ```package.json``` — список зависимостей
* Папка ```src``` - используется во время разработки:
    * страницы сайта: ```src/layout/```
    * шрифты: ```src/assets/fonts```
    * изображения: ```src/assets/img```
    * различные ассеты (фавикон и т.п.): ```src/assets/misc```
    * JS-файлы: ```src/assets/scripts```
    * SCSS-файлы: ```src/assets/scss```
* Папка ```dist``` - папка для билда проекта, из нее с помощью команды ```gulp deploy``` файлы отправляются на удаленный сервер)
* Папка ```gulp-tasks``` - папка с Gulp-тасками

## Рекомендации по использованию
### Страницы проекта
Для упрощения разработки многостраничных сайтов был внедрен "шаблонизатор". С помощью директивы ```@@include()``` можно встраивать любые файлы в разметку, в том числе ```.html```
* страницы проекта находятся в папке ```src/layout/pages```
    * главная страница: ```src/layout/index.html```
    * страницы собираются с помощью плагина [gulp-include-file](https://www.npmjs.com/package/gulp-file-include)
    * всевозможные карточки товаров, услуг и т.п. размещаем в отдельных [фрагментах](src/layout/template/)
    * изменения вносить только в файлах в каталоге [layout](src/layout/)

### Шрифты
Каждое семейство шрифтов необходимо разместить в [отдельной папке](src/assets/fonts/roboto).
* шрифты находятся в папке ```src/assets/fonts```
    * используйте [форматы](https://caniuse.com/#search=woff) ```.woff``` и ```.woff2```
    * шрифты подключаются в файл ```src/assets/scss/base/_fonts.scss```
    * сконвертировать локальные шрифты можно с помощью [данного сервиса](https://transfonter.com/)