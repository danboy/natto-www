var JSLib = JSLib ? JSLib : {};
var $zIndex = 1000;
// Modal
// Usage: var myVar = new JSLib.Modal(element , params);
// Params {overlay:true,persistent:false,content: "string of content", ajaxContent: ajaxUrl, draggable: false, position: "mouse", hover: false, modalStyle: "background:#999",overlayStyle: "background:#333;opacity:.5;"}
/*
Still needs work, but it's a simple modal lib

if you set ajaxContent to "element" it will pull the href from your trigger element.
this is good for progressive enhanced type stuff.

overlay:true will set a transparent overlay, this will close the modal when clicked unless persistent: true.
*/

JSLib.Canvas = Class.create({

  initialize: function(element, options){
    this.modal = new Element('div', { style: "position:absolute;top: 0px;left: 0px;zIndex:"+($zIndex++)+";background:#FFF;width:150px;height:200px;"});
    this.modal.hide();
    document.body.appendChild(this.modal);
    this.element = $(element);
    this.frames = [];
    this.currentFrame = 0;
    $$('div.marker').each(function(marker,index){
      this.frames[index] = [];
      this.frames[index].left = marker.positionedOffset().left;
      this.frames[index].top = marker.positionedOffset().top;
      this.frames[index].content = marker.innerHTML;
      marker.hide();
    }.bind(this));
    this.frames.size = this.frames.size()-1;
    this.positionModal();
  },
  moveToNextMarker: function(){
    self=this;
    Effect.Fade(this.modal,{queue: 'end',duration: 1 ,afterFinish:function(){
      this.modal.update(this.frames[this.currentFrame].content);
      new Effect.Move(this.element, { queue: 'end', afterFinish: function(){setTimeout('self.displayMessage()',1000)} , x: -this.frames[this.currentFrame].left, y: -this.frames[this.currentFrame].top, mode: 'absolute' });
    }.bind(this)});
  },
  displayMessage: function(){
      self=this;
      Effect.Appear(this.modal,{queue: 'end',duration:1,afterFinish: function(){setTimeout('self.moveToNextMarker()',8000)}.bind(this)});
      if(this.currentFrame < this.frames.size){
        this.currentFrame++;
      }else{
        this.currentFrame = 0;
      }
      
  },
  positionModal: function(){
    this.modal.setStyle({left: this.element.cumulativeOffset().left + (this.element.up().getWidth()/2)+'px',top:(this.element.cumulativeOffset().top + (this.element.up().getHeight()/2))-this.modal.getHeight()+'px'});
    this.moveToNextMarker();
  }

});
