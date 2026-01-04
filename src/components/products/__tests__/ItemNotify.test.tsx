// Simple test for ItemNotify component
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import ItemNotify from '../ItemNotify'

describe('ItemNotify', () => {
  it('shows "Added to cart" message', () => {
    render(<ItemNotify />)
    
    expect(screen.getByText('Added to cart')).toBeInTheDocument()
  })
})
