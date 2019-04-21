console.log('logo Init');
class logo extends HTMLElement {
  constructor() {
    // Always call super first in constructor
    super();

    // Create a shadow root
    var shadow = this.attachShadow({mode: 'open'});

    var bgSrc;

    if(!this.hasAttribute('bgSrc')) { 
      let warningText = "WARNING: This element needs bgSrc attribute!";
      console.log(warningText);

      let warning = document.createElement('p');
      warning.textContent = warningText;
      shadow.appendChild(warning);
    }else{
      /*
      <div class="logo">
        <img src="reactiveSEO/img/logo.png">
      </div>
      */

      bgSrc = this.getAttribute('bgSrc');
      console.log('bgSrc ', bgSrc);
      
      //<div class="logo"></div>
      var el = document.createElement('div');
      el.classList = "logo";

      //<div class="gradient"></div>
      var el2 = document.createElement('img');
      el2.src = bgSrc;
      el.appendChild(el2);

      // Append it to the shadow root
      shadow.appendChild(el);
      
      // Create some CSS to apply to the shadow dom
      var style = document.createElement('style');

      style.textContent =
      '.logo {' +
        'max-width: 100%;'+
      '}' +

      '.logo img {' +
        'max-width: 100%;'+
      '}' +
      shadow.appendChild(style);
    }
  }
}

customElements.define('logo-element', logo);