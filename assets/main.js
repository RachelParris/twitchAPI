$(document).ready(() => {
	//TODO Need to add search functionality

    // List of live streams
	const liveStreams = ["freecodecamp", "legendoftotalwar", "summit1g"]

	//Setup & Execute API Call
	liveStreams.forEach(liveStream => {
		const queryURL = "https://wind-bow.glitch.me/twitch-api/streams/" + liveStream;
		$.ajax({
            url: queryURL,
			method: "GET",
			dataType: "json"
        })
            .done((res) => {
				postResults(res);
			})
            .fail((err) => {
				console.error("API call error: ", err)
			})
	});

	const postResults = (res) => {

		if (res.stream === null) {

			// TODO Use placeholders for offline users
			let newBox = $('<div class="item">');
			let user = "User is offline.";
			newBox.append(user);
			$("#channels").prepend(newBox);

		} else {

			// Properties pulled from JSON
			let channelName = res.stream.channel.name;
			let logo = res.stream.channel.logo;
			let game = res.stream.channel.game;
			let gameStart = res.stream.created_at;
			let currentViews = res.stream.viewers;
			let rating = res.stream.channel.mature ? "Rated M" : ""; //boolean
			let followers = res.stream.channel.followers;
			let channelURL = res.stream.channel.url;

			// Template for each channel
			let newBox = $(
				`<div class="item">
					<div class="image">
						<a href="${res.stream.channel.url}" target="_blank">
							<img src="${logo}" alt="${channelName} logo">
						</a>
					</div>
					<div class="info">
						<h2>${channelName}</h2>
						<h3>Live Steam started at ${gameStart}</h3>
						<p>Currently playing ${game}<br>
						${rating}<br>
						Current views: ${currentViews} / Followers: ${followers}
						</p>
					</div>
				</div>`
			);

			// Prepend each channel to #channels
			$("#channels").prepend(newBox);
		}
	}
});

