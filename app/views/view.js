var View = new Class({
	container: null,
	
	show: function() {
		this.container.addClass("visible");
	},
	
	hide: function() {
		this.container.removeClass("visible");
	}
});

exports.View = View;