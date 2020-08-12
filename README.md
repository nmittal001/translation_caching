# Translate Text Application

Translate a text from one language to another.

# Translate Text with Node.js and Redis

- Cached the translations in order to avoid repeated hits to the translation API.

## Prerequisites

Make sure you have installed prerequisites on your machine:

- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Install

    $ cd translation_caching
    $ npm install

## Running Node.js Application

    $ node app.js

## Responses

An invalid request is submitted, or some other error occurs, it returns a JSON response in the following format:

```json
{
  "message": string,
  "success": 0
}
```

If a request is successfully submitted, it returns a JSON response in the following format:

```json
{
  "data": string,
  "success": 1
}
```

The `message` attribute contains a message commonly used to indicate errors or, in the case of successful or not.
The `success` attribute describes if the transaction was successful or not.
The `data` attribute contains data associated with the response.

## Usage

- Requests will be made to the Restful API.
- Port: 7001
- languages: `Amharic,Arabic,Basque,Bengali,English(UK),Portuguese(Brazil),Bulgarian,Catalan, Cherokee,Croatian,Czech,Danish,Dutch,English,Estonian,Filipino,Finnish,French,German,Greek, Gujarati,Hebrew,Hindi,Hungarian,Icelandic,Indonesian,Italian,Japanese,Kannada,Korean, Latvian,Lithuanian,Malay,Malayalam,Marathi,Norwegian,Polish,Portuguese,Romanian,Russian, Serbian,Chinese(PRC),Slovak,Slovenian,Spanish,Swahili,Swedish,Tamil,Telugu,Thai,Chinese, Turkish,Urdu,Ukrainian,Vietnamese,Welsh`

### 01 `GET` /getTranslation

API for getting translate a text: `http://localhost:7001/getTranslation?source=english&target=de&text=bye`.
query param: `source`,
query param: `target`,
query param: `text`,

```json
{
  "success": 1,
  "data": "Tschüss"
}
```

Response body (If language is not present):

```json
{
  "success": 0,
  "data": "source and target should be: Amharic,Arabic,Basque,Bengali,English(UK),Portuguese(Brazil),Bulgarian,Catalan,Cherokee,Croatian,Czech,Danish,Dutch,English,Estonian,Filipino,Finnish,French,German,Greek,Gujarati,Hebrew,Hindi,Hungarian,Icelandic,Indonesian,Italian,Japanese,Kannada,Korean,Latvian,Lithuanian,Malay,Malayalam,Marathi,Norwegian,Polish,Portuguese,Romanian,Russian,Serbian,Chinese(PRC),Slovak,Slovenian,Spanish,Swahili,Swedish,Tamil,Telugu,Thai,Chinese,Turkish,Urdu,Ukrainian,Vietnamese,Welsh"
}
```
