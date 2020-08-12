import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css'
// eslint-disable-next-line no-unused-vars,import/no-duplicates
import { Button, Form, FormItem, Input, Option } from 'element-ui'
//  导入弹窗提示 弹窗提示需挂载到Vue原型对象身上
// eslint-disable-next-line import/no-duplicates,no-unused-vars
import { Message, Container, Aside, Main, Header } from 'element-ui'
// eslint-disable-next-line import/no-duplicates
import { Menu, MenuItem, Submenu, MenuItemGroup } from 'element-ui'
// eslint-disable-next-line import/no-duplicates
import { Breadcrumb, BreadcrumbItem, Card, Row, Col } from 'element-ui'
// eslint-disable-next-line import/no-duplicates
import { Table, TableColumn, Switch, Tooltip, Pagination } from 'element-ui'
// eslint-disable-next-line import/no-duplicates
import { Dialog, MessageBox, Tag, Tree, Select, Cascader } from 'element-ui'
// eslint-disable-next-line import/no-duplicates
import { Alert, Tabs, TabPane, Steps, Step, Checkbox, CheckboxGroup } from 'element-ui'
// eslint-disable-next-line import/no-duplicates
import { Upload, Timeline, TimelineItem } from 'element-ui'
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Header)
Vue.use(Menu)
Vue.use(MenuItemGroup)
Vue.use(MenuItem)
Vue.use(Submenu)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Switch)
Vue.use(Tooltip)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Tag)
Vue.use(Tree)
Vue.use(Select)
Vue.use(Option)
Vue.use(Cascader)
Vue.use(Alert)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Step)
Vue.use(Steps)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(Upload)
Vue.use(Timeline)
Vue.use(TimelineItem)
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
