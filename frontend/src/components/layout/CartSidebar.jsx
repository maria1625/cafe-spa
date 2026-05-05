import { useState } from "react";
import { useCoffeeStore } from "../../store/useCoffeeStore";

const CartSidebar = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, addToCart, clearItemFromCart } = useCoffeeStore();
  const [previewImage, setPreviewImage] = useState(null);
  
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose}></div>
      
      {/* Sidebar */}
      <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-white dark:bg-black shadow-2xl flex flex-col animate-slide-left border-l border-brand-light/20">
        <div className="p-8 border-b border-brand-light/10 flex justify-between items-center bg-brand-bg dark:bg-brand-dark/20">
          <div>
            <h2 className="text-2xl font-black text-brand-dark dark:text-white uppercase tracking-tighter">Tu Carrito</h2>
            <p className="text-[10px] font-black text-brand-medium dark:text-gray-400 uppercase tracking-widest mt-1">
              {cart.length} Artículos seleccionados
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-3 hover:bg-brand-light/10 rounded-full transition-colors dark:text-white"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 bg-brand-light/10 rounded-full flex items-center justify-center mb-6">
                <svg className="w-10 h-10 text-brand-medium opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <p className="text-brand-medium font-bold uppercase tracking-widest text-xs">Tu carrito está vacío</p>
              <button 
                onClick={onClose}
                className="mt-6 text-brand-medium dark:text-white underline font-black text-[10px] uppercase tracking-widest"
              >
                Explorar catálogo
              </button>
            </div>
          ) : (
            cart.map((item) => {
              return (
                <div key={item.id} className="flex gap-6 group animate-fade-in">
                  {/* Imagen del producto con efecto Zoom */}
                  <div 
                    className="relative w-28 h-28 rounded-3xl overflow-hidden bg-brand-light/10 flex-shrink-0 border-2 border-brand-light/20 group-hover:border-brand-medium transition-all duration-500 cursor-pointer shadow-lg"
                    onClick={() => setPreviewImage(item.imageUrl)}
                    title="Clic para ampliar"
                  >
                    <img 
                      src={item.imageUrl} 
                      alt={item.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                      <svg className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </div>
                  </div>

                  <div className="flex-1 py-1">
                    <div className="flex justify-between items-start">
                      <h4 className="font-black text-brand-dark dark:text-white text-base uppercase leading-tight tracking-tight">{item.name}</h4>
                      <span className="font-black text-brand-dark dark:text-white text-base tracking-tighter">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                    <p className="text-[10px] text-brand-medium dark:text-gray-400 font-bold uppercase tracking-[0.2em] mt-2 mb-4">
                      {item.brand}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center bg-brand-light/10 dark:bg-white/10 rounded-xl border border-brand-light/20 p-1.5">
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-brand-medium/20 rounded-lg text-brand-dark dark:text-white transition-colors font-black"
                        >
                          -
                        </button>
                        <span className="px-4 text-sm font-black text-brand-dark dark:text-white">{item.quantity}</span>
                        <button 
                          onClick={() => addToCart(item)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-brand-medium/20 rounded-lg text-brand-dark dark:text-white transition-colors font-black"
                        >
                          +
                        </button>
                      </div>
                      <button 
                        onClick={() => clearItemFromCart(item.id)}
                        className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg group/del transition-all"
                        title="Eliminar producto"
                      >
                        <svg className="w-5 h-5 text-red-500 group-hover/del:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-8 border-t border-brand-light/20 bg-brand-bg dark:bg-brand-dark/20">
            <div className="flex justify-between items-end mb-8">
              <span className="text-[10px] font-black text-brand-medium dark:text-gray-400 uppercase tracking-[0.3em]">Total estimado</span>
              <span className="text-3xl font-black text-brand-dark dark:text-white tracking-tighter">${total.toFixed(2)}</span>
            </div>
            <button className="w-full btn-premium py-6 flex items-center justify-center gap-3 group">
              <span className="font-black uppercase tracking-[0.2em] text-sm">Finalizar Pedido</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Modal de Vista Previa de Imagen */}
      {previewImage && (
        <div 
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/90 animate-fade-in"
          onClick={() => setPreviewImage(null)}
        >
          <div className="relative max-w-4xl w-full aspect-square rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white/10 animate-scale-in">
            <img src={previewImage} alt="Vista previa" className="w-full h-full object-cover" />
            <button 
              className="absolute top-8 right-8 w-12 h-12 bg-black/50 backdrop-blur-md rounded-full text-white flex items-center justify-center hover:bg-white hover:text-black transition-all"
              onClick={() => setPreviewImage(null)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartSidebar;
