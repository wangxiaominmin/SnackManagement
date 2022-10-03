$.ajaxPrefilter(function(options) {
    // 在真正发起ajax前，拼接统一的根路径
    options.url = 'http://api-breakingnews-web.itheima.net' +options.url
})