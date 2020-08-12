<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card>
      <!-- 提示区域 -->
      <el-alert
        center
        title="添加商品信息"
        type="info"
        show-icon
        :closable="false"
      >
      </el-alert>
      <!-- 步骤条  '0'-0 将 '0'转为数值-->
      <el-steps :space="400" :active="activeIndex - 0" finish-status="success" align-center>
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品照片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <!-- el-tab-pane 只能在el-tabs内部-->
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px" label-position="top">
        <!-- tab 栏区域 -->
        <el-tabs :tab-position="'left'" v-model="activeIndex"
                 :before-leave="beforeTabLeave" @tab-click="tabClicked">
          <!-- activeindex 是数值型的 用索引来绑定 所以tab栏指定名称时也用数字指定 可实现联动-->
          <el-tab-pane label="基本信息" name="0">
            <!-- 基本信息的内部 表单-->
            <el-form-item label="商品名称" prop="goods_name">
              <el-input v-model="addForm.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="goods_price">
              <el-input v-model="addForm.goods_price" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品重量" prop="goods_weight">
              <el-input v-model="addForm.goods_weight" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品数量" prop="goods_number">
              <el-input v-model="addForm.goods_number" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品分类" prop="goods_cat">
              <el-cascader
                v-model="addForm.goods_cat"
                :options="catelist"
                :props="{ expandTrigger: 'hover',
                value:'cat_id',label:'cat_name',
                children:'children' }"
                @change="handleChange">
              </el-cascader>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品参数" name="1">
            <!-- 渲染表单的Item项 -->
            <el-form-item :label="item.attr_name" v-for="item in manyTabData" :key="item.attr_id">
              <!-- 复选框组 -->
              <el-checkbox-group v-model="item.attr_vals">
                <el-checkbox :label="cb" v-for="(cb, i) in item.attr_vals" :key="i" border></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品属性" name="2">
            <el-form-item :label="item.attr_name" v-for="item in onlyTabData" :key="item.attr_id">
              <el-input v-model="item.attr_vals"></el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品照片" name="3">
            <!-- action 图片要上传到的后台api接口 on-preview:预览
            on-remove:删除  list-type: 图片预览的呈现方式-->
            <el-upload
              :action="uploadURL"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              list-type="picture"
              :headers="headerObj"
              :on-success="handleSuccess"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-tab-pane>
          <el-tab-pane label="商品内容" name="4">
            <quill-editor v-model="addForm.goods_introduce"></quill-editor>
            <!-- 添加商品的按钮 -->
            <el-button type="primary" class="addBtn" @click="add">添加商品</el-button>
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>
    <!-- 图片预览对话框 -->
    <el-dialog
      title="图片预览"
      :visible.sync="priviewVisible"
      width="50%"
      >
      <img :src="priviewPath" class="priviewImg">
    </el-dialog>
  </div>
