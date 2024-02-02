import { NextFunction, Request, Response } from "express";

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req: Request, res: Response, next:NextFunction ) {
  res.json({ title: 'Express' });
});

module.exports = router;