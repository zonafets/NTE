# T.B.E.  principles

#### todoApp.html 

```html
<todoApp>

	<h1>Todo list</h1>

	<text>todo?</text><add>Add todo</add>

	<todos>

		<li>
			<done></done><description></description><remove></remove>
		</li>

	</todos>

</todoApp>
```

#### todoApp.js 

```javascript
todoApp: {

	data: [],

	add: function() {
		todos.value.push({
			done: false,
			description: text.value
			}
		)
		update(todos)
	},

	todos: {
		value: data,
		tag:"ul",
		done:{
			type:"checkbox",
			change:(todo)=>{
				description.element.style.textDecoration = todo.done.value?"line-through":"none"
			},
		},
		remove: (todo)=>{
			todos.value.remove(todo)
			update(todos)
		}
	},

}
```

#### Explanation

TBE scan root nodes and try load relative .js, then search for JSON and apply automatic properties generation,
node replacementa and link events. Each function is binded to todoApp. Finally execute update() for all elements.

**Automac properties generation:**
	text.tag = "input"  (because content end with ?)
	add.tag = "button" (because typeof todoApp.add = function)
	done.tag = "input"  (because type = "checkbox")
	description.tag = "span" (bacause content = "")
	remove.tag = "button" (because typeof todos.remove = function)

**Automaic link:**
	add.onClick -> todoApp.add
	done.onChange -> todos.done.change
	remove.onClick -> todos.remove

**N.B.:** [].remove = function(val) {this.splice(this.indexOf(val),1)}
	  *.element = document.querySelector(...)

