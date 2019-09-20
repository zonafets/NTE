## NTE concept: third revision - work in progress

```javascript
var app = {
    
    name: "myApp",

    model: { 
        fname: "Mario", 
        lname: "Rossi", 
        fullname: (fname,lname) => fname + ' ' + lname
    },

    view: {
        fname: input(),
        lname: input(),
        fullname: p(),
        save: laddaButton("send")
    },

    controller: {
        init: function() {
            debugger;
            this.fullname.NTE.updateEveryKeyPress = true
        },
        save: function() {
            this.send(this.model);
        },
        async: {
            send: function(data) {...}
        }
    }
} // app

var myApp = NTE.createApp( app, NTE.layouts.verticalForm )
```

[Demo](https://zonafets.github.io/NTE/src/nte-mvc.html).

NTE bind model to the view matching the names of members.

A parser that works server side can optimize this process and generate intermediate code,

## TodoList example ## 

```javascript
use "strict"

var TodoList = function() {
	
	var Item = function() {
		
		Item = {
		
			model:{
				Id: 0,
				Done: false,
				Description: ""
			}
			
			view:{
				Done: input({type:"checkbox"}},
				Description: p(),
				Remove: button()
			},
			
			controller:{
				Remove: function(parent) {}	// as in f(x), this means "function of parent"
			}
		}
		return Item
	}
	
	var TodoItem = NTE.CreateWidget(Item)
	
	var List = {
		
		model: {
			Todo: ""
			TodoList:[]
		},
		
		view: {
			Todo: input(),
			Add: button(),
			List: ul(),
		},
		
		controller: {
			
			init:function() { // this = model
				this.Todo.$nte.updateEveryKeyPress = true
			},
			
			Todo:function(view) {
				view.Add.style.enabled = (this.Todo.length>0)
			}
			
			Add:function(List) { // NTE take care of update
				List.push(TodoItem(false,this.todo))
			}
			
			// children's signals
			Remove:function(List) {			// this = children.model 
				List.Remove( {Id:this.Id} )	// array extension
			}
		}
	}
	return List
}

NTE.CreateApplication(TodoList)
```

