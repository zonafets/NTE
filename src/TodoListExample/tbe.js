/*

	Author: Stefano Zaglio
	First draft: 2014-05-05
	Last revision: 2018-11-05
	Scope: demostrate principles of the NTE/TBE framework.
	(C): involve me

	>> This code is tailored on the example and, I know, it's very ugly. <<

*/
document.addEventListener('DOMContentLoaded', function() {

	(function() {

	    // helpers =======================================================================================================

	    function defineGlobal(varName) {
	    	var vars = varName.split(".")
	    	if (typeof window[vars[0]] === "undefined") 
	    		window[vars[0]] = {}
	    	var path = vars[0]
	    	for (var i = 1; i<vars.length;i++) {
	    		path+="."+vars[i]
	    		if (typeof eval(path) === "undefined") eval( path + "={}" )
	    	}
	    }

	    function hiddenProperty(obj,propName,value) {
	    	if (obj[propName] === undefined) 
	    		Object.defineProperty(obj,propName,{enumerable:false,writable:true})
	    	if (value !== undefined) obj[propName] = value
	    	return (v)=>{obj[propName]=v}
	    }

		// ----------------------------------------------------------------------------------------------------------------

		function extend(obj1, obj2) {

		  for (var p in obj2) {
		  	if (obj2.hasOwnProperty(p) && (typeof obj1[p] === "undefined"))
			    try {
			      // Property in destination object set; update its value.
			      if ( obj2[p].constructor==Object ) {
			        obj1[p] = self.merge(obj1[p], obj2[p]);

			      } else {
			        obj1[p] = obj2[p];
			      }

			    } catch(e) {
			      // Property in destination object not set; create it and set its value.
			      obj1[p] = obj2[p];

			    }
			  }

		  return obj1;
		}

		// ----------------------------------------------------------------------------------------------------------------

		var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
		var ARGUMENT_NAMES = /([^\s,]+)/g;
		
		function functionParamNames(func,toLowerCase) {
			var fnStr = func.toString().replace(STRIP_COMMENTS, '');
			var result = fnStr.slice(fnStr.indexOf('(')+1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
			if(result === null) result = [];
			if (toLowerCase) for (var i=0;i<result.length;i++) result[i]=result[i].toLowerCase()
			return result;
		}

		// ----------------------------------------------------------------------------------------------------------------


		function existScript(name) {
			for (var key in document.scripts) { 
				var src = document.scripts[key].src
				if (src.indexOf(name)>-1) return true
				}
			return false
		}

		function loadScript(file,onload) {
			var script = document.createElement('script');
			var src = file + ".js"
			src+="?dt=" + new Date().toISOString() 
			script.src = src
			script.async = false
			script.onload = onload
			script.onreadystatechange = onload
			document.head.appendChild(script);
			return existScript(src)
		}

		var onev2ev = {
			onkeyup: "keyup",
			onkeydown: "keydown",
			onclick: "click",
			onchange: "change",
			onupdate: "update",
			onhover: "hover",
			ontap: "tap",
			oninput: "input",
			ontextinput: "textinput",
			onkeyreturn: "keyreturn",
		}

		var knowEvents=[]
		for (let key in onev2ev) knowEvents.push(key)
	
	    function emptyNode(node) {
	    	while (node.lastChild) {
	   			node.removeChild(node.lastChild);
			}
		}

		function update() {
			console.log("updating view...")
			for (let i=0;i<arguments.length;i++) {
				let component = arguments[i]
				if (component.value !== undefined) {
					if (!Array.isArray(component.value))
						component.$element.value = component.value
					else {
						emptyNode(component.$element)
						let $template = component.$rowTemplate
						component.values.forEach( (row) => {
							let controls = $template.$element.cloneNode(true)
							let elements = {}
							for (let i=0;i<controls.childElementCount;i++) {
								let ctrl = controls.children[i]
								elements[ctrl.dataset.bind] = ctrl
							}
							for (let bind in elements) {
								let ctrl = elements[bind]
								let val = row[bind]
								let member = $template[bind]
								if (val !== undefined) {
									switch (ctrl.tagName) {
										case "INPUT":
											switch (ctrl.type) {
												case "checkbox":
													ctrl.checked = val
												break
												default:
													ctrl.value = val
												break
											}
										break
										default:
											ctrl.textContent = val
										break
									} // switch
								} // if val
								// restore events listener
								if (member.$eventListeners !== undefined)
									member.$eventListeners.forEach((event)=>{
										ctrl.addEventListener(event.name,event.handler(elements,row))
									})								
							} // through template controls
							controls.style.display = $template.$element$style$display
							component.$element.appendChild(controls)
						}) // through rows
					}
				}
			}
		}

		function traverseNode(node,level,path,parent,root) {
			var isTemplate = false
			var inTemplate = path.indexOf(".$template.") >-1
			var eventsToDispatch = []
			var memberName = node.localName
			var parentPath = path
			path+=memberName
			let member
			try {
				member = eval(path)
			} finally {
				if (member !== undefined) {
					console.log(path + " is defined")

					if (level === 0) {
						console.log("Adding $update... to " + memberName)
						root = member
						hiddenProperty(root,"$update",update.bind(root))
					}

					/* special case of "forEach"/repeatitive component */

					if (Array.isArray(member)) {
						let $template = member[0] 		// li[0]
						member.splice(0,1)				// li[]
						hiddenProperty(member,"$element",node)
						$template.$element$style$display = node.style.display
						// member.$element.style.display = "none"
						hiddenProperty(member,"$template",$template) 	// li.$template
						hiddenProperty(parent,"$rowTemplate",$template) 	// todolist.$rowTemplate -> li.$template
						member = $template 				// go inside template
						path+=".$template"				// to manage its controls
						isTemplate = true
					}
					if (member.value !== undefined && Array.isArray(member.value)) {
						member.value.remove = function(val) {this.splice(this.indexOf(val),1)}
						member.values = member.value
					} else if (member.values !== undefined && Array.isArray(member.values)) {
						member.values.remove = function(val) {this.splice(this.indexOf(val),1)}
						member.value = member.values
					}

					/* auto tag */

					if (typeof member === "function") {
						var fn = member
						if (node.textContent === "[_]")
							member = {
								tag: "input",
								type: "checkbox",
								onclick: fn,
							}
						else
							member = {
								tag: "button",
								onclick: fn,
								textContent: node.textContent,
							}
						parent[memberName] = member
					} 
					else if (member.tag === undefined) {
						if (member.type !== undefined && member.type === "checkbox") member.tag = "input"
						if (node.textContent === "?") member.tag = "input"
						if (member.onclick !== undefined) extend(member,{tag:"button",textContent:node.textContent})
						if (node.textContent === "[_]") extend(member,{tag:"input",type:"checkbox"})
					}

					// member.tag is undefined? keep one's defined into html (or convert to div?)
				} else {
					console.log(path + " not defined")
					if (node.textContent === "?")
						member = parent[memberName] = {tag:"input"}
					else if (node.textContent === "[_]")
						member = parent[memberName] = {tag:"input",type:"checkbox"}
					else if (node.textContent === "")
						member = parent[memberName] = {tag:"span"}
					else
						member = parent[memberName] = {tag:memberName}
				}
			}

			/* root.__proto__ === member.__proto__
			if (!isTemplate && level>0) {
				debugger
				console.log("From level " + level + " add " + memberName + " to " + parentPath)
				parent.__proto__[memberName] = member
			}
			*/

			if (member.tag !== undefined) {
				let fn
				if (member.tag == "input" && member.type!==undefined && member.type==="checkbox")
					fn = function(){this.value=this.$element.checked}.bind(member)
				else
					fn = function(){this.value=this.$element.value}.bind(member)
				hiddenProperty(member,"$update",fn)
			}

			if (node.childElementCount>0) 
				for (var i=0;i<node.children.length;i++)
					eventsToDispatch.push.apply(eventsToDispatch,
						traverseNode( node.children[i], level+1, path+".", member, root )
					)

			let memberNode
			let replaceNode = member.tag !== undefined && member.tag.toUpperCase() !== node.nodeName
			if (!replaceNode) 
				memberNode = node
			else {
				memberNode = document.createElement(member.tag)
				memberNode.id = path
			}
			// if (member.tag.toUpperCase() !== node.nodeName) {

			function processMember(member,nodeName,nodeProperty) { 
				for (let Key in member) {
					let key = Key.toLowerCase()
					if (member.hasOwnProperty(Key) && ["tag"].indexOf(key)===-1) {
						let val = member[Key]
						if (knowEvents.indexOf(key)>-1) {
							let fireEventAfterBuild = false
							var ev = onev2ev[key]
							var evfn = val.bind(parent)
							var fn = evfn
							var params = functionParamNames(val,true)
							switch (ev) {
								// todo: ????
								case "change":
								
									if (params.length>0 && params[0] == "key") {
										fn=(ev)=>{evfn(ev.key)}
										memberNode.addEventListener(ev,(ev)=>{member.value = ev.currentTarget.value})
									} 
									eventsToDispatch.push([ev,memberNode])
									break
								
								case "click":

									if (params.length>0) {
										if (["checked","check"].indexOf(params[0])>-1)
											ev = "change", fn = (ev)=>{evfn(ev.checked)}
										else {
											let fnargs = []
											let obj
											let pidxitem = params.indexOf("item")
											params.forEach( (it,idx) => {
												if (idx!=pidxitem) {
													var obj = parent[it]
													if (obj === undefined) obj = root[it] 
													fnargs[idx] = obj
											}
											})
											if (pidxitem === -1)
												fn = (ev)=>{
													val.apply(parent,fnargs);
													root.$update.apply(parent,fnargs)
												}
											else
												fn = (elements,item)=>(ev)=>{
													var args = fnargs.slice(0)
													args.push(item)
													val.apply(parent,args);
													root.$update.apply(parent,fnargs)
												}
										}
									} 
									else
										fn = (ev)=>{evfn(ev); root.$update()}
									break

								case "keyup":
									fireEventAfterBuild = true
								case "keydown":

									if (params.length>0) {
										let fnargs = []
										let obj,objfn
										let pidx = params.indexOf("keycode")
										params.forEach( (it,idx) => {
											if (idx!==pidx) {
												var obj = parent[it]
												if (obj === undefined) obj = root[it] 
												fnargs[idx] = obj
											}
										})
										fn = (ev)=>{
											if (pidx>-1) fnargs[pidx] = ev.keyCode
											var result = val.apply(parent,fnargs)
											var upargs  
											if (pidx>-1) {
												upargs = fnargs.slice(0)
												upargs.splice(pidx,1)
											} else upargs = fnargs
											if ((result||true)!==false) root.$update.apply(parent,upargs)
											return result
										}
									}
									break

								case "keyreturn":

									let fnargs = []
									let obj,objfn
									params.forEach( (it,idx) => {
										var obj = parent[it]
										if (obj === undefined) obj = root[it] 
										fnargs[idx] = obj
									})
									fn = (ev)=>{
										if (ev.keyCode === 13) val.apply(parent,fnargs)
									}
									ev = "keyup"
									fireEventAfterBuild = true

									break
							} // switch

							if (inTemplate) { 
								if (member.$eventListeners === undefined) hiddenProperty(member,"$eventListeners",[])
								member.$eventListeners.push({name:ev,handler:fn})
							}
							else
								memberNode.addEventListener(ev,fn)

							if (fireEventAfterBuild)
								eventsToDispatch.push([ev,memberNode])

						} // if event method

						else if (typeof val === "function") {
							let params = functionParamNames(val,true)
							/* til now we suppose that 1st param is the object and 2nd is the event */
							let ev = params.length>1 ? params[1] : "onchange"
							ev = onev2ev[ev]
							var objName = params[0]
							let obj
							let objFn
							let fn
							if (parent[objName] !== undefined) {
								obj = parent[objName]
								objFn = val.bind(parent)
							} else {
								obj = root[objName]
								objFn = val(obj).bind(root)
							}
							let fnargs = []
							let pidxitem = params.indexOf("item")
							if (nodeProperty !== undefined) { 
								if (inTemplate)
									fn = (elements,item) => (ev) => {
										/* obj.$update() need to create instance of object
											with cloned element */
										item[objName]=elements[objName].checked
										let fnargs = []
										for (var i=0;i<params.length;i++) {
											if (i===pidxitem) fnargs.push(item)
											else fnargs.push(elements[params[i]])
										}
										elements[nodeName][nodeProperty][Key] = objFn.apply(root,fnargs)
									}
								else
									fn = (ev) => {
										obj.$update()
										parent[nodeName][nodeProperty][Key] = objFn(obj)
									}
							}
							else 
								fn = (ev) => {
									obj.$update()
									member.$element[key] = objFn(obj)
								}
							if (inTemplate) { 
								if (obj.$eventListeners === undefined) hiddenProperty(obj,"$eventListeners",[])
								obj.$eventListeners.push({name:ev,handler:fn})
							}
							else
								obj.$element.addEventListener(ev,fn)					
						}
						else {
							if (memberNode[Key] !== undefined && typeof memberNode[Key] !== "function") {
								if (typeof member[Key]!=="object")
									memberNode[Key] = member[Key]
								else {
									processMember(member[Key],memberName,Key)
								}
							}
						}

					} // if (member.hasOwnProperty(Key) ...

				} // for key in member

				/* implicitally defined elsewhere by logic
				if (member.tag === "input") {
					memberNode.addEventListener("change",(ev)=>{member.value = ev.currentTarget.value})
					if (member.value === undefined) member.value = ""
				}
				*/

			} // process member

			processMember(member)

			if (replaceNode) {
				if (node.childElementCount>0) 
					for (var i=0;i<node.childElementCount;i++)
						memberNode.appendChild(node.children[i]) // move child inside new node
				
				node.parentNode.replaceChild(memberNode,node)
				node = memberNode
			}

			hiddenProperty(member,"$element", node)

			if (inTemplate) 
				node.dataset.bind = memberName

			/* add facility for tests and inter operativity */

			if (member.tag !== undefined && member.tag === "button") 
				member.click = () => {
					var event = new Event("click")
					return member.$element.dispatchEvent(event)
				}

			return eventsToDispatch
		} // traverseNode


		/* scan root nodes */

		// only root nodes can have a .js
		for (var i=0;i<document.body.children.length;i++) {
			var node = document.body.children[i]
			loadScript(node.localName, function() {
				var eventsToDispatch = traverseNode(node,0,"",document.body)

				/* fire events to update view from data */
				eventsToDispatch.forEach((it)=>{
					var event = new Event(it[0])
					it[1].dispatchEvent(event)
				})
				node.querySelector("input").focus()
			})
		}

	})()

}, false) // addEventListener
