var layer = layui.layer
var form = layui.form
var laypage = layui.laypage
$(function() {
    var q = {
        pagenum: 1, //默认页码值为1
        pagesize: 5, //默认每页显示5条数据
        cate_id: '', //零食分类的id
        state: '' //零食分类的状态
    }

    initTable()
    // 获取零食数据，并用模板引擎渲染零食结构
    function initTable() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: function(res) {
                if(res.status !== 0) {
                    return layer.msg('获取零食数据失败')
                }
                // console.log(res);
            //    3.将获取的数据传入到模板引擎中
            var htmlStr = template('tpl_table', res)
            // 5.将模板引擎上的数据放入到tbody中
            $('tbody').html(htmlStr)
             //调用分页的方法，传入res数据
             renderPage(res.total)
            }
        })
    }

    // 定义美化时间的过滤器
    template.defaults.imports.dateFormat = function(date) {
        // 把接收到的参数转化为一个日期对象
        var date = new Date(date)
        var y =date.getFullYear()
        var m =  padZero(date.getMonth() + 1)
        var d =  padZero(date.getDate())
        var hh =  padZero(date.getHours())
        var mm =  padZero(date.getMinutes())
        var ss =  padZero(date.getSeconds())
        return y +'-'+ m + '-' + d +' '+ hh +':'+ mm + ':' + ss
    }

    // 定义补零函数
    function padZero(number) {
        return number < 10 ? '0' + number: number
    }

    // 初始化零食分类的方法
    initCate()
    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                if(res.status !== 0) {
                    return layer.msg('获取零食分类列表失败')
                }
                var htmlStr = template('tpl-cate', res)
                $('.tpl-cate').html(htmlStr)
                 // 通过 layui 重新渲染表单区域的UI结构
                  form.render()
            }
        })
    }

    // 为筛选表单定义提交事件
    $('#form-search').on('submit', function(e) {
        // 阻止表单的默认提交行为
        e.preventDefault()
        // 获取表单中选中项的值
        var cate_id = $('[name=cate_id').val()
        var state = $('[name=cate_state]').val()
        // 将表单中选中的值赋值给q
        q.cate_id = cate_id
        q.state = state
        // 获取零食数据
        initTable()
    })

    // 定义渲染分类的方法
    function renderPage(total) {
        laypage.render({
            elem: 'pageBox' //注意，这里的 test1 是 ID，不用加 # 号
            ,count: total //数据总数，从服务端得到
            ,limit: q.pagesize  //每页显示几条数据
            ,limits: [2, 3, 5] //每页条数的显示值
            , curr: q.pagenum // 设置默认被选中的分页
            ,layout: ['count', 'limit','limits', 'prev', 'next'] //自定义排版
             // 触发 jump 回调的方式有两种：
                // 1. 点击页码的时候，会触发 jump 回调
                // 2. 只要调用了 laypage.render() 方法，就会触发 jump 回调
            ,jump: function(obj, first){
                // 把最新的页码值，赋值到q这个查询参数中
              q.pagenum = obj.curr
                // 把最新的条目数，赋值到 q 这个查询参数对象的 pagesize 属性中
                q.pagesize = obj.limit
                if(!first){
                 initTable()
                }
              }
          });
    }

    // 实现删除零食的功能
    $('body').on('click', '#btn-del', function() {
        // 计算出删除按钮的个数
        var len = $('#btn-del').length
        // 获取需要删除的零食的id
        var id = $(this).attr('data-id')
        // 提示用户是否删除
        layer.confirm('是否删除', {icon: 3, title:'提示'}, function(index){
            //do something
            $.ajax({
                method: 'GET',
                url: '/my/article/delete/' + id,
                success: function(res) {
                   if(res.status!== 0) {
                    return layer.msg('删除文章败')
                   }
                   layer.msg('删除文章成功')
                   layer.close(index);
                   initTable()
                } 
            })
          });
    })




   
   
})

