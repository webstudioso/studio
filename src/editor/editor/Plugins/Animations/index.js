/*eslint no-undef: "off"*/

const Plugin = (editor) => {
    

    const def = editor.Components.getType("default");

    editor.Components.addType("default", {
     model:{
        defaults:{
           traits:[
              ...def.model.prototype.defaults.traits,
              ...[{
                    changeProp: 1,
                     type: "select",
                     label: "Animation",
                     name: 'animation',
                     options:[
                       {value: 'bounce',name: 'Bounce'},
                       {value: 'wobble',name: 'Wobble'},
                       {value: 'flash',name: 'Flash'},
                       {value: 'pulse',name: 'Pulse'},
                       {value: 'rubberBand',name: 'Rubber Band'},
                       {value: 'bounceIn',name: 'Bounce In'},
                       {value: 'bounceInDown',name: 'Bounce In Down'},
                       {value: 'bounceInLeft',name: 'Bounce In Left'},
                       {value: 'bounceInRight',name: 'Bounce In Right'}
                       //Other animations...
                     ]
               },
               {
                     changeProp: 1,
                     type: "number",
                     label: "Duration(s)",
                     name: "duration",
               }, {
                     changeProp: 1,
                     type: "number",
                     label: "Delay(s)",
                     name: "delay",
               }
              ]
            ]
         },
         init() {
            this.on('change:animation', this.onAnimationChange);
            this.onAnimationChange();
            this.on("change:duration", this.onDurationChange);
            this.onDurationChange();
            this.on("change:delay", this.onDelayChange);
            this.onDelayChange();
         },
         onAnimationChange() {
            this.removeStyle("animation");
            this.addStyle({ "animation": `${this.get('animation')} ${this.get('duration')}s ease ${this.get('delay')}}s`  });
         },
         onDurationChange() {
            this.removeStyle("animation");
            this.addStyle({ "animation": `${this.get('animation')} ${this.get('duration')}s ease ${this.get('delay')}}s`  });
         },
         onDelayChange() {
            this.removeStyle("animation");
            this.addStyle({ "animation": `${this.get('animation')} ${this.get('duration')}s ease ${this.get('delay')}s`  });
         }
      }
  });
};
  
export default Plugin;
  