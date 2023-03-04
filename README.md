# ALADIN_Cryptography

I created this project during my studies.
It's purpose is to generate exercises for students in different difficulties and with solution aids.

Consisting out of RSA.

Used technologies:
* Vite
* React
* Bootstrap
* Typescript

## Installation

```
cd src
npm install
cd frontend
npm install
```

## Testing

```
cd src/frontend
npm run dev
```

## Build

```
cd src/frontend
npm run build
```

## Note
In src/frontend/main.tsx we specify the basename, which is the path to the folder where the index.html is located.
If you want to use the application in a subfolder, you have to change this path.

### Docs
The documentation is generated with typedoc.
```
cd src
npx typedoc .
```
The output at docs/docs is automatically deployed to github pages.

### Deployment
The frontend is automatically deployed to github pages.
Just copy the content of the dist folder to the docs folder.

## License
[MIT](https://choosealicense.com/licenses/mit/)

(This README was generated with ❤️ by readme-md-generator)
