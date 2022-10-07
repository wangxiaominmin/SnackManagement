    $(function() {
        var layer = layui.layer
        var form = layui.form
      
        initCate()
        // 初始化富文本编辑器
        initEditor()
        // 定义加载零食分类的方法
        function initCate() {
          $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
              if (res.status !== 0) {
                return layer.msg('初始化零食分类失败！')
              }
              // 调用模板引擎，渲染分类的下拉菜单
              var htmlStr = template('tpl-cate', res)
              $('[name=cate_id]').html(htmlStr)
              // 一定要记得调用 form.render() 方法
              form.render()
            }
          })
        }

          // 1. 初始化图片裁剪器
            var $image = $('#image')
            
            // 2. 裁剪选项
            var options = {
                aspectRatio: 400 / 280,
                preview: '.img-preview'
            }
            
            // 3. 初始化裁剪区域
            $image.cropper(options)

            // 点击选择封面时，文件选择框被激活
            $('#btnChooseImage').on('click', function() {
                $('#coverFile').click()
            })

            // 监听coverFile的change事件，获取用户选择的文件列表
            $('#coverFile').on('change', function(e) {
                   //1.拿到用户选择的图片
                   var file = e.target.files[0]
                   //2.根据选择的文件，创建一个对应的 URL 地址：
                  var newImgURL = URL.createObjectURL(file)
                   //3.先`销毁`旧的裁剪区域，再`重新设置图片路径`，之后再`创建新的裁剪区域`
                  $image
                  .cropper('destroy')      // 销毁旧的裁剪区域
                  .attr('src', newImgURL)  // 重新设置图片路径
                  .cropper(options)        // 重新初始化裁剪区域
            })

            // 定义零食的发布状态
            var art_state = '已发布'
            $('#btnSave2').on('click', function() {
                art_state = '草稿'
            })

            // 为表单绑定提交事件
            $('#form-pub').on('submit', function(e) {
                e.preventDefault()
                // 基于form表单，快速创建formData对象
                var fd = new FormData($(this)[0])
                fd.append('state', art_state)
                // 将裁剪过后的照片输出为base64的文件格式
                $image
                .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                    width: 400,
                    height: 280
                })
                .toBlob(function(blob) {       // 将 Canvas 画布上的内容，转化为文件对象
                    // 得到文件对象后，进行后续的操作
                    fd.append('cover_img', blob)
                    // 发起Ajax请求
                    publishArticle(fd)
                })
              

            })

            // 定义一个方法发布商品
            function publishArticle(fd) {
                $.ajax({
                  method: 'POST',
                  url: '/my/article/add',
                  data: fd,
                  // 注意：如果向服务器提交的是 FormData 格式的数据，
                  // 必须添加以下两个配置项
                  contentType: false,
                  processData: false,
                  success: function(res) {
                    // console.log(res);
                    if (res.status !== 0) {
                      return layer.msg('发布零食失败！')
                    }
                    layer.msg('发布零食成功！')
                    // 发布零食成功后，跳转到零食列表页面
                    location.href = '/snack/snack_list.html'
                  }
                })
            }

           
      })