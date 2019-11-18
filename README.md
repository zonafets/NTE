# NTE
## Natural Template Engine

An interesting idea emerged while was developing a todo list app ([Demo](https://zonafets.github.io/NTE/src/TodoListExample/todoapp.html)) to train myself to a deep use of javascript.

**I've done this because many frameworks claim that layout and behavior have to stay separated but infuse the html with more attributes.**

## NTE code example

**Natural** because we must develop using what we already know, learning new things along the way. So, isn't you that learn the framework, but it must teach to you.

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
  <input id="task"> 
  <button id="add">Add</button>

<ul id="list">

  <li name="item">
    <input id="done" type="checkbox">
    <span id="description">todo</span>
    <Button id="remove">Remove</button>
  </li>

</ul>
```

### TodoList.njs 
```javascript
task: '',

add: (task,onKeyUp) => 
  this.Enabled = (task == '')

item: {
  description: {
    class: (done) => 
      done?"removed":""
    }
},
	
list: {

  remove: (item,list) => 
    delete list[
      list.indexOf(item)
    ],
    
  add: (task,list) => 
    list.push(
      {done:false,description: task}
    ),
    
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
    
    class: (Done) => 
      Done?"removed":""
    }
},
	
List: {

  /* 
  on (click) of Remove or Add,
  calls relatives message functions, 
  with specified models 
  */

  remove: (Item,List) => 
    delete List[
      List.indexOf(Item)
    ],
    
  add: (Task,List) => 
    List.push(
      {Done:false,Description:Task}
    ),
}

/* as in Vue, on exit of a function, the models are compared with
   originals values and relative elements updated */
```

**Advantages**

- semantic check by javascript compiler or by NTE
- UI events are hidden/wrapped by application actions
- simplify/automate tests 
- simplified diffs (**todo**)
- possible automatc diagram generation

### Ideas for the future

#### Direct link to GUI parts?

I'm imagining some feature as **"hash"** member to automatically connect the URL to a page/tab or component.

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

### Other frameworks examples
**Googling** with **"@framework simple todolist"** I found this:

- Simple todolist example with AngularJS [code&demo](http://embed.plnkr.co/ZiVJbCeX4GDgC1kMjnUB/)
- Simple todolist example with KnockoutJS [code&demo](http://jsfiddle.net/icoxfog417/sujqa/)
- Simple todolist example with React [code](https://github.com/christiannwamba/scotch-react-todo/blob/master/src/index.jsx) [demo](https://codepen.io/codebeast/full/PzVyRm)
- Simple todolist example with Angular2 [code&demo](http://embed.plnkr.co/ZiVJbCeX4GDgC1kMjnUB/)
