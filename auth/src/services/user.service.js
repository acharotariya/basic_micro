const User = require('../models/user');
const { hashSync } = require('bcrypt');
const { json, send, createError } = require('micro');
const Promise = require('promise');

module.exports.list = async () => {
  return await User.find();
};


const signup = ({ username, password, email, fullname }) =>
{
 return User.find({ username: username }).exec().then((users, err) => {
     if (!users.length) {
         let user = new User({ username: username, password: hashSync(password, 2), email:email, fullname:fullname  });
         return user.save();
     }else{
       throw createError(401, 'That user already exist');
     }
 })


return getUsername(username).then((res) =>{
   console.log(res);
   return getEmail(email);
 }).then((res)=>{
   let user = new User({ username: username, password: hashSync(password, 2), email:email, fullname:fullname  });
   return user.save();
 }).catch((err) => {
   throw createError(401, err);
 })

}


module.exports.setup = async (req, res) => await signup(await json(req));

let getUsername = function(username){
  promise =  new Promise(function(resolve,reject){
    User.find({ username: username }).exec().then((users, err) => {
      if(users.length) {
        reject('That username already exist');
      }else{
        resolve('not exist')
      }
    })
  })

  return promise;
}


let getEmail = function(email){
  promise =  new Promise(function(resolve,reject){
    User.find({ email: email }).exec().then((users, err) => {
      if(users.length) {
        reject('That email already exist');
      }else{
        resolve('not exist')
      }
    })
  })

  return promise;
}


// const forgetPassword = ({ email }) =>
// {
//
// }




// module.exports.forgetpassword = async (req, res) => await forgetPassword(await json(req));


module.exports.forgetpassword = async (req,res) => {
  // console.log('test');
  // return true;
  // emailn = req.params.email;
  //  return await User.find({ email: emailn });
  //  send(res,"200",req)

  // req = await json(req)
  // send(res,"200",req)
  console.log("forgetpassword async method called");
  var findByEmail = function(){
    User.find({ email: email }).exec().then((users, err) => {


    //
    // User.findByEmail(email)
    // .then(User.resetPassword)
    // .then(User.emailPassword)
    // .then (response) ->
    //   console.log 'sent message', response
    //   res.send 200
    // .fail (err) ->
    //   console.log 'err somewhere in reset pass', err
    //   res.send 500




})
}
}
