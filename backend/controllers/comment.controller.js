"use strict";
const _comment = require("../models/comment.model");
const costume = require("../models/costume.model");

exports.mycomment = async (req, res) => {
  if (
    typeof req.body.id_user === "undefined" ||
    typeof req.body.id_costume === "undefined" ||
    typeof req.body.name === "undefined" ||
    typeof req.body.comment === "undefined"
  ) {
    res.status(422).json({ msg: "Invalid data" });
    return;
  }

  let { id_user, id_costume, name, comment } = req.body;
  let costumeFind;
  try {
    costumeFind = await costume.findById(id_costume);
  } catch (err) {
    res.status(422).json({ msg: " ID costume Invalid data" });
    return;
  }
  const new_comment = _comment({
    id_user: id_user,
    id_costume: id_costume,
    name: name,
    comment: comment
  });
  try {
    new_comment.save();
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err });
    return;
  }
  res.status(201).json({ msg: "success" });
  return;
};

exports.getCommentByIDCostume = async (req, res) => {
  if (
    typeof req.body.id_costume === "undefined" ||
    typeof req.body.page === "undefined"
  ) {
    res.status(422).json({ msg: "Invalid data" });
    return;
  }
  let { id_costume, page } = req.body;
  let count = await _comment.count({ id_costume: id_costume });
  let totalPage = parseInt((count - 1) / 9 + 1);
  if (parseInt(page) < 1 || parseInt(page) > totalPage) {
    res.status(200).json({ data: [], msg: "Invalid page", totalPage });
    return;
  }
  _comment
    .find({ id_costume: id_costume })
    .skip(9 * (parseInt(page) - 1))
    .limit(9)
    .sort({ date: 1 })
    .exec((err, docs) => {
      if (err) {
        console.log(err);
        res.status(500).json({ msg: err });
        return;
      }
      res.status(200).json({ data: docs, totalPage });
    });
};
