var form = layui.form
var layer = layui.layer
// 实现表单的按需切换
$(function() {
    $('#link_reg').on('click', function() {
        $('.login_box').hide()
        $('.reg_box').show()
    })

    $('#link_login').on('click', function() {
        $('.login_box').show()
        $('.reg_box').hide()
    })

    // 定义表单验证规则
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ],
        repwd: function(value) {
            var pwd = $('.reg_box [name=password]').val()
            if(pwd !== value) {
                return '两次密码输入不一致'
            }
        } 
    })

    // 发起注册用户的ajax请求
    $('#reg_form').on('submit', function(e) {
        // 阻止表单的默认提交行为
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: $(this).serialize(),
            success: function(res) {
                console.log(res);
                if(res.status!==0) {
                    return layer.msg('注册失败')
                }
                layer.msg('注册成功')
                 // 模拟人的点击行为，跳转到登录页面
                $('#link_login').click()
            }
        })
    })

    // 发起登录用户的ajax请求
    $('#login_form').on('submit', function(e) {
        // 阻止表单的默认提交行为
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function(res) {
                if(res.status !== 0) {
                    return layer.msg('登录失败')
                }
                layer.msg('登录成功')
                // 将token存入到本地
                localStorage.setItem('token', res.token)
           
            }

        })
    })
})