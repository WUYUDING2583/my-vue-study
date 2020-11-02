// 任务
// 1.插件：$store
// 2.Store类: 保存响应式状态state、方法：commit()/dispatch()
let _Vue;

class Store {
    constructor(options) {
        // 保存mutations
        this._mutations = options.mutations;
        // 保存actions
        this._actions = options.actions;

        // 利用vue做响应式数据
        this._vm = new _Vue({
            data: {
                $$state: options.state
            }
        });

        // 天王盖地虎
        Object.defineProperty(this, "getters", {
            get() {
                let getters = {};
                Object.keys(options.getters).forEach(prop => {
                    getters[prop]=options.getters[prop](options.state);
                });
                return getters;
            }
        })

        // 绑定this
        this.commit = this.commit.bind(this);
        this.dispatch = this.dispatch.bind(this);
    }

    get state() {
        return this._vm._data.$$state;
    }

    set state(v) {
        console.error("please use replaceState to reset state");
    }

    // commit(type,payload)
    commit(type, payload) {
        // 获取type对应的mutation
        const entry = this._mutations[type];
        if (!entry) {
            console.error("unknow mutation");
            return;
        }
        entry(this.state, payload);
    }

    // dispatch(type,payload)
    dispatch(type, payload) {
        // 获取type对应的mutation
        const entry = this._actions[type];
        if (!entry) {
            console.error("unknow action");
            return;
        }
        entry(this, payload);
    }
}

function install(Vue) {
    _Vue = Vue;

    Vue.mixin({
        beforeCreate() {
            if (this.$options.store) {
                Vue.prototype.$store = this.$options.store;
            }
        }
    })
}

// 到处对象就是Vuex
export default {
    Store,
    install
}