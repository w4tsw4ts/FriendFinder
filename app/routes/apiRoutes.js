// 4. Your `apiRoutes.js` file should contain two routes:

//    * A GET route with the url `/api/friends`. This will be used to display a JSON of all possible friends.
//    * A POST routes `/api/friends`. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic. 

// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var friends = require("../data/friends.js");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/friends... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  // Displays all friends
app.get("/api/friends", function(req, res) {
    return res.json(friends);
  });

// Create New friend - takes in JSON input
app.post("/api/friends", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body-parser middleware
    
    var newFriend = req.body;
    // Uncomment to debug
    console.log(`newFriend = ${JSON.stringify(newFriend)}`);
    
    var newFriendScore = newFriend.scores;
    // Uncomment to debug
    console.log(`newFriendScore = ${newFriendScore}`);

    // Determine best match friend.
    var friendName ='';
    var friendPicture ='';
    var differenceScore = 10000;

    // Loop through friends.
    for (let i = 0; i < friends.length; i++) {
        // Uncomment to debug
        console.log(`friend = ${JSON.stringify(friends[i])}`);

         var diff = 0;
        for (let j = 0; j < newFriendScore.length; j++) {
            diff += Math.abs(friends[i].scores[j] - newFriendScore[j]);
        }
        // Uncomment to debug
        console.log('diff = ' + diff);

        // If lowest difference, record the friend match
        if (diff < differenceScore) {
            // Uncomment to debug
            console.log('Closest match found = ' + diff);
            console.log('Friend name = ' + friends[i].name);
            console.log('Friend image = ' + friends[i].photo);

            differenceScore = diff;
            friendName = friends[i].name;
            friendPicture = friends[i].photo;
        }
    }

    console.log(`My new friend is ${newFriend}`);
  
    // Add new friend.
    friends.push(newFriend);

    // Send successful response
    res.json({status: 'OK', friendName: friendName, friendPicture: friendPicture});
  });
};