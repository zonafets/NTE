var TodoList = {
	task: '',

	add: function(
			$add,list,
			task,keyup,change
			) 
	{
	  var disabled = (task == '')
	  $add.disabled = disabled
	  var add = (!disabled 
	  && keyup!==undefined
	  && keyup.keyCode==13)
	  if (add) return (
	      this.list.add(
	        task,list
          )
	  )
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
		  return {
			task: '',
			list: list.push({
			  done:false,
			  description: task
			  })
		}
	  },

	  remove: function(item,list) {
		  return list.pop(item)
	  },
	  
	}
}

// model
$TodoList = {}
$TodoList.$vm = {} // ViewModel data
$vm=$TodoList.$vm
$vm.list = []
$TodoList.$messages={} // ViewModel functions
$messages=$TodoList.$messages
$messages.list={}
$messages.list.add = TodoList.list.add.bind($messages)

// extend prototypes
$vm.list.push = function() {
	Array.prototype.push.apply(this,arguments);
	return {
		action: +1,
		item: $vm.list[$vm.list.length-1]
	}
}
$vm.list.pop = function(item) {
	//Array.prototype.push.apply(this,arguments);
	delete this[
		  this.indexOf(item)
		]
	return {
		action: -1,
		item: item
	}
}

// widgets
$TodoList.$task = document.querySelector("#task")
$TodoList.$add = document.querySelector("#add")
$TodoList.$list = document.querySelector("#list")
$TodoList.$item = document.querySelector("[name='item']")

// remove item templates
$TodoList.$item.remove()

// events and messages
var TodoList_task_keyup = function(ev)
{
	var updates = TodoList.add.call($messages,$TodoList.$add,$vm.list,task.value,ev,undefined)
}

var TodoList_task_change = function(ev)
{
	var updates = TodoList.add.call($messages,$TodoList.$add,$vm.list,task.value,undefined,ev)
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
	var updates = TodoList.list.add.call($messages,task.value,$vm.list)
	$TodoList.$task.value = updates.task
	var ev = new Event('change');
	task.dispatchEvent(ev);
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
	var updates = TodoList.list.remove.call($messages,$item,$vm.list)
	li.remove()
}

task.addEventListener("keyup",TodoList_task_keyup)
task.addEventListener("change",TodoList_task_change)
add.addEventListener("click",TodoList_list_add_click)

// init static values
$TodoList.task = TodoList.task
task.value = $TodoList.task

var ev = new Event('change');
task.dispatchEvent(ev);
