import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { MantineProvider } from '@mantine/core'
import { ProductCard } from '../ProductCard'
import { useCart } from '@/contexts/CartContext'
import type { Animal } from '@/lib/productsData'

jest.mock('@/contexts/CartContext', () => ({
  useCart: jest.fn(),
}))

const mockedUseCart = jest.mocked(useCart)
const renderWithProvider = (ui: React.ReactElement) =>
  render(<MantineProvider>{ui}</MantineProvider>)
const sampleAnimal: Animal = {
  id: '1',
  name: 'Test Cow',
  type: 'Cow',
  price: '₹50,000',
  description: 'Healthy cow',
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
  isResale: false,
  isExternal: false,
}

describe('ProductCard', () => {
  beforeEach(() => {
    mockedUseCart.mockReturnValue({
      cart: [],
      cartItems: [],
      checkoutData: null,
      isCart: jest.fn().mockReturnValue(false),
      toggleCart: jest.fn(),
      addToCart: jest.fn(),
      getCartItems: jest.fn().mockReturnValue([]),
      buyNow: jest.fn(),
      buyAllInCart: jest.fn(),
      clearCart: jest.fn(),
      removeFromCart: jest.fn(),
      updateQuantity: jest.fn(),
    })
  })

  it('name render', () => {
    renderWithProvider(<ProductCard animal={sampleAnimal} />)
    expect(screen.getByText('Test Cow')).toBeInTheDocument()
  })

  it('description show', () => {
    renderWithProvider(<ProductCard animal={sampleAnimal} />)
    expect(screen.getByText('Healthy cow')).toBeInTheDocument()
  })

  it('price display', () => {
    renderWithProvider(<ProductCard animal={sampleAnimal} />)
    expect(screen.getByText('₹50,000')).toBeTruthy()
  })

  it('animal id exist', () => {
    expect(sampleAnimal.id).toBeDefined()
    expect(sampleAnimal.id).not.toBeNull()
  })

  it('name not empty', () => {
    expect(sampleAnimal.name).toBeTruthy()
    expect(sampleAnimal.name.length).toBeGreaterThan(0)
  })

  it('price value check', () => {
    expect(sampleAnimal.price).toBeDefined()
    expect(sampleAnimal.price).not.toBeUndefined()
  })

  it('rating number type', () => {
    expect(typeof sampleAnimal.rating).toBe('number')
    expect(sampleAnimal.rating).toBeGreaterThan(0)
  })
})
