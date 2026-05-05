import CoffeeList from "../components/CoffeeList";

const HomePage = () => {
  return (
    <div className="w-full flex flex-col pt-16">
      <div className="mb-16 text-center max-w-3xl mx-auto">
        <span className="text-[10px] font-black text-brand-medium uppercase tracking-[0.4em] mb-4 block bg-brand-beige w-fit mx-auto px-4 py-1 rounded-full">Edición Limitada</span>
        <h1 className="text-6xl font-black text-brand-dark mb-6 leading-[1.1]">
          Catálogo de <br/>
          <span className="text-brand-medium">Café Premium</span>
        </h1>
        <p className="text-brand-medium text-xl font-medium leading-relaxed">
          Descubre nuestra exclusiva selección de cafés de origen único, tostados artesanalmente para resaltar cada nota de sabor.
        </p>
      </div>

      <CoffeeList />
    </div>
  );
};

export default HomePage;
