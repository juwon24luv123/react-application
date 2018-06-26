const passport = require('passport');


module.exports = (app) => {
    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email']
    })
    );
    
    app.get('/auth/google/callback', passport.authenticate('google'));

    //req reprent income request while res rep out going response
    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
        // res.send(req.session);
    });

    app.get('/api/logout', (req, res) => {
        req.logout();
        res.send(req.user);
    });
};
