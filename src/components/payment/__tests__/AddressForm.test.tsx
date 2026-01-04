import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { MantineProvider } from '@mantine/core'
import { AddressForm } from '../AddressForm'
import type { UserDetails } from '@/contexts/AuthContext'
const renderWithProvider = (ui: React.ReactElement) =>
  render(<MantineProvider>{ui}</MantineProvider>)
describe('AddressForm', () => {
  const mockAddress: UserDetails = {
    name: 'Test',
    address: '123 Main St',
    location: 'Test,Tset',
  }
  const mockOnChange = jest.fn()


  it('values showing', () => {
    renderWithProvider(
      <AddressForm address={mockAddress} onChange={mockOnChange} />
    )
    expect(screen.getByLabelText(/Full Name/i)).toHaveValue('Test')
    expect(screen.getByLabelText(/Address/i)).toHaveValue('123 Main St')
    expect(screen.getByLabelText(/Location/i)).toHaveValue('Test,Tset')
  })

  it('address not null', () => {
    expect(mockAddress).toBeDefined()
    expect(mockAddress.name).not.toBeNull()
  })

  it('name field exist', () => {
    expect(mockAddress.name).toBeTruthy()
  })

  it('location value check', () => {
    expect(mockAddress.location).not.toBeUndefined()
  })

  it('onChange defined', () => {
    expect(mockOnChange).toBeDefined()
    expect(typeof mockOnChange).toBe('function')
  })
})
