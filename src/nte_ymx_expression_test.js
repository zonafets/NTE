// Natural Template Engine
// Author: Stefano Zaglio
// License: see LICENSE file

// expected generated code

(function() {

	var $mdl = app;

	/** binds **/

	var x = document.getElementById("x");
	var m = document.getElementById("m");
	var y = document.getElementById("y");

	var fName = document.getElementById("fName");
	var lName = document.getElementById("lName");
	var fullName = document.getElementById("fullName");
				
	/** utils **/

	function $set(element,value) {
		if (value !== undefined) element.value = value;
	}
		
	function $upd( input, value ) {
		if (value !== undefined && input.value != value) {
			input.value = value;
			input.dispatchEvent(new Event('change'))
		}
	}

	function $disableIf( ) {
		for (var i=0;i<arguments.length;i++) {
			value = arguments[i];
			if (value === undefined || value == 0 || value == "" || value == null)
				return true;
		}
		return false;
	}

	/** requires **/

	function $requires_for_x() {
		var b = !isNaN( x.value||'a' ) && !isNaN( m.value||'a' ) 
		return b;
	}

	function $requires_for_m() {
		var b = !isNaN( m.value||'a' ) && ( !isNaN( x.value||'a' ) || !isNaN( y.value||'a' ) )
		return b;
	}

	function $requires_for_y() {
		var b = !isNaN( y.value||'a' ) && !isNaN( m.value||'a' ) 
		return b;
	}

	/** enableIf **/
	
	function $disables_for_m() {
		y.disabled = $disableIf($mdl.m);
	}
	
	function $disables_for_fullName() {
		fullName.disabled = $disableIf($mdl.fName, $mdl.lName);
	}

	/** links  **/

	function $links_for_x( ev ) {
		$mdl.x = this.value;
		if (!$requires_for_x()) return;
		$mdl.line();
		$set( y, $mdl.y );
	}

	function $links_for_m( ev ) {
		$mdl.m = this.value;
		if (!$requires_for_m()) return;
		$mdl.line_or_reverse();
		$set( y, $mdl.y );
		$set( x, $mdl.x );
		$disables_for_m();
	}

	function $links_for_y( ev ) {
		$mdl.y = this.value;
		if (!$requires_for_y()) return;
		$mdl.reverse_line();
		$set(x,$mdl.x);
	}
	
	function $links_for_fName( ev ) {
		$mdl.fName = this.value;
		fullName.value = $mdl.fullName()
		$disables_for_fullName()
	}

	function $links_for_lName( ev ) {
		$mdl.lName = this.value;
		fullName.value = $mdl.fullName()
		$disables_for_fullName()
	}
			
	/** defaults **/

	$mdl.m = 1; 

	/** events **/

	x.addEventListener('change', $links_for_x )
	m.addEventListener('change', $links_for_m )
	m.addEventListener('blur', $links_for_m )
	y.addEventListener('change', $links_for_y )
	fName.addEventListener('change', $links_for_fName )
	lName.addEventListener('change', $links_for_lName )
				
	/** init **/		

	$upd( x, $mdl.x );
	$upd( m, $mdl.m );
	$upd( y, $mdl.y );
	
	$upd( fName, $mdl.fName );
	$upd( lName, $mdl.lName );
		
})();

