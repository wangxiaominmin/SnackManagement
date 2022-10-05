  var layer = layui.layer;
    getUserInfo()

    // 获取用户信息
    function getUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            
            success: function(res) {
                if(res.status !== 0) {
                    return layer.msg('获取用户信息失败')
                } 

                // 调用渲染用户信息的函数
                renderAvatar(res.data)

            }
        })
    }

    // 渲染用户头像
    function renderAvatar(data) {
        // 渲染用户的名称
        var str = data.nickname || data.username 
        $('#welcome').html('欢迎&nbsp;&nbsp;' +str)
        var first = str[0].toUpperCase()
        $('.text-avatar').html(first)

        if(data.user_pic === null) {
            $('.layui-nav-img').hide()
        }else {
            $('.layui-nav-img').attr('src', data.user_pic)
            $('.text-avatar').hide()

        }
    }

    // 实现退出功能
    $('#btnLogout').on('click', function() {
        // 弹出对话框，确定是否退出
        layer.confirm('确定退出?', {icon: 3, title:'提示'}, function(index){
            //do something
            // 清空本地存储
            localStorage.removeItem('token')
            // 退回登录界面
            location.href = 'login.html'
            layer.close(index);
          });
    })