import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const goToSignup = () => navigate("/signup");
  const gotoHome = () => navigate("/home");

  
  const heroMainUrl =
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCEQUcuTBGSPHgAWyM6TZmHI5LDo0iTX_220OcBJllFsLHSuyoz4TrP-C3lFlJkC1TZLOSxHZfCdcjz2IPsGTs2zlRnin6CHzxy2sOk5-r20dfIN4UZ-rYboIDsD7_rrLrCzCg6uK88NSJFccqv5Aj4hJtEu12FipUR1cG1e0tsXx_J3v9mzxPAfGm1P_zHVczkURN3pwXcfwKCpNpR6jPt6-2pJomPQd3UXn_SQHHE-P8ouUkDhzQCqy-cEvD6hUu-bBCf2g_zf-M";

  const onContinue = () => {
    
    gotoHome();
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") onContinue();
  };

  return (
    <div
      className="relative flex min-h-screen w-full flex-col bg-[#fbf8f9] overflow-x-hidden"
      style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col w-[512px] max-w-[512px] py-5 max-w-[960px] flex-1">
            

            {/* Main hero with overlay text */}
            <div className="p-4">
              <div
                className="bg-cover bg-center flex flex-col items-stretch justify-end rounded-lg pt-[132px]"
                style={{
                  backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 100%), url("${heroMainUrl}")`,
                }}
              >
                <div className="flex w-full items-end justify-between gap-4 p-4">
                  <div className="flex max-w-[440px] flex-1 flex-col gap-1">
                    <p className="text-white tracking-light text-2xl font-bold leading-tight max-w-[440px]">
                      Welcome to Commute Buddy
                    </p>
                    <p className="text-white text-base font-medium leading-normal">
                      Connect with fellow York University students who share
                      your TTC, YRT, or GO Transit routes. Make your daily
                      commute safer, more social, and predictable.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Email field */}
            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <div className="flex w-full flex-1 items-stretch rounded-lg">
                  <input
                    placeholder="Email"
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#1b0e0f] focus:outline-0 focus:ring-0 border border-[#e6d1d2] bg-[#fbf8f9] focus:border-[#e6d1d2] h-14 placeholder:text-[#955056] p-[15px] rounded-r-none border-r-0 pr-2 text-base font-normal leading-normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={onKeyDown}
                    type="email"
                  />
                  <div
                    className="text-[#955056] flex border border-[#e6d1d2] bg-[#fbf8f9] items-center justify-center pr-[15px] rounded-r-lg border-l-0"
                    data-icon="Check"
                    data-size="24px"
                    data-weight="regular"
                    aria-hidden="true"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 256 256"
                    >
                      <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path>
                    </svg>
                  </div>
                </div>
              </label>
            </div>

            {/* Continue button */}
            <div className="flex px-4 py-3">
              <button
                onClick={onContinue}
                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 flex-1 bg-[#ce1c2b] text-[#fbf8f9] text-sm font-bold leading-normal tracking-[0.015em]"
              >
                <span className="truncate">Continue</span>
              </button>
            </div>

            {/* Sign up link */}
            <p
              onClick={goToSignup}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && goToSignup()}
              className="cursor-pointer text-[#955056] text-sm font-normal leading-normal pb-3 pt-1 px-4 text-center underline"
            >
              Don&apos;t have an account? Sign up
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
