import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const product = action.payload;
      // Use either _id or id for Firebase compatibility
      const productId = product._id || product.id;
      
      const existingItem = state.items.find(item => 
        (item._id === productId || item.id === productId)
      );
      
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            (item._id === productId || item.id === productId)
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }
      
      // Create a standardized product object
      const newProduct = {
        ...product,
        _id: productId,
        id: productId,
        quantity: 1
      };
      
      return { ...state, items: [...state.items, newProduct] };
    }
    
    case 'REMOVE_ITEM': {
      const idToRemove = action.payload;
      return { 
        ...state, 
        items: state.items.filter(item => 
          (item._id !== idToRemove && item.id !== idToRemove)
        ) 
      };
    }
    
    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;
      return {
        ...state,
        items: state.items.map(item =>
          (item._id === id || item.id === id)
            ? { ...item, quantity: quantity }
            : item
        )
      };
    }
    
    case 'ADD_MULTIPLE': {
      const { product, quantity } = action.payload;
      const productId = product._id || product.id;
      
      const existingItem = state.items.find(item => 
        (item._id === productId || item.id === productId)
      );
      
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            (item._id === productId || item.id === productId)
              ? { ...item, quantity: item.quantity + quantity }
              : item
          )
        };
      }
      
      const newProduct = {
        ...product,
        _id: productId,
        id: productId,
        quantity: quantity
      };
      
      return { ...state, items: [...state.items, newProduct] };
    }
    
    case 'CLEAR_CART':
      return { ...state, items: [] };
    
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] }, () => {
    const saved = localStorage.getItem('cart');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Ensure all items have both _id and id for compatibility
        const itemsWithBothIds = parsed.items.map(item => ({
          ...item,
          _id: item._id || item.id,
          id: item.id || item._id
        }));
        return { items: itemsWithBothIds };
      } catch (e) {
        return { items: [] };
      }
    }
    return { items: [] };
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state));
  }, [state]);

  const addToCart = (product) => {
    // Add single item (quantity 1)
    dispatch({ type: 'ADD_ITEM', payload: product });
  };
  
  const addMultipleToCart = (product, quantity) => {
    // Add multiple items at once
    dispatch({ type: 'ADD_MULTIPLE', payload: { product, quantity } });
  };
  
  const removeFromCart = (id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };
  
  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
    }
  };
  
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };
  
  const total = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{ 
      items: state.items, 
      addToCart,
      addMultipleToCart,
      removeFromCart, 
      updateQuantity, 
      clearCart,
      total,
      itemCount
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);