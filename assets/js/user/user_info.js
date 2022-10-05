$(function() {
    var layer = layui.layer;
    var form = layui.form;
   
    initInfo()
    // 获取用户信息
    function initInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            
            success: function(res) {
                if(res.status !== 0) {
                    return layer.msg('获取用户信息失败')
                } 
                // 给表单快速赋值
                form.val("formUserInfo", res.data)
            }
        })
    }

    // 实现表单的重置效果
    $('#btnReset').on('click', function(e) {
        // 阻止表单的默认重置行为
        e.preventDefault()
        $('.layui-form')[0].reset()
        initInfo()
    })

    // 监听表单的提交事件
    $('.layui-form').on('submit', function(e) {
        // 阻止表单的默认提交行为
        e.preventDefault()
        // 更新用户的基本信息
        // 1.快速获取表单中填入的信息
        var data = $(this).serialize()
        console.log(data);
        // 
        $.ajax({
            method: 'post',
            url: '/my/userinfo',
            data: data,
            success: function(res) {
                if(res.status !== 0) {
                    return layer.msg('数据更新失败')
                }

                layer.msg('数据更新成功')
                // 调用父页面中的方法，重新渲染用户的头像和用户的信息
                window.parent.getUserInfo()
            }
        })

    })
})