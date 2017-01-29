// first make sure name isn't already used
if (eventHub) {alert("Name collision: eventHub");}

/*
 * by Joe Hocking www.newarteest.com
 * this object is used to broadcast events to registered listeners
 * it operates through 3 functions: addListener, removeListener, and broadcast
 * in the code below, each function is preceded by it's explanation
 */
var eventHub = new function() {
	
	// declare private variables; only functions can be accessed from outside code
	var listeners = {}; // object in which to store arrays of event listeners
	
	/*
	 * add callback to the array of listeners for that event
	 * params: (String event, Function callback, Object obj)
	 * third param is optional; it's for functions that use 'this' keyword
	 * eg. eventHub.addListener("TEST_EVENT", this.testCallback, this);
	 * without a different object set, 'this' will default to eventHub itself
	 */
	this.addListener = function(event, callback, obj) {
		if (typeof callback != "function") {
			alert("Callback not a function: " + event);
		}
		
		// create array if event isn't already registered
		if (event in listeners == false) {
			listeners[event] = [];
		}
		
		listeners[event].push([callback, obj]);
	}
	
	/*
	 * remove callback from the array of listeners for that event:
	 * find the matching element in the array of listeners and splice that out
	 * params: (String event, Function callback)
	 */
	this.removeListener = function(event, callback) {
		if (event in listeners == false) {return;}	// quit early
		
		var list = listeners[event];
		var len = list.length;
		var tmp = list.slice(0); // create a temporary copy to splice from
		
		for (var i =0; i < len; i++) {
			if (list[i][0] == callback) {
				tmp.splice(i, 1);
			}
		}
		
		listeners[event] = tmp; // swap in temporary copy
	}
	
	/*
	 * broadcast event to all listeners for that event
	 * optional data sent to callback functions
	 */
	this.broadcast = function(event, data) {
		if (listeners[event] == null) {return;} // no listeners
		
		var list = listeners[event];
		var len = list.length;
		for (var i = 0; i < len; i++) {
			var callback = list[i][0];
			var obj = list[i][1];
			if (obj == undefined) {
				callback(data);
			} else {
				callback.call(obj, data); // explicitly set 'this'
			}
		}
	}
	
}

/*
 * as a best practice, I recommend defining the event strings
 * with a series of variables to reuse, something like:
 * var events = {};
 * events.DATA_UPDATED = "DATA_UPDATED";
 * then write eventHub.addListener(events.DATA_UPDATED, callback);
*/
