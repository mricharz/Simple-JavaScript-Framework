jQuery.require('com.nysoft.nyas.core.BaseObject');

//onBeforeInit
com.nysoft.nyas.core.EventStack.bind('com.nysoft.nyas.core.Control', 'onBeforeInit', function(e, data) {
	var oControlObject = e[0], arguments = e[1], domObject, options;
	domObject = arguments[0] || null;
	options = arguments[1] || null;
	
	if(domObject) {
		oControlObject.setDom(domObject);
		//capture content & and clear it
		var properties = domObject.children('[data-property]');
		if(properties.length > 0) {
			properties.each(function() {
				jqThis = jQuery(this);
				var propertyName = jqThis.data('property');
				jQuery.log.trace('Get PropertyValue of: '+propertyName, jqThis.html());
				options[propertyName] = jqThis.html();
			});
		} else {
			options.content = domObject.html();
		}
		domObject.empty();
	} else {
		oControlObject.setDom(jQuery('<div />'));
	}
	oControlObject.setProperties(options);
	
	//set default id
	(!oControlObject.getId()) && oControlObject.setId(jQuery.utils.uniqueId());
});

//onAfterInit
com.nysoft.nyas.core.EventStack.bind('com.nysoft.nyas.core.Control', 'onAfterInit', function(e, data) {
	var oControlObject = e[0], arguments = e[1], domObject, options;
	domObject = arguments[0] || null;
	options = arguments[1] || null;
	
	//render control
	oControlObject.trigger('onBeforeRenderer');
	oControlObject._renderControl();

	//make dom-reference
	oControlObject._setReference();
	
	//update all properties to force rendering
	var aProperties = oControlObject.getProperties();
	jQuery.each(aProperties, function(key, value) {
		var setter = 'set'+jQuery.utils.capitalize(key.slice(1));
		if(oControlObject[setter]) {
			jQuery.log.trace('Call '+setter, value);
			oControlObject[setter].call(oControlObject, value);
		}
	});
	oControlObject.trigger('onAfterRenderer');
	
});

com.nysoft.nyas.core.BaseObject.extend('com.nysoft.nyas.core.Control', {
	meta: {
		id: 'string',
		dom: 'object'
	},
	
	init: function() {},
	
	_setReference: function(domObject) {
		domObject = domObject || this.getDom();
		domObject.data('control', this);
	},
	
	_renderControl: function() {
		if(this.getDom()) {
			//set id to dom-Element
			this.getDom().attr('id', this.getId());
		}
	},
	
	destroy: function() {
		this.getDom().remove();
	},
	
	attachTo: function(domObject, prepend) {
		if(!jQuery.utils.isjQuery(domObject)) {
			domObject = jQuery(domObject);
		}
		if(!prepend) {
			domObject.append(this.getDom());
		} else {
			domObject.prepend(this.getDom());
		}
	},
	
	detach: function() {
		this.getDom().detach();
	},
	
});