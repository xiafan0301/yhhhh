<template>
  <div>
    <!-- 使用步骤：
    1.将zx-image-view.min.js放到static/lib文件夹下
    2.将该文件引入到app.html的script的Jq下面
    3.在.eslintrc.js中的globals配置ZxImageView:true
    4.复制代码，改好路径
      -->
    111
    <div id="imgs"></div>
  </div>
</template>

<script>
export default {
  name: 'zx-Image-view',
  data () {
    return {
      data: [
        {
          fileFullPath: require('../../../../assets/img/temp/1.jpg')
        },
        {
          fileFullPath: require('../../../../assets/img/temp/add.png')
        },
        {
          fileFullPath: require('../../../../assets/img/temp/config.png')
        }
      ]
    }
  },
  created () {
    this.previewPictures(this.data)
  },
  methods: {
    // 预览图片公共方法
    previewPictures (data) {
      setTimeout(() => {
        let imgs = data.map(value => value.fileFullPath);// 图片路径要配置好！
        // 图片数组2
        let imgs2 = []
        // 获取图片列表容器
        let $el = document.getElementById('imgs');
        let html = '';
        // 创建img dom
        imgs.forEach(function (src) {
          // 拼接html结构
          html += '<div class="item" style=" float: left;display: flex;align-items: center;justify-content: center;width: 82px;height: 115px;overflow: hidden;box-sizing: border-box;border: 1px solid #f1f1f1;margin: 5px;cursor: pointer;" data-angle="' + 0 + '"><img src="' + src + '" style="width: 100%;height: auto;"></div>';
          // 生成imgs2数组
          imgs2.push({
            url: src,
            angle: 0
          })
        })
        // 将图片添加至图片容器中
        $el.innerHTML = html;
        // 使用方法
        let config = {
          showToolbar: true
        }
        let ziv = new ZxImageView(config, imgs2);
        // console.log(ziv);
        // 查看第几张
        let $images = $el.querySelectorAll('.item');
        for (let i = 0; i < $images.length; i++) {
          (function (index) {
            $images[i].addEventListener('click', function () {
              ziv.view(index);
            })
          }(i))
        }
      }, 100)
    }
  }
}
</script>

<style scoped>

</style>
