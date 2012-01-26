/**
 *
 * @author  Bryan Grohman
 * @see https://github.com/bgrohman/tincan.js for details.
 */
(function(globals) {

    var subscribers = [];

    /**
     * Publishes a message.
     * @param msg the message to publish
     */
    function publish(msg) {
        // TODO: arg support...
        var toBeNotified = subscribers[msg],
            subscriber,
            context,
            i,
            len;
        
        for (i = 0, len = toBeNotified.length; i < len; i++) {
            toBeNotified[i].callback.apply(toBeNotified[i].context);
        }
    }

    /**
     * Subscribe to a message.
     * @param msg the message to subscribe to
     * @param callback a handler function for this message
     * @param optional context for the callback
     * @return true if the subscription was successfull
     */
    function subscribe(msg, callback, context) {
        if (typeof callback === 'function') {
            var subscriber = {
                callback: callback,
                context: context || null
            };

            if (typeof subscribers[msg] === 'undefined') {
                subscribers[msg] = [];
            }

            subscribers[msg].push(subscriber);

            return true;
        }

        return false;
    }

    globals.tincan = {
        publish: publish,
        subscribe: subscribe
    };

})(window);
