console.log('Basic login Init');
class basicLogin extends HTMLElement {
  constructor() {
    // Always call super first in constructor
    super();

    // Create a shadow root
    var shadow = this.attachShadow({mode: 'open'});

	/*
	<input placeholder="Username" autocomplete="off" type="text" class="inputti">
	<input  placeholder="Password" autocomplete="off" type="password" class="inputti salasana">
	<button class="fancybutton prevent-highlight">Login</button>
	*/

	let elMaster = document.createElement('div');
	elMaster.classList = "basic-login-holder";

	let el = document.createElement('input');
	el.classList = "inputbox input-username";
	el.placeholder = "Username";
	el.autocomplete = "off";
	el.type = "text";

	let el2 = document.createElement('input');
	el2.classList = "inputbox input-password";
	el2.placeholder = "Password";
	el2.autocomplete = "off";
	el2.type = "password";

	let el3 = document.createElement('button');
	el3.classList = "fancybutton prevent-highlight";
	el3.textContent = "Login";

	el3.addEventListener("click", function(){
		let username = el.value;
		let password = el2.value;
		console.log('submit', username , password); 
	});

	elMaster.appendChild(el);
	elMaster.appendChild(el2);
	elMaster.appendChild(el3);

	// Append it to the shadow root
	shadow.appendChild(elMaster);

	// Create some CSS to apply to the shadow dom
	var style = document.createElement('style');

	style.textContent =
	'.inputbox {' +
		'background-color: #54545400 !important;'+
		'width: calc( 100% - 30px );' +
		'margin: 0;' +
		'border: 0;' +
		'padding: 15px;' +
		'margin-bottom: 15px;' +
		'color: rgba(255, 255, 255, 0.85);' +
		'font-size: 1.2em;' +
		'border-bottom: 1px solid rgba(255, 255, 255, 0.7);' +
		'border-radius:0;' +
		'font-family: var(--button-font);' +
		'outline: none !important;'+
		//'' +
	'}' +

	'::placeholder {' +
		'color: rgba(255, 255, 255, 0.85);' +
		'opacity: 1;' +
		//'' +
	'}' +

	'button.fancybutton {' +
		'border: none;' +
		'background: #E91E63;' +
		'font-family: var(--button-font);' +
		'padding: 15px 60px;' +
		'border-radius: 30px;' +
		'color: #FFF;' +
		'font-weight: bold;' +
		'font-size: 1.2em;' +
		'margin: auto;' +
		'margin-top: 15px;' +
		'display: block;' +
		'box-shadow: 0px 1px 2px 0px #00000082;' +
		'transition: all .2s linear;' +
		
		'width: 100%;' +
		'margin-top: 30px;' +
		//'' +
	'}' +

	'button.fancybutton:hover {' +
		'transform: scale(1.05);' +
		//'' +
	'}';

	shadow.appendChild(style);
    
  }
}

customElements.define('basic-login', basicLogin);