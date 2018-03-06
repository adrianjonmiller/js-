import Js from './js';
import utils from './utils';

export default class JsDash {
  constructor (selector) {
    let $node = document.querySelector(selector) || document.body;

    this.lib = {};

    ((cb) => {
      if (document.readyState !== 'loading') {
        cb(this);
      } else {
        document.addEventListener('DOMContentLoaded', cb(this));
      }
    })(() => {
      function boostrap () {
        let t0 = performance.now();
        let uid = $node.getAttribute('id') ? $node.getAttribute('id') : utils.uid();

        this.vnode = new Js({$node: $node, lib: this.lib, uid: uid});

        let t1 = performance.now();

        console.log('Initializing the JS took ' + (t1 - t0) + ' milliseconds.');
      }

      if (Object.keys(this.lib).length === 0) {
        let check = setInterval(function () {
          if (Object.keys(this.lib).length !== 0) {
            boostrap.bind(this)();
            clearInterval(check);
          }
        }.bind(this), 1);
      } else {
        boostrap.bind(this)();
      }
    });
  }
}
