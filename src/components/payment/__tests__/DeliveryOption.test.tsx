import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { MantineProvider } from '@mantine/core'
import { DeliveryOption } from '@/components/payment/DeliveryOption'

const renderWithProvider = (ui: React.ReactElement) =>
  render(<MantineProvider>{ui}</MantineProvider>)

describe('DeliveryOption', () => {
  const mockOnChange = jest.fn()
  it('shows both delivery options', () => {
    renderWithProvider(
      <DeliveryOption
        needDelivery={false}
        onChange={mockOnChange}
        deliveryCharge={50}
      />
    )
    expect(
      screen.getByText('Need delivery to your location')
    ).toBeInTheDocument()
    expect(
      screen.getByText('Self pickup (No delivery charges)')
    ).toBeInTheDocument()
  })
  it('shows the delivery charge amount', () => {
    renderWithProvider(
      <DeliveryOption
        needDelivery={false}
        onChange={mockOnChange}
        deliveryCharge={50}
      />
    )
    expect(screen.getByText('(+₹50)')).toBeInTheDocument()
  })
})
