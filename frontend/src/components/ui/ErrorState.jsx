const ErrorState = ({ message = "Ups! Algo salió mal con tu pedido.", onRetry }) => (
  <div className="flex flex-col items-center justify-center p-12 bg-white rounded-[2rem] border-2 border-[#D7CCC8]/30 shadow-xl max-w-md mx-auto">
    <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-6">
      <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    </div>
    <h3 className="text-xl font-bold text-[#3E2723] mb-2 text-center">¡Error de Sabor!</h3>
    <p className="text-[#6D4C41] font-medium mb-8 text-center leading-relaxed">{message}</p>
    {onRetry && (
      <button 
        onClick={onRetry}
        className="px-8 py-3 bg-[#3E2723] hover:bg-[#5D4037] text-white rounded-2xl font-bold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
      >
        Reintentar conexión
      </button>
    )}
  </div>
);

export default ErrorState;
