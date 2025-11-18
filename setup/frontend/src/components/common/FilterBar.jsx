const commuteWindows = [
  "Early Morning (5-7 AM)",
  "Morning (7-9 AM)",
  "Midday (9 AM-1 PM)",
  "Afternoon (1-4 PM)",
  "Evening (4-7 PM)",
  "Late Evening (7-10 PM)",
];

function FilterBar({
  filters,
  onFiltersChange,
  onApply,
  onReset,
  routes = [],
  startAreas = [],
}) {
  const handleChange = (field, value) => {
    if (onFiltersChange) {
      onFiltersChange({ ...filters, [field]: value });
    }
  };

  return (
    <div className="px-4 py-3">
      <div className="rounded-2xl border border-[#f2e8e9] bg-white/80 backdrop-blur p-4 shadow-sm space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#9a5a60] font-semibold">
              Filters
            </p>
            <p className="text-[#1a0e0f] text-lg font-semibold">
              Narrow down your commute buddies
            </p>
          </div>
          <button
            type="button"
            onClick={onReset}
            className="text-sm font-medium text-[#ce1c2b] hover:text-[#a41421]"
          >
            Reset
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold uppercase tracking-wide text-[#945156]">
              Route
            </label>
            <select
              value={filters.route}
              onChange={(e) => handleChange("route", e.target.value)}
              className="rounded-lg border border-[#e6d1d2] bg-[#fbf8f9] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#ce1c2b]/30"
            >
              <option value="">Any route</option>
              {routes.map((route) => (
                <option key={route} value={route}>
                  {route}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold uppercase tracking-wide text-[#945156]">
              Start Area
            </label>
            <select
              value={filters.startArea}
              onChange={(e) => handleChange("startArea", e.target.value)}
              className="rounded-lg border border-[#e6d1d2] bg-[#fbf8f9] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#ce1c2b]/30"
            >
              <option value="">Anywhere</option>
              {startAreas.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold uppercase tracking-wide text-[#945156]">
              Commute Time
            </label>
            <select
              value={filters.commuteWindow}
              onChange={(e) => handleChange("commuteWindow", e.target.value)}
              className="rounded-lg border border-[#e6d1d2] bg-[#fbf8f9] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#ce1c2b]/30"
            >
              <option value="">Any time</option>
              {commuteWindows.map((window) => (
                <option key={window} value={window}>
                  {window}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold uppercase tracking-wide text-[#945156]">
              Min Match %
            </label>
            <input
              type="number"
              min="0"
              max="100"
              value={filters.minPercentage}
              onChange={(e) =>
                handleChange(
                  "minPercentage",
                  Math.min(100, Math.max(0, Number(e.target.value) || 0))
                )
              }
              className="rounded-lg border border-[#e6d1d2] bg-[#fbf8f9] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#ce1c2b]/30"
              placeholder="0"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onReset}
            className="rounded-lg border border-[#e6d1d2] px-4 py-2 text-sm font-semibold text-[#1a0e0f] hover:bg-[#f2e8e9]"
            type="button"
          >
            Clear Filters
          </button>
          <button
            onClick={onApply}
            className="rounded-lg bg-[#ce1c2b] px-4 py-2 text-sm font-semibold text-white hover:bg-[#b31825]"
            type="button"
          >
            Show Matches
          </button>
        </div>
      </div>
    </div>
  );
}

export default FilterBar;
