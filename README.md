# NTE
## Natural Template Engine

Today there are more than 20 frameworks. Each one with pros/cons.

There are also pros/cons of use and not use they.

So I struggled (and I'm struggling) to do something that combine the UNIX philosophy, the concept behind styles, functional programming, mind limits and the KISS principle and the  Kernighan & Plaugher principle: "Don't write comments, rewirte the code".

## NTE code example

**"Natural"** because we must develop using what we already know, learning new things along the way. The framework has to teach while we use it.

### TodoList (view)

```ruby
  H1 "Todolist NTE example"
  Task:
    input @task
    button "Add" @add @undo
    ul @list
      li @item
        checkbox @done
        span @desciption
        button "Remove" @remove
    button "Remove all done tasks" @removedones
    button "Load tasks" @loadtasks
```
Below the **HTML** rendered version.

### TodoList (model)
This is a JSON with js arrow functions, without commas.

```javascript
// data

loadlist:["task1","task2","task3"]
undolist:[]
task: ""
list: []

/* messages
   msg: (
     data_member, ...,
     ctrl_event, ...,
     data_value, ...,
     event_prop_value, ...,
     data_member_test_value
   ) => {
     body
     return (next_model_state)
   }
*/

addTask: (
  task, 
  list,
  add_click,
  task_change,
  task_keypress_ketCode_13,
  task_not_empty
  => { 
     list.push{
       done:false, 
       description:task}
     return {task:""}
     } 

undoTask: (
  list, 
  undolist,
  undolist_count_not_0
  ) 
  => {
     list.push(undolist.pop())
     }

removetask: (
  list, item,
  remove_click)
  => list.pop(item)

loadtasks: (
  loadtasks_click,
  loadlist,
  list)
  => {
    for (i in loadlist)
      list.push(
        {done:false,
         description:loadlist[i]
        }
      )
  }
  
removedones: (
  removedones_click,
  list,
  item,
  list_each,
  item_done_true
  )
  => list.pop(item)

// controls behaviours

add: { 
  disabled: (task) 
  => task===""
}

undo: {
  disabled: (list) 
  => list.count===0
}

list: {
  item: {
    description: {
      className: (done) 
      => done?"removed":"" 
      }
  }
}
```
Below the **transpiled** Javascript version.

**Pros**

- bouble bind check
- possible flow-check
- UI events are hidden/wrapped by application actions (**this is an application framework**, not an alternative behavior of the language and the browser's UI)
- simplify/automate tests 
- simplified diffs
- possible automatized diagram generation as in the above image

### TodoList.html

```html
<TodoList>
  <H1>Todo NTE example</H1>

  Task:
  <input name="task"> 
  <button name="add">Add</button>
  <button name="undo">Undo</button>

  <ul name="list">

    <li name="item">
      <input name="done" type="checkbox">
      <span name="description">todo</span>
      <Button name="remove">Remove</button>
    </li>

  </ul>
  <button name="removedones">Remove all done tasks</button>
</TodoList>
```

#### Some proof of concepts

**Get function parameters**
```javascript
var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
var ARGUMENT_NAMES = /([^\s,]+)/g;
function getParamNames(func) {
  var fnStr = func.toString().replace(STRIP_COMMENTS, '');
  var result = fnStr.slice(fnStr.indexOf('(')+1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
  if(result === null)
     result = [];
  return result;
}

var test1 = function(a,b,c,d) {var a=10}
var test2 = function() { return (aa,bb)=>{arg1:"val1"} }()

console.log(getParamNames(test1))
console.log(getParamNames(test2))
console.log(test2)
```

**Arrow functions**
```javascript
	var list = []
	var undolist = ["hi"]
	list.push("hello","ciao")
	console.log(list)
	var model = {
	  fn: (list,push) => ({a:1,b:2}),
	  fnfn: (undolist,pop) => (list,push) => {},
	  test: (task) => task === "",
	  listpop: list => list.pop(),
	  listlist: list => {for (i in list) console.log(list[i])},
	  undo: (list,undolist) => {list.push(undolist.pop());return "ok"},
	  simple: (list,list_count_0)=>{}
	}
	model.listlist(list)
	console.log(model.test(""))
	console.log(model.listpop(list,"ciao"))
	console.log(model.list)
	console.log(model.undo(list,undolist))
	model.simple(list,0)
```

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
var ymx = {
    x:0, y:0, z:0, 

    y:(x,m)=>return x*m,
    x:(y,m)=>return y/m,
    m:(y,x)=>return y/x,
}
```