</template>
<script>
import _ from 'lodash'
export default {
  data () {
    return {
      //  步骤条默认被激活的索引值
      activeIndex: '0',
      //  商品分类列表
      catelist: '',
      //  添加商品的表单对象
      addForm: {
        goods_name: '',
        goods_price: 0,
        goods_weight: 0,
        goods_number: 0,
        //  商品所属的分类数组（级联选择器的双向绑定数据）
        goods_cat: [],
        //  图片的数组
        pics: [],
        //  商品的详情描述
        goods_introduce: '',
        //  商品的参数和属性列表 包括 id 和 value
        attrs: []
      },
      addFormRules: {
        goods_name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' }
        ],
        goods_price: [
          { required: true, message: '请输入商品价格', trigger: 'blur' }
        ],
        goods_weight: [
          { required: true, message: '请输入商品重量', trigger: 'blur' }
        ],
        goods_number: [
          { required: true, message: '请输入商品数量', trigger: 'blur' }
        ],
        goods_cat: [
          { required: true, message: '请选择商品分类', trigger: 'blur' }
        ]
      },
      //  动态参数列表数据
      manyTabData: [],
      //  静态属性列表数据
      onlyTabData: [],
      //  图片上传的地址
      uploadURL: ' https://www.liulongbin.top:8888/api/private/v1/upload ',
      //  图片上传z组件的headers请求头对象
      headerObj: {
        Authorization: window.sessionStorage.getItem('token')
      },
      //  图片的预览路径
      priviewPath: '',
      //  控制图片预览对话框的显示与隐藏
      priviewVisible: false
    }
  },
  created () {
    this.getCateList()
  },
  methods: {
    //  获取所有商品分类
    async getCateList () {
      const { data: res } = await this.$http.get('categories')
      if (res.meta.status !== 200) {
        return this.$message.error('获取商品分类数据失败')
      }
      this.catelist = res.data
    },
    //  监听级联选择器发生变化
    handleChange () {
      console.log('选中的商品id:')
      console.log(this.addForm.goods_cat)
      if (this.addForm.goods_cat.length !== 3) {
        this.addForm.goods_cat = []
      }
    },
    beforeTabLeave (activeName, oldActiveName) {
      //  console.log('即将离开的标签页：' + oldActiveName)
      //  console.log('即将进入的标签页：' + activeName)
      //  如果return false 就会阻止标签页的切换
      if (oldActiveName === '0' && this.addForm.goods_cat.length !== 3) {
        this.$message.error('请先选择商品分类！')
        return false
      }
    },
    //  监听点击切换tab栏的事件
    async tabClicked () {
      //  console.log(this.activeIndex)
      //  访问动态参数面板
      if (this.activeIndex === '1') {
        //  console.log('动态参数面板')
        //  goods_cat是商品分类数组 三级分类对应0 1 2 的2
        //  下面的写法有点麻烦 可以将选中的三级分类的id设置成计算属性
        //  this.$http.get(`categories/${this.addForm.goods_cat[2]}/attributes`)
        const { data: res } = await this.$http.get(`categories/${this.cateId}/attributes`,
          { params: { sel: 'many' } })
        if (res.meta.status !== 200) {
          this.$message.error('获取动态参数列表失败')
        }
        console.log('动态参数:')
        console.log(res.data)
        res.data.forEach(item => {
          //  动态参数的attr_vals 是数组： 将字符串用空格分隔开构成数组
          item.attr_vals = item.attr_vals.length === 0 ? [] : item.attr_vals.split(' ')
        })
        this.manyTabData = res.data
      } else if (this.activeIndex === '2') {
        const { data: res } = await this.$http.get(`categories/${this.cateId}/attributes`,
          { params: { sel: 'only' } })
        if (res.meta.status !== 200) {
          this.$message.error('获取静态属性列表失败')
        }
        console.log('静态属性:')
        console.log(res.data)
        this.onlyTabData = res.data
      }
    },
    //  图片预览效果
    handlePreview (file) {
      console.log('图片预览的图片地址')
      console.log(file)
      //  file其中包含了图片的所有信息 response中的data包含了图片的临时存储路径 url 是完整的路径
      this.priviewPath = file.response.data.url
      this.priviewVisible = true
    },
    //  移除图片的操作
    handleRemove (file) {
      //  console.log(file) 其中包含了图片的所有信息 response中的data包含了图片的临时存储路径
      //  获取将要删除的图片的临时路径
      const filePath = file.response.data.tmp_path
      //  从pics中找到这张图片对应的索引值
      const i = this.addForm.pics.findIndex(x => x.pic === filePath)
      //  调用splice方法把图片信息对象从pics数组中移除
      this.addForm.pics.splice(i, 1)
      console.log(this.addForm)
    },
    //  监听图片上传成功的事件
    handleSuccess (response) {
      console.log(response)
      //  拼接得到一个图片信息对象
      const picInfo = { pic: response.data.tmp_path }
      //  将图片信息push到pics数组中
      this.addForm.pics.push(picInfo)
      console.log('包含商品图片地址的表单对象:')
      console.log(this.addForm)
    },
    //  点击按钮添加商品
    add () {
      console.log('添加了商品详情的表单信息:')
      console.log(this.addForm)
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) {
          //  表单预验证未通过
          return this.$message.error('请填写必要的表单项')
        }
        //  预验证通过执行添加逻辑
        //  使用下面写法将数组用，分割 会报错  原因是将数组赋值给字符串 类型有问题
        //  this.addForm.goods_cat = this.addForm.goods_cat.join(',')
        //  使用深拷贝将对象addForm中的goods_cat数组用,进行分割
        //  数组绑定在 源对象身上 .join操作的是赋值出来的对象
        const form = _.cloneDeep(this.addForm)
        form.goods_cat = form.goods_cat.join(',')
        //  处理动态参数和静态属性
        this.manyTabData.forEach(item => {
          //  动态参数的attr_vals 是数组 attr_value是字符串
          const newInfo = { attr_id: item.attr_id, attr_value: item.attr_vals.join(' ') }
          this.addForm.attrs.push(newInfo)
        })
        this.onlyTabData.forEach(item => {
          //  静态属性的attr_vals 是字符串
          const newInfo = { attr_id: item.attr_id, attr_value: item.attr_vals }
          this.addForm.attrs.push(newInfo)
        })
        form.attrs = this.addForm.attrs
        console.log('深拷贝的 加入了attrs 属性的表单:')
        console.log(form)
        //  发起添加商品的请求
        //  商品的名称必须是唯一的
        const { data: res } = await this.$http.post('goods', form)
        if (res.meta.status !== 201) {
          return this.$message.error('添加商品失败！')
        }
        this.$message.success('添加商品成功！')
        await this.$router.push('/goods')
      })
    }
  },
  computed: {
    cateId () {
      if (this.addForm.goods_cat.length === 3) {
        return this.addForm.goods_cat[2]
      }
      return null
    }
  }
}
</script>
<style lang="less" scoped>
  .el-checkbox{
    margin: 0 5px 0 0 !important;
  }
  .priviewImg{
    width:100%
  }
  .addBtn{
    margin-top: 15px;
  }
</style>
