# lomit

Lightweight function for omitting properties from an object.

## Install

Via NPM

```sh
npm install --save lomit
```

Via Yarn

```sh
yarn add lomit
```

## How to use

```js
import omit from 'lomit';

omit({name: '', title: ''}, ['title']);

```

## License

[MIT](LICENSE) © [Ryan Hefner](https://www.ryanhefner.com)
