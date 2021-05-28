"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addBenchmarkRoutes = void 0;

var _benchmarks = require("../controllers/benchmarks.controller");

var _jwt = require("../utils/jwt");

var addBenchmarkRoutes = router => {
  router.get("/timeBenchmarks", (0, _jwt.verifyToken)(["admin"]), _benchmarks.getTimeBenchmarks);
  router.get("/timeBenchmarksByWriter", (0, _jwt.verifyToken)(["admin"]), _benchmarks.getTimeBenchmarksByWriter);
};

exports.addBenchmarkRoutes = addBenchmarkRoutes;