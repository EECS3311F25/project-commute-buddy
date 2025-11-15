// src/components/common/FilterBar.jsx

function FilterBar({ onFilterChange }) {
  const handleFilterClick = (filterType) => {
    
    // For now, just UI placeholder (styled buttons matching design)
    // Later, we can implement actual filtering logic
    console.log(`Filter clicked: ${filterType}`);
    if (onFilterChange) {
      onFilterChange(filterType);
    }
  };

  return (
    <div className="flex gap-3 p-3 flex-wrap pr-4">
      <button
        onClick={() => handleFilterClick("gender")}
        className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-[#f2e8e9] pl-4 pr-2 hover:bg-[#e6d1d2] transition-colors"
      >
        <p className="text-[#1a0e0f] text-sm font-medium leading-normal">Gender</p>
        <div className="text-[#1a0e0f]" data-icon="CaretDown" data-size="20px" data-weight="regular">
          <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
            <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path>
          </svg>
        </div>
      </button>

      <button
        onClick={() => handleFilterClick("schedule")}
        className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-[#f2e8e9] pl-4 pr-2 hover:bg-[#e6d1d2] transition-colors"
      >
        <p className="text-[#1a0e0f] text-sm font-medium leading-normal">Schedule</p>
        <div className="text-[#1a0e0f]" data-icon="CaretDown" data-size="20px" data-weight="regular">
          <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
            <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path>
          </svg>
        </div>
      </button>

      <button
        onClick={() => handleFilterClick("interests")}
        className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-[#f2e8e9] pl-4 pr-2 hover:bg-[#e6d1d2] transition-colors"
      >
        <p className="text-[#1a0e0f] text-sm font-medium leading-normal">Interests</p>
        <div className="text-[#1a0e0f]" data-icon="CaretDown" data-size="20px" data-weight="regular">
          <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
            <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path>
          </svg>
        </div>
      </button>

      <button
        onClick={() => handleFilterClick("transportMode")}
        className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-[#f2e8e9] pl-4 pr-2 hover:bg-[#e6d1d2] transition-colors"
      >
        <p className="text-[#1a0e0f] text-sm font-medium leading-normal">Transport Mode</p>
        <div className="text-[#1a0e0f]" data-icon="CaretDown" data-size="20px" data-weight="regular">
          <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
            <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path>
          </svg>
        </div>
      </button>
    </div>
  );
}

export default FilterBar;

