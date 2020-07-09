const namespaces = {}
const listeners = {}
const default_ns = '__default'

const EventDispatcher = {
	background: (event_name, obj, ns = null) => {
        ns = ns !== null ? ns : default_ns
        EventDispatcher.dispatch(event_name, obj, ns, false)
    },
    broadcast: (event_name, obj, ns = null) => {
        ns = ns !== null ? ns : default_ns
        EventDispatcher.dispatch(event_name, obj, ns, true)
    },
	dispatch: (event_name, obj, ns = null, log_event) => {
        ns = ns !== null ? ns : default_ns
		event_name = arguments.length>=1 ? arguments[0]:undefined
		obj = arguments.length>=2 ? arguments[1]:undefined
        log_event = arguments.length>=3 ? arguments[2]:false

        if (log_event) {
        	console.log('onEVENT: ' + event_name)
        	if (typeof(obj)!='undefined') {
        		console.log(obj)
        	}
        }

		if (
            EventDispatcher.namespaces[ns] !== undefined && EventDispatcher.namespaces &&
            EventDispatcher.listeners[ns] !== undefined &&
            EventDispatcher.listeners[ns][event_name] !== undefined
        ) {
			let l = EventDispatcher.listeners[ns][event_name].length
			for(let i=0; i<l; i++) {
				//if event handler registered
				if (EventDispatcher.listeners[ns][event_name][i] !== undefined) {
					let listener = EventDispatcher.listeners[ns][event_name][i]
					try {
						if (typeof(listener)=='function') {
							listener.call(obj)
	                    } else if (typeof(listener)=='object') {
	                        if (typeof(listener.obj)=='object' && typeof(listener.func)=='function') {
	                            if (typeof(listener.args)=='undefined') {
		                        	listener.func.call(listener.obj, obj)
		                        } else {
		                        	listener.func.apply(listener.obj, [obj, listener.args])
		                        }
	                        }
	                    }
					} catch (e) {
					    console.log('EVENT DISPATCHER ERROR[' + event_name + ']')
					    console.log(e)
					}
				}
			}
		}
	},
	// event_handler [string]: functionName, OBJECT.functionName, expression
	register: (event_name, event_handler, ns = null) => {
        ns = ns !== null ? ns : default_ns
        if (EventDispatcher.namespaces[ns] === undefined) {
            // activate by namespace by default
            EventDispatcher.namespaces[ns] = true 
            EventDispatcher.listeners[ns] = {}
		}
		if (EventDispatcher.listeners[ns][event_name] === undefined) {
			EventDispatcher.listeners[ns][event_name] = new Array()
		}
		// add expression or function to listenners
		EventDispatcher.listeners[ns][event_name].push(event_handler)
	},
	// event_handler [string]: functionName, OBJECT.functionName, expression
	unregister: (event_name, event_handler, ns = null) => {
        ns = ns !== null ? ns : default_ns
		if (EventDispatcher.listeners[ns][event_name] !== undefined) {
			if (event_handler !== undefined) {
				let found  = false
				let h_func = typeof(event_handler)=='function' ? event_handler:event_handler.func
				let l = EventDispatcher.listeners[ns][event_name].length
				let i = 0
				while (i<l && !found) {
                    let l_func = typeof(EventDispatcher.listeners[event_name][i])=='function' ?
                        EventDispatcher.listeners[ns][event_name][i] :
                        EventDispatcher.listeners[ns][event_name][i].func
					if (l_func.toString() === h_func.toString()) {
						EventDispatcher.listeners[ns][event_name][i] = undefined
						found = true
					} else {
						console.log(l_func.toString() + ' === ' + h_func.toString())
					}

					i++
				}
			} else {
				// unregister all event handlers
				EventDispatcher.listeners[ns][event_name] = new Array()
			}
		}
	}
}