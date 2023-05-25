
const express = require('express');
const router = express.Router();
const apiRouter = require('./api');
const path = require('path');

const { restoreUser } = require('../utils/auth.js')

router.use('/api', apiRouter);
router.use(restoreUser);


console.log('##################################################################################')
const pathToIndex = path.resolve(__dirname, '../../frontend', 'build', 'index.html');

console.log("Serving static files from: ", pathToIndex);

if (process.env.NODE_ENV === 'production') {

    router.get('/', (req, res) => {
        res.cookie('XSRF-TOKEN', req.csrfToken());
        return res.sendFile(
            path.resolve(__dirname, '../../frontend', 'build', 'index.html')
        );
    });


    router.use(express.static(path.resolve("../frontend/build")));

    router.get(/^(?!\/?api).*/, (req, res) => {
        res.cookie('XSRF-TOKEN', req.csrfToken());
        return res.sendFile(
            path.resolve(__dirname, '../../frontend', 'build', 'index.html')
        );
    });
}


module.exports = router;
