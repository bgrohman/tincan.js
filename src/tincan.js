/**
 *
 * @author  Bryan Grohman
 * @see https://github.com/bgrohman/tincan.js for details.
 */
(function(globals) {

    var subscribers = [],
        subscriberId = 1;

    /**
     * Publishes a message.
     * @param msg the message to publish
     */
    function publish(msg) {
        var subscriberId,
            subscriber,
            msgSubscribers = subscribers[msg],
            hasOwnProperty = Object.prototype.hasOwnProperty,
            args = Array.prototype.slice.call(arguments, 1);

        if (msgSubscribers) {
            for (subscriberId in msgSubscribers) {
                if (hasOwnProperty.call(msgSubscribers, subscriberId)) {
                    subscriber = msgSubscribers[subscriberId];
                    subscriber.callback.apply(subscriber.context, args);
                }
            }
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
        if (typeof callback !== 'function') {
            return undefined;
        }

        var subscriber = {
            callback: callback,
            context: context || null
        };

        if (typeof subscribers[msg] === 'undefined') {
            subscribers[msg] = {};
        }

        subscribers[msg][subscriberId] = subscriber;

        return subscriberId++;
    }

    /**
     * Unsubscribe the given subscriber id from the given message.
     * @param msg the message to unsubscribe from
     * @param subscriberId the subscriber id to unsubscribe
     */
    function unsubscribe(msg, subscriberId) {
        if (subscribers[msg]) {
            delete subscribers[msg][subscriberId];
        }
    }

    /**
     * Unsubscibes all subscribers from the given message
     * or unsubscribes all subscribers from all messages
     * if no message is given.
     * @param msg (optional) the message to unsubscribe from
     */
    function unsubscribeAll(msg) {
        if (typeof msg === 'undefined') {
            subscribers = [];
        } else {
            delete subscribers[msg];
        }
    }

    globals.tincan = {
        publish: publish,
        subscribe: subscribe,
        unsubscribe: unsubscribe,
        unsubscribeAll: unsubscribeAll
    };

})(window);
