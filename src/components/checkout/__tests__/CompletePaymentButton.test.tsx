import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { MantineProvider } from '@mantine/core'
import { CompletePaymentButton } from '../CompletePaymentButton'
import { useCheckout } from '@/contexts/CheckoutContext'
import type { UserDetails } from '@/contexts/AuthContext'

jest.mock('@/contexts/CheckoutContext', () => ({
  useCheckout: jest.fn(),
}))

const mockedUseCheckout = jest.mocked(useCheckout)

const renderWithProvider = (ui: React.ReactElement) =>
  render(<MantineProvider>{ui}</MantineProvider>)

interface CardData {
  number: string
  name: string
  expiry: string
  cvv: string
}

interface CheckoutContextType {
  paymentMethod: 'card' | 'upi' | 'cod'
  setPaymentMethod: (value: 'card' | 'upi' | 'cod') => void
  needDelivery: boolean
  setNeedDelivery: (value: boolean) => void
  address: UserDetails
  handleAddressChange: (field: keyof UserDetails, value: string) => void
  cardData: CardData
  handleCardChange: (field: string, value: string) => void
  upiId: string
  setUpiId: (value: string) => void
  isProcessing: boolean
  subtotal: number
  deliveryCharge: number
  codCharge: number
  tax: number
  total: number
  handleCompletePayment: () => void
  hasExistingDetails: boolean
}

const createMockCheckoutContext = (
  overrides: Partial<CheckoutContextType> = {}
): CheckoutContextType => ({
  paymentMethod: 'card',
  setPaymentMethod: jest.fn(),
  needDelivery: false,
  setNeedDelivery: jest.fn(),
  address: {
    name: 'Test User',
    address: '123 Test St',
    location: 'Test City',
  },
  handleAddressChange: jest.fn(),
  cardData: {
    number: '',
    name: '',
    expiry: '',
    cvv: '',
  },
  handleCardChange: jest.fn(),
  upiId: '',
  setUpiId: jest.fn(),
  isProcessing: false,
  subtotal: 10000,
  deliveryCharge: 0,
  codCharge: 0,
  tax: 900,
  total: 10900,
  handleCompletePayment: jest.fn(),
  hasExistingDetails: false,
  ...overrides,
})

describe('CompletePaymentButton', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('total value show', () => {
    const mockContext = createMockCheckoutContext({ total: 10900 })
    mockedUseCheckout.mockReturnValue(mockContext)
    renderWithProvider(<CompletePaymentButton />)
    expect(screen.getByText(/₹10,900/)).toBeTruthy()
  })

  it('total not null', () => {
    const mockContext = createMockCheckoutContext()
    expect(mockContext.total).toBeDefined()
    expect(mockContext.total).not.toBeNull()
  })

})
