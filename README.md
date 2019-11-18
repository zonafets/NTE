# NTE
## Natural Template Engine

An interesting idea emerged while was developing a todo list app ([Demo](https://zonafets.github.io/NTE/src/TodoListExample/todoapp.html)) to train myself to a deep use of javascript.

**I've done this because many frameworks claim that layout and behavior have to stay separated but infuse the html with more attributes.**

**Googling** with **"@framework simple todolist"** I found this:

- Simple todolist example with AngularJS [code&demo](http://embed.plnkr.co/ZiVJbCeX4GDgC1kMjnUB/)
- Simple todolist example with KnockoutJS [code&demo](http://jsfiddle.net/icoxfog417/sujqa/)
- Simple (not to find) todolist example with React [code](https://github.com/christiannwamba/scotch-react-todo/blob/master/src/index.jsx) [demo](https://codepen.io/codebeast/full/PzVyRm)
- Simple todolist example with AngularJS [code&demo](http://embed.plnkr.co/ZiVJbCeX4GDgC1kMjnUB/)

## NTE code example

Why **natural**? Because the developer must develop using what he already knows by learning new things along the way. So, isn't you that learn the framework, but is the framework that teach to you.

### Goal (more or less)
![flowchar](imgs/TodoListWidget.png)

### index.html

```html
<head>
  <script src="nte.js"></script>
</head>

<body>
    
  <TodoList></TodoList>

</body>
```

### TodoList.nhtml (optional)

Optionally loaded and converted by NTE client or server.

```js
h1 "Todo list" 

Task:
  input @Task 
  button "Add" @add

ul @List

  li @Item

    checkbox @done 
    @description "todo"
    button "Remove" @remove
```

### **TodoList.html

```html
<H1>Todo list</H1>

Task:
  <input id="Task"> 
  <button id="Add">Add</button>

<ul id="List">

  <li name="Item">
    <input id="Done" type="checkbox">
    <span id="Description">todo</span>
    <Button id="Remove">Remove</button>
  </li>

</ul>
```

### TodoList.njs 
```javascript
Task: '',

Add: (Task,onKeyUp) => 
  this.Enabled = (Task == '')

Item: {
  Description: {
    class: (Done) => 
      Done?"removed":""
    }
},
	
List: {

  remove: (Remove,Item,List) => 
    delete List[List.indexOf(Item)],
    
  add: (Add,Task,List) => 
    List.push({Done:false,Description:Task}),
    
}
```

#### TodoList.njs explained
```javascript
/* 
wrapped by NTE with:
  var TodoList = {
from name of file
*/

/* 
init the values
*/

Task: '',

/* 
'this' point to the element
'onKeyUp' means: 
"link the relative event" 
to this function 
*/
   
Add: (Task,onKeyUp) => 
  this.Enabled = (Task == '')

Item: {
  Description: {
  
    /* 
    on change of Done, change
    the style of 'Description' 
    */
    
    class: (Done) => Done?"removed":""
    }
},
	
List: {

  /* 
  on (click) of Remove or Add,
  calls relatives message functions, 
  with specified models 
  */

  remove: (Remove,Item,List) => 
    delete List[List.indexOf(Item)],
    
  add: (Add,Task,List) => 
    List.push({Done:false,Description:Task}),
}

/* as in Vue, on exit of a function, the models are compared with
   originals values and relative elements updated */
```

**Advantages**

- semantic check by javascript compiler itself (eg. __wrong parameter name__ with "use strict") but also by NTE ( eg. __tag/control {0} not found in tag {1}__ )
- UI events are hidden/replaced by application actions, that are more similar to messages
- simplify/automate tests 
- simplified diffs (**todo**)

### Ideas for the future

#### Direct link to GUI parts?

I'm imagining some feature as **"hash"** member to automatically connect the URL to a page/tab or component.

#### Easy diagram generation? (using [graphviz](https://github.com/zonafets/NTE/blob/master/src/TodoListExample/todoapp.gv))

![flowchar](src/TodoListExample/todoapp.svg)

#### Widgets template?

```javascript
money @toPay "To pay"
money @Payed "Payed"
...
widget @money
       ?parent = "form"
       ?UI = "BT3"
  div .form-group
    label !for=@@id
          @@content
    input @@id
          !type="text"
          .form-control
```

#### Rendered HTML
```html
<widget name="money" 
        ifParent="form" 
        ifUI="BT3">

  <div class="form-group">
    <label for="@id">
      @content
    </label>
    <input id="@id"
           type="text"
           class="form-control" >
  </div>
  
</widget>
```