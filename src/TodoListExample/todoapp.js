"use strict"

var todoapp = {

	task: {
		placeholder:"write here what to do",
		onKeyReturn: (add) => add.click()
	},

	add: {
		disabled: (task,onkeyup) => task.value == "",
		onclick: (todolist,task) => {
			todolist.values.push({
				done: false,
				description: task.value
			})
			task.value = ""
		}
	},

	todolist: {
		values: [],
		tag:"ul",
		li: [{
			description: {
				style: {
					textDecoration: (done,onclick,item) => item.done ? "line-through" : "none"
				}
			}, 
			remove: (todolist,item) => todolist.values.remove(item),
		}],
	},

}
