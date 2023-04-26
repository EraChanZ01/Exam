/* global use, db */
// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use('shm-chat');

// Search for documents in the current collection.
db.getCollection('messages')
    .aggregate([
        {
            $match: {
                body: { $regex: "паровоз" }
            }
        },
        {
            $count: "quantity"
        }
    ])
