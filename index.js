const mongoose = require('mongoose')
const express    = require('express');        // call express
const app        = express();                 // define our app using express
const bodyParser = require('body-parser');
const RBAC = require('easy-rbac');

const ACL = require('./ACLService')

const User = require('./models/user.model')
const Voucher = require('./models/voucher.model')
const UserProfile = require('./models/userProfile.model')

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
const router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port, () => console.log(`Server listening to ${port}`))

ACL
// ==================================================================================
const opts= {
    user: { // Role name
      can: [ // list of allowed operations
        'voucher', 
        'userProfile:add', 
        { 
            name: 'userProfile:save',
            when: async (params) => params.userId === params.ownerId
        },
        'users:get',
        {
          name: 'users:*',
          when: async (params) => params.id === params.userId
        }
      ]
    },
    manager: {
      can: ['user:save', 'user:delete', 'userProfile:*']
    },
    admin: {
      can: ['rule the server']
    }
}
const rbac = new RBAC(opts);

router.route('/users')

    // get a user (accessed at POST http://localhost:8080/api/users)
    .get(function(req, res) {
        rbac.can('user', 'users:get')
        .then(result => {
            if (result) {
                User.find({}, function(err, users) {
                    if (err)
                        res.send(err);
                    else 
                        res.json({ message: `${users.length} users found` });
                });
            } else {
                console.log('not allowed');
            }
        })
        .catch(err => {
            // something else went wrong - refer to err object
        });
    });

mongoose.connect("mongodb://127.0.0.1:27017/acltest", (error, db) => {
    if (error) {
        throw error
    }
    console.log('Connected to db')
})