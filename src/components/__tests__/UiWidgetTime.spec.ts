import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import UiWidgetTime from '../UiWidgetTime.vue'

describe('UiWidgetTime', () => {
  it('renders properly', () => {
    const wrapper = mount(UiWidgetTime, { props: { timeListId: 0 } })
    expect(wrapper.vm.$props.timeListId).equal(0)
  })
})
