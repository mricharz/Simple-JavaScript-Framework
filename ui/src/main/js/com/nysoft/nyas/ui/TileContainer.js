jQuery.require('com.nysoft.nyas.core.Control');

com.nysoft.nyas.core.Control.extend('com.nysoft.nyas.ui.TileContainer', {
	meta: {
		tiles: 'string',
		title: 'string'
	},

	init: function() {
		//update properties to force draw in dom
		this.setTitle(this.getTitle());
		this.setTiles(this.getTiles());
	},
	
	_renderControl: function() {
		if(this.getDom()) {
			this.getDom().addClass('tile-container');
			this.getDom().html(
					'<h2></h2>' +
					'<div class="container">' +
						'<div class="arrow left" />' +
						'<div class="inner" />' + 
						'<div class="arrow right" />' +
					'</div>'
			);
			this.container = this.getDom().find('.inner');
			this.btnLeft = this.getDom().find('.arrow.left');
			this.btnRight = this.getDom().find('.arrow.right');
			this.title = this.getDom().children('h2');
		}
	},
	
	setTitle: function(title) {
		if(typeof title == 'string' || title == null) {
			this.setProperty('title', title);
			if(this.title) {
				this.title.text(title);
			}
		}
	},
	
	setTiles: function(object) {
		if(typeof object == 'string' || object == null) {
			this.setProperty('tiles', object);
			if(this.container) {
				this.container.html(object).children('[data-jsclass]').generateObject();
			}
		}
	}
	
});