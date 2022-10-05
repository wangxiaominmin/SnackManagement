  var layer = layui.layer
  // 1.1 获取裁剪区域的 DOM 元素
  var $image = $('#image')
  // 1.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
  }

  // 1.3 创建裁剪区域
  $image.cropper(options)

//   点击上传按钮时，激发文件框
$('#upload').on('click', function() {
    $('#selectFile').click()
})

// 绑定当文件框发生改变的事件
$('#selectFile').on('change', function(e) {
    // 1.拿到用户选择的文件
    var img = e.target.files[0]
    if(e.target.files === 0) {
      return layer.msg('请选择图片')
    }
    // 2.根据用户选择的文件，创造一个url地址
    var newImgURL = URL.createObjectURL(img)
    // 3.先销毁旧的区域，再重新设置图片路径
    $image
   .cropper('destroy')      // 销毁旧的裁剪区域
   .attr('src', newImgURL)  // 重新设置图片路径
   .cropper(options)        // 重新初始化裁剪区域

})

 // 按下确定键
 $('#confirm').on('click', function() {
  //  将裁剪的图片输出为base64格式的字符串
  var dataURL = $image
      .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
        width: 100,
        height: 100
      })
      .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
  $.ajax({
      method: 'post',
      url: '/my/update/avatar',
      data: {avatar: dataURL},
      success: function(res) {
        if(res.status!==0) {
          return layer.msg('设置头像失败')
        }
        layer.msg('图片设置成功')
      }
  })
})
