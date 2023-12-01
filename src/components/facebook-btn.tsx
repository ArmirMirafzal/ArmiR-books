import React from 'react'

const FacebookBtn = () => {
  return (
   <button
   style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "20px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "500",
    borderRadius: "4px",
    background: "none",
    width: "100%",
    height: "40px",
   }}
  >
   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
     d="M10.5 20.9C6.25 20.15 3 16.45 3 12C3 7.05 7.05 3 12 3C16.95 3 21 7.05 21 12C21 16.45 17.75 20.15 13.5 20.9L13 20.5H11L10.5 20.9Z"
     fill="url(#paint0_linear_1336_146)"
    />
    <path
     d="M15.5 14.5L15.9 12H13.5V10.25C13.5 9.55 13.75 9 14.85 9H16V6.7C15.35 6.6 14.65 6.5 14 6.5C11.95 6.5 10.5 7.75 10.5 10V12H8.24999V14.5H10.5V20.85C11 20.95 11.5 21 12 21C12.5 21 13 20.95 13.5 20.85V14.5H15.5Z"
     fill="white"
    />
    <defs>
     <linearGradient id="paint0_linear_1336_146" x1="12" y1="20.377" x2="12" y2="3" gradientUnits="userSpaceOnUse">
      <stop />
      <stop offset="1" />
     </linearGradient>
    </defs>
   </svg>
   <span>Continue with Facebook</span>
  </button>
  )
}

export default FacebookBtn