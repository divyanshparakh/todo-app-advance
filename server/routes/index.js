const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares');
const { getTodos, addTodos, editTodos, deleteTodos } = require('../controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/todos/', getTodos); // Get all TODOs

router.post('/todos', verifyToken, addTodos); // Add a TODO

router.put('/todos/:id', verifyToken, editTodos);

router.delete('/todos/:id', verifyToken, deleteTodos);

module.exports = router;
