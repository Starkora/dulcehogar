import { ImageResponse } from 'next/og'
 
export const runtime = 'edge'
export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'
 
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 24,
          background: 'linear-gradient(to bottom, #ec4899, #f97316)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          borderRadius: '50%',
        }}
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="25" y="55" width="50" height="20" rx="2" fill="white" opacity="0.9"/>
          <rect x="30" y="40" width="40" height="15" rx="2" fill="white" opacity="0.95"/>
          <circle cx="40" cy="47" r="2" fill="#ec4899"/>
          <circle cx="50" cy="47" r="2" fill="#ec4899"/>
          <circle cx="60" cy="47" r="2" fill="#ec4899"/>
          <rect x="48" y="28" width="4" height="12" fill="white"/>
          <ellipse cx="50" cy="27" rx="3" ry="4" fill="#fbbf24"/>
        </svg>
      </div>
    ),
    {
      ...size,
    }
  )
}
