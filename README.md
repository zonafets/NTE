# NTE
## Natural Template Engine

An interesting idea emerged developing the following example (with [Demo](https://zonafets.github.io/NTE/src/TodoListExample/todoapp.html)) to train myself to a deep use of javascript.

**Take a look to this nice sample where CSS keeps HTML clean and clear:**

```html
<style>
  
  .order[data-order-state="new"] { color: green; }

  .order[data-order-state="canceled"] { color: red; }
  
</style>

<div class="order" data-order-state="new">  A new order. </div>

<div class="order" data-order-state="canceled">  A canceled order. </div>
```


**But when it grow and/or become dynamic,** we loose the concepts in the crossing of attributes.

In one my experience, I noticed that "addEventLister" was a more flexible choice than use "body.onFocus" that work differently from Chrome desktop to Chome mobile.

**Looks like layout and behaviour have to stay separated.**

Instead KnockoutJS, AngularJS, Vue, React infuse the html with more attributes.

**Googling** with **"@framework simple todolist"** I found this:

- Simple todolist example with AngularJS [code&demo](http://embed.plnkr.co/ZiVJbCeX4GDgC1kMjnUB/)
- Simple todolist example with KnockoutJS [code&demo](http://jsfiddle.net/icoxfog417/sujqa/)
- Simple (not to find) todolist example with React [code](https://github.com/christiannwamba/scotch-react-todo/blob/master/src/index.jsx) [demo](https://codepen.io/codebeast/full/PzVyRm)
- Simple todolist example with AngularJS [code&demo](http://embed.plnkr.co/ZiVJbCeX4GDgC1kMjnUB/)

## NTE code example

Why **natural**? Because the developer must develop using what he already knows by learning new things along the way. So, isn't you that learn the framework, but is the framework that teach to you.

NB. The following example is a prerequisite to that following in the [new version of the concept](NTE-MVC.md).

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

<task></task> <add>Add to list</add>

<todolist>

    <done></done> <description></description> <remove>Remove</remove>

</todolist>
```

### todoapp.js (loaded by NTE)
```javascript
var todoapp = {

	task: {
        tag: "input",
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
    
    done: {
        tag: "checkbox"
    }

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

**Advantagies**

- semantic check by javascript compiler or simple editor (eg. __wrong parameter name__ with "use strict") but also by NTE ( eg. __tag/control 'add' not found in tag 'todoapp'__ )
- user-definible events to hide complexity or hide GUI event under application actions (eg. "onKeyReturn")
- simplify tests ( eg. "add.click()" )

### Ideas for the future

#### todolist.NTML?

```js
h1 "Todo list" 

input @task button "Add to list" @add

ul @todolist

	li[] 

		checkbox @done @description button "Remove" @remove
```

#### Direct link to GUI parts?

I'm imagining some feature as **"hash"** member to automatically connect the URL to a page/component/tab.

Integration with Bootstrap&C may require an HTML constructor method as I used in my [CV page](https://zonafets.github.io/site/pages/curriculum.htm#details#projects) (where I have experienced the principles of NTE for the first time).

#### Widgets template?

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


#### Easy diagram generation? (using [graphviz](https://github.com/zonafets/NTE/blob/master/src/TodoListExample/todoapp.gv))

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