// src/components/common/MatchCard.jsx
import { useState } from "react";
import SendRequestModal from "./SendRequestModal.jsx";

function MatchCard({ match }) {
  const [showModal, setShowModal] = useState(false);
  
  // default profile image if not provided
  const profileImage = match.profileImage || "https://lh3.googleusercontent.com/aida-public/AB6AXuAoLc-O2PnJl8pHJpVIiHH2M5nH3zzF_MbnnwatNEv0Nv1vCcgO6ZDV6lHaZIBsD0wvDOtFTdD7jVUqWMQq-KRB9giW4fD4oJFdIMPpkZxxcagTRQr5ip5r0cPy0f07UYzwccPkDB0Z5hx5iuG0Dm4W0RUV-hGtHtCVBu9FAiHPAehH2w8eOkOjkuPNpLCXkenU9xqe5-Z5mPtG-7IHUnubMm_so2w7nYqs8b1ozMJ9JEqbps_5abuX6nXMjj5f8_b26g4180Urz4c";
  
  // Format start area display
  const startAreaDisplay = match.startArea || "Area not specified";
  const transportModeDisplay = match.transportMode || "Not specified";
  
  const handleSendRequest = () => {
    setShowModal(true);
  };

  return (
    <>
      <div className="p-4">
        <div className="flex items-stretch justify-between gap-4 rounded-lg">
          {/* Left side: User info */}
          <div className="flex flex-[2_2_0px] flex-col gap-4">
            <div className="flex flex-col gap-1">
              <p className="text-[#1a0e0f] text-base font-bold leading-tight">
                {match.name}
              </p>
              <p className="text-[#945156] text-sm font-normal leading-normal">
                Start Area: {startAreaDisplay} · Mode: {transportModeDisplay} · Common Route: {match.commonRoutePercentage}%
              </p>
            </div>
            <button
              onClick={handleSendRequest}
              className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-8 px-4 flex-row-reverse bg-[#f2e8e9] text-[#1a0e0f] text-sm font-medium leading-normal w-fit hover:bg-[#e6d1d2] transition-colors"
            >
              <span className="truncate">Send Request</span>
            </button>
          </div>
          
          {/* Right side: Profile image */}
          <div
            className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg flex-1 min-w-[200px] bg-[#f2e8e9]"
            style={{
              backgroundImage: `url("${profileImage}")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {/* Fallback image using img tag for proper error handling */}
            <img
              src={profileImage}
              alt={`${match.name}'s profile`}
              className="w-full h-full object-cover rounded-lg opacity-0"
              onError={(e) => {
                // Hide broken image, background color will show through
                e.target.style.display = 'none';
              }}
              style={{ display: 'none' }}
            />
          </div>
        </div>
      </div>
      
      {showModal && (
        <SendRequestModal
          receiver={match.name}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}

export default MatchCard;

