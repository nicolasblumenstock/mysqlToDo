var express = require('express');
var router = express.Router();
var config = require('../config/config');

var mysql = require('mysql');
var connection = mysql.createConnection({
	host: config.host,
	user: config.userName,
	password: config.password,
	database: config.database
})

connection.connect();

/* GET home page. */
router.get('/', function(req, res, next) {
	var message = req.query.msg;
	if (message == "added"){
		message = "Your task has been added.";
	}
	var selectQuery = "SELECT * FROM tasks;";
	connection.query(selectQuery,(error,results)=>{
		console.log(results)
		res.render('index', {
	  		message: message,
	  		taskArray: results
		});
	})

});

router.post('/addItem', function(req,res){
	var newTask = req.body.newTask;
	var dueDate = req.body.newTaskDate;
	var insertQuery = "INSERT INTO tasks (taskName, taskDate) VALUES ('"+newTask+"', '"+dueDate+"');";
	connection.query(insertQuery, function(error, result){
		if (error) throw error;
		res.redirect('/?msg=added');
		console.log('1 Task Added');
	})	
})

router.get('/delete/:id',(req,res)=>{
	var idToDelete = req.params.id;
	var deleteQuery = 'DELETE FROM tasks WHERE id = ' + idToDelete;
	connection.query(deleteQuery,(error,results)=>{
		res.redirect('/?msg=deleted');
	})
})

router.get('/edit/:id',(res,req)=>{
	var idToUpdate = req.params.id;
	console.log(req.body)
	// var updateQuery = 'UPDATE tasks SET';
	// connection.query(updateQuery,(error,results)=>{
	// 	res.redirect('/?msg=updated');
	// })
})

module.exports = router;
