var sp = getSpotifyApi(1);
var models = sp.require('sp://import/scripts/api/models');

var Jukebox = new Class({
	party: null,
	nextSongRequest: null,
	
	initialize: function(party) {
		this.party = party;
		this.nextSongRequest = new Request.JSON({
			url: "http://smartdj.local:3000/api/party_tracks.json",
			method: "get",
			onSuccess: this.onNextTrack.bind(this),
			onFailure: this.onNextTrackFailure.bind(this)
		});
	},
	
	playNextSong: function() {
		this.nextSongRequest.send({ data: { party_id: this.party.id } });
	},
	
	onNextTrack: function(response) {
		models.player.track = response.url;
	},
	
	onNextTrackFailure: function() {
		console.log("Couldn't get a next track to play :(");
	}
});

exports.Jukebox = Jukebox;