var router = require('express').Router();
//var router = require('express')() 도 route 가능???
var contactController = require('../utils/contactController');

//default api response

router.get('/', (req, res) => {
    res.json({
        status: "API Works!!",
        message: "Welcome to my RESTHUB API world!!"
    });
});

router.route('/contacts')
    .get(contactController.index)    //현재 인자들은 콜백 함수들임(contactController.js 에서 정의한)
    .post(contactController.new);
//***identical to***
// router.post('/contacts', contactController.index);

router.route('/contacts/:contact_id')
    .get(contactController.view)
    .patch(contactController.update)
    .put(contactController.update)
    .delete(contactController.delete);

module.exports = router;