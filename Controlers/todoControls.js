const Todo = require("../Models/todoModel");
const mongoose = require('mongoose')
const userModel = require("../Models/userModel");

const getAllTodos = async (req, res) => {
    console.log("Getting All Todos")
    try {
        //validating user id
        const id = req.userId;

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(401).json({message: "unauthorised"});
        }

        //getting todos 
        const AllTodos = await Todo.find({creatorId: id});
        // const todos = AllTodos.map((e) => {
        //     if(e.creatorId === id){
        //         return e;
        //     }
        // });

        if(!AllTodos){
            return res.status(400).json({message: "Empty"});
        }

        console.log(AllTodos);

        res.status(200).json(AllTodos);
        // res.status(200).json(AllTodos);
    } catch (e) {
        res.status(400).json({error: "Couldnot get your tasks"});
    }
}

const getSingleTodo = async (req, res) => {
    try {
        const {id} = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({message: "No TODO Found!"});
        }

        //get todo
        const curTodo = await Todo.findById(id);
        if(!curTodo){
            return res.status(400).json({message: "No Todo Found"});
        }
        res.status(200).json(curTodo);
    } catch (e) {
        res.status(400).json(e);
    }
}

const createTodo = async (req, res) => {
    //get details
    const { title, description } = req.body;
    console.log(title);
    if(!title || !description){
        return res.status(400).json({message: "All fields Mandatory"});
    }

    try {
        //get cur user
        const curUserId = req.userId;
        console.log(curUserId);
        if(!mongoose.Types.ObjectId.isValid(curUserId)){
            return res.status(401).json({message: "Unauthorised"});
        }
        const newTodo = await Todo.create({creatorId: curUserId, title, description});
        res.status(200).json(newTodo);
    } catch (e) {
        res.status(400).json({error: e});
    }
}

const updateTodo = async (req, res) => {
    try {
        const { id } = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({message: "No TODO Found!"});
        }

        const { title, description } = req.body;
        const updatedTodo = await Todo.findByIdAndUpdate({_id: id}, {
            $set : {
                title: title,
                description: description
            }
        })

        if(!updatedTodo){
            return res.status(400).json({message: "Couldnot Update"});
        }
        res.status(200).json(updatedTodo);
    } catch (e) {
        res.status(400).json(e);
    }
}

const deleteTodo = async (req, res) => {
    try {

        const { id } = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({message: "No TODO Found!"});
        }


        const deletedTodo = await Todo.findByIdAndDelete(id);
        if(!deletedTodo){
            return res.status(400).json({message: "Couldnot delete"});
        }
        res.status(200).json(deletedTodo); 

    } catch (e) {
        res.status(400).json(e);
    }
}
module.exports = {getAllTodos, getSingleTodo, createTodo, updateTodo, deleteTodo}