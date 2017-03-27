/**
 * Created by Oshevchuk on 27.03.2017.
 */
var phases=require('./ru.json');

function User(name) {
    this.name=name;
}

User.prototype.hello=function (who) {
    console.log(phases.hello+"hello "+who.name);
}

exports.User=User;