import { ImageResponse } from 'next/og';
import fs from 'fs';
import path from 'path';

// Use Node.js runtime to read local files easily
// Omit export const runtime = 'edge' to use default Node.js

export const alt = 'Hrushabh Kale - Portfolio';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  // Read local font and avatar files
  const fontPath = path.join(process.cwd(), 'node_modules/geist/dist/fonts/geist-sans/Geist-Bold.ttf');
  const fontData = fs.readFileSync(fontPath);

  const avatarPath = path.join(process.cwd(), 'app/hrushabh-avatar-animated.png');
  const avatarData = fs.readFileSync(avatarPath);
  const avatarBase64 = `data:image/png;base64,${avatarData.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          backgroundColor: '#fafafa', // Light mode background
          color: '#111111', // Dark text
          fontFamily: '"Geist"',
          position: 'relative',
          padding: '80px',
        }}
      >
        {/* Left Side: Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            width: '65%',
            height: '100%',
            zIndex: 10,
          }}
        >
          {/* Avatar & Branding Area (replaces Vercel logo) */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '24px',
            }}
          >
            <img
              src={avatarBase64}
              alt="Hrushabh Kale"
              style={{
                width: '84px',
                height: '84px',
                borderRadius: '50%',
                border: '2px solid rgba(0,0,0,0.1)',
                objectFit: 'cover',
              }}
            />
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '8px 16px',
                backgroundColor: 'rgba(0,0,0,0.05)',
                borderRadius: '99px',
                fontSize: '20px',
                fontWeight: 'bold',
                letterSpacing: '0.02em',
                color: '#444',
              }}
            >
              @hrushabhkale
            </div>
          </div>

          {/* Main Typography */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h1
              style={{
                fontSize: '88px',
                fontWeight: 800,
                letterSpacing: '-0.04em',
                lineHeight: 1.1,
                margin: '0 0 24px 0',
                color: '#000000',
              }}
            >
              Hrushabh Kale
            </h1>
            <p
              style={{
                fontSize: '32px',
                color: '#52525b', // zinc-600 for light mode
                lineHeight: 1.4,
                margin: 0,
                maxWidth: '90%',
              }}
            >
              Tech Lead & Solutions Architect. Building AI-first systems for enterprise.
            </p>
          </div>
        </div>

        {/* Right Side: Blueprint Graphic (Light Mode) */}
        <div
          style={{
            position: 'absolute',
            right: '80px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '360px',
            height: '360px',
            display: 'flex',
            flexDirection: 'column',
            border: '1px solid rgba(0,0,0,0.1)',
            backgroundColor: '#ffffff', // Slightly brighter white box
            boxShadow: '0 20px 40px rgba(0,0,0,0.05)',
            borderRadius: '12px',
            overflow: 'hidden',
          }}
        >
          <div style={{ flex: 1, display: 'flex', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
            <div style={{ flex: 1, borderRight: '1px solid rgba(0,0,0,0.08)' }} />
            <div style={{ flex: 1, borderRight: '1px solid rgba(0,0,0,0.08)' }} />
            <div style={{ flex: 1 }} />
          </div>
          <div style={{ flex: 1, display: 'flex', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
            <div style={{ flex: 1, borderRight: '1px solid rgba(0,0,0,0.08)' }} />
            <div style={{ flex: 1, borderRight: '1px solid rgba(0,0,0,0.08)' }} />
            <div style={{ flex: 1 }} />
          </div>
          <div style={{ flex: 1, display: 'flex' }}>
            <div style={{ flex: 1, borderRight: '1px solid rgba(0,0,0,0.08)' }} />
            <div style={{ flex: 1, borderRight: '1px solid rgba(0,0,0,0.08)' }} />
            <div style={{ flex: 1 }} />
          </div>

          {/* Markers */}
          <div style={{ position: 'absolute', top: '-14px', left: '-8px', color: 'rgba(0,0,0,0.4)', fontSize: '20px' }}>+</div>
          <div style={{ position: 'absolute', top: '-14px', right: '-8px', color: 'rgba(0,0,0,0.4)', fontSize: '20px' }}>+</div>
          <div style={{ position: 'absolute', bottom: '-14px', left: '-8px', color: 'rgba(0,0,0,0.4)', fontSize: '20px' }}>+</div>

          {/* Folded corner using SVG (Light Mode) */}
          <svg
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
            }}
            width="100"
            height="100"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 100 L100 100 L100 0 Z" fill="#fafafa" />
            <path d="M0 100 L100 0 Q 50 50 0 100" fill="#ffffff" stroke="rgba(0,0,0,0.1)" strokeWidth="1" />
            {/* Soft shadow for the fold */}
            <path d="M0 100 L100 0 Q 50 50 0 100" fill="rgba(0,0,0,0.02)" />
          </svg>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Geist',
          data: fontData,
          weight: 800,
          style: 'normal',
        },
      ],
    }
  );
}
