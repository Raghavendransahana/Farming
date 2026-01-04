import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { MantineProvider } from '@mantine/core'
import { PaymentMethodSelector } from '../PaymentMethodSelector'
import type { CardData } from '@/contexts/CheckoutContext'

const renderWithProvider = (ui: React.ReactElement) =>
  render(<MantineProvider>{ui}</MantineProvider>)

describe('PaymentMethodSelector', () => {
  const mockCardData: CardData = {
    number: '',
    name: '',
    expiry: '',
    cvv: '',
  }
  const mockOnChange = jest.fn()
  const mockOnCardChange = jest.fn()
  const mockOnUpiChange = jest.fn()

  it('payment methods show', () => {
    renderWithProvider(
      <PaymentMethodSelector
        selected="card"
        onChange={mockOnChange}
        cardData={mockCardData}
        upiId=""
        onCardChange={mockOnCardChange}
        onUpiChange={mockOnUpiChange}
      />
    )
    expect(screen.getByText('Credit/Debit Card')).toBeInTheDocument()
    expect(screen.getByText('UPI')).toBeInTheDocument()
    expect(screen.getByText('Cash on Delivery')).toBeInTheDocument()
  })

  it('upi field appear', () => {
    renderWithProvider(
      <PaymentMethodSelector
        selected="upi"
        onChange={mockOnChange}
        cardData={mockCardData}
        upiId=""
        onCardChange={mockOnCardChange}
        onUpiChange={mockOnUpiChange}
      />
    )
    expect(screen.getByLabelText('UPI ID')).toBeInTheDocument()
  })

  it('onChange work', async () => {
    renderWithProvider(
      <PaymentMethodSelector
        selected="card"
        onChange={mockOnChange}
        cardData={mockCardData}
        upiId=""
        onCardChange={mockOnCardChange}
        onUpiChange={mockOnUpiChange}
      />
    )
    const upiRadio = screen.getByDisplayValue('upi')
    await userEvent.click(upiRadio)
    expect(mockOnChange).toHaveBeenCalledWith('upi')
  })


})
