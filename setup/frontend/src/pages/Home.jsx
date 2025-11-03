import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const goToSignup = () => {
    navigate("/signup");
  };

  const gotoLogin = () => {
    navigate("/login");
  };

  const heroTopUrl =
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCz9Oa47AyABw6Zh4PMqjEKLXpVlYgOmF4eb4fIoj3G3po2P4_nP13dW3ggj8ybiRrcqzQwWZ6sgZzA5W36W2_vMSYjd-cKvzCCvgpTL3BqD4KiN2pxLvj512F5U2syDy6bezqkMBVz5akcaAIDbBiUkw9r4W07uAlnHfwSIzdDuAQ0UHIoG_jY2kCcRp_uFJR-UvLSHGxWMLxq2eaHAsk2PypatzfyyB4wX2XnEX7Ci2q2XkgzaaIwD4zrnpXRs-0E8W5mxoGGoIw";
  const card1 =
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDsOSalFD-uGP1-iM_yE3CCXAJ5ZXLaECVwFZ1hkNZKwnEiVBNTD7Tt9ufNZ2uyDKEbNf4Rlu0v1vOu31RoPvt7gHY9Ec-sFrlqP6cifvUp7QbIaR1t2I6GSIIQHiN3wpTv50PyGpo-dvxwHC35JCHQ9yWE4fRsALVcPnfSJMUAbCdGevA8Hz-7guF4r-giB2IX2qya7AOQfHyiFkvrpNxHx1lpJ3aNO2sdPKJxuAhn6WFX6OiMyokDeM-fwUVGz7d-EnkVoAkkEdA";
  const card2 =
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDPCOQVxmlOPkZlfyWPKbXt5uLNUjrLlfMAdCtu3Np1NwijY-ct8_UWkhd2vbQWlKM_YFXYSTn2Gd0j4e63VA7US6uYyamRroZJ7X0T23ZVx_N1wXrtJYkwdA9pzP8dxV3b7HqFrvIq_NgH4Xwg4ErAELGHce6DcnrS-lksv5qken7u8r-UwOFLK-4ULHkj-wFAy3Vudnxw0kXFFYVW1Oo0Wr3AvNjojQr9s8G1Cm8NGRF5nHtwIIwjcHMv9A033WCXdL8WCNiGzt0";
  const card3 =
    "https://lh3.googleusercontent.com/aida-public/AB6AXuD-Wbel_mo2Zbzna3QgeAZexn_TW7bJucFjry3xDtr_hhSfUq-t8BPBGimwh7rCZ6Ioccdiz2LehbjGKQHWLbamyYNMZsBr3ZKsysgKKDf5MPMHOtiEpiiN8iRtww8nuzrUuXQppcHkLk2pQ3GRx9AzuLXqy9QMyRLwPpO7Ykz78tyY9nz4svBgTF2bw_JAQ7YJNaEvxjRWzyQHyuQLgqBiKuiy2A28a8qNkvLwVPREn6lNgBYOUN4pTVomk1brUOEdta5R_hSvQVU";

  return (
    <div
      className="relative flex min-h-screen w-full flex-col bg-[#fbf8f9] overflow-x-hidden"
      style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            {/* Tagline */}
            <h1 className="text-[#1b0e0f] tracking-light text-[32px] font-bold leading-tight px-4 text-center pb-3 pt-6">
              Find your perfect commute buddy — safer, faster, together.
            </h1>

            {/* Top image strip */}
            <div className="@container">
              <div className="@[480px]:px-4 @[480px]:py-3">
                <div
                  className="w-full bg-center bg-no-repeat bg-cover flex flex-col justify-end overflow-hidden bg-[#fbf8f9] @[480px]:rounded-lg min-h-[218px]"
                  style={{ backgroundImage: `url("${heroTopUrl}")` }}
                />
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex justify-center">
              <div className="flex flex-1 gap-3 max-w-[480px] flex-col items-stretch px-4 py-3">
                <button
                  onClick={goToSignup}
                  className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#ce1c2b] text-[#fbf8f9] text-sm font-bold leading-normal tracking-[0.015em] w-full"
                >
                  <span className="truncate">Sign In with York Email</span>
                </button>

                <button
                  onClick={goToSignup}
                  className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#f3e8e9] text-[#1b0e0f] text-sm font-bold leading-normal tracking-[0.015em] w-full"
                >
                  <span className="truncate">Continue as Guest (Demo)</span>
                </button>

                {/* Keep "Learn More" as plain text to match your current behavior */}
                <p className="text-center text-[#1b0e0f] text-sm font-bold leading-normal tracking-[0.015em] px-4">
                  Learn More
                </p>
              </div>
            </div>

            {/* Feature cards (horizontal scroll on small screens) */}
            <div className="flex overflow-y-auto [-ms-scrollbar-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div className="flex items-stretch p-4 gap-3">
                <div className="flex h-full flex-1 flex-col gap-4 rounded-lg min-w-40">
                  <div
                    className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-lg"
                    style={{ backgroundImage: `url("${card1}")` }}
                  />
                  <div>
                    <p className="text-[#1b0e0f] text-base font-medium leading-normal">
                      Match
                    </p>
                    <p className="text-[#955056] text-sm font-normal leading-normal">
                      Find students with similar commuting routes and schedules.
                    </p>
                  </div>
                </div>

                <div className="flex h-full flex-1 flex-col gap-4 rounded-lg min-w-40">
                  <div
                    className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-lg"
                    style={{ backgroundImage: `url("${card2}")` }}
                  />
                  <div>
                    <p className="text-[#1b0e0f] text-base font-medium leading-normal">
                      Connect
                    </p>
                    <p className="text-[#955056] text-sm font-normal leading-normal">
                      Chat with your commute buddy and plan your trips.
                    </p>
                  </div>
                </div>

                <div className="flex h-full flex-1 flex-col gap-4 rounded-lg min-w-40">
                  <div
                    className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-lg"
                    style={{ backgroundImage: `url("${card3}")` }}
                  />
                  <div>
                    <p className="text-[#1b0e0f] text-base font-medium leading-normal">
                      Commute Together
                    </p>
                    <p className="text-[#955056] text-sm font-normal leading-normal">
                      Enjoy safer, more social, and predictable commutes
                      together.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* end cards */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
