//DB 모델링 파일
var mongoose = require('mongoose');

//이렇게 해놓고 날려주면 테이블?이 자동으로 생성된다
var contactSchema = mongoose.Schema({
    name: {
        type:String,
        requried: true
    },  //name에 대한 속성을 정의. 주고자 하는 속성이 2개 이상일 때 중괄호로 묶어서 표시
    email: {
        type:String,
        required: true
    },
    gender:String,
    phone:String,
    create_date: {
        type:Date,
        default: Date.now   //현재 시간
    }
}); //이런 옵션을 가진 모델을 만든다.


var Contact = module.exports = mongoose.model('contact', contactSchema);   //모델링 완료. 아직 서버에 연결시키지는 않음
//contactModel -> contactController -> Router -> App.js



//함수를 빼내는 방법
module.exports.get = (callback, limit) => { //정의한 함수. 원래 있던 함수 아님
    Contact.find(callback).limit(limit);
}