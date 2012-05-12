var sp              = getSpotifyApi(1);
var CreatePartyView = sp.require("app/views/create_party_view").CreatePartyView;
var PartyView       = sp.require("app/views/party_view").PartyView;
var Jukebox         = sp.require("app/jukebox").Jukebox;

var App = new Class({
	jukebox: null,
	
	initialize: function() {
		this.models = sp.require("sp://import/scripts/api/models");
		
		this.createEventView = new CreatePartyView();
		this.createEventView.addEvent("created", this.onPartyCreated.bind(this));
		
		this.partyView = new PartyView();
		this.partyView.addEvent("requestsong", this.onRequestSong.bind(this));
		
		this.createEventView.show();
	},
	
	onPartyCreated: function(party) {
		this.jukebox = new Jukebox(party);
		this.partyView.update(party);
		this.createEventView.hide();
		this.partyView.show();
	},
	
	onRequestSong: function() {
		if (this.jukebox == null) {
			console.log("Can't play songs without a Jukebox!");
			return;
		}
		this.jukebox.playNextSong();
	}
});

exports.App = App;