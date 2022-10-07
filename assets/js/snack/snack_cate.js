$(function() {
    var layer = layui.layer
    var form = layui.form
    initArtCateList()
    // 获取零食分类的列表
    function initArtCateList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                if(res.status !== 0) {
                    return layer.msg('获取数据失败')
                  
                }
                // console.log(res)
                // 3.传入数据
                var htmlStr = template('tpl_table', res)
                // 5.放入tbody中
                $('tbody').html(htmlStr)

            }
        })
    }

    // 实现添加的功能
    var index = null;
    $('#btnAddCate').on('click', function() {
        index = layer.open({
            type: 1, 
            area: ['500px', '250px'],
            title: '添加零食分类',
            content: $('#dialog_add').html() //这里content是一个普通的String
          })

       
    })

     // 增加：通过代理方式绑定表单的提交事件
     $('body').on('submit', '#form-add', function(e) {
        // 阻止表单的默认提交行为
        e.preventDefault()
        // 快速获取表单的内容
        var data = $(this).serialize()
        $.ajax({
            method: 'post',
            url: '/my/article/addcates',
            data: data,
            success: function(res) {
                if(res.status !== 0) {
                    return layer.msg('添加失败')
                }
                layer.msg('添加成功')
                layer.close(index)
            }
        })

        initArtCateList()
    })

    //更新：为修改按钮绑定点击事件
    var index = null
    $('tbody').on('click', '#btn-edit', function() {
        index = layer.open({
            type: 1, 
            area: ['500px', '250px'],
            title: '修改零食分类',
            content: $('#dialog-edit').html() //这里content是一个普通的String
          })

          var id = $(this).attr('data-id')
        //   根据id获得对应的数据，并把它填入到弹出层中
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function(res) {
                if(res.status!==0) {
                    return layer.msg('获取数据失败')
                }
                // 将获取到的数据快速填入表单中去
                form.val('form-edit', res.data)
            }
        })
        
    })

    // 通过代理的形式，绑定修改表单的提交事件
    $('body').on('submit', '#form-edit', function(e) {
        // 阻止表单的默认提交行为
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            // 通过id快速获取表单中的数据
            success: function(res) {
                if(res.status !== 0) {
                    return layer.msg('更新分类数据失败')
                }
                layer.msg('更新分类数据成功')
                layer.close(index)
                initArtCateList()
            }
            
        })
    })

    // 删除：为删除按钮绑定点击事件
    $('body').on('click', '#btn-del', function() {
         // 通过id删除零食分类
         var id = $(this).attr('data-id')
        // 提示用户是否删除
        layer.confirm('是否删除', {icon: 3, title:'提示'}, function(index){
            //do something
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function(res) {
                   if(res.status!== 0) {
                    return layer.msg('删除零食分类失败')
                   }
                   layer.msg('删除零食分类成功')
                   layer.close(index);
                   initArtCateList()
                } 
            })
          });
    })


    

})