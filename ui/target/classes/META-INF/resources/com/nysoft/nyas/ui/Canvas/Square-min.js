jQuery.require("com.nysoft.nyas.ui.Canvas.StrokeAndFillObject");com.nysoft.nyas.ui.Canvas.StrokeAndFillObject.extend("com.nysoft.nyas.ui.Canvas.Square",{meta:{width:"string"},init:function(a){this.setProperties(a);(!this.getWidth())&&this.setWidth("10px");this._super("init",a)},render:function(a){a.getContext().save();a.getContext().beginPath();this.applyRotation(a,this.getWidth(),this.getWidth());a.getContext().rect(this.getVector().getX(),this.getVector().getY(),parseInt(this.getWidth(),10),parseInt(this.getWidth(),10));this.applyStrokeSettings(a);if(this.isStroked()){a.getContext().stroke()}this.applyFillSettings(a);if(this.isFilled()){a.getContext().fill()}a.getContext().closePath();a.getContext().restore()}});