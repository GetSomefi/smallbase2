console.log('bgGradient Init');
class bgGradient extends HTMLElement {
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
      bgSrc = this.getAttribute('bgSrc');
      console.log('bgSrc ', bgSrc);
      
      //<div class="gradient-wrapper"></div>
      var el = document.createElement('div');
      el.classList = "gradient-wrapper";

      //<div class="gradient"></div>
      var el2 = document.createElement('div');
      el2.classList = "gradient";
      el.appendChild(el2);
      

      var el3 = document.createElement('div');
      el3.classList = "bg-image";
      el.appendChild(el3);

      // Append it to the shadow root
      shadow.appendChild(el);
      
      // Create some CSS to apply to the shadow dom
      var style = document.createElement('style');

      style.textContent =
      '.gradient {' +
        'background: linear-gradient(to bottom, rgba(162,146,199,1) 0%,rgba(79,80,97,0.6) 100%);'+
        'height: 100vh;'+
        'position: absolute;'+
        'top: 0;'+
        'left: 0;'+
        'width: 100%;'+
      '}' +

      '.bg-image {' +
        'height: 100vh;'+
        'background-image: url('+bgSrc+');'+
        'background-position: -420px center;'+
        'background-size: auto 100%;'+
      '}' +
      shadow.appendChild(style);
    }
  }
}

customElements.define('bg-gradient', bgGradient);