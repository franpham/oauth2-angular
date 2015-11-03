"use strict";

var request = require('request');
var express = require('express');
var router = express.Router();
var OAuth2 = require('oauth').OAuth2;
var oauth2 = new OAuth2(
  process.env.GITHUB_CLIENT_ID,
  process.env.GITHUB_CLIENT_SECRET,
  'https://github.com/',       // provider base url
  'login/oauth/authorize',      // provider's login path
  'login/oauth/access_token',   // provider's access_token path
  null                          // options
);

// Step 1: demo .env file to set process.env values for node; MUST add .env to .gitignore for security!

// Step 2: use oauth2 to get the provider's auth url;
router.get('/login', (req, res) => {
  var authURL = oauth2.getAuthorizeUrl({
    redirect_uri: 'http://localhost:3000/auth/github/callback',
    scope: ['gist'],
    state: 'Authorize' + Math.round(Math.random() * 9999999)
  });
  res.json({ url: authURL });    // state variable prevents cross-site forgery;
});

// Step 3: create the callback route that's called after authorization; provider returns access code as as query string;
router.get('/github/callback', (req, res) => {
  var code = req.query.code;
  if (!code)
    return res.status(401).json({ error: 401, message: 'Invalid auth code.' });
  oauth2.getOAuthAccessToken(code,
    { redirect_uri: 'http://localhost:3000/auth/github/callback' },
    (err, access_token, refresh_token, results) => {    // access_token provided to callback when oauth2 is invoked;
      if (err) {
        console.error(err);
        res.status(401).json(err);
      }
      else if (results.error) {
        console.error(results.error);
        res.status(401).json(results.error);
      }
      else {  // send token back to the client;
        res.json({ access_token: access_token });
      }
    });
});

module.exports = router;