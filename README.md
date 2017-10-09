# img-preload 图片预加载
浏览前预加载图片 -> 使用jquery封装插件(三个实例展示):

- 图片无序预加载, loading显示百分比进度
- 仿QQ表情无序预加载, Loading加载提示
- 漫画有序预加载

### 初始化代码
``` bash
function PreLoad(imgs, options) {
  this.imgs = (typeof imgs === 'string') ? [imgs] : imgs
  this.opts = $.extend({}, PreLoad.DEFAULTS, options) // 合并默认值和传入的options参数

  if (this.opts.order === "ordered") {
    this._ordered() //有序预加载
  } else {
    this._unordered() //无序预加载
  }
}
PreLoad.DEFAULTS = {
  order: 'unordered', // 无序预加载
  each: null, // 每张图片加载完毕后执行
  all: null // 所有图片加载完后执行
};
```

### 无序预加载-code
``` bash
PreLoad.prototype._unordered = function(){
  var imgs = this.imgs,
      opts = this.opts,
      count = 0,
      len = imgs.length
  $.each(imgs, function (i, src) {
      if (typeof src !== 'string') return
      var imgObj = new Image()
      // error 防止个别图片加载错误卡住
      $(imgObj).on('load error', function () {
        // 确保opts不为空
        opts.each && opts.each(count)
        if (count >= len - 1) {
          opts.all && opts.all()
        }
        count++
      }) 
      imgObj.src = src
    }) 
}
```

### 有序预加载-code
``` bash
PreLoad.prototype._ordered = function() {
  var opts = this.opts,
      imgs = this.imgs,
      len = imgs.length,
      count = 0

      load()

      function load() {
        var imgObj = new Image()
        $(imgObj).on('load error', function(e) {
            opts.each && opts.each(count)
            if (count >= len) {
              //所有图片已经加载完毕
              opts.all && opts.all()
            } else {
              load()
            }
            count++            
        })
        imgObj.src = imgs[count]
      }
}
```

### 扩展方法
``` bash
$.extend({
  preload: function(imgs, opts) {
    new PreLoad(imgs, opts)
  }
})
```

### 调用
``` bash
$.preload(imgs,{
  order: '',
  each: function(count) {
    // code
  },
  all: function() {
    // code
  }
})
})
```
