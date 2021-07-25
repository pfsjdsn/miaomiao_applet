＃项目：喵喵交友云开发小程序（主要是iconfont 图标库、users 消息表、message用户表、云开发集合的使用）

## 用途：个人测试demo

### 功能：

#### 好友推荐、历史记录、附近好友、消息、好友列表、编辑个人信息（头像、昵称、个性签名、手机号等）、我的

** 以下是此项目使用的技术栈

### 1、index(主页页面)

技术栈: 

 ```vue 
wxs模块的使用
unitFormat 数字格式转化函数的封装
wordSplit字符串截取函数的封装
users表数据的排序（field）及过滤 （orderBy）
搜索组件(search)的封装
 ```

### 2、search(搜索页面)

技术栈: 

```vue
本地缓存（setStorage）的使用
users表数据的过滤 （orderBy）
数据库正则表达式（Database.RegExp）的使用
```

### 3、near(附近页面)

技术栈: 

```vue
地图（map）组件的使用
附近好友头像的显示（markers标记点）
```

### 4、message(消息页面)

技术栈: 

```vue
视图容器（movable-area）的使用
拖拽删除组件（romoveList）的封装
更新(update)云函数的调用
```

### 5、user(个人中心页面)

技术栈: 

```vue
登录(login)云函数的调用
```

### 6、head(修改头像页面)

技术栈: 

```vue
微信头像getUserInfo
wx.cloud.uploadFile将本地头像上传到云空间

```

### 7、name(修改昵称页面)

技术栈:

```vue
微信昵称getUserInfo
wx.cloud.uploadFile将本地头像上传到云空间
users表中数据写入（doc）以及更新（update）

```

### 8、signature(修改个性签名页面)

技术栈:

```vue
users表中数据写入（doc）以及更新（update）
```

### 9、detail(好友详情页面)

技术栈:

```vue
打电话组件（callPhone）的封装
复制功能组件（copyText）的封装
```

