From this site:

https://www.html.it/pag/48375/mvcmvvm-pattern/



```html
<label for="txtNome"><input id="txtNome" type="text" value=""/><br/>
<label for="txtCognome"><input id="txtCognome" type="text" value=""/><br/>
<button id="btnSalva"/>Salva</button><br/>
```

```javascript
var model = { nome: "Mario", cognome: "Rossi" };
var view = {
		txtNome: document.getElementById("txtNome");
		txtCognome: document.getElementById("txtCognome");
		btnSalva: document.getElementById("btnSalva");
};
var controller = {
	init: function() {
		view.txtNome.value = model.nome;
		view.txtCognome.value = model.cognome;
		view.btnSalva.onclick = controller.salva;
	},
	salva: function() {
		model.nome = view.txtNome.value;
		model.cognome = view.txtCognome.value;
		//invia il model al server
		invia(model);
	}
};
```

