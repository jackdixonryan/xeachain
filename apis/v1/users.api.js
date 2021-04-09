import express from 'express';

const userApi = (function api() {
  "use strict";

  const router = express.Router();
  // send not implemented until... well, implemented.
  async function get(req, res, next) {
    res.sendStatus(501);
  }

  async function post(req, res, next) {
    res.sendStatus(501);
  }

  async function patch(req, res, next) {
    res.sendStatus(501);
  }

  async function put(req, res, next) {
    res.sendStatus(501);
  }

  async function deleteCtrl(req, res, next) {
    res.sendStatus(501);
  }

  router.get('/users', get);
  router.post('/users', post);
  router.patch('/users', patch);
  router.put('/users', put);
  router.delete('/users', deleteCtrl);

  return router;
})();

export default userApi;