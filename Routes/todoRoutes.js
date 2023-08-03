const express = require('express');
const authorize = require('../Middlewares/authorize');
const {
    getAllTodos,
    getSingleTodo,
    createTodo,
    updateTodo,
    deleteTodo
} = require('../Controlers/todoControls');

const router = express.Router();

router.get('/', authorize, getAllTodos);
router.get('/:id', authorize, getSingleTodo);
router.post('/', authorize, createTodo);
router.patch('/:id', authorize, updateTodo);
router.delete('/:id', authorize, deleteTodo);

module.exports = router;
