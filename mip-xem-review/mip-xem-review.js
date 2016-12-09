/**
* @file 自用获取随机评论组件
* @author mip-support@hzxem.com
* @version 1.0.0
* @copyright 2016 hzxem.com, Inc. All Rights Reserved
*/

define(function (require) {
    var jq = require('jquery');
    var customElement = require('customElement').create();
    customElement.prototype.build = function () {
        var elem = this.element;
        var yid = elem.getAttribute('yid');
        var formhash = elem.getAttribute('formhash');
        var url = elem.getAttribute('url');
        var jqelem = jq(elem);
        function getreview() {
            jq.post(url, {
                yid: yid,
                listofreadcid: elem.getAttribute('listofreadcid'),
                formhash: formhash,
                reviewsubmit: true
            },
            function (data, status) {
                if (data) {
                    jqelem.html(function () {
                        var thiscid = ',' + data.tid;
                        var readcid = elem.getAttribute('listofreadcid');
                        jqelem.data('listofreadcid', readcid + thiscid);
                        return data.message;
                    });
                }
            },
            'json');
        }
        jq(document).ready(function () {
            getreview();
        });
        jq('.nextreview').on('click', function () {
            getreview();
        });
    };
    return customElement;
});
