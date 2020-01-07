# NTE
## Natural Template Engine

An interesting idea emerged while was developing a todo list app ([Demo](https://zonafets.github.io/NTE/src/TodoListExample/todoapp.html)) to train myself to a deep use of javascript.

**I've done this because many frameworks claim that layout and behavior have to stay separated but infuse the html with more attributes.**

## NTE code example

**Natural** because we must develop using what we already know, learning new things along the way. So, isn't you that learn the framework, but it must teach to you.

### Goal (more or less)

(The code is more simple)

![todolistchart](imgs/TodoListWidget.png)

### index.html

```html
<head>
  <script src="nte.js"></script>
</head>

<body>
    
  <TodoList></TodoList>

</body>
```

### TodoList.html.nte (optional)

```js
h1 "Todo list" 

Task:
  input @task 
  button "Add" @add

ul @list

  li @item

    checkbox @done 
    @description "todo"
    button "Remove" @remove
```

### TodoList.html (rendered)

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

### TodoList.js.nte
```javascript
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
      this.list_add(
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
    return 
      this.list_add(task,list)
  },

  remove: function(item,list) {
    return 
      list.pop(item)
  },
  
}
```

#### TodoList.js.nte (explained)
```javascript

```

**Advantages**

- semantic/compile time check by Javascript compiler & NTE
- UI events are hidden/wrapped by application actions (this is an application framework, not a replacement/alternative behavior for the UI framework)
- simplify/automate tests 
- simplified diffs
- possible automatized diagram generation as in the above image

### Ideas for the future

#### Direct link to GUI parts?

I'm imagining some feature that uses ** "hash"** both for a rapid recovery of a context and for testing purposes.

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

### TODO examples with other frameworks
**Googling** with **"@framework simple todolist"** I found this:

- Simple todolist example with AngularJS [code&demo](http://embed.plnkr.co/ZiVJbCeX4GDgC1kMjnUB/)
- Simple todolist example with KnockoutJS [code&demo](http://jsfiddle.net/icoxfog417/sujqa/)
- Simple todolist example with React [code](https://github.com/christiannwamba/scotch-react-todo/blob/master/src/index.jsx) [demo](https://codepen.io/codebeast/full/PzVyRm)
- Simple todolist example with Angular2 [code&demo](http://embed.plnkr.co/ZiVJbCeX4GDgC1kMjnUB/)


## **Case y = m * x**

![ymx](imgs/ymx.png)
#### ymx.html.nte
```javascript
@@anonymouse = "input"
@@before = "@@id:"

@y = @m * @x
```
#### ymx.html
```html
y:<input id="y"> = m:<input id="m"> * x:<input id="x">
```
#### ymx.js.nte
```javascript
x:0, y:0, z:0, 
// this is the same of
ymx:()=>this.x = this.y = this.z = 0, 
// that is the same of
init:(ymx)=>ymx.x = ymx.y = ymx.z=0,

y:(x,m)=>return x*m,
x:(y,m)=>return y/m,
m:(y,x)=>return y/x,
```
