# Natural template engine
###### (Under construction)
```html
<input bind="name" label="Name:">
<p>Hello @name!</p>
```
```html
<template name="inputBox">
	<div class="form-group">
		<label class="form-label">
			@label
		</label>
		<input bind="@bind" class=...>
	</div>
</template>

<app>
	<inputBox label="First Name" link="log">fname</inputBox>
	<inputBox label="Last Name"  link="log">lname</inputBox>
</app>

<script>
	app.log() {
		console.log("Full name:"+fname+" "+lname);
	}
</script>

<script type="text/C#">

	<!-- convert javascript to C# or C# to javascript? -->
	
</script>
```

After more than thirty years developing application with various languages on different platforms, I came to the web applications.

My real experience was with html, javascript, jquery, bootstrap and knockout but I took a look to Angular, Vue, React, beb components in the war of frameworks.

_What I found in everyone is a loss of naturalness of the basic html and javascript languages._

All this claims the usual aspects: self organization, scalability, less mistakes, smart/fast learning.

But when a framework or a programming language wrapper(coffee/typescript) define a new scope paradigm, this take down 30'years of experience at same level of a beginner.

As the task of to writes adaptable page for device can require more time than write one page for each small, medium, large device, I think that 10 programmer monkeys can make more than one expert, even if they do more logic errors. But ten small logic errors are less than one big analytic error, as in the learning of something of different to make same things.

**So, this is my brainstorming about something to KISS and RKB (Keep It Simple and Stupid and Recycle Knowledge Base).**

## Examples of frameworks different templates

### Knockout template
```html
<div data-bind="template: { name: 'person-template', foreach: people }"></div>
 
<script type="text/html" id="person-template">
    <h3 data-bind="text: name"></h3>
    <p>Credits: <span data-bind="text: credits"></span></p>
</script>
```

### JQuery tmpl
```html
<script type="text/html" id="peopleList">
    {{each people}}
        <p>
            <b>${name}</b> is ${age} years old
        </p>
    {{/each}}
</script>
```

### Underscore template engine
```html
<script type="text/html" id="peopleList">
    <% _.each(people(), function(person) { %>
        <li>
            <b><%= person.name %></b> is <%= person.age %> years old
        </li>
    <% }) %>
</script>
```

### Angular template
```typescript
import { Component } from '@angular/core';

@Component ({
   selector: 'my-app',
   template: `<h1>Hello {{name}}</h1>`,
})
export class AppComponent  { name = 'Angular'; }
```

## Some Hello World! examples

### Pure HTML(5)/Javascript

```html
Name: <input id="name" type="text" value="World"/>
<p>Hello <span id="msg"></span>!</p>
<script>
	// "" not triggered on value=...
	name.addEventListener("change",function(){
		msg.innerText = this.value;
	});
</script>

```

### JQuery
```html
Name: <input id="name" type="text" value="World"/>
<p>Hello <span id="msg"></span>!</p>
<script>
	// !! not triggered on value=...
	$("#name").change(function() {
		$("#msg").text($(this).val());
	});
</script>
```

### KnockoutJS

```html
<p>Name: <input data-bind="value: Name" /></p>
<p>Hello, <span data-bind="text: Name"> </span>!</p>
<script>
	var ViewModel = function(name) {
	    this.Name = ko.observable(name);
	};
 
	ko.applyBindings(new ViewModel("World"));
</script>
```

### VueJS

```html
<div id="app-6">
  Name:<input v-model="name">
  Hello <p>{{ name }}</p>!
</div>
<script>
var app6 = new Vue({
  el: '#app-6',
  data: {
    name: 'World'
  }
})
</script>
```

### AngularJS
```html
Name:<input type='text' ng-model= "Name"><br>

Message:<p>Hello {{Name}}!</p>
```

### React
```javascript
var createReactClass = require('create-react-class');

var WithLink = createReactClass({
  mixins: [LinkedStateMixin],
  getInitialState: function() {
    return {message: 'Hello!'};
  },
  render: function() {
    return <input type="text" valueLink={this.linkState('message')} />;
  }
});
```

**But as I know that "the name of the thing isn't the thing", I suppose that Gödel's incompleteness theorems are valid to any language.**

So what I would like is think to a template engine that at least keep the nature of the language, hiding the complex parts, generating hidden code.

---------------------
## Goals ##
**Recycle** basic knowledge and tools:

- common (and free) editors with basic features about auto completition, syntax check and highlight
- simple and common xml/html parsers
- make simple build a plugin for auto completition
- make simple double bind IDE with code 
- two side rendering (client and/or server side)
  e.g.: from C# to Javascript or from Javascript to C# 
- two way editing (from/to client/server)
  e.g.: &lt;script type = "text/c#" ... &gt;



