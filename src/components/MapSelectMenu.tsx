import type { MapId } from "../data/territories";
import SerbiaMap from "../assets/maps/serbia.svg?react";
import BulgariaMap from "../assets/maps/bulgaria.svg?react";

const MAP_OPTIONS: { id: MapId; label: string; Preview: typeof SerbiaMap }[] = [
  { id: "serbia", label: "Srbija", Preview: SerbiaMap },
  { id: "bulgaria", label: "Bugarska", Preview: BulgariaMap },
];

interface MapSelectMenuProps {
  onSelectMap: (mapId: MapId) => void;
  onBack: () => void;
}

export default function MapSelectMenu({
  onSelectMap,
  onBack,
}: MapSelectMenuProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-slate-800/90 border border-slate-700/80 rounded-3xl shadow-2xl backdrop-blur-md max-w-md w-full">
      <h1 className="text-3xl font-extrabold text-sky-400 mb-6 uppercase tracking-wider">
        Izaberite mapu
      </h1>

      <div className="w-full flex flex-col gap-6">
        <div className="flex gap-3">
          {MAP_OPTIONS.map(({ id, label, Preview }) => (
            <button
              key={id}
              type="button"
              title={label}
              onClick={() => onSelectMap(id)}
              className="flex-1 p-2 rounded-xl transition-all border bg-slate-900/50 border-slate-700 hover:border-sky-400 hover:bg-sky-500/10 hover:shadow-lg hover:shadow-sky-500/25 hover:scale-105 cursor-pointer"
            >
              <Preview className="block w-full h-24" />
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={onBack}
          className="w-full py-2.5 bg-slate-700 hover:bg-slate-600 text-slate-200 font-semibold rounded-xl transition-colors cursor-pointer"
        >
          Nazad
        </button>
      </div>
    </div>
  );
}
