import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { MantineProvider } from '@mantine/core'
import { CheckoutSummary } from '../CheckoutSummary'
import type { CartItem } from '@/contexts/CartContext'

const renderWithProvider = (ui: React.ReactElement) =>
  render(<MantineProvider>{ui}</MantineProvider>)
describe('CheckoutSummary', () => {
  const mockItems: CartItem[] = [
    {
      id: '1',
      name: 'Test Cow',
      type: 'Cow',
      price: '₹50,000',
      description: 'Test description',
      location: 'Test City',
      state: 'Test State',
      ownerName: 'Test Owner',
      ownerPhone: '1234567890',
      ownerEmail: 'test@example.com',
      image: '/test.jpg',
      originalPrice: '₹60,000',
      rating: 4.5,
      reviews: 10,
      colors: ['Brown'],
      sizes: ['Medium'],
      quantity: 1,
      isResale: false,
      isExternal: false,
    },
  ]

  it('shows the order summary title with item count', () => {
    renderWithProvider(
      <CheckoutSummary
        items={mockItems}
        subtotal={50000}
        deliveryCharge={0}
        codCharge={0}
        tax={4500}
        total={54500}
      />
    )

    expect(screen.getByText('Order Summary (1)')).toBeInTheDocument()
  })

  it('shows the item name and quantity', () => {
    renderWithProvider(
      <CheckoutSummary
        items={mockItems}
        subtotal={50000}
        deliveryCharge={0}
        codCharge={0}
        tax={4500}
        total={54500}
      />
    )

    expect(screen.getByText('Test Cow')).toBeInTheDocument()
    expect(screen.getByText('Qty: 1')).toBeInTheDocument()
  })

  it('shows the total amount', () => {
    renderWithProvider(
      <CheckoutSummary
        items={mockItems}
        subtotal={50000}
        deliveryCharge={0}
        codCharge={0}
        tax={4500}
        total={54500}
      />
    )

    expect(screen.getByText('₹54,500')).toBeInTheDocument()
  })

  it('shows delivery charge when provided', () => {
    renderWithProvider(
      <CheckoutSummary
        items={mockItems}
        subtotal={50000}
        deliveryCharge={50}
        codCharge={0}
        tax={4500}
        total={54550}
      />
    )

    expect(screen.getByText('Delivery Charges')).toBeInTheDocument()
    expect(screen.getByText('₹50')).toBeInTheDocument()
  })
})
