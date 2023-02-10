const events = require('../../lib/common/events');

const listen = async () => {
    // this can be changed to an array of events as different real time
    // events are added. Then they can be iterated through to add each listener

    const event = 'comment.added';

    const io = require('socket.io')({cors: {
        origin: 'http://localhost:2368',
        methods: ['GET', 'POST']
    }});

    io.on('connection', () => {
        const realTimeCommentTrigger = (model, options) => {
            if (options && options.importing) {
                return;
            }
            io.emit(event, model.attributes.post_id);
        };

        if (events.hasRegisteredListener(event, 'realTimeCommentTrigger')) {
            return;
        }

        events.on(event, realTimeCommentTrigger);
    });

    io.listen(7123);
};

module.exports = listen;