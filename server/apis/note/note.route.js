const NoteController = require("./note.controller");
var router = require("express").Router();
const APIResponse = require("../../helpers/APIResponse");
const httpStatus = require("http-status");
const Joi = require("joi");

// create note endpoint
router.post("/create", createNoteValidate, NoteController.createNote);

// get all note endpoint
router.get("/", NoteController.getAllNote);

// get note by id endpoint
router.get("/:id", IDparamRequiredValidation, NoteController.getNoteById);

// update note by id endpoint
router.put("/update", updateValidate, NoteController.updateNoteById);

// delete note by id endpoint
router.delete("/:id", IDparamRequiredValidation, NoteController.deleteNoteById);

const createNoteValidation = Joi.object()
  .keys({
    title: Joi.string().required().error(new Error("title is required!")),
    content: Joi.string().required().error(new Error("content is required!")),
  })
  .unknown();

const updateValidation = Joi.object()
  .keys({
    _id: Joi.string().required().error(new Error("_id is required!")),
  })
  .unknown();

function createNoteValidate(req, res, next) {
  const Data = req.body;
  Joi.validate(Data, createNoteValidation, (error, result) => {
    if (error) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json(new APIResponse(null, error.message, httpStatus.BAD_REQUEST));
    } else {
      return next();
    }
  });
}

function updateValidate(req, res, next) {
  const Data = req.body;
  Joi.validate(Data, updateValidation, (error, result) => {
    if (error) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json(new APIResponse(null, error.message, httpStatus.BAD_REQUEST));
    } else {
      return next();
    }
  });
}

function IDparamRequiredValidation(req, res, next) {
  if (req.params && req.params.hasOwnProperty("id")) {
    next();
  } else {
    return res
      .status(httpStatus.BAD_REQUEST)
      .json(
        new APIResponse(null, "id param not found", httpStatus.BAD_REQUEST)
      );
  }
}

module.exports = router;
