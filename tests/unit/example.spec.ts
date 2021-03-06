import { mount } from '@vue/test-utils'
import MyAccount from '@/views/MyAccount.vue'

describe('MyAccount.vue', () => {
  it('renders account view', () => {
    const wrapper = mount(MyAccount)
    expect(wrapper.text()).toMatch('My account page')
  })
})
