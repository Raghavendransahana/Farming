import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { MantineProvider } from '@mantine/core'
import { CheckoutContent } from '../CheckoutContent'
import { useCheckout } from '@/contexts/CheckoutContext'
import type { UserDetails } from '@/contexts/AuthContext'
import type { CartItem } from '@/contexts/CartContext'

jest.mock('@/contexts/CheckoutContext', () => ({
  useCheckout: jest.fn(),
}))

const mockedUseCheckout = jest.mocked(useCheckout)

const renderWithProvider = (ui: React.ReactElement) =>
  render(<MantineProvider>{ui}</MantineProvider>)

const mockUserDetails: UserDetails = {
  name: 'Test User',
  address: '123 Test St',
  location: 'Test City',
}

const mockCartItem: CartItem = {
  id: '1',
  name: 'Gir Cow',
  type: 'Cow',
  description: 'Healthy Gir breed cow, excellent milk producer. Well-maintained and vaccinated.',
  location: 'Ahmedabad',
  state: 'Gujarat',
  ownerName: 'Sahana',
  ownerPhone: '+91 9600389319',
  ownerEmail: 'sahana@nativefarm.com',
  image: '/image.png',
  price: '₹65,000',
  originalPrice: '₹75,000',
  rating: 4.5,
  reviews: 132,
  colors: ['Brown', 'White', 'Beige'],
  sizes: ['Small', 'Medium', 'Large'],
  quantity: 1,
  isResale: false,
  isExternal: false,
}

describe('CheckoutContent', () => {
  it('renders heading "Complete Your Purchase"', () => {
    mockedUseCheckout.mockReturnValue({
      paymentMethod: 'card',
      setPaymentMethod: jest.fn(),
      needDelivery: false,
      setNeedDelivery: jest.fn(),
      address: mockUserDetails,
      handleAddressChange: jest.fn(),
      cardData: { number: '', name: '', expiry: '', cvv: '' },
      handleCardChange: jest.fn(),
      upiId: '',
      setUpiId: jest.fn(),
      isProcessing: false,
      subtotal: 200,
      deliveryCharge: 0,
      codCharge: 0,
      tax: 18,
      total: 218,
      handleCompletePayment: jest.fn(),
      hasExistingDetails: true,
    })

    renderWithProvider(
      <CheckoutContent
        checkoutData={{ items: [mockCartItem], type: 'single' }}
        userDetails={mockUserDetails}
      />
    )

    expect(screen.getByText('Complete Your Purchase')).toBeInTheDocument()
  })
})
