import {Task} from "../models/task.js"

export const newTask = async(req, res, next) => {

    const {title, description} = req.body

    await Task.create({
        title, 
        description, 
        user: req.user
    })

    res.status(201).json({
        success:true,
        message: "Task Added Succesfully"
    })
}

export const getMyTask = async(req,res,next) => {
    const userid = req.user._id

    const tasks = await Task.find({user:userid})

    res.status(200).json({
        success: true,
        tasks,
    })
}

export const updateTask = async(req,res,next) => {


    const task = await Task.findById(req.params.id)
    if(!task) return next(new Error("Invalid ID"))
    task.isComplete = !task.isComplete

    await task.save()

    res.status(200).json({
        success: true,
        message: "Task Updated"
    })
}

export const deleteTask = async(req,res,next) => {

    const task = await Task.findById(req.params.id)
    if(!task) return next(new Error("Invalid ID"))

    await task.deleteOne()

    res.status(200).json({
        success: true,
    })
}

