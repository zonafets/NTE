var TodoList = {
	task: '',

	add: function(task,keyup,change) {
	  this.disabled = (task == '')
	},

	item: {
	  description: {
		classList: {
			"removed": (done) => done
		},
	  },
	},
		
	list: {

	  add: function(task,list) {
		return list.push({
		  done:false,
		  description: task
	      })
	  },

	  remove: function(item,list) {
		delete list[
		  list.indexOf(item)
		]
	  },
	  
	}
}

// clone model
$TodoList = {}
$TodoList.task = TodoList.task
$TodoList.list = []

// extend prototypes
$TodoList.list.push = function() {
	Array.prototype.push.apply(this,arguments);
	return $TodoList.list[$TodoList.list.length-1]
}

// get widgets
var task = document.querySelector("#task")
var add = document.querySelector("#add")
var list = document.querySelector("#list")
var item = document.querySelector("[name='item']")

// remove item templates
item.remove()

// events and messages
var TodoList_task_keyup = function(ev)
{
	TodoList.add.call(add,task.value,ev)
}

var TodoList_task_change = function(ev)
{
	TodoList.add.call(add,task.value,ev)
}

var TodoList_item_done_change = function(ev)
{
	var li = this.parentElement
	var $item = li.$item
	$item.done = this.checked
}

var TodoList_item_description_classList = function(ev)
{
	var li = this.parentElement
	var $item = li.$item
	var description = li.querySelector("[name='description']")
	if (TodoList.item.description.classList.removed($item.done)) 
		description.classList.add("removed")
	else
		description.classList.remove("removed")
}

var TodoList_list_add_click = function(ev)
{
	$item = TodoList.list.add.call(add,task.value,$TodoList.list)
	var li = item.cloneNode(true)
	var done = li.querySelector("[name='done']")
	var description = li.querySelector("[name='description']")
	var remove = li.querySelector("[name='remove']")
	done.checked = $item.done
	description.innerText = $item.description
	done.addEventListener("change",TodoList_item_done_change)
	done.addEventListener("change",TodoList_item_description_classList)
	remove.addEventListener("click",TodoList_list_remove_click)
	li.$item = $item
	list.appendChild(li)
}

var TodoList_list_remove_click = function(ev)
{
	var li = this.parentElement
	var $item = li.$item
	TodoList.list.remove.call(this,$item,$TodoList.list)
	li.remove()
}

task.addEventListener("keyup",TodoList_task_keyup)
task.addEventListener("change",TodoList_task_change)
add.addEventListener("click",TodoList_list_add_click)

// init static values
task.value = $TodoList.task

var ev = new Event('change');
task.dispatchEvent(ev);
