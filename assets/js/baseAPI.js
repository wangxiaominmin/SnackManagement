$.ajaxPrefilter(function(options) {
    // 在真正发起ajax前，拼接统一的根路径
    options.url = 'http://api-breakingnews-web.itheima.net' +options.url
    if(options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
          }
    }

    // 全局统一挂载complete回调函数，无论成功和失败都会执行complete函数
    options.complete = function(res) {
        // console.log(res);
         // 在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
        if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            // 当身份认证失败时，进行如下操作
            // 强制清空token 
            localStorage.removeItem('token')
            // 强制退回登录页面
            location.href = '/login.html'
        }
    }

    }
   
)