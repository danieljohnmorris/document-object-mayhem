/**
@name glow
@namespace
@version @VERSION@ (2008-09-22)
@description The glow namespace and core library.

    Includes common methods for running scripts onDomReady and user agent sniffing.
*/
(function() {
	/*
	PrivateVar: moduleRegister
		Holds info on which modules are registered {name:true}
	*/
	var moduleRegister = {glow: true},
		/*
		PrivateVar: regexEscape
			For escaping strings to go in regex
		*/
		regexEscape = /([$^\\\/()|?+*\[\]{}.-])/g,
		/*
		PrivateVar: ua
			A lowercase representation of the user's useragent string
		*/
		ua = navigator.userAgent.toLowerCase(),
		//glow version
		version = "@VERSION@",
		/*
		PrivateMethod: domReadyQueue
			run when dom is ready, becomes a queue of all ready functions.
			This is maintained within the library as Safari sometimes
			runs the ready functions in a different order
		*/
		//we want to set isReady to true when this is first run
		domReadyQueue = function() { glow.isReady = true; },
		glow = {
			/**
			@name glow.VERSION
			@description Version of glow
				This is in the format 1.2.3
			
			@type String
			
			@see <a href="/glow/docs/">Glow's versioning scheme</a>
			*/
			VERSION: version,
			
			/**
			@name glow.UID
			@description A unique ID for this instance of Glow
			
				This will be used in glow-specific property names
				that need to be unique to this instance of glow.
				
			@private
			@type String
			*/
			UID: "glow" + Math.floor(Math.random() * (1<<30)),
			
			/**
			@name glow.isReady
			@description Is the DOM ready?
			
			 	Set to true when the DOM is ready. If the library is included 
			 	after the DOM is loaded, you should manually set this to true.
			
			@type Boolean
			*/
			//check gloader to see if dom is already ready
			isReady: window.gloader && gloader.isReady,
			
			/**
			@name glow.env
			@description Information about the browser / platform
			@type Object
			
			@example
				if (glow.env.ie < 7) {
					//this only runs in IE 6 and below
				}
				if (glow.env.gecko < 1.9) {
					//this only runs in Gecko versions less than 1.9
					//Wikipedia can be used to link engine versions to browser versions
				}
			*/
			/**
			@name glow.env.gecko
			@description Gecko version number to one decimal place (eg 1.9) or NaN
			@type Number
			*/
			/**
			@name glow.env.ie
			@description IE version number or NaN
			@type Number
			*/
			/**
			@name glow.env.opera
			@description Opera version (eg 8.02) or NaN
			@type Number
			*/
			/**
			@name glow.env.webkit
			@description Webkit version number to one decimal place (eg 419.3) or NaN
			@type Number
			*/
			/**
			@name glow.env.khtml
			@description KHTML version number to one decimal place or NaN
			@type Number
			*/
			/**
			@name glow.env.standardsMode 
			@description True if the browser reports itself to be in 'standards mode'
			@type Boolean
			*/
			/**
			@name glow.env.version 
			@description Browser version as a string. Includes non-numerical data, eg "1.8.1" or "7b"
			@type String
			*/
			env: function(){
				var nanArray = [0, NaN],
					opera = (/opera[\s\/]([\w\.]+)/.exec(ua) || nanArray)[1],
					ie = opera ? NaN : (/msie ([\w\.]+)/.exec(ua) || nanArray)[1],
					gecko = (/rv:([\w\.]+).*gecko\//.exec(ua) || nanArray)[1],
					webkit = (/applewebkit\/([\w\.]+)/.exec(ua) || nanArray)[1],
					khtml = (/khtml\/([\w\.]+)/.exec(ua) || nanArray)[1],
					toNum = parseFloat;
	
				return {
					gecko   : toNum(gecko),
					ie      : toNum(ie),
					opera   : toNum(opera),
					webkit  : toNum(webkit),
					khtml   : toNum(khtml),
					version : ie || gecko || webkit || opera || khtml,
					standardsMode : document.compatMode != "BackCompat" && (!ie || ie >= 6)
				}
			}(),
	
			/**
			@name glow.module
			@private
			@function
			@description Registers a new module with the library, checking version numbers &amp; dependencies.
			
			@param {Object} meta
				Object containing all of the following. This object is 
				compatible with gloader.module, hence some properties which seem 
				unnecessary here. This is all simplified by glow's module pattern.
			
			@param {String} meta.name Name of the module.
				Eg. "glow.dom" or "glow.widgets.Panel"
				
			@param {String[]} meta.library Information about Glow.
				This must be ["glow", "@VERSION@"]. @VERSION@ should be
				the version number of glow expected.
				
			@param {String[]} meta.depends The module's dependencies.
				This must start ["glow", "@VERSION@"], followed by modules
				such as "glow.dom". @VERSION@ should be the version number
				of glow expected.
				
			@param {Function} meta.builder The module's implementation.
				A reference to glow will be passed in as the first parameter
				to this function. Add to that object to create publicly
				accessabile properties. Anything else in this function
				will be private.
			
			@returns {Object} Glow
			
			@example
				glow.module({
					name: "glow.anim",
					library: ["glow", "1.0.0"],
					depends: ["glow", "1.0.0", "glow.dom"],
					builder: function(glow) {
						glow.anim = {
							//...
						};
					}
				});
			*/
			module: function(meta) {
				var i = 2,
					depends = meta.depends[0] || [],
					dependsLen = depends.length,
					name = meta.name,
					objRef = window.glow; //holds the parent object for the new module
					
				//check version number match core version
				if (meta.library[1] != glow.VERSION) {
					throw new Error("Cannot register " + name + ": Version mismatch");
				}
				
				//check dependencies loaded
				if (depends[2]) {
					for (; i < dependsLen; i++) {
						//check exists
						if (!moduleRegister[depends[i]]) {
							//check again ondomready to detect if modules are being included in wrong order
							throw new Error("Module " + depends[i] + " required before " + name);
						}
					}
				}
				
				//create module
				meta.builder(glow);
				//register it as built
				moduleRegister[name] = true;
				return glow;
			},
			
			/**
			@name glow.ready
			@function
			@description Calls a function when/if the DOM is ready &amp; the browser is supported
			  
			@param {Function} callback Function to call
			
			@returns {glow} 
			
			@example
				glow.ready(function() {
					alert("DOM Ready!");
				});
			*/
			ready: function(callback) {
				if (glow.isSupported) { this.onDomReady(callback); }
				return this;
			},
			
			/**
			@name glow.onDomReady
			@function
			@description Calls a function when/if the DOM is ready.
			
			  Same as {@link glow.ready} but ignores {@link glow.isSupported}.
			
			@param {Function} callback Function to call
			
			@returns {glow}
			
			@exmaple
				glow.onDomReady(function() {
					alert("DOM Ready!");
				});
			*/
			onDomReady: function(f) {
				//just run function if already ready
				if (this.isReady) {
					f();
				} else {
					var oldLoadFunc = domReadyQueue;
					domReadyQueue = function () {
						oldLoadFunc();
						f();
					};
				}
			},
			
			/**
			@name glow.lang
			@namespace
			@description Useful language functions.
			*/
			lang: {
				/**
				@name glow.lang.trim
				@function
				@description Removes leading and trailing whitespace from a string
				
				@param {String} str String to trim
				
				@returns {String} 
				
					String without leading and trailing whitespace
				
				@example
				 	glow.lang.trim("  Hello World  "); // "Hello World"
				*/
				trim: function(sStr) {
					//this optimisation from http://blog.stevenlevithan.com/archives/faster-trim-javascript
					return sStr.replace(/^\s*((?:[\S\s]*\S)?)\s*$/, '$1');
				},
				
				/**
				@name glow.lang.toArray
				@function
				@description Converts an array-like object to a real array
				
				@param {Object} arrayLike Any array-like object
				
				@returns {Array}
				
				@example
				 	var a = glow.lang.toArray(glow.dom.get("a"));
				*/
				toArray: function(aArrayLike) {
					if (aArrayLike.constructor == Array) {
						return aArrayLike;
					}
					//use array.slice if not IE? Could be faster
					var r = [], i=0, len = aArrayLike.length;
					for (; i < len; i++) {
						r[i] = aArrayLike[i];
					}
					return r;
				},
				
				/**
				@name glow.lang.apply
				@function
				@description Copies properties from one object to another
				
				@param {Object} destination Destination object
				
				@param {Object} source Properties of this object will be copied onto a clone of destination
				
				@returns {Object}
				
				@example
					var obj = glow.lang.apply({foo: "hello", bar: "world"}, {bar: "everyone"});
					//results in {foo: "hello", bar: "everyone"}
				*/			
				apply: function(destination, source) {
					for (var i in source) {
						destination[i] = source[i];
					}
					return destination;
				},
				
				/**
				@name glow.lang.map
				@function
				@description Runs a function for each element of an array and returns an array of the results
				
				@param {Array} array Array to loop over
				@param {Function} callback The function to run on each element
				@param {Object} [context] The context for the callback function (the array is used if not specified)
				
				@returns {Array} 
				
					Array containing one element for each value returned from the callback
				
				@example
					var days = glow.lang.map([1, 3, 5], function (pos) {
				 		return 'mtwtfss'.charAt(pos - 1);
	  				});	 	
				*/
				map: function (arr, callback, context) {
					if (Array.prototype.map) { return Array.prototype.map.call(arr, callback, context || arr); }
					if (! callback.call) { throw new TypeError(); }
					
					var len = arr.length,
						res = [],
						thisp = context || arr,
						i = 0;
					
					for (; i < len; i++) {
						if (i in arr) {
							res[i] = callback.call(thisp, arr[i], i, arr);
						}
					}
					return res;				
				},
	
				/**
				@name glow.lang.replace
				@function
				@description Makes a replacement in a string.
				
					Has the same interface as the builtin 
					String.prototype.replace method, but takes the input
					string as the first parameter. In general the native string
					method should be used unless you need to pass a function as the
					second parameter, as this method will work accross our
					supported browsers.
				
				@param {String} str Input string
				
				@param {String | RegExp} pattern String or regular expression to match against
				
				@param {String | Function} replacement String to make replacements with, or a function to generate the replacements
				
				@returns {String}
					A new string with the replacement(s) made
				
				@example
					var myDays = '1 3 6';
					var dayNames = glow.lang.replace(myDays, /(\d)/, function (day) {
						return " MTWTFSS".charAt(day - 1);
					});
					// dayNames now contains "M W S"
				*/
				replace: (function () {
					var replaceBroken = "g".replace(/g/, function () { return 'l'; }) != 'l',
						def = String.prototype.replace;
					return function (inputString, re, replaceWith) {
						var pos, match, last, buf;
						if (! replaceBroken || typeof(replaceWith) != 'function') {
							return def.call(inputString, re, replaceWith);
						}
						if (! (re instanceof RegExp)) {
							pos = inputString.indexOf(re);
							return pos == -1 ?
								inputString :
								def.call(inputString, re, replaceWith.call(null, re, pos, inputString));
						}
						buf = [];
						last = re.lastIndex = 0;
						while ((match = re.exec(inputString)) != null) {
							pos = match.index;
							buf[buf.length] = inputString.slice(last, pos);
							buf[buf.length] = replaceWith.apply(null, match);
							if (re.global) {
								last = re.lastIndex;
							} else {
								last = pos + match[0].length;
								break;
							}			
						}
						buf[buf.length] = inputString.slice(last);
						return buf.join("");
					};
				})(),
	
				/**
				@name glow.lang.interpolate
				@function
				@description Replaces placeholders in a string with data from an object
				
				@param {String} template The string containing {placeholders}
				
				@param {Object} data Object where the key is the placeholder name
				
				@returns {String}
				
				@example
					var data = {name: "Domino", colours: "black & white"};
					var template = "My cat's name is {name}. His colours are {colours}";
					var result = glow.lang.interpolate(template, data);
					//result == "My cat's name is Domino. His colours are black & white"
				*/
				interpolate: function(template, data) {
					var r = template, i;
					for (i in data) {
						r = r.replace(new RegExp("\\{" + i.replace(regexEscape, "\\$1") + "\\}", "g"), data[i]);
					}
					return r;
				},
				/**
				@name glow.lang.hasOwnProperty
				@function
				@description Cross-browser implementation
				  
				  Safari 1.3 doesn't support
				  <a href="http://developer.mozilla.org/en/docs/Core_JavaScript_1.5_Reference:Global_Objects:Object:hasOwnProperty">
				    Object.hasOwnProperty
				  </a>, use this method instead.
				
				@param {Object} obj The object to check
				
				@param {String} property Property name
				
				@returns {Boolean}
				
					Returns false if a property doesn't exist in an object, or it
					was inherited from the object's prototype. Otherwise, returns
					true
				*/
				hasOwnProperty: {}.hasOwnProperty ? //not supported in Safari 1.3
					function(obj, prop) {
						return obj.hasOwnProperty(prop);
					} :
					function(obj, prop) {
						var propVal = obj[prop], //value of the property
							objProto = obj.__proto__, //prototype of obj
							protoVal = objProto ? objProto[prop] : {}; //prototype val
						if (propVal !== protoVal) {
							return true;
						}
						//try changing prototype and see if obj reacts
						var restoreProtoVal = glow.lang.hasOwnProperty(objProto, prop),
							tempObjProtoVal = objProto[prop] = {},
							hasOwn = (obj[prop] !== tempObjProtoVal);
						
						delete objProto[prop];
						if (restoreProtoVal) {
							objProto[name] = tempObjProtoVal;
						}
						return hasOwn;
					},
				
				/**
				@name glow.lang.extend
				@function
				@description Copies the prototype of one object to another.
				
					The 'subclass' can also access the 'base class' via subclass.base
				
				@param {Function} sub Class which inherits properties.
				
				@param {Function} base Class to inherit from.
				
				@param {Object} additionalProperties An object of properties and methods to add to the subclass.
				
				@example
					function MyClass(arg) {
						this.prop = arg;
					}
					MyClass.prototype = {
						showProp: function() { alert(this.prop); }
					};
					function MyOtherClass(arg) {
						//call the base class's constructor
						arguments.callee.base.apply(this, arguments);
					}
					glow.lang.extend(MyOtherClass, MyClass, {
						setProp: function(newProp) { this.prop = newProp; }
					});
					
					var test = new MyOtherClass("hello");
					test.showProp(); // alerts "hello"
					test.setProp("world");
					test.showProp(); // alerts "world"
				 * 
				 */
				extend: function(sub, base, additionalProperties) {
					var f = function () {}, p;
					f.prototype = base.prototype;
					p = new f();
					sub.prototype = p;
					p.constructor = sub;
					sub.base = base;
					if (additionalProperties) {
						glow.lang.apply(sub.prototype, additionalProperties);
					}
				},
				
				/**
				@name glow.lang.clone
				@function
				@description Deep clones an object / array
				
				@param {Object} Data Object to clone
				
				@returns {Object}
				
				@example
					var firstObj = { name: "Bob", secondNames: ["is","your","uncle"] };
					var clonedObj = glow.lang.clone( firstObj );
				*/
				clone: function( obj ) {
					var index, _index, tmp;
					obj = obj.valueOf();
					if ( typeof obj !== 'object' ) {
						return obj;
					} else {
						if ( obj[0] || obj.concat ) {
							tmp = [ ];
							index = obj.length;
							while(index--) {
								tmp[index] = arguments.callee( obj[index] );
							}
					} else {
							tmp = { };
							for ( index in obj ) {
								tmp[index] = arguments.callee( obj[index] );
							}
						}
					return tmp;
					}
					
				}
			}
		},
		env = glow.env,
		d = document;
	
	//dom ready stuff
	//run queued ready functions when DOM is ready
	(function(){
		//don't do this stuff if the dom is already ready
		if (glow.isReady) { return; }
		if (env.ie) {
			if (typeof window.frameElement != 'undefined') {
				// we can't use doScroll if we're in an iframe...
				d.attachEvent("onreadystatechange", function(){
					if (d.readyState == "complete") {
						d.detachEvent("onreadystatechange", arguments.callee);
						domReadyQueue();
					}
				});
			} else {
				// polling for no errors
				(function () {
					try {
						// throws errors until after ondocumentready
						d.documentElement.doScroll('left');
					} catch (e) {
						setTimeout(arguments.callee, 0);
						return;
					}
					// no errors, fire
					domReadyQueue();
				})();
			}
		} else if (glow.env.webkit < 525.13 && typeof d.readyState != 'undefined') {
			var f = function(){ /loaded|complete/.test(d.readyState) ? domReadyQueue() : setTimeout(f, 0); };
			f();
		} else {
			var callback = function () {
				if (arguments.callee.fired) { return; }
				arguments.callee.fired = true;
				domReadyQueue();
			};
			d.addEventListener("DOMContentLoaded", callback, false);
			var oldOnload = window.onload;
			window.onload = function () {
				if (oldOnload) { oldOnload(); }
				callback();
			};
		}
	})();
	
	/**
	@name glow.isSupported
	@description Set to true in supported user agents
		This will read false in 'level 2' browsers in BBC's Browser Support Guidelines
	@type Boolean
	
	@see <a href="http://www.bbc.co.uk/guidelines/newmedia/technical/browser_support.shtml">BBC's Browser Support Guidelines</a>
	*/
	glow.isSupported = !(
		//here are the browsers we don't support
		env.ie < 6 ||
		(env.gecko < 1.9 && !/^1\.8\.1/.test(env.version)) ||
		env.opera < 9 ||
		env.webkit < 412
	);
	
	if ($USEGLOADER$) {
		gloader.library({
			name: "glow",
			version: "@VERSION@",
			builder: function () {
				return glow;
			}
		});
	} else if (window.glow) {
		throw new Error("Glow global object already exists");
	} else {
		window.glow = glow;
	}
	
	// this helps IE cache background images
	if (glow.ie) {
		try {
			document.execCommand("BackgroundImageCache", false, true);
		} catch(e) {}
	}
})();
