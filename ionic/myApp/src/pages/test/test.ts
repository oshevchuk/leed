import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

import {AlertController} from 'ionic-angular';

@Component({
    selector: 'page-test',
    templateUrl: 'test.html'
})
export class TestPage {
    testCheckboxOpen: boolean;
    testCheckboxResult;
    
    constructor(public navCtrl:NavController, public alertCtrl:AlertController) {

    }

    showCheckbox(){
        let alert=this.alertCtrl.create();
        alert.setTitle('which plamn');

        alert.addInput({
            type: 'checkbox',
            label: 'alderam',
            value: 'val',
            checked: true
        });
        alert.addInput({
            type: 'checkbox',
            label: 'alderam',
            value: 'val'
        });

        alert.addButton('Cancel');
        alert.addButton({
            text: 'okay',
            handler: data =>{
                console.log('cheked', data);
                this.testCheckboxOpen=false;
                this.testCheckboxResult=data;
            }
        });
        alert.present();
    }

    showAlert() {
        let alert = this.alertCtrl.create({
            title: 'hi ionic',
            message: 'ionic some message',
            inputs: [
                {
                    name: 'title',
                    placeholder: 'titkle'
                }
            ],
            buttons: [
                {
                    text: 'cancel',
                    handler: data =>{
                        console.log('cancel click');
                    }
                },
                {
                    text: 'save',
                    handler: data =>{
                        console.log('saved');
                    }
                }
            ]
        });
        alert.present();
    }

}
