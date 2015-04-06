module.exports = function(RED) {
	function isNumber(obj) { return !isNaN(parseFloat(obj)) }
	function switchSource(source){
		switch(msg.payload.toUpperCase()) {
			case "HDMI1":
			yamaha.setMainInputTo("HDMI1").done(function(){console.log("HDMI");});
			break;
			case "HDMI2":
			yamaha.setMainInputTo("HDMI2").done(function(){console.log("HDMI");});
			break;
			case "HDMI3":
			yamaha.setMainInputTo("HDMI3").done(function(){console.log("HDMI");});
			break;
			case "HDMI4":
			yamaha.setMainInputTo("HDMI4").done(function(){console.log("HDMI");});
			break;
			case "HDMI5":
			yamaha.setMainInputTo("HDMI5").done(function(){console.log("HDMI");});
			break;
			case "AV1":
			yamaha.setMainInputTo("AV1").done(function(){console.log("HDMI");});
			break;
			case "AV2":
			yamaha.setMainInputTo("AV2").done(function(){console.log("HDMI");});
			break;
			case "AV3":
			yamaha.setMainInputTo("AV3").done(function(){console.log("HDMI");});
			break;
			case "AV4":
			yamaha.setMainInputTo("AV4").done(function(){console.log("HDMI");});
			break;
			case "AV5":
			yamaha.setMainInputTo("AV5").done(function(){console.log("HDMI");});
			break;
			default:
			}
	}
	function IsJsonString(str) {
		try {
			JSON.parse(str);
		} catch (err) {
			return false;
		}
		return true;
	}	

	function YamahaNode(config){
		RED.nodes.createNode(this,config);
        var node = this;
	    this.on('input', function(msg) {
			var YamahaAPI = require("yamaha-nodejs");
			var yamaha = new YamahaAPI(config.server);
	
			if(IsJsonString(msg.payload)){
				try{
				var json = JSON.parse(msg.payload);
				if(json != null){
					if(json.hasOwnProperty('status') && json.hasOwnProperty('deviceid')){
						if(json.deviceid == "yamaha"){
							if(json.status == "on"){
								yamaha.powerOn().done(function(){console.log("on");});
							}else if(json.status == "off"){
							yamaha.powerOff().done(function(){console.log("off");});
							}
						}
					}
					if(json.hasOwnProperty('source')){
						yamaha.setMainInputTo(json.source).done(function(){console.log(json.source);});
					}
					if(json.hasOwnProperty('volume')){
						if(isNumber(msg.payload)){
							yamaha.setVolumeTo(msg.payload);
						}
					}
				}
			}
			catch(err){
			console.log(err);
			}
			}
		});    
	}

    RED.nodes.registerType("yamaha",YamahaNode);
}


