"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"
import { ShoppingCart, Plus, Minus, X } from "lucide-react"

interface Product {
  id: number
  name: string
  price: number
  image: string
  description: string
}

interface CartItem extends Product {
  quantity: number
}

const products: Product[] = [
  {
    id: 1,
    name: "Elegant Tea Set",
    price: 299,
    image: "https://images.pexels.com/photos/1350560/pexels-photo-1350560.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "Handcrafted porcelain tea set with gold accents"
  },
  {
    id: 2,
    name: "Luxury Dinner Plates",
    price: 189,
    image: "https://images.pexels.com/photos/6270876/pexels-photo-6270876.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "Set of 6 fine porcelain dinner plates"
  },
  {
    id: 3,
    name: "Decorative Vase",
    price: 149,
    image: "https://images.pexels.com/photos/1030914/pexels-photo-1030914.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "Classic white porcelain vase with silver trim"
  },
  {
    id: 4,
    name: "Coffee Cup Set",
    price: 129,
    image: "https://images.pexels.com/photos/1350556/pexels-photo-1350556.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "Premium porcelain coffee cups with gold rim"
  },
  {
    id: 5,
    name: "Serving Bowl",
    price: 179,
    image: "https://images.pexels.com/photos/5824488/pexels-photo-5824488.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "Large decorative serving bowl"
  },
  {
    id: 6,
    name: "Porcelain Figurine",
    price: 249,
    image: "https://images.pexels.com/photos/6457579/pexels-photo-6457579.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "Handcrafted decorative porcelain figurine"
  }
]

export default function TestShop() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [showCart, setShowCart] = useState(false)

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id)
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prevCart, { ...product, quantity: 1 }]
    })
  }

  const updateQuantity = (id: number, change: number) => {
    setCart(prevCart =>
      prevCart
        .map(item =>
          item.id === id
            ? { ...item, quantity: item.quantity + change }
            : item
        )
        .filter(item => item.quantity > 0)
    )
  }

  const removeFromCart = (id: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id))
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  const handlePurchase = () => {
    if (cart.length === 0) {
      alert("Your cart is empty!")
      return
    }
    alert(`Purchase successful! Total: $${getTotalPrice()}\n\nThank you for shopping with us!`)
    setCart([])
    setShowCart(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-amber-950 to-gray-900">
      <Navbar />

      <div className="container mx-auto px-6 pt-6 flex justify-end">
        <Button
          onClick={() => setShowCart(!showCart)}
          className="relative bg-gradient-to-r from-amber-500 to-yellow-600 text-gray-900 hover:opacity-90 transition-opacity shadow-xl"
          size="lg"
        >
          <ShoppingCart className="w-5 h-5 mr-2" />
          Cart
          {getTotalItems() > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
              {getTotalItems()}
            </span>
          )}
        </Button>
      </div>

      {showCart && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" onClick={() => setShowCart(false)}>
          <div
            className="fixed right-0 top-0 h-full w-full max-w-md bg-gradient-to-b from-gray-900 to-gray-800 shadow-2xl overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-transparent bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text">
                  Shopping Cart
                </h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowCart(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </Button>
              </div>

              {cart.length === 0 ? (
                <p className="text-gray-400 text-center py-8">Your cart is empty</p>
              ) : (
                <div className="space-y-4">
                  {cart.map(item => (
                    <div key={item.id} className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-amber-500/30">
                      <div className="flex gap-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-white mb-1">{item.name}</h3>
                          <p className="text-amber-400 font-bold">${item.price}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Button
                              size="icon"
                              variant="outline"
                              className="h-7 w-7 border-amber-500/50 text-amber-400 hover:bg-amber-500/20"
                              onClick={() => updateQuantity(item.id, -1)}
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="text-white font-medium w-8 text-center">{item.quantity}</span>
                            <Button
                              size="icon"
                              variant="outline"
                              className="h-7 w-7 border-amber-500/50 text-amber-400 hover:bg-amber-500/20"
                              onClick={() => updateQuantity(item.id, 1)}
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-7 w-7 text-red-400 hover:text-red-300 hover:bg-red-500/20 ml-auto"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {cart.length > 0 && (
                <div className="mt-6 pt-6 border-t border-amber-500/30">
                  <div className="flex justify-between mb-4">
                    <span className="text-lg text-gray-300">Total:</span>
                    <span className="text-2xl font-bold text-transparent bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text">
                      ${getTotalPrice()}
                    </span>
                  </div>
                  <Button
                    onClick={handlePurchase}
                    className="w-full bg-gradient-to-r from-amber-500 to-yellow-600 text-gray-900 hover:opacity-90 transition-opacity text-lg py-6 font-bold"
                  >
                    Complete Purchase
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <main className="container mx-auto px-6 py-6">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold mb-4 text-transparent bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400 bg-clip-text">
            Luxury Porcelain Collection
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Discover our exquisite collection of handcrafted porcelain pieces with elegant gold and silver accents
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {products.map(product => (
            <Card
              key={product.id}
              className="border border-amber-500/30 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all hover:-translate-y-1 overflow-hidden"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-6 space-y-4">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">{product.name}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{product.description}</p>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-transparent bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text">
                    ${product.price}
                  </span>
                  <Button
                    onClick={() => addToCart(product)}
                    className="bg-gradient-to-r from-amber-500 to-yellow-600 text-gray-900 hover:opacity-90 transition-opacity font-semibold"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      <footer className="container mx-auto px-6 py-12 mt-20 border-t border-amber-500/30">
        <div className="text-center text-gray-400">
          <p>&copy; 2024 Luxury Porcelain Collection. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
