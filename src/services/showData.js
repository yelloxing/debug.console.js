import { isString, isFunction, isUndefined, isNull, isNumber, isBoolean } from '@hai2007/tool/type';
import $$ from 'image2d';

let doit = (target, obj) => {

    $$("span", target).bind('click', () => {

        // 如果没有加载过
        if (target.getAttribute('hadload') != 'yes') {

            target.setAttribute('hadload', 'yes');
            target.setAttribute('isopen', 'yes');

            let template = "<ol>";
            for (let key in obj) {
                template += `<li><span>${key}:${obj[key]}</span></li>`;
            }
            template += "</ol>";
            $$(template).appendTo(target);

            // 添加交互
            let index = 0, lis = $$('li', target);
            for (let key in obj) {
                doit(lis[index++], obj[key]);
            }
        }

        // 如果加载过了，直接控制打开或者关闭即可
        else {
            if (target.getAttribute('isopen') == 'no') target.setAttribute('isopen', 'yes');
            else target.setAttribute('isopen', 'no');
        }

    });

};

export default function (target, ol, data) {
    ol.setAttribute('class', 'showobject');

    for (let i = 0; i < data.length; i++) {

        let li = target.$document.createElement('li');

        // 如果是字符串、函数、数字等
        if (isString(data[i]) || isFunction(data[i]) || isNumber(data[i]) || isBoolean(data[i])) {
            li.innerText = data[i];
        }

        else if (isUndefined(data[i])) li.innerText = 'undefined';
        else if (isNull(data[i])) li.innerText = 'null';

        else {

            // 默认作为对象显示
            li.setAttribute('hadload', 'no');
            li.setAttribute('isopen', 'no');
            li.innerHTML = `<span>${data[i]}</span>`;
            doit(li, data[i]);

        }

        ol.appendChild(li);
    }

};