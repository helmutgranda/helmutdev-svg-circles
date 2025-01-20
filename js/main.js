class CircleStack extends HTMLElement {
    static get observedAttributes() {
      return ['count', 'color'];
    }
  
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = `<div id="container"></div>`;
    }
  
    connectedCallback() {
      this.render();
    }
  
    attributeChangedCallback(name, oldValue, newValue) {
      if (oldValue !== newValue) {
        this.render();
      }
    }
  
    render() {
      const count = parseInt(this.getAttribute('count') || '4', 10);
      const color = this.getAttribute('color') || '#0d0';
  
      const svgWidth = count * 40; 
      const svgHeight = 60; 
      const r = 20; 
  
      let circles = '';
      for (let i = 0; i < count; i++) {
        const cx = 30 + i * 30;
        const cy = 30;
        circles += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${color}"></circle>`;
      }
  
      this.shadowRoot.querySelector('#container').innerHTML = `
        <svg width="${svgWidth}" height="${svgHeight}" style="border: 1px solid #ccc">
          ${circles}
        </svg>
      `;
    }
  }
  
  class CircleManager extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = `
        <div>
          <h2>Dynamic "Cloud" Stack</h2>
          <circle-stack id="circleStack" count="4" color="#0d0"></circle-stack>
  
          <div style="margin-top: 20px;">
            <button id="addButton">Add Circle</button>
            <button id="removeButton">Remove Circle</button>
          </div>
  
          <div style="margin-top: 20px;">
            <label for="colorInput">Circle Color (Text):</label>
            <input id="colorInput" type="text" value="#0d0" />
          </div>
  
          <div style="margin-top: 20px;">
            <label for="colorPicker">Circle Color (Picker):</label>
            <input id="colorPicker" type="color" value="#0d0" />
          </div>
        </div>
      `;
    }
  
    connectedCallback() {
      this.addButton    = this.shadowRoot.querySelector('#addButton');
      this.removeButton = this.shadowRoot.querySelector('#removeButton');
      this.colorInput   = this.shadowRoot.querySelector('#colorInput');
      this.colorPicker  = this.shadowRoot.querySelector('#colorPicker');
      this.circleStack  = this.shadowRoot.querySelector('#circleStack');
  
      this.addButton.addEventListener('click', () => this.addCircle());
      this.removeButton.addEventListener('click', () => this.removeCircle());
  
      this.colorInput.addEventListener('change', (e) => this.updateColor(e.target.value));
      this.colorPicker.addEventListener('input', (e) => this.updateColor(e.target.value));
    }
  
    addCircle() {
      const currentCount = parseInt(this.circleStack.getAttribute('count'), 10);
      this.circleStack.setAttribute('count', currentCount + 1);
    }
  
    removeCircle() {
      const currentCount = parseInt(this.circleStack.getAttribute('count'), 10);
      if (currentCount > 1) {
        this.circleStack.setAttribute('count', currentCount - 1);
      }
    }
  
    updateColor(newColor) {
      this.circleStack.setAttribute('color', newColor);
  
      // Keep text input and color picker in sync
      if (this.colorInput.value !== newColor) {
        this.colorInput.value = newColor;
      }
      if (this.colorPicker.value !== newColor) {
        this.colorPicker.value = newColor;
      }
    }
  }
  
  customElements.define('circle-stack', CircleStack);
  customElements.define('circle-manager', CircleManager);
  