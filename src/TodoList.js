var TodoList = {
	task: '',
	
	list_add: function(task,list) 
	{
		return {
			task: '',
			list: list.push({
			  done:false,
			  description: task
			  })
		}
	},

	add: function(
			element,list,
			task,keyup,change
			) 
	{
	  element.disabled = (task == '')
	  if (keyup!==undefined 
	  && keyup.keyCode==13 
	  && task!='') 
		  return this.list_add(task,list)
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
		  return this.list_add(task,list)
	  },

	  remove: function(item,list) {
		  return list.pop(item)
	  },
	  
	}
}

// model
$TodoList = {}
$TodoList.task = TodoList.task
$TodoList.list = []
$TodoList.list_add = TodoList.list_add.bind($TodoList)

// extend prototypes
$TodoList.list.push = function() {
	Array.prototype.push.apply(this,arguments);
	return {
		action: +1,
		item: $TodoList.list[$TodoList.list.length-1]
	}
}
$TodoList.list.pop = function(item) {
	//Array.prototype.push.apply(this,arguments);
	delete this[
		  this.indexOf(item)
		]
	return {
		action: -1,
		item: item
	}
}

// get widgets
$TodoList.$task = document.querySelector("#task")
$TodoList.$add = document.querySelector("#add")
$TodoList.$list = document.querySelector("#list")
$TodoList.$item = document.querySelector("[name='item']")

// remove item templates
$TodoList.$item.remove()

// events and messages
var TodoList_task_keyup = function(ev)
{
	var updates = TodoList.add.call($TodoList,$TodoList.$add,task.value,ev,undefined)
}

var TodoList_task_change = function(ev)
{
	var updates = TodoList.add.call($TodoList,$TodoList.$add,task.value,undefined,ev)
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
	var updates = TodoList.list.add.call($TodoList,task.value,$TodoList.list)
	$TodoList.$task.value = updates.task
	var item = updates.list.item
	var li = $TodoList.$item.cloneNode(true)
	var done = li.querySelector("[name='done']")
	var description = li.querySelector("[name='description']")
	var remove = li.querySelector("[name='remove']")
	done.checked = item.done
	description.innerText = item.description
	done.addEventListener("change",TodoList_item_done_change)
	done.addEventListener("change",TodoList_item_description_classList)
	remove.addEventListener("click",TodoList_list_remove_click)
	li.$item = item
	list.appendChild(li)
}

var TodoList_list_remove_click = function(ev)
{
	var li = this.parentElement
	var $item = li.$item
	var updates = TodoList.list.remove.call(this,$item,$TodoList.list)
	li.remove()
}

task.addEventListener("keyup",TodoList_task_keyup)
task.addEventListener("change",TodoList_task_change)
add.addEventListener("click",TodoList_list_add_click)

// init static values
task.value = $TodoList.task

var ev = new Event('change');
task.dispatchEvent(ev);
