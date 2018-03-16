const express = require('express')
const app = express();

const bp = require('body-parser')
app.use(bp.json());
app.use(express.static( __dirname + '/helloAngular/dist' ));

var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/restfulAPI')

// Schemas go here==>
var TaskSchema = new mongoose.Schema({
	title: {type:String,required:true},
	description: {type:String,default:""},
	completed: {type:Boolean,default:false}
}, {timestamps:true})
mongoose.model('Task', TaskSchema)
var Task = mongoose.model('Task')
// <== end schemas

//Routes go here ==>

app.get('/tasks', function(req,res){
	Task.find({}, function(err, tasks){
		if(err){
			console.log ("Returned error", err)
			res.json({message: "Error", error: err})
		}
		else {
			res.json({message: "Success", data: tasks})
		}
	})
})
app.get('/tasks/:id', function(req,res){
	Task.findOne({_id: req.params.id}, function(err, task){
		if(err){
			console.log ("Returned error", err)
			res.json({message: "Error", error: err})
		}
		else {
			res.json({message: "Success", data: task})
		}
	})
})
app.post('/tasks', function(req,res){
	var task = new Task({title:req.body.title, description: req.body.description, completed: req.body.completed})
	task.save(function(err){
		if(err){
			console.log ("Returned error", err)
			res.json({message: "Error", error: err})
		}
	})
})
app.put('/tasks/:id', function(req,res){
	var task = Task.update({_id: req.params.id}, {title:req.body.title, description: req.body.description,completed: req.body.completed}, function(err){
		if(err){
			console.log ("Returned error", err)
			res.json({message: "Error", error: err})
		}
	})
})
app.delete('/tasks/:id', function(req,res){
	Task.remove({_id: req.params.id}, function(err){
		if(err){
			console.log ("Returned error", err)
			res.json({message: "Error", error: err})
		}
	})
})

// <== end routes

app.listen(8000, function() {
	console.log("listening on port 8000");
})