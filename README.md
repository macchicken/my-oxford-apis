# Setup local environment

1. (optional) download and install nodejs12.x from https://nodejs.org/dist/latest-v12.x/ if no node environment
2. navigate to the project folder
    ```bash
    $ npm install
    ```
3. add appkey and appid to the .env file with .env.default as a template

# Lanuch local environment

```bash
$ npm run start
```

# Send requests
## get a word origin
```
in browser http://localhost:13000/origin?word=insurance
```
## translate a word to a target language
```
in browser http://localhost:13000/translate?word=test&targetLan=fr
```

# Test

```bash
# unit tests
$ npm run test
```