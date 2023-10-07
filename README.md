# Template for a vanilla JS project with webpack

## A Single Page using an API

<p align="center">
    <img src="screenshot.jpg?raw=true" alt="Screenshot of the app">
</p>

Building a website as a sole landing page and using an API in order to enhance the site with 
content like Videos, I stumbled on the problem to hide sensitive information to the public,
like an API key and dealing with the bundling of projects.

During my research I found recommendations for [webpack](https://webpack.js.org/), 
which is a *static module bundler* for mordern JS applications. 

Ispired by **The Coding Train** ([Youtube](https://www.youtube.com/watch?v=17UVejOw3zA&t=150s))
and **Ania Kubow** ([Youtube-Link](https://www.youtube.com/watch?v=vSmzEGZQI5A)),
I came up with a solution, which allows me to publish my project to github, without exposing my
API key. **To run this example application you need to have your own key**.

Generating this application for production, it will show the used API key, minimizing code and 
produce an identical site structure like in development mode.

Additional I would like to mention the great Explanation by **James Bubb** about form validation
in Javascript ([Youtube-Link](https://www.youtube.com/watch?v=iyngFd6f8ko)), which became quite handy for this
project.

## Technical Features

- Hides API key in the development mode
- Minimizes code on the productive site with plugins like lightningcss
- Maintains site structure on the productive site

## Site Features

- Accordion with Videos via Youtube API
- Responsive Design
- Client-site form validation in JS

## List of Dependencies

```
"devDependencies": {
    "@babel/core": "^7.23.0",
    "@babel/preset-env": "^7.22.20",
    "babel-loader": "^9.1.3",
    "browserslist": "^4.22.1",
    "copy-webpack-plugin": "^11.0.0",
    "cross-env": "^7.0.3",
    "css-loader": "^6.8.1",
    "css-minimizer-webpack-plugin": "^5.0.1",
    "dotenv-webpack": "^8.0.1",
    "file-loader": "^6.2.0",
    "html-webpack-plugin": "^5.5.3",
    "http-server": "^14.1.1",
    "lightningcss": "^1.22.0",
    "mini-css-extract-plugin": "^2.7.6",
    "node-sass": "^9.0.0",
    "sass-loader": "^13.3.2",
    "style-loader": "^3.3.3",
    "url-loader": "^4.1.1",
    "webpack": "^5.88.2",
    "webpack-cli": "^5.1.4",
    "webpack-dev-server": "^4.15.1",
    "webpack-merge": "^5.9.0"
}
```

## Sources

- The Coding Train [Youtube](https://www.youtube.com/watch?v=17UVejOw3zA&t=150s)
- Ania Kubow about Webpack [Github](https://github.com/kubowania/pacman-AI-live/tree/main)
- Giuseppe about Webpack [Github](https://github.com/Sanfra1407/webpack-env-file-variables)
- Webpack [Documentation](https://webpack.js.org/concepts/)
- James Bubb about JS Form Validation [Github](https://github.com/codebubb/javascript-form-validation-tutorial)
- Used Picture by Pavel Danilyuk from Pexels (ID: [8112119](https://www.pexels.com/photo/black-woman-holding-a-sword-figurine-8112199/))