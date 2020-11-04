// 传入对象obj，给他定义一个属性key，他的初始值是val
// 该属性未来的访问会被拦截，这样就是先了拦截
function defineReactive(obj, key, val) {
    // 向下递归遍历
    observe(val);

    Object.defineProperty(obj, key, {
        get() {
            console.log("get", key);
            return val;
        },
        set(v) {
            if (v !== val) {
                console.log("set", key);
                observe(v)
                val = v;
                // updater()
            }
        }
    })
}
// 自动设置一个对象所有属性为响应式
function observe(obj) {
    if (typeof obj !== "object" || obj == null) {
        return obj;
    }
    Object.keys(obj).forEach(key =>{
        defineReactive(obj, key, obj[key]);
    })
}

// Vue.set/delete
// 属性的动态新增和删除
function set(obj,key,val){
    defineReactive(obj,key,val);
}

const obj = {
    foo:"foo",
    bar:"bar",
    baz:{a:1},
    arr:[1,2,3]
};
observe(obj);
// obj.foo;
// obj.bar;
// obj.foo="fooooo";
// obj.bar="barrrrrr";
// obj.baz={a:10};
// obj.baz.a
// set(obj,"dong","dong");
// obj.dong
obj.arr.push(4)
// 数组响应式