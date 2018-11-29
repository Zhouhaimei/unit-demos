import {
  shallowMount
} from '@vue/test-utils'
import TestComponent from '@/components/TestComponent.vue'
import flushPromises from 'flush-promises'
// shallowMount 只挂载一个组件而不渲染其子组件 (即保留它们的存根)
describe('测试组件', () => {
  test('isVueInstance', () => {
    const wrapper = shallowMount(TestComponent)
    expect(wrapper.isVueInstance()).toBe(true)
  })

  test('prop: header', () => {
    //wrapper 直接操作组件状态 wrapper.setData({ count: 10 }) wrapper.setProps({ foo: 'bar' })
    //仿造 Prop ，
    // 仿造注入 
    /**
     const $route = {
  path: '/',
  hash: '',
  params: { id: '123' },
  query: { q: 'hello' }
}
shallowMount(Component, {
  mocks: {
    // 在挂载组件之前
    // 添加仿造的 `$route` 对象到 Vue 实例中
    $route
  }
})
     
     */
    const wrapper = shallowMount(TestComponent, {
      propsData: {
        header: '测试文字'
      }
    })
    const header = wrapper.find('.header')
    expect(header.html()).toContain('测试文字')
  })

  test('prop: footer', () => {
    const wrapper = shallowMount(TestComponent, {
      propsData: {
        footer: '测试文字'
      }
    })
    const footer = wrapper.find('.footer')
    expect(footer.html()).toContain('测试文字')
  })

  test('prop: disabled', () => {
    const wrapper = shallowMount(TestComponent, {
      propsData: {
        disabled: true
      }
    })
    expect(wrapper.is('.disabled')).toBe(true)
  })

  test('click: header', () => {
    const wrapper = shallowMount(TestComponent)
    const count = wrapper.find('.count')
    wrapper.find('.header').trigger('click')
    expect(wrapper.vm.count).toBe(1)
    expect(count.html()).toContain(1)
  })

  test('click: footer', () => {
    const wrapper = shallowMount(TestComponent)
    const count = wrapper.find('.count')
    wrapper.find('.footer').trigger('click')
    expect(wrapper.vm.count).toBe(-1)
    expect(count.html()).toContain(-1)
  })

  test('event: click', () => {
    const wrapper = shallowMount(TestComponent)
    const emit = wrapper.find('.emit')
    emit.trigger('click')
    // 断言事件已经被触发
    expect(wrapper.emitted()['click']).toBeTruthy()
  })

  test('nextTick 方法', (done) => {
    const wrapper = shallowMount(TestComponent)
    const fetch = wrapper.find('.fetch')
    fetch.trigger('click')
    // 保证断言在promise完成之后再执行 同上
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.count).toBe(100)
      done()
    })
  })

  test('flushPromises 方法', async () => {
    const wrapper = shallowMount(TestComponent)
    const fetch = wrapper.find('.fetch')
    fetch.trigger('click')
    // 保证断言在promise完成之后再执行 同上
    await flushPromises()
    expect(wrapper.vm.count).toBe(100)
  })
})
