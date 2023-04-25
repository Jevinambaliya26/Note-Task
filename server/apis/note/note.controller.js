"use strict";

const Note = require("./note.model");
const httpStatus = require("http-status");
const APIResponse = require("../../helpers/APIResponse");
const Utils = require("../../helpers/utils");
let JWTHelper = require("../../helpers/jwt.helper");

class NoteController {
  //create Note
  async createNote(req, res, next) {
    try {
      req.body.userId = req.user.id;
      const model = new Note(req.body);
      let response = await model.save();

      response = {
        ...JSON.parse(JSON.stringify(response)),
      };
      return res
        .status(httpStatus.OK)
        .json(
          new APIResponse(response, "Note added successfully", httpStatus.OK)
        );
    } catch (error) {
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json(
          new APIResponse(
            {},
            "Error adding Note",
            httpStatus.INTERNAL_SERVER_ERROR,
            error
          )
        );
    }
  }

  //Note get by id
  async getNoteById(req, res, next) {
    let id = req.params.id;

    try {
      let response = await Note.findById(id);
      if (response && response.userId !== req.user.id) {
        return res
          .status(httpStatus.BAD_REQUEST)
          .json(
            new APIResponse(
              {},
              "you are not authorize to see this Note",
              httpStatus.BAD_REQUEST
            )
          );
      }

      if (response) {
        return res
          .status(httpStatus.OK)
          .json(
            new APIResponse(
              response,
              "Note fetched successfully",
              httpStatus.OK
            )
          );
      }
      return res
        .status(httpStatus.BAD_REQUEST)
        .json(
          new APIResponse(
            {},
            "Note with the specified ID does not exists",
            httpStatus.BAD_REQUEST
          )
        );
    } catch (error) {
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json(
          new APIResponse(
            null,
            "Error getting Note",
            httpStatus.INTERNAL_SERVER_ERROR,
            error
          )
        );
    }
  }

  //get all Notes
  async getAllNote(req, res, next) {
    try {
      const { page, limit } = req.query;
      const paginationFilter = {
        limit: Number(limit) || 10,
        skip: (Number(page) - 1) * limit,
      };
      let response = await Note.findAllByUserId(req.user.id, paginationFilter);
      return res
        .status(httpStatus.OK)
        .json(
          new APIResponse(response, "Note fetched successfully", httpStatus.OK)
        );
    } catch (error) {
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json(
          new APIResponse(
            {},
            "Error getting Notes",
            httpStatus.INTERNAL_SERVER_ERROR,
            error
          )
        );
    }
  }

  //update Note
  async updateNoteById(req, res, next) {
    try {
      const body = req.body;
      const note = await Note.findById(body._id);

      if (note.userId === req.user.id) {
        const response = await Note.update(req.body);
        if (response) {
          return res
            .status(httpStatus.OK)
            .json(
              new APIResponse(
                response,
                "Note updated successfully",
                httpStatus.OK
              )
            );
        }
        return res
          .status(httpStatus.BAD_REQUEST)
          .json(
            new APIResponse(
              {},
              "Note with the specified ID does not exists",
              httpStatus.BAD_REQUEST
            )
          );
      }
      return res
        .status(httpStatus.BAD_REQUEST)
        .json(
          new APIResponse(
            {},
            "you are not authorize to delete this Note",
            httpStatus.BAD_REQUEST
          )
        );
    } catch (e) {
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json(
          new APIResponse(
            null,
            "Error updating Note",
            httpStatus.INTERNAL_SERVER_ERROR,
            e
          )
        );
    }
  }

  //delete Note by id
  async deleteNoteById(req, res, next) {
    const noteId = req.params.id;
    try {
      const note = await Note.findById(noteId);
      if (note.userId === req.user.id) {
        let response = await Note.delete(noteId);
        if (response) {
          return res
            .status(httpStatus.OK)
            .json(
              new APIResponse({}, "Note deleted successfully", httpStatus.OK)
            );
        }
        return res
          .status(httpStatus.BAD_REQUEST)
          .json(
            new APIResponse(
              {},
              "Note with the specified ID does not exists",
              httpStatus.BAD_REQUEST
            )
          );
      }
      return res
        .status(httpStatus.BAD_REQUEST)
        .json(
          new APIResponse(
            {},
            "you are not authorize to update this Note",
            httpStatus.BAD_REQUEST
          )
        );
    } catch (error) {
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json(
          new APIResponse(
            null,
            "Error deleting Note",
            httpStatus.INTERNAL_SERVER_ERROR,
            error
          )
        );
    }
  }
}

var exports = (module.exports = new NoteController());
