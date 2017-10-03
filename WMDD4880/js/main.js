var feed = new Instafeed({
	// get: 'user',
	get: 'tagged',
	tagName: 'wmdd4880',
	// userId: 5219349,
	accessToken: '229774133.ee26814.d9279c18526f4a578198a7501a4f98e3',
	target: 'instagram',
	resolution: 'standard_resolution',
	template: '<div><a href="{{link}}"><img src="{{image}}" /></a><p>Uploader: {{model.user.username}}</p><p># of likes: {{likes}}</p><p># of comments: {{comments}}</p><p>Tags: {{model.tags}}</p></div>',
	after: function() {
	}
});

window.onload = function() {
	// $("button").on("click",function() {
		// $('#participants').empty();
		feed.options.target = 'participants';
		feed.options.template = "<div id='box'><div id='picture'><img src='{{image}}'><span id='center-heart' class='icon-heart'></span></div><div id='infos'><span id='icon-instagram' class='icon-instagram'></span><div id='user'>{{model.user.username}}</div><div id='bottom-heart' class='icon-heart unclicked'></div></div></div>",
		feed.run();
		// get multiple tags
		// let myTags = getMultipleTags($.map($('input').val().split(','), $.trim));
		// run each instance
		// for(var i=0, len=myTags.length; i < len; i++) {
			// myTags[i].run();
		}
	// })
// }

function getMultipleTags (tags) {
	var feeds = [];
    for (var i=0, len=tags.length; i < len; i++) {
        feeds.push(new Instafeed({
			accessToken: '229774133.ee26814.d9279c18526f4a578198a7501a4f98e3',
			template: "<div id='box'><div id='picture'><img src='{{image}}'><span id='center-heart' class='icon-heart'></span></div><div id='infos'><span id='icon-instagram' class='icon-instagram'></span><div id='user'>{{model.user.username}}</div><div id='bottom-heart' class='icon-heart unclicked'></div></div></div>",
			target: 'participants',
            get: 'tagged',
            tagName: tags[i],
            // target: "instafeed-" + tags[i]
        }));
    }
    return feeds;
}
