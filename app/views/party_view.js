var sp   = getSpotifyApi(1);
var View = sp.require("app/views/view").View;

var PartyView = new Class({
	Extends: View,
	Implements: Events,
	
	party: null,
	
	initialize: function() {
		this.container = $("party");
		this.partyName = $("party-name");
		this.partyLink = $("party-link");
		this.partySongButton = $("party-song-button");
		this.partySongButton.addEvent("click", this.onSongButtonClick.bind(this));
	},
	
	update: function(party) {
		this.party = party;
		this.partyName.set("text", party.name);
		this.partyLink.set("value", party.url);
	},
	
	onSongButtonClick: function(event) {
		event.preventDefault();
		this.fireEvent("startradio");
	}
});

exports.PartyView = PartyView;