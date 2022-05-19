const express = require("express");
const app = express();
const port = 2000;
const mongoose = require("mongoose");
const cors = require("cors");
const { text } = require("express");

mongoose
	.connect(
		"mongodb+srv://gio:gio@cluster0.dhdqp.mongodb.net/todosDatabase?retryWrites=true&w=majority"
	)
	.then(() => console.log("connected"))
	.catch((e) => console.log("doesn't connected", e));

app.use(express.json());
app.use(cors());

const Todo = mongoose.model("Todo", {
	task: String,
	done: false
});


const addTodo = (req, res) => {
	new Todo(req.body).save(function (err, todo) {
		if (err) {
			console.error(err);
		} else {
			res.status(201).json({
				status: "success",
				todos: todo,
			});
		}
	});
};

const getTodos = (req, res) => {
	Todo.find({}, function (err, todo) {
		if (err) {
			console.log("INVALID ID");
		} else {
			res.send(todo);
		}
	});
};

const getTodo = (req, res) => {
	Todo.find({ id: req.params.id }, function (err, todo) {
		if (err) {
			console.log("INVALID ID");
		} else {
			res.send(todo);
		}
	});
};
const deleteTodo = async (req, res) => {
	console.log('haha')
	Todo.findOneAndDelete({ _id: req.params.id }, function (err, docs) {
		console.log(req.params.id)
		if (err) {
			console.log("INVALID ID");
			console.log('---------')
		} else {
			res.send(docs);
			console.log('res', req.params.id)
			console.log('++++++++')
		}
	});
};

const updateTodo = (req, res) => {
	Todo.findOneAndUpdate(
		{ _id: req.params.id },
		{ $set: req.body },
		{ new: false },
		(err, data) => {
			if (data == null) {
				res.send("nothing found");
			} else {
				res.send(data);
			}
		}
	);
};

app.post("/api/todos/add", addTodo);
app.get("/api/todos", getTodos);
app.get("/api/todos/:id", getTodo);
app.delete("/api/todos/:id", deleteTodo);
app.patch("/api/todos/:id", updateTodo);
app.listen(port, () => {
	console.log(`app listening at http://localhost:${port}`);
});
