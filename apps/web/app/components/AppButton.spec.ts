import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import AppButton from './AppButton.vue'

describe('AppButton', () => {
  it('renders the slot content correctly', async () => {
    const component = await mountSuspended(AppButton, {
      slots: { default: () => 'Click Me' }
    })
    
    expect(component.text()).toContain('Click Me')
  })

  it('shows loading spinner and disables button when loading prop is true', async () => {
    const component = await mountSuspended(AppButton, {
      props: { loading: true },
      slots: { default: () => 'Submit' }
    })

    // Check if the button is disabled
    const button = component.find('button')
    expect(button.attributes()).toHaveProperty('disabled')
    
    // Check if the loading icon (SVG) is present
    expect(component.find('svg').exists()).toBe(true)
  })
})
