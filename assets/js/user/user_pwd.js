$(function() {
    var layer = layui.layer
    var form = layui.form
    // 为密码框定义验证规则
    form.verify({
        pass: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ],

        // 新旧密码不能相同
         samePwd: function(value) {
            if($('[name=oldPwd]').val() === value) {
                return '新旧密码不能一致'
            }
         },
         rePwd: function(value) {
            if(value !== $('[name=newPwd]').val()) {
                return '两次密码不一致'
            }
         }

        })

        // 定义表单提交事件
        $('.layui-form').on('submit', function(e) {
            // 阻止表单的默认提交行为
            e.preventDefault()
            // 发起修改密码的ajax请求
            $.ajax({
                method: 'post',
                url: '/my/updatepwd',
                data: $(this).serialize(),
                success: function(res) {
                    if(res.status !== 0) {
                        return layer.msg('数据更新失败')
                    }
                    layer.msg('密码修改成功')
                    // 重置表单
                    $('.layui-form')[0].reset()
                }
            })
        })


})