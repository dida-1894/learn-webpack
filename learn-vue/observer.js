function observer(data) {
  if (typeof data === 'object')
    Object.keys(data).forEach(key => defineReactive(data, key, data[key]))
  return ''
}

function defineReactive(obj, key, value) {
  observer(value)
  const dep = new Dep()
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: () => {
      if (Dep.target) dep.addSub()
      return value
    },
    set: newValue => {
      if (newValue === value) return ;
      console.log(`检测到值发生变化 ${value} ----> ${newValue}`)
      value = newValue
      dep.notify()
    },
  })
}



// library.booki.name = 'oo' //检测到值发生变化  ----> oo
// library.bookj.name = 'nfejubfuje' // 检测到值发生变化 hue ----> nfejubfuje


function Dep() {
  this.subs = []
}

Dep.prototype = {
  addSub: sub => this.subs.push(sub),
  notify: () => this.subs.forEach(sub => sub.update()),
}


function Watcher(vm, exp, cb) {
  this.vm = vm
  this.exp = exp
  this.cb = cb
  this.value = this.get()
}

Watcher.prototype = {
  update: () => {
    const value = this.vm.data[exp] // key
    const oldValue = this.value
    if (value !== oldValue) {
      this.value = value
      this.cb.call(this.vm, value, oldValue)
    }
  },
  get: () => {
    Dep.target = this //缓存自己
    const value = this.vm.data[this.exp]
    Dep.target = null
    return value
  },
}


function SelfVue (data, el, exp) {
    this.data = data
    observe(data)
    el.innerHTML = this.data[exp]  // 初始化模板数据的值
    new Watcher(this, exp, function (value) {
        el.innerHTML = value
    })
    return this
}