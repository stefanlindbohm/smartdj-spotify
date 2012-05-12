var sp   = getSpotifyApi(1);
var View = sp.require("app/views/view").View;

var CreatePartyView = new Class({
	Extends: View,
	Implements: Events,
	
	initialize: function() {
		this.container = $("create-party");
		this.form = this.container.getElement("form");
		this.form.addEvent("submit", this.onFormSubmit.bind(this));
	},
	
	onFormSubmit: function(event) {
		event.preventDefault();
		
		var data = {
			name: this.form["name"].get("value")
		}
		
		var request = new Request.JSON({
			url: this.form.getProperty("action"),
			method: "post",
			data: data,
			onSuccess: this.onPartySubmitted.bind(this),
			onFailure: this.onPartyFailed.bind(this)
		});
		request.send();
	},
	
	onPartySubmitted: function(response) {
		this.fireEvent("created", response)
	},
	
	onPartyFailed: function() {
		console.log("Couldn't create party :(");
	}
});

exports.CreatePartyView = CreatePartyView;