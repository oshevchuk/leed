/**
 * Created by Oshevchuk on 27.03.2017.
 */
var user=require('./user');


var vasa=new user.User("vassa");
var peta=new user.User("pera");
vasa.hello(peta);