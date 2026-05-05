const LoadingSpinner = ({ message = "Preparando tu café..." }) => (
  <div className="flex flex-col justify-center items-center py-32">
    <div className="relative w-24 h-24 mb-10">
      <div className="absolute inset-0 border-[6px] border-brand-beige border-t-brand-dark rounded-full animate-spin"></div>
      <div className="absolute inset-4 border-[6px] border-brand-beige border-b-brand-medium rounded-full animate-spin-slow"></div>
      <div className="absolute inset-0 flex items-center justify-center text-3xl">
        ☕
      </div>
    </div>
    <p className="text-brand-dark font-black uppercase tracking-[0.4em] text-[10px] animate-pulse">{message}</p>
  </div>
);

export default LoadingSpinner;
