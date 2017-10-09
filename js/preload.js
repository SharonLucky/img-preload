(function ($) {
  function PreLoad(imgs, options) {
    this.imgs = (typeof imgs === 'string') ? [imgs] : imgs
    this.opts = $.extend({}, PreLoad.DEFAULTS, options)

    // _表明只在内部使用，不在外部调用
    this._unordered()
  }
  PreLoad.DEFAULTS = {
    each: null, // 每一张图片加载完成后执行
    all: null // 所有图片加载完成后执行
  } 
  PreLoad.prototype._unordered = function () { //无序加载
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
        // $progress.html(Math.round((count + 1) / len * 100) + '%')
        if (count >= len - 1) {
          // $('.loading').hide()
          // document.title = '1/' + len
          opts.all && opts.all()
        }
        count++
      }) 
      imgObj.src = src
    }) 
  } 
  // 两种方式：
  // $.fn.extend -> $('img').proload()
  // $.extend -> $.proload()
  $.extend({
    preload: function(imgs, opts) {
      new PreLoad(imgs, opts)
    }
  })
})(jQuery)

