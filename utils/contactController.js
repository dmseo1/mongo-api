var Contact = require('./contactModel');

exports.index = (_req, res) => {    //
    Contact.get((err, contacts) => {
        if(err) {
            //에러 메시지를 json 형태로 날림.
            printError(res);
        } else {
            res.json({
                status : "success",
                message : "Contacts are retrieved successfully",
                data : contacts
            });  
        }
    });
}

exports.new = (req, res) => {
    var contact = new Contact();
    contact.name = req.body.name ? req.body.name : contact.name;
    contact.email = req.body.email ? req.body.email : contact.email;
    contact.gender = req.body.gender;
    contact.phone = req.body.phone;

    //save 메서드 사용해서 저장 및 에러 체크
    contact.save((err) => { //저장되었는지 확인
        if(err) {
            printError(res, err);
        } else {
            res.json({
                status : "success",
                message : "New contact is created successfully",
                data: contact
            });
        }
    });
}

exports.view = (req, res) => {
    Contact.findById(req.params.contact_id, (err, result) => {
        if(!err) {
            res.json({
                status : "success",
                message : "Data is fetched successfully",
                data : result
            });
        } else {
            printError(res, err);
        }
    });
}

exports.update = (req, res) => {
    Contact.findById(req.params.contact_id, (err, result) => {
        if(!err) {
            result.name = req.body.name ? req.body.name : result.name;
            result.email = req.body.email ? req.body.email : result.email;
            result.gender = req.body.gender ? req.body.gender : result.gender;
            result.phone = req.body.phone ? req.body.phone : result.phone;
            result.save((err) => { //저장되었는지 확인
                if(err) {
                    printError(res, err);
                } else {
                    res.json({
                        status : "success",
                        message : "Contact is modified successfully",
                        data: result
                    });
                }
            });
        } else {
            printError(res, err);
        }
    });
}

exports.delete = (req, res) => {
    Contact.remove({
        _id: req.params.contact_id  
    }, (err, result) => {
        if(!err) {
            res.json({
                status: "success",
                message : "Contact is deleted successfully",
            });
        } else {
            printError(res, err);
        }
    })
}

printError = (res, err) => {
    res.json({
        status : "error",
        message : "Something went wrong. Please try again.",
        data : err
    });
}