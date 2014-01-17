jQuery.require('com.nysoft.nyas.core.ManagedObject');
jQuery.require('org.jsonselect.JSONSelect');

com.nysoft.nyas.core.ManagedObject.extend('com.nysoft.nyas.core.Model', {
	
	meta: {
		data: 'object',
		bindings: 'object',
		key: 'string'
	},
	
	init: function(domObject, options) {
		this._super('init', arguments);
		//setup model
		this.setProperties(options);
		//init bindings array to hold bindings
		this.setBindings([]);
		jQuery.log.trace('Referencing Model: '+this.getKey());
		//reference model instance
		com.nysoft.nyas.core.Model._models[this.getKey()] = this;
	},
	
	update: function(bForceRerender) {
		this._loadData();
		this._updateBindings(bForceRerender);
	},
	
	_loadData: function() {
		jQuery.log.trace('Loading Model-Data');
	},
	
	_updateBindings: function(bForceRerender) {
		jQuery.log.trace('Updating bindings. With rerender: '+bForceRerender);
		jQuery.each(this.getBindings(), jQuery.proxy(function(oBinding) {
			this._updateBinding(oBinding, bForceRerender);
		}, this));
	},
	
	getData: function() {
		return this.getProperty('data');
	},
	
	setData: function(oValue, bPreventBindingUpdate) {
		this.setProperty('data', oValue);
		if(!bPreventBindingUpdate) {
			this._updateBindings(true);
		}
	},
	
	_updateBinding: function(oBinding, bForceRerender) {
		jQuery.log.trace('Updating binding', oBinding);
		//get value of selector
		var oValue = this._evaluateSelector(oBinding.selector);
		//set object attribute value
		oBinding.object.setProperty(oBinding.property, oValue);
		//rerender if forced and possible
		if(bForceRerender && jQuery.isFunction(oBinding.object.rerender)) {
			oBinding.object.rerender();
		}
	},
	
	getSelectorValue: function(sSelector) {
		var oSelector = JSONSelect.compile(sSelector);
		return this._evaluateSelector(oSelector);
	},
	
	_evaluateSelector: function(oSelector) {
		return oSelector.match(this.getData());
	},
	
	addBinding: function(oObject, sPropertyName, sSelector) {
		var oBinding = {
			object: oObject,
			property: sPropertyName,
			selector: JSONSelect.compile(sSelector)
		};
		this.getBindings().push(oBinding);
		jQuery.log.trace('Added new binding', oBinding);
	}

});

com.nysoft.nyas.core.Model._models = [];

com.nysoft.nyas.core.Model.getModel = function(sModelKey) {
	return com.nysoft.nyas.core.Model._models[sModelKey];
};

com.nysoft.nyas.core.Model.addBinding = function(oObject, sPropertyName, sSelector) {
	var aMatches = sSelector.match(/^(.*?);/);
	var sModelKey = '';
	if(aMatches.length == 2) {
		sModelKey = aMatches[1];
		sSelector = sSelector.replace(aMatches[0], '');
	} 
	var oModel = com.nysoft.nyas.core.Model.getModel(sModelKey);
	if(oModel) {
		oModel.addBinding(oObject, sPropertyName, sSelector);
	} else {
		throw new com.nysoft.nyas.core.Exception('Cannot bind property "'+sPropertyName+'"! Model "'+sModelKey+'" not found!');
	}
};