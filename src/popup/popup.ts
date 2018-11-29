import * as $ from 'jquery';
import backgroundApi from '../shared/api/backgroundScriptApi';
import '../css/app.scss';

const updatePopupView = async () => {

};

const bind = () => {
    const $startBtn = $('.js-start');
    $startBtn.on('click', () => {
        backgroundApi.startTimer(100);
    });
};

$(async () => {
    await updatePopupView();
    bind();
});
