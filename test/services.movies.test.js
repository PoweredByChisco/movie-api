const assert = require('assert');
const proxyquire = require('proxyquire');
const { MongoLibMock, getAllStub } = require('../utils/mocks/mongo.lib');
const {moviesMock} = require("../utils/mocks/movies")

