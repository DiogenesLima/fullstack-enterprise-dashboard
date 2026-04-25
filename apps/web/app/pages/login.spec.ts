import { describe, it, expect, vi } from 'vitest'
import { mountSuspended, registerEndpoint } from '@nuxt/test-utils/runtime'
import { flushPromises } from '@vue/test-utils'
import Login from './login.vue'

describe('Login Page', () => {
  it('renders login form correctly', async () => {
    const page = await mountSuspended(Login)
    
    expect(page.find('h1').text()).toContain('Enterprise Portal')
    expect(page.find('input[type="email"]').exists()).toBe(true)
    expect(page.find('input[type="password"]').exists()).toBe(true)
    expect(page.find('button').text()).toContain('Sign In')
  })

  it('shows error message on failed login', async () => {
    // Register a fake endpoint that returns 401 error
    registerEndpoint('http://localhost:3001/api/v1/auth/login', {
      method: 'POST',
      handler: () => {
        return createError({
          statusCode: 401,
          data: { message: 'Invalid credentials' }
        })
      }
    })

    const page = await mountSuspended(Login)
    
    // Simulate filling out the form and submit it
    await page.find('input[type="email"]').setValue('wrong@test.com')
    await page.find('input[type="password"]').setValue('wrongpass')
    await page.find('form').trigger('submit')

    // Waiting for the asynchronous lifecycle (Fetch + Catch + DOM Update)
    await flushPromises()

    // Check if the error alert was shown
    const errorMsg = page.find('[class*="text-red-600"]')

    expect(errorMsg.exists()).toBe(true)

    expect(errorMsg.text()).toContain('Login failed')
  })
})
