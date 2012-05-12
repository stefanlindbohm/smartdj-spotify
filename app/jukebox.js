var sp = getSpotifyApi(1);
var models = sp.require('sp://import/scripts/api/models');

var Jukebox = new Class({
	party: null,
	currentPlaylist: null,
	playerObserver: null,
	nextSongRequest: null,
	playWhenPossible: false,
	
	initialize: function(party) {
		this.playerObserver = this.onPlayerChange.bind(this);
		this.party = party;
		var data = {
			party_id: this.party.id
		};
		this.nextSongRequest = new Request.JSON({
			url: "http://smartdj.local:3000/api/party_tracks.json",
			method: "get",
			data: data,
			onSuccess: this.onTrack.bind(this),
			onFailure: this.onTrackFailure.bind(this)
		});
	},
	
	start: function() {
		console && console.log("starting");
		this.currentPlaylist = new models.Playlist();
		models.player.ignore(models.EVENT.CHANGE, this.playerObserver);
		models.player.observe(models.EVENT.CHANGE, this.playerObserver);
		this.playWhenPossible = true;
		this.nextSongRequest.send();
	},
	
	stop: function() {
		console && console.log("stopping");
		this.currentPlaylist = null;
		models.player.ignore(models.EVENT.CHANGE, this.playerObserver);
	},
	
	fillPlaylist: function() {
		if (this.currentPlaylist == null) {
			console && console.log("No playlist to fill");
			return;
		}
		if (models.player.track == null) {
			console && console.log("No track to reference");
			return;
		}
		while (this.currentPlaylist.indexOf(models.player.track) > 0) {
			this.currentPlaylist.remove(this.currentPlaylist.get(0));
		}
		if (this.currentPlaylist.length <= 1) {
			console && console.log("Filling up the playlist");
			this.nextSongRequest.send();
		} else {
			console && console.log("playlist is good");
		}
		var tracks = this.currentPlaylist.tracks;
		for (var i = 0; i < tracks.length; i++) {
			var track = tracks[i];
			console && console.log(track);
		}
	},
	
	onTrack: function(response) {
		this.currentPlaylist.add(response.url);
		if (this.playWhenPossible) {
			models.player.play(response.url, this.currentPlaylist, this.currentPlaylist.length - 1);
			this.playWhenPossible = false;
		}
		this.fillPlaylist();
	},
	
	onTrackFailure: function() {
		console && console.log("Couldn't get a next track to play :(");
	},
	
	onPlayerChange: function(event) {
		console && console.log(event);
		if (event.data.contextclear) {
			// Switched out of radio context, give up control
			this.stop();
			return;
		}
		if (event.data.curcontext) {
			// playing our playlist
		} else {
			// playing queued track or something
		}
		if (event.data.curtrack) {
			// track have changed
			this.fillPlaylist();
		}
	}
});

exports.Jukebox = Jukebox;