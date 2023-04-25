"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const Utils = require("../../helpers/utils");

// freeze role
var Role = Object.freeze({
  USER: "user",
  ADMIN: "admin",
});

//user schema
var Schema = new Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    password: {
      type: String,
      required: true,
      select: false,
      set: Utils.encrypt,
    },
    role: { type: Role, default: Role.USER },
    firstName: { type: String, required: true, set: Utils.capitalize },
    lastName: { type: String, required: true, set: Utils.capitalize },
    birthDate: { type: Date, required: true },
    mobileNumber: { type: Number, required: true },
    location: { type: String },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

//login user
Schema.statics.login = function (email, password) {
  return this.findOne({
    email: email,
    password: password,
    isActive: true,
  }).exec();
};

//user find by id
Schema.statics.findById = function (id) {
  return this.findOne({ _id: id, isActive: true });
};

module.exports = mongoose.model("User", Schema);
