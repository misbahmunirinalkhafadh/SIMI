// const footerTemplate = document.createElement('template');
// var copy = "Copyright &copy; Your Website 2020"
// const data = '';


// footerTemplate.innerHTML = `
//         <footer class="sticky-footer bg-white">
//           <div class="container my-auto">
//             <div class="copyright text-center my-auto">
//               <span>${copy}</span>
//             </div>
//           </div>
//         </footer>
//     `;


// class Footer extends HTMLElement {
//     constructor(props) {
//         super(props);
//     }
    
//     connectedCallback() {
//         const data = $(this).attr('prop-name')
//         console.log("data in pointslayer", data);
//         this.appendChild(footerTemplate.content)
//     }
// }

// customElements.define('footer-component', Footer);

let tmpl = document.createElement('template');
var copy = "Copyright &copy; Your Website 2020"
newFunction();
tmpl.innerHTML = `
        <footer class="sticky-footer bg-white">
          <div class="container my-auto">
            <div class="copyright text-center my-auto">
              <span>${copy}</span>
            </div>
          </div>
        </footer>
    `;

customElements.define('footer-component', class extends HTMLElement {
    constructor() {
        super(); // always call super() first in the constructor.

        
        const data = $(this).attr('prop-name')
        function myfung(va) {
            var asd = data
        }
        // Attach a shadow root to the element.
        let shadowRoot = this.attachShadow({mode:"closed"});
        shadowRoot.appendChild(tmpl.content.cloneNode(true));
    }

});

function newFunction() {
    console.log("data in pointslayer");
}
