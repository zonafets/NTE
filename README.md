# NTE
## Natural Template Engine

Today there are more than 20 frameworks. 

Each one have its pro and its cons and there are pro/cons of use and not use they.

So I struggled (and I'm struggling) to do something that uses the UNIX philosophy and the concept behind styles.

## NTE code example

**Natural** because we must develop using what we already know, learning new things along the way. So, isn't you that learn the framework, but it must teach to you.

### TodoList (view)

Below the **HTML** rendered version.

```javascript
  H1 "NTE todolist demo"
  Task:
    input @task
    button "Add" @add @undo
    ul @list
      li @item
        checkbox @done
        span @desciption
        button "Remove" @remove
    button "Remove all done tasks" @removedone
```
### TodoList (model)
This is a JSON with js arrow functions, without commas.
Below the **transpiled** Javascript version.

```javascript
// data

loadlist:["task1","task2","task3"]
undolist:[]
task: ""
list: []

// messages

addTask: (
  task,add_click,
  task_change,
  task_keypress_return) 
  => (list,push) 
  => ({done:false, 
     description:task}) 

undoTask: (undolist,pop) 
  => (list,push) 
  => {}

removeTask: (
  list, item,
  remove_click)
  => list.pop(item)

loadTasks: (
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

// behaviours

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
  <H1>Todo list</H1>

  Task:
  <input id="task"> 
  <button id="add">Add</button>
  <button id="undo">Undo</button>

  <ul id="list">

    <li name="item">
      <input name="done" type="checkbox">
      <span name="description">todo</span>
      <Button name="remove">Remove</button>
    </li>

  </ul>
</TodoList>
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
