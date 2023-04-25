const UserController = require("./user.controller");
var router = require("express").Router();
const APIResponse = require("../../helpers/APIResponse");
const httpStatus = require("http-status");
const Joi = require("joi");

router.post("/signup", signUpValidate, UserController.signUp);

router.post("/login", loginValidate, UserController.login);

const signUpValidation = Joi.object()
  .keys({
    email: Joi.string().required().error(new Error("email is required!")),
    firstName: Joi.string()
      .required()
      .error(new Error("firstName is required!")),
    lastName: Joi.string().required().error(new Error("lastName is required!")),
    birthDate: Joi.date().required().error(new Error("birthDate is required!")),
    mobileNumber: Joi.number()
      .required()
      .error(new Error("mobileNumber is required!")),
    password: Joi.string().required().error(new Error("password is required!")),
  })
  .unknown();

const loginValidation = Joi.object()
  .keys({
    email: Joi.string().required().error(new Error("email is required!")),
    password: Joi.string().required().error(new Error("password is required!")),
  })
  .unknown();

function signUpValidate(req, res, next) {
  const Data = req.body;
  Joi.validate(Data, signUpValidation, (error, result) => {
    if (error) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json(new APIResponse(null, error.message, httpStatus.BAD_REQUEST));
    } else {
      return next();
    }
  });
}

function loginValidate(req, res, next) {
  const Data = req.body;
  Joi.validate(Data, loginValidation, (error, result) => {
    if (error) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json(new APIResponse(null, error.message, httpStatus.BAD_REQUEST));
    } else {
      return next();
    }
  });
}

module.exports = router;
