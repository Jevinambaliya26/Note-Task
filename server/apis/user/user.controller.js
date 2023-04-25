'use strict'

const User = require('./user.model')
const httpStatus = require('http-status')
const APIResponse = require('../../helpers/APIResponse')
const Utils = require('../../helpers/utils')
let JWTHelper = require('../../helpers/jwt.helper')

class UserController {
  //sign up user
  async signUp (req, res, next) {
    try {
      const userExists = await User.findOne({ email: req.body.email })

      let model = new User(req.body)
      if (!userExists) {
        let response = await model.save()

        JWTHelper = require('../../helpers/jwt.helper')

        const token = JWTHelper.getJWTToken({
          id: response.id,
          email: response.email,
          role: response.role
        })

        response = {
          ...JSON.parse(JSON.stringify(response)),
          token: token
        }

        return res
          .status(httpStatus.OK)
          .json(
            new APIResponse(response, 'User added successfully', httpStatus.OK)
          )
      } else {
        return res
          .status(httpStatus.BAD_REQUEST)
          .json(
            new APIResponse({}, 'User already exist', httpStatus.BAD_REQUEST)
          )
      }
    } catch (error) {
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json(
          new APIResponse(
            {},
            'Error adding user',
            httpStatus.INTERNAL_SERVER_ERROR,
            error
          )
        )
    }
  }

  //login user
  async login (req, res, next) {
    let body = req.body

    try {
      let response = await User.login(body.email, body.password)
      if (response) {
        JWTHelper = require('../../helpers/jwt.helper')

        const token = JWTHelper.getJWTToken({
          id: response.id,
          email: response.email,
          department: response.department,
          type: 'user'
        })

        response = {
          ...JSON.parse(JSON.stringify(response)),
          token: token
        }

        return res
          .status(httpStatus.OK)
          .json(new APIResponse(response, 'Login successfully', httpStatus.OK))
      }
      return res
        .status(httpStatus.UNAUTHORIZED)
        .json(
          new APIResponse({}, 'Authentication error', httpStatus.UNAUTHORIZED)
        )
    } catch (error) {
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json(
          new APIResponse(
            {},
            'Error authenticating user',
            httpStatus.INTERNAL_SERVER_ERROR,
            error
          )
        )
    }
  }
}

var exports = (module.exports = new UserController())
