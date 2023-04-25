"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const Utils = require("../../helpers/utils");

//note schema
var Schema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    userId: { type: String, required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

//note find by id
Schema.statics.findById = function (id) {
  return this.findOne({ _id: id, isActive: true });
};

// note find all
Schema.statics.findAll = function () {
  return this.find({ isActive: true });
};

// find all notes by authenticated user
Schema.statics.findAllByUserId = function (userId, paginationFilter) {
    return this.find({ userId: userId, isActive: true }).skip(paginationFilter.skip).limit(paginationFilter.limit);
  };

//note update by id
Schema.statics.update = function (data) {
  return this.findOneAndUpdate(
    {
      _id: data._id,
    },
    {
      $set: data,
    },
    { new: true } // returns updated record
  );
};

//note delete by id
Schema.statics.delete = function (id) {
  return this.findOneAndUpdate(
    {
      _id: id,
      isActive: { $ne: false },
    },
    {
      $set: { isActive: false },
    },
    { new: true } // returns updated record
  );
};

module.exports = mongoose.model("Note", Schema);
