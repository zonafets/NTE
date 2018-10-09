# NTE
## Natural Template Engine

I developed the following example (with [Demo](https://zonafets.github.io/NTE/src/TodoListExample/todoapp.html)) to train myself to a deep use of the javascript features while I was learning about the recent frameworks.

But the idea behind looks interesting and I am available to move from my country if someone wants to support its realization.

Link to old guesses at bottom.

**Take a look to this nice example:**
 
```html
<style>
  
  .order[data-order-state="new"] { color: green; }

  .order[data-order-state="canceled"] { color: red; }
  
</style>

<div class="order" data-order-state="new">  A new order. </div>

<div class="order" data-order-state="canceled">  A canceled order. </div>
```

**CSS is a magic mirror** that keep the HTML **clean and clear**.

**But when it grow and become dynamic,** we loose the concepts in the crossing of attributes.

KnockoutJS, AngularJS, Vue, React infuse the html with attributes.

**Googling** with **"@framework simple todolist"** I found this:

- Simple todolist example with AngularJS [code&demo](http://embed.plnkr.co/ZiVJbCeX4GDgC1kMjnUB/)
- Simple todolist example with KnockoutJS [code&demo](http://jsfiddle.net/icoxfog417/sujqa/)
- Simple (not to find) todolist example with React [code](https://github.com/christiannwamba/scotch-react-todo/blob/master/src/index.jsx) [demo](https://codepen.io/codebeast/full/PzVyRm)
- Simple todolist example with AngularJS [code&demo](http://embed.plnkr.co/ZiVJbCeX4GDgC1kMjnUB/)

## NTE code example

### index.html

```html
<head>
	<script src="nte.js"></script>
</head>

<body>

	<todoapp></todoapp>
	
</body>
```

### todoapp.html (loaded by NTE)

```html
<h1>Todo list</h1>

<task>?</task> <add>Add to list</add>

<todolist>

	<li>
		<done>[_]</done> <description></description> <remove>Remove</remove>
	</li>

</todolist>
```

### todoapp.js (loaded bt NTE)
```javascript
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
		tag:"ul",
		values: [],
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
```


**Rules are (must be) simples:**

- html part is only for layout purpose: no attributes
- JSON/javascript define only the behaviour as CSS define the style

**The aim is to reduce the interception time between the effect (runtime/view) and the cause (the code/model-control).**

JSON is very plastic. For example it can be mixed as in a inheritance and can be generated server side through a transpilation too (also webasm).

Other aspect of this solution are:

- semantic check by javascript compiler or simple editor (eg. __wrong parameter name__ with "use strict") but also by NTE ( eg. __tag/control 'add' not found in tag 'todoapp'__ )
- user-definible events to hide complexity ( eg. "onKeyReturn" )
- simplify tests ( eg. "add.click()" )

### What more

#### Preferred pages?

I'm imagining some feature as **"hash"** member to automatically connect the URL to a page/component/tab.

Integration with Bootstrap&C may require an HTML constructor method as I used in my [CV page](https://zonafets.github.io/site/pages/curriculum.htm#details#projects) (where I have experienced the principles of NTE for the first time).

#### But also widgets template?

```html

<toPay widget="money">To pay</toPay>
<payed widget="money">Payed</payed>

...

<widget name="money" ifParent="form" ifUI="BT3">

  <div class="form-group">
    <label for="@id">@contentText</label>
    <input type="text" class="form-control" id="@id">
  </div>
  
</widget>
```
 

#### Replace complexity of instructions with a concept?

```javascript

	task: {
		...
		empty: (value) => ""
	}
	
	// and instead of:
	
	task.value = ""
	
	// write
	
	task.empty()
```


#### Easy diagram generation? (using [graphviz](src/TodolistExample/todoapp.gv))

![flowchar](src/TodoListExample/todoapp.svg)


**More simple diffs?**
```diff
5c5
< 	task: {
---
> 	todo: {
7c7,9
< 		onKeyReturn: (add) => add.click()
---
> 		onKeyReturn: (add) => add.click(),
> 		empty:(value)=>""
> 		
11,12c13,14
< 		disabled: (task,onkeyup) => task.value == "",
< 		onclick: (todolist,task) => {
---
> 		disabled: (todo,onkeyup) => todo.value == "",
> 		onclick: (todolist,todo) => {
15c17
< 				description: task.value
---
> 				description: todo.value
17c19
< 			task.value = ""
---
> 			todo.empty()
34c36
< }
---
> }

```


### A poetic description
I used JSON as mirror of HTML same as CSS. I added a pinch of Wiki and seasoned it with simple javascript, using, as a secret additive, the parameters of the functions in the form of an observer pattern.

Looking at this code is like tasting a single dish in which the individual flavors stand out well.

### Links
- old guesses are [here](https://github.com/zonafets/NTE/blob/master/old_stuff.md)