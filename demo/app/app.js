import Js from '../../src';

new Js({
    global: function () {
      this.style.position = 'absolute';
      this.bottom = 0;
      this.top = 0;
      this.right = 0;
      this.left = 0;
    },
    sidebar: function () {
      this.style.position = 'absolute';
      this.bottom = 0;
      this.top = 50;
      this.left = 0;
      this.width = 200;
      this.style.backgroundColor = '#ececec';
      this.style.borderRight = 'solid thin #AAAAAA';
      this.style.boxSizing = 'border-box';
    },
    properties: function () {
      this.style.position = 'absolute';
      this.bottom = 0;
      this.top = 50;
      this.right = 0;
      this.width = 200;
      this.style.backgroundColor = '#ececec';
      this.style.borderLeft = 'solid thin #AAAAAA';
      this.style.boxSizing = 'border-box';
    },
    toolbar: function () {
      this.style.position = 'absolute';
      this.left = 0;
      this.top = 0;
      this.right = 0;
      this.height = 50;
      this.style.backgroundColor = '#dedede';
      this.style.borderBottom = 'solid thin #AAAAAA';
      this.on('success', () => {
        console.log(this)
      });
    },

    main: function () {
      this.top = 50;
      this.left = 200;
      this.right = 200;
      this.bottom = 0;
      this.style.backgroundColor = '#eee';
      this.style.overflow = 'hidden';
      this.style.position = 'absolute';

      let sizer = this.find('id', 'sizer')[0];

      this.event('mousedown', (e) => {
        if (e.target.id === this.id) {
          sizer.target = null;
          sizer.show = false;
        }
      });

      this.on('target', (target) => {
        console.log(target)
        sizer.target = target;
        sizer.show = true;
      });
    },

    buttonTest: function () {
      this.event('click', (e) => {
        this.emit('success')
      })
    },

    sizer: function () {
      this.watch = {
        show: (show) => {
          if (show) {
            this.style.display = 'block';
          } else {
            this.style.display = 'none'
          }
        },
        target: (target) => {
          if (target) {
            console.log(target.top)
            this.top = target.top;
            this.left = target.left;
            this.width = target.width;
            this.height = target.height;
          }
        }
      }

      this.model({
        target: null,
        show: false
      });

      this.style.position = 'absolute';
      this.style.border = 'solid thin black';
      this.style.display = 'none';

      this.event('mousedown', (e) => {
        e.preventDefault();
        var mouseOffX = e.clientX - this.left;
        var mouseOffY = e.clientY - this.top;
        this.style.outline = '1px solid black'

        this.parent.$node.onmousemove = (e) => {
          e.preventDefault();
          this.top = e.clientY - mouseOffY;
          this.left = e.clientX - mouseOffX;
          this.target.top = e.clientY - mouseOffY;
          this.target.left = e.clientX - mouseOffX;
        }
      });

      this.on('dragTopRight.prevent', () => {
        var height = this.height;
        var offsetY = this.top;
        var offsetX = this.left;

        this.parent.$node.onmousemove = (e) => {
          e.preventDefault();
          this.height =  (offsetY - (e.clientY - this.parent.top)) + height;
          this.top = e.clientY - this.parent.top;
          this.target.height = (offsetY - (e.clientY - this.parent.top)) + height;
          this.target.top = e.clientY - this.parent.top;
          this.width =  e.clientX - offsetX - this.parent.left;
          this.target.width =  e.clientX - offsetX - this.parent.left;
        }
      })

      this.on('dragTopLeft', () => {
        var height = this.height;
        var offsetY = this.top;
        var offsetX = this.left;
        var width = this.width;

        this.parent.$node.onmousemove = (e) => {
          e.preventDefault();
          this.height =  (offsetY - (e.clientY - this.parent.top)) + height;
          this.top = e.clientY - this.parent.top;
          this.target.height = (offsetY - (e.clientY - this.parent.top)) + height;
          this.target.top = e.clientY - this.parent.top;


          this.width = offsetX - (e.clientX - this.parent.left) + width;
          this.left = e.clientX - this.parent.left;
          this.target.width = offsetX - (e.clientX - this.parent.left) + width;
          this.target.left = e.clientX - this.parent.left; 
        }
      })
      
      this.on('dragTop', () => {
        var height = this.height;
        var offsetY = this.top;

        this.parent.$node.onmousemove = (e) => {
          e.preventDefault();
          this.height =  (offsetY - (e.clientY - this.parent.top)) + height;
          this.top = e.clientY - this.parent.top;
          this.target.height = (offsetY - (e.clientY - this.parent.top)) + height;
          this.target.top = e.clientY - this.parent.top;
        }
      })

      this.on('dragLeft', () => {

        var offsetX = this.left;
        var width = this.width;

        this.parent.$node.onmousemove = (e) => {
          e.preventDefault();

          this.width = offsetX - (e.clientX - this.parent.left) + width;
          this.target.width = offsetX - (e.clientX - this.parent.left) + width;
          this.left = e.clientX - this.parent.left;
          this.target.left = e.clientX - this.parent.left;
        }
      })

      this.on('dragRight', () => {
        var offsetX = this.left;

        this.parent.$node.onmousemove = (e) => {
          e.preventDefault();

          this.width =  e.clientX - offsetX - this.parent.left;
          this.target.width =  e.clientX - offsetX - this.parent.left;
        }
      })
        
      this.on('dragBottomRight', () => {
        var offsetX = this.left;
        var offsetY = this.top;

        this.parent.$node.onmousemove = (e) => {
          e.preventDefault();

          this.width =  e.clientX - offsetX - this.parent.left;
          this.height = e.clientY - offsetY - this.parent.top;
          this.target.width =  e.clientX - offsetX - this.parent.left;
          this.target.height = e.clientY - offsetY - this.parent.top;
        }
      })

      this.on('dragBottomLeft', () => {
        var offsetX = this.left;
        var width = this.width;
        var offsetY = this.top;

        this.parent.$node.onmousemove = (e) => {
          e.preventDefault();

          this.width = offsetX - (e.clientX - this.parent.left) + width;
          this.height = e.clientY - offsetY - this.parent.top;
          this.target.width =  offsetX - (e.clientX - this.parent.left) + width;
          this.target.height = e.clientY - offsetY - this.parent.top;
          this.target.left = e.clientX - this.parent.left;
          this.left = e.clientX- this.parent.left;
        }
      })

      this.on('dragBottom', () => {
        var offsetY = this.top;

        this.parent.$node.onmousemove = (e) => {
          e.preventDefault();

          this.height = e.clientY - offsetY - this.parent.top;
          this.target.height = e.clientY - offsetY - this.parent.top;
        }
      })

      this.on('release', () => {
        this.parent.$node.onmousemove = null;
      })

      this.parent.event('mouseup', () => {
        this.parent.$node.onmousemove = null;
      })
    },
    dragTopRight: function () {
      this.style.transform = 'translate(50%, -50%)';
      this.width = 10;
      this.height = 10;
      this.style.border = 'solid thin black';
      this.style.cursor = 'nesw-resize';
      this.style.backgroundColor = 'black';

      this.event('mousedown', (e) => {
        this.emit("dragTopRight")
      })

      this.event('mouseup', (e) => {
        this.emit("release")
      })
    },
    dragTopLeft: function () {
      this.style.transform = 'translate(-50%, -50%)';
      this.width = 10;
      this.height = 10;
      this.style.border = 'solid thin black';
      this.style.cursor = 'nwse-resize';
      this.style.backgroundColor = 'black';

      this.event('mousedown', (e) => {
        this.emit("dragTopLeft")
      })

      this.event('mouseup', (e) => {
        this.emit("release")
      })
    },
    dragTop: function () {
      this.style.transform = 'translate(-50%, -50%)';
      this.width = 10;
      this.height = 10;
      this.style.border = 'solid thin black';
      this.style.cursor = 'ns-resize';
      this.style.backgroundColor = 'black';

      this.event('mousedown', (e) => {
        this.emit("dragTop")
      })

      this.event('mouseup', (e) => {
        this.emit("release")
      })
    },
    dragBottom: function () {
      this.style.transform = 'translate(-50%, 50%)';
      this.width = 10;
      this.height = 10;
      this.style.border = 'solid thin black';
      this.style.cursor = 'ns-resize';
      this.style.backgroundColor = 'black';

      this.event('mousedown', (e) => {
        this.emit("dragBottom")
      })

      this.event('mouseup', (e) => {
        this.emit("release")
      })
    },
    dragBottomRight: function () {
      this.style.transform = 'translate(50%, 50%)';
      this.width = 10;
      this.height = 10;
      this.style.border = 'solid thin black';
      this.style.cursor = 'nwse-resize';
      this.style.backgroundColor = 'black';

      this.event('mousedown', (e) => {
        this.emit("dragBottomRight")
      })

      this.event('mouseup', (e) => {
        this.emit("release")
      })
    },
    dragRight: function () {
      this.style.transform = 'translate(50%)';
      this.width = 10;
      this.height = 10;
      this.style.border = 'solid thin black';
      this.style.cursor = 'ew-resize';
      this.style.backgroundColor = 'black';

      this.event('mousedown', (e) => {
        this.emit("dragRight")
      })

      this.event('mouseup', (e) => {
        this.emit("release")
      })
    },
    dragLeft: function () {
      this.style.transform = 'translate(-50%)';
      this.width = 10;
      this.height = 10;
      this.style.border = 'solid thin black';
      this.style.cursor = 'ew-resize';
      this.style.backgroundColor = 'black';

      this.event('mousedown', (e) => {
        this.emit("dragLeft")
      })

      this.event('mouseup', (e) => {
        this.emit("release")
      })
    },
    dragBottomLeft: function () {
      this.style.transform = 'translate(-50%, 50%)';
      this.width = 10;
      this.height = 10;
      this.style.border = 'solid thin black';
      this.style.cursor = 'nesw-resize';
      this.style.backgroundColor = 'black';

      this.event('mousedown', (e) => {
        this.emit("dragBottomLeft")
      })

      this.event('mouseup', (e) => {
        this.emit("release")
      })
    },
    block: function () {
      this.width = 100;
      this.height = 100;
      this.top = 0;
      this.left = 0;
      this.style.backgroundColor = 'blue';
      this.style.position = 'absolute';

      this.states({
        hover: {
          style: {
            backgroundColor: 'green'
          }
        }
      });

      this.event('mousedown', (e) => {
        this.emit('target');
      });
    }
  }
).init('#scope');