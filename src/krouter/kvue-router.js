// 自己的router实现
// 插件定义
let _Vue;

class VueRouter {
  constructor(options) {
    // options为new VueRouter的参数
    this.$options = options;

    // 创建一个保存url的变量
    // current必须是一个响应式的数据
    // 好处是未来router-view使用current时就产生依赖关系
    // current发生变化时router-view的render会重新执行
    const initial = window.location.hash.slice(1) || "/";
    _Vue.util.defineReactive(this, "current", initial);

    // 监听url的变化
    window.addEventListener("hashchange", this.onHashChange.bind(this));
    window.addEventListener("load", this.onHashChange.bind(this));
  }

  onHashChange() {
    this.current = window.location.hash.slice(1);
  }
}

// 外面的vue.use方法会调用install
VueRouter.install = function (Vue) {
  // 保存Vue
  _Vue = Vue;

  // 1. 挂载一下$router
  Vue.mixin({
    beforeCreate() {
      // 获取router实例
      // 此处的this为vue实例或组件实例
      if (this.$options.router) {
        Vue.prototype.$router = this.$options.router;
      }
    }
  });
  // 2. 实现两个全局组件
  //  <router-link to="/xxx">xxx</router-link>
  Vue.component("router-link", {
    props: {
      to: {
        type: String,
        required: true,
      }
    },
    render(h) {
      // <a href="#/xxx">ooo</a>
      // 参数1 - 标签类型
      // 参数2 - 元素属性
      // 参数3 - 子元素
      return h("a", { attrs: { href: `#${this.to}` } }, this.$slots.default);
    }
  });
  Vue.component("router-view", {
    render(h) {
      // 1.获取路由器实例
      let component = null;
      // this.$router指代VueRouterduixiang
      const route = this.$router.$options.routes.find(
        route => route.path === this.$router.current
      )
      if (route) {
        component = route.component;
      }
      return h(component);
    }
  });
};

export default VueRouter;
