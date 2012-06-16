
function showDeals() {

}

function getDealsFromYipit() {
	var yipitURL = "http://api.yipit.com/v1/deals/?tag=restaurants,bar-club&division=new-york&limit=300&key=WfNYJS42NRP8V6nQ";

	jQuery.ajax({
		type: "get",
		url: yipitURL,
		dataType: "json",
		success: function(response) {
			alert(response);
		}
	});
}