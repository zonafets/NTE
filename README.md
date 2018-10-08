# NTE | TBE *
## Natural Template Engine | Template By Example


This is the second self brainstorming about a new (type of) framework that keep the old paradigm.
The old guesses are [here](https://github.com/zonafets/NTE/blob/master/old_stuff.md).

It's started to train my self to a deep use of javascript's features.

But the idea behind looks interesting and I am available to move from Italy if someone wants to support its realization.

## Let's start

**Take a look to this example:**
 
```html
<style>
  
  .order[data-order-state="new"] { color: green; }

  .order[data-order-state="pending"] { color: blue; }

  .order[data-order-state="canceled"] { color: red; }
  
</style>

<div class="order" data-order-state="new">  A new order. </div>

<div class="order" data-order-state="pending">  A pending order. </div>

<div class="order" data-order-state="canceled">  A canceled order. </div>
```

**CSS is a magic mirror** that keep the HTML **clean and clear**.

**What happen when it grow and become dynamic?** We loose the concepts in the crossing of attributes.

KnockoutJS, AngularJS, Vue, React infuse the html with attributes of names and contents that are often unrelated to javascript.

**Googling** with **"@framework simple todolist"** I found this:

- Simple todolist example with AngularJS [code&demo](http://embed.plnkr.co/ZiVJbCeX4GDgC1kMjnUB/)
- Simple todolist example with KnockoutJS [code&demo](http://jsfiddle.net/icoxfog417/sujqa/)
- Simple (not to find) todolist example with React [code](https://github.com/christiannwamba/scotch-react-todo/blob/master/src/index.jsx) [demo](https://codepen.io/codebeast/full/PzVyRm)
- Simple todolist example with AngularJS [code&demo](http://embed.plnkr.co/ZiVJbCeX4GDgC1kMjnUB/)

## My * example

### index.html

```html
<head>
	<script src="tbe.js"></script>
</head>

<body>

	<todoapp></todoapp>
	
</body>
```

### todoapp.html

```html
<h1>Todo list</h1>

<task>?</task> <add>Add to list</add>

<todolist>

	<li>
		<done>[_]</done> <description></description> <remove>Remove</remove>
	</li>

</todolist>
```

### todoapp.js
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

### [Demo](https://zonafets.github.io/NTE/src/TodoListExample/todoapp.html)

Using the speed of browser's DOM compiler, TBE scan root tags (**todoapp**) and load the relative **html** and then the **js**.

**Rules are (must be) simples:**

- html part is only for layout purpose: no attributes
- JSON/javascript define only the behaviour as CSS define the style

**The aim is to reduce the interception time between the effect (runtime/view) and the cause (the code/model-control).**

JSON is very plastic. For example it can be mixed as in a inheritance.

I'm very attracted from using a single programming language and from transpilation (in particular webasm), but here the generated code is not over structured and there is no overhead (maybe can be effect of a transpilation too).

Other aspect of this solution are:
- semantic check by javascript compiler or simple editor (eg. "wrong parameter name" with "use strict") but also by TBE ( eg. "tag/control X not found in Y" )
- user-definible events to hide complexity ( eg. "onKeyReturn" )
- simplify tests ( eg. "add.click()" )

### What more

I'm imagining some feature as **"hash"** member to automatically connect the URL to a page/component/tab.

Integration with Bootstrap&C may require an HTML constructor method as I used in my [CV page](https://zonafets.github.io/site/pages/curriculum.htm#details#projects) (where I have experienced the principles of * for the first time).

We can replace complexity of instructions with concept:
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


**Easy diagram generation?**

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

## (*)
I'm not sure if call this new (type of) framework with:
- NTE: natural template engine because it resuses basic knowledge
- TBE: template by example because what you draw with HTML is what you see and what you get into JSON/javascript.

### A poetic description
I used JSON as mirror of HTML same as CSS. I added a pinch of Wiki and seasoned it with simple javascript, using, as a secret additive, the parameters of the functions in the form of an observer pattern.

Looking at this code is like tasting a single dish in which the individual flavors stand out well.
