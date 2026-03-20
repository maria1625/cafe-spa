import { Coffee, TrendingUp, ShoppingBag, Star } from "lucide-react";
import { useAuth } from "../context/AuthContext";

/**
 * DashboardPage
 * Diseño EXACTO del nuevo Figma (Mockup_SPA_Catálogo_Café.zip).
 * Sin shadcn/ui — solo divs con Tailwind.
 */
const DashboardPage = () => {
  const { user } = useAuth();

  const stats = [
    { icon: ShoppingBag, label: "Pedidos realizados",  value: "12",  color: "bg-[#6D4C41]" },
    { icon: Star,        label: "Favoritos",            value: "8",   color: "bg-[#8D6E63]" },
    { icon: TrendingUp,  label: "Puntos acumulados",    value: "340", color: "bg-[#5D4037]" },
  ];

  const activity = [
    { action: "Pedido realizado",       item: "Ethiopian Yirgacheffe", date: "15 Mar 2026" },
    { action: "Agregado a favoritos",   item: "Italian Espresso",      date: "10 Mar 2026" },
    { action: "Valoración enviada",     item: "Colombian Supremo",     date: "05 Mar 2026" },
  ];

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ── Hero banner ── */}
        <div className="bg-gradient-to-r from-[#3E2723] to-[#5D4037] rounded-xl p-8 mb-8 text-white shadow-xl">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-white/20 rounded-full p-3">
              <Coffee className="w-10 h-10" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">
                ¡Bienvenido, {user?.name}!
              </h1>
              <p className="text-white/80 mt-1">
                Tu espacio personal en CaféHub
              </p>
            </div>
          </div>
          <p className="text-white/90">
            Explora nuestro catálogo de cafés premium y encuentra tu mezcla perfecta
          </p>
        </div>

        {/* ── Stats grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl border border-[#D7CCC8] hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-row items-center justify-between px-5 pt-5 pb-2">
                  <p className="text-sm font-medium text-[#6D4C41]">
                    {stat.label}
                  </p>
                  <div className={`${stat.color} rounded-full p-2`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                </div>
                <div className="px-5 pb-5">
                  <p className="text-3xl font-bold text-[#3E2723]">
                    {stat.value}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Actividad reciente ── */}
        <div className="bg-white rounded-xl border border-[#D7CCC8]">
          <div className="px-6 py-5 border-b border-[#EFEBE9]">
            <h2 className="text-lg font-semibold text-[#3E2723]">
              Actividad Reciente
            </h2>
          </div>
          <div className="px-6 py-2">
            {activity.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-3 border-b border-[#EFEBE9] last:border-0"
              >
                <div>
                  <p className="font-medium text-[#3E2723]">{item.action}</p>
                  <p className="text-sm text-[#6D4C41]">{item.item}</p>
                </div>
                <span className="text-sm text-[#8D6E63]">{item.date}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardPage;
