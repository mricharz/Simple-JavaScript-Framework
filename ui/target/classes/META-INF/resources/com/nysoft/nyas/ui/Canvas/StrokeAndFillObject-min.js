jQuery.require("com.nysoft.nyas.ui.Canvas.CanvasObject");jQuery.require("com.nysoft.nyas.ui.Canvas.Type");com.nysoft.nyas.ui.Canvas.CanvasObject.extend("com.nysoft.nyas.ui.Canvas.StrokeAndFillObject",{meta:{borderColor:"string",borderWidth:"string",fillColor:"string",type:"string"},init:function(a){this.setProperties(a);(!this.getBorderColor())&&this.setBorderColor("#000000");(!this.getFillColor())&&this.setFillColor("#ffffff");(!this.getBorderWidth())&&this.setBorderWidth("1px");(!this.getType())&&this.setType(com.nysoft.nyas.ui.Canvas.Type.Fill);this._super("init",a)},applyStrokeSettings:function(a){if(this.isStroked()){a.getContext().lineWidth=parseInt(this.getBorderWidth(),10);a.getContext().strokeStyle=this.getBorderColor()}},applyFillSettings:function(a){if(this.isFilled()){a.getContext().fillStyle=this.getFillColor()}},isStroked:function(){return(this.getType().indexOf("stroke")>=0)},isFilled:function(){return(this.getType().indexOf("fill")>=0)},});