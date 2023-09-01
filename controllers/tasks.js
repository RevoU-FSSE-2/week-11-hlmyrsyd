const Task = require('../models/tasks')
const { StatusCodes } = require('http-status-codes')
// const asyncWrapper = requre('../middleware/async')

const getAllTasks = async (req, res) => {
    const tasks = await Task.find({createdBy:req.user.userId}).sort('createdAt')
    res.status(StatusCodes.OK).json({tasks, count: tasks.lenght})
    // try {
    //     const tasks = await Task.find({})
    //     res.status(200).json({ tasks })
    // } catch (error) {
    //     res.status(500).json({ msg: error })
    // }
}

const createTask = async (req, res) => {
    req.body.createdBy = req.user.userId
    const task = await Task.create(req.body)
    res.status(StatusCodes.CREATED).json({ task })
    // try {
    //     const task = await Task.create(req.body)
    //     res.status(201).json({ task })
    // } catch (error) {
    //     res.status(500).json({ msg: error })
    // }
}
const getTask = async (req, res) => {
    const {user:{userId},params:{id:taskId}} = req

    const task = await Task.findOne({
        _id:taskId,createdBy:userId
    })
    if(!task){
        return res.status(404).json({ msg: `No task with id : ${taskID}`}) 
    }
    res.status(StatusCodes.OK).json({ task })
    // try {
    //     const {id:taskID} = req.params
    //     const task = await Task.findOne({ _id:taskID });
    //     if(!task){
    //         return res.status(404).json({ msg: `No task with id : ${taskID}`})
    //     }
    //     res.status(200).json({ task })
    // } catch (error) {
    //     res.status(500).json({ msg: error })
    // }
}
const updateTask = async (req, res) => {
    const {
        body: { name },
        user: { userId },
        params: { taskId },
    } = req

    if (name === '') {
        return res.status(400).send("Something is missing 😕");
    }
    const task = await Task.findByIdAndUpdate({_id:taskId,createdBy:userId},req.body, {new:true, runValidators:true})
    if(!task){
        return res.status(404).json({ msg: `No task with id : ${taskID}`}) 
    }
    res.status(StatusCodes.OK).json({ task })
    // try {
    //     const {id:taskID} = req.params
        
    //     const task = await Task.findOneAndUpdate({ _id:taskID },req.body,{
    //         new: true,
    //         runValidators: true,
    //     })
    //     if(!task){
    //         return res.status(404).json({ msg: `No task with id : ${taskID}`})
    //     }

    //     res.status(200).json({ task })
    // } catch (error) {
    //     res.status(500).json({ msg: error })
    // }
    // res.send('update task')
}
const deleteTask = async (req, res) => {
    const {
        user: { userId },
        params: { id: taskId },
    } = req

    const task = await Task.findByIdAndRemove({_id:taskId,createdBy:userId})
    if(!task){
        return res.status(404).json({ msg: `No task with id : ${taskID}`}) 
    }
    res.status(StatusCodes.OK).json({ task })

    // try {
    //     const {id:taskID} = req.params;
    //     const task = await Task.findOneAndDelete({ _id:taskID });
    //     if(!task){
    //         return res.status(404).json({ msg: `No task with id : ${taskID}`})
    //     }
    //     res.status(200).json({ task }) //delete
    //     // res.status(200).json({ task: null, status: 'success' }) //beauty delete
    // } catch (error) {
    //     res.status(500).json({ msg: error })
    // }
}

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask,
}