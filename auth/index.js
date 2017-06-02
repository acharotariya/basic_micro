const { send,json } = require('micro');
const users = require('./src/services/user.service');
const db = require('./src/models/db');
const route = require('micro-route')
const auth = require('./src/authentication/authentication');
const github = require('./src/authentication/github');
const fb = require('./src/authentication/facebook');
const microAuthGithub = require('microauth-github');
let twitter;

const corsRoute = route('*', 'OPTIONS')
const loginRoute = route('/api/login', 'POST')
const signupRoute = route('/api/setup')
const callbacktwRoute = route('/auth/twitter/callback')
const signupGitRoute = route('/auth/github')
const callbackGitRoute = route('/auth/github/callback')
const signupFbRoute = route('/auth/facebook')
const callbackFbRoute = route('/auth/facebook/callback')
const signuptwRoute = route('/auth/twitter')
const getdetailuser = route('/api/me')
const forgetpasswordRoute = route('/api/forgetpassword', 'POST')


module.exports = async function (req, res) {

  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET,HEAD,OPTIONS,POST,PUT,DELETE'
  );

  /*url = (req.url).split('?')
  success_url = url[1].split('=');
  success_key = success_url[1].split('&');
  if(success_url)
  {

    if(typeof success_url[0] !== 'undefined' && success_url[0]=="success_url")
    {
      redirect_app_url = success_key[0];
      module.exports.redirect_app_url = redirect_app_url;
    }
  }*/

  if (corsRoute(req)) {
    // Send CORS headers
        return '';
  } else if (loginRoute(req)) {
    console.log('--------------->')
    console.log(req);
        return auth.login(req, res);
  } else if (signupRoute(req)) {
        return users.setup(req, res);
  } else if(signupGitRoute(req)) {
      return github.github(req, res);
    } else if(callbackGitRoute(req)) {
        return github.github(req, res);
  } else if(signupFbRoute(req)) {
      return fb.facebook(req, res);
    } else if(callbackFbRoute(req)) {
        return fb.facebook(req, res);
  } else if(signuptwRoute(req)) {
      getTwitter(req);
      return twitter.twitter(req, res);
    } else if(callbacktwRoute(req)) {
        return twitter.twitter(req, res);
    } else if(getdetailuser(req)){
      if (auth.decode(req, res) !== null) {
        return auth.me(req);
      }
    }else if(forgetpasswordRoute(req)) {
        return users.forgetpassword(req, res);
    }
}
function getTwitter(req){

  const { twitcallbackUrl,twitpath } = require('./src/social-config');

  url1 = req.url.split("?")
  url2 = url1[1].split("&")
  key = url2[1].split("=")
  seceret = url2[2].split("=")

  const options = {
    consumerKey: key[1],
    consumerSecret: seceret[1],
    callbackUrl: twitcallbackUrl,
    path: twitpath
  };
    module.exports.options = options;
    twitter = require('./src/authentication/twitter');

}

function getGithub(req){

}
