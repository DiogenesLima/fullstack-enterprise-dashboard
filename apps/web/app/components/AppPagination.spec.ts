import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import AppPagination from './AppPagination.vue'

describe('AppPagination', () => {
  const defaultProps = {
    type: 'users',
    currentPage: 2,
    totalPages: 5,
    totalItems: 50,
    loading: false
  }

  it('renders pagination info correctly', async () => {
    const component = await mountSuspended(AppPagination, {
      props: defaultProps
    })

    const text = component.text()
    expect(text).toContain('page 2')
    expect(text).toContain('of 5')
    expect(text).toContain('50 total users')
  })

  it('emits change event with correct page when buttons are clicked', async () => {
    const component = await mountSuspended(AppPagination, {
      props: defaultProps
    })

    const buttons = component.findAll('button')
    const prevButton = buttons[0]
    const nextButton = buttons[1]

    // "Previous" click test
    await prevButton.trigger('click')
    expect(component.emitted('change')?.[0]).toEqual([1])

    // "Next" click test
    await nextButton.trigger('click')
    expect(component.emitted('change')?.[1]).toEqual([3])
  })

  it('disables "Previous" button on the first page', async () => {
    const component = await mountSuspended(AppPagination, {
      props: { ...defaultProps, currentPage: 1 }
    })

    const prevButton = component.findAll('button')[0]
    expect(prevButton.attributes()).toHaveProperty('disabled')
  })

  it('disables "Next" button on the last page', async () => {
    const component = await mountSuspended(AppPagination, {
      props: { ...defaultProps, currentPage: 5 }
    })

    const nextButton = component.findAll('button')[1]
    expect(nextButton.attributes()).toHaveProperty('disabled')
  })

  it('disables all buttons when loading is true', async () => {
    const component = await mountSuspended(AppPagination, {
      props: { ...defaultProps, loading: true }
    })

    const buttons = component.findAll('button')
    expect(buttons[0].attributes()).toHaveProperty('disabled')
    expect(buttons[1].attributes()).toHaveProperty('disabled')
  })
})
