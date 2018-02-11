$(document).ready(() => {

    // Execute API call
	const liveStreams = ["freecodecamp", "legendoftotalwar"]

	//Setup API call
	liveStreams.forEach(liveStream => {
		const queryURL = "https://wind-bow.glitch.me/twitch-api/streams/" + liveStream;
		$.ajax({
            url: queryURL,
			method: "GET",
			dataType: "json"
        })
            .done((res) => {
				if (res.stream === null) {
					console.log("User is offline.")
				} else {
					console.log("User " + res.stream.channel.display_name + " is online.")
				}
			})
            .fail((err) => {
				console.error("API call error: ", err)
			})
	});
});