###Expression case study in Knockout
See [complete code](./src/ko_ymx_expression_test.html) in [action](https://rawgit.com/zonafets/NTE/master/src/ko_ymx_expression_test.html).

```html
<h2> KO ymx expression test </h2>

<p>
x:<input data-bind="value:x"><br>
m:<input data-bind="value:m, event:{blur:updatem}"><br>
y:<input data-bind="value:y, enable: !mNaN()"><br>
</p>

<p>
first name:<input data-bind="value:fname"><br>
last name:<input data-bind="value:lname"><br>
full name:<input data-bind="value:fullname"><br>
</p>

<p>Initial value of viewmodel updates inputs, but must be done after subscription.</p>
<p>Note the use of blur event to force updates and recalc.</p>

<p>The code shows as the MVVM pattern link members without force to give a name to the actions.
When X is modified, y is calculated. But the calculus has a name: "line".
Is this part of lost controller?
</p>

<script>
	// I forgot this piece of code that do not give any error
	$("#name").change(function() { $("#msg").text($(this).val()) });

	var vm = new function() {

		var me = this

		/** properties **/
				
		me.x = ko.observable()
		me.m = ko.observable().extend({ notify: 'always' });
		me.y = ko.observable()
		
		me.fname = ko.observable()
		me.lname = ko.observable()
		me.fullname = ko.computed(function(){ return me.fname()+" "+me.lname() })
		
		/** private **/
		
		var x = me.x
		var y = me.y
		var m = me.m
		
		function xNaN() { return isNaN( x() || 'a' ) }
		function yNaN() { return isNaN( y() || 'a' ) }
		function mNaN() { return isNaN( m() || 'a' ) }
		
		/** public **/
				
		me.mNaN = mNaN;
		
		me.updatem = function() { m(m()) }
		
		x.subscribe( function() {
			if (!xNaN() && !mNaN()) 
				y( m() * x() );
		})
		
		m.subscribe( function() {
			if (!xNaN()) y( m() * x() );
			if (!yNaN()) x( y() / m() );
		})
		
		y.subscribe( function() {
			if (!yNaN() && !mNaN()) 
				x( y() / m() );
		})
		
		/** init here ensure call of subscribers **/
		
		x(3);
		m(1);
		
	} // vm
	
	ko.applyBindings(vm);	

</script>
```

###Expression case study with NTE
See [complete code](./src/nte_ymx_expression_test_l1.html) in [action](https://rawgit.com/zonafets/NTE/master/src/nte_ymx_expression_test_l1.html) layer 1.
See [complete code](./src/nte_ymx_expression_test_l2.html) in [action](https://rawgit.com/zonafets/NTE/master/src/nte_ymx_expression_test_l2.html) layer 2.
```html
<h2>NTE ymx expression test</h2>
<h4>layer 1</h4>

x: <input bind="x" link="line,y" require="#x,#m"><br>
m: <input bind="m" link="line_or_reverse,y,x" require="#m,(#y|#x)" update="change,blur" default="1"><br>
y: <input bind="y" link="reverse_line,x" require="#y,#m" enableIf="m" _debug="link"><br>

<p>Even KO can be expanded with extra binders. 
What I will like to do is split, reduce and concentrate to write more simple code.
Inline complex expressions are not allowed. </p>

<script>

	var app = new function() {
		
		var me = this;
				
		/** properties **/
		
		me.x = 3
		
		/** private **/
		
		function xNaN() { return isNaN( me.x || 'a' ) }
		function yNaN() { return isNaN( me.y || 'a' ) }
		
		/** public **/
	
		me.line = function () { me.y = me.x * me.m }
	
		me.line_or_reverse = function() {
			if (!xNaN()) 
				me.y = me.m * me.x;
			else {
				if (!yNaN()) me.x = me.y / me.m;
			}
		}
		
		me.reverse_line = function() { me.x = me.y / me.m }
		
	}
	
</script>
```

### Another scenario

```html
meters: <input me="meters" value="10m">

<script>

	app.meters$change = function() {
		app.meters += app.meters.subst(-1)!="m"?"m":"";
		}

</script>
```

### Example of widget template and use

```html
<template id="inputBox">

	<params>
		<update> type of update
			<value name="onKeyup">fired on single key released</value>
			<default name="onChange">fired after RETURN or exit</default>
		</update>
		<caption>optional label</caption>
	</params>
	
	<widget>
		<label>@caption</label>
		<input id="@id" type="text"/>
	</widget>

	<script>
	
		function $$inputBox(me,value,update,caption)
		{
			// generate code
		}

	</script>
	
</template>

<app>
	<inputBox me="name" caption="Name" update="keyup" value="World"></inputBox>
</app>

<!-- possible generated code -->
<script>
	var app= {
		name:"World",
		$name:document.getElementById("app.name"),
		name$update:()=>{
			app.name = app.$name.value;
			if (typeof app.name$change!=="undefined") app.name$change();
			app.$name$update();
			},
		$name$update:()=>{ app.$name.value = app.name; },
		$name$change:()=>{ app.name$update() }
		}
	app.$name.addEventListener("keyup",app.name$update);
	app.$name.addEventListener("change",app.name$change);
	app.name$update();
</script>
```

### Possible widget init


```javascript
function app.$inputBox(element,value,update,caption)
{
	// ...
}
```


### Example of attribute to control the view&flow

```html
<app>

	<script>
		var app={
			count:0,
			range:[],
			count$change = function() {
			// fill range with random 1..count
			}
		}
	</script>
	
	Show: <input id="show" type="checkbox">
	
	Enable: <input id="enable" type="checkbox">
	
	Count: <input id="count" visibleIf="show" enableIf="enable"/>
	
	<table if="count"> <!-- render if not null -->
		<tbody>
			<tr each="range" as="item" idx="i">
				<td>Value of item <b>@i</b> is "<b>@item</b>"</td>
			</tr>
		</tbody>
	</table>

</app>
```

### Es. client/server mixed rendering with complex management
**Rules**

- "innerText" is equal to "value"



```html
<config ui="bootstrap">
	<!-- this will be rendered from server as
	<script src = "...">
	--> 
</config>

<app>

	<template id="td-input">
		<widget>
			<td>
				<input id="@id" value="@value"/>
			</td>
		</widget>
	</template>

	<!-- this will be captured by a method of server called dataTable(...) -->
	<data-table name="students">
		<source>
			select id,name 
			from students;
		</source>
	</data-table>
	
	<!-- and rendered as -->
	<script>
		app.students = $.getJSON("/students", app.$students$change);
		<!-- with relative service -->
	</script>

	<!-- master -->
	<table class="table table-striped">
		<thead>
			<tr>
				<th>Id</th>
				<th>Name</th>
				<th>Name</th>
				<th>Actions</th>
			</tr>
		</thead>
		<tbody>
			<tr each="students" as="student">
				<td>@student.id</td>
				<td-input>@student.name</td-input>
				<td click="students$remove"> X </td> 
			</tr>
		</tbody>
	</table>
	
	<!-- details -->
	<table>
		<tr each="lessons" reference="students">
		</tr>
	</table>
	
	<script>
		app.students$remove(index) {
			// remove lessons
			// call ajax(?)
			// above code can be already generated by <data-table> renderer
		}
	</script>
</app>

```

### Tree view case
```html
<script>
	function Node(id,name,children) 
	{
		return new {
			Id:id, Name:name,
			Children: children
	}
		
	var app = 
	{
		Selected:[],
		TreeData:[
			Node(1,"One"),
			Node(2,"Two",[
				Node(3,"Three"),
				Node(4,"Four")
				])
			]
	}
</script>

<template id="checkbox">
	<input id="@id" type="checkbox" click="@click"/>
</template>

<template id="tree">

	<template id="node">
		<li each="@value" as="node">
  			@node.Name<checkbox click="@selected$push(@node.Id)"></checkbox>
		</li>
		<tree selected="@selected">@node.children</tree>
	</template>

	<widget>
		<ul ifLevel="1th" id="@id" class="collapsibleList">
  			<node selected="@selected">@value</node>
		</ul>
		<ul ifLevel="nth">
  			<node selected="@selected">@value</node>
  		</ul>
	</widget>
</template>

<app>
	<tree selected="Selected">@TreeData</tree>
</app>
```

## Performance
Difficult to think of performance in a system that is divided into 2 processes (client and server) which in turn are divided into 2 or 3 processes (web server, service, database engine, javascript, jquery, framework).

The server can do more to make the client faster. But this grows traffic. And today's optimized browser can create DOM elements faster than yesterday. So as as ORM is simpler than SQL and more similar to older DBF, it is slower than SQL because wraps it. But SQL is slower than DBF (we see compilation of SELECT x+y for the first time only in the 2018) but was considered simpler than DBF. Anyway noSQL borns because speed depend on how data is joined and not how stored. But even this increase the traffic. It is the uncertainty principle of Heisemberg.

Certainly being able to distribute and simplify if part of the surrender can be the responsibility of the client or server, is useful.

We can not know if webASM or binaryDOM will become more and more necessary and up-to-date. The performance superiority of simplified VMs has already been demonstrated, even though they are emulated by Javascript VM, potentially accelerated by specific binary code (Emscripten).

Unless you use getter and setter or Observables as in Knockout, it will be heavy to identify the state change of an array and update the elements accordingly.
For now the hypothetical solution is to precode the actions.
