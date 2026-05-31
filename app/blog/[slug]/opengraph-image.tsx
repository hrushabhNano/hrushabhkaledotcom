import { ImageResponse } from 'next/og';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export const alt = 'Hrushabh Kale - Blog Post';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({ params }: { params: { slug: string } }) {
  let title = 'Blog Post';
  let dateStr = '';

  try {
    const source = fs.readFileSync(
      path.join(process.cwd(), 'data/blog', `${params.slug}.mdx`),
      'utf8'
    );
    const { data } = matter(source);
    if (data.title) title = data.title;
    if (data.publishedAt) {
      dateStr = new Date(data.publishedAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    }
  } catch (error) {
    console.error(`Error reading frontmatter for OG Image: ${error}`);
  }

  // Load font and avatar
  const fontPath = path.join(
    process.cwd(),
    'node_modules/geist/dist/fonts/geist-sans/Geist-Bold.ttf'
  );
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
          backgroundColor: '#fafafa',
          color: '#111111',
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
          {/* Top: Metadata */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
            }}
          >
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
                textTransform: 'uppercase',
              }}
            >
              Writing
            </div>
            {dateStr && (
              <div
                style={{
                  fontSize: '24px',
                  color: '#71717a',
                  fontWeight: 'bold',
                }}
              >
                — {dateStr}
              </div>
            )}
          </div>

          {/* Center: Title */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h1
              style={{
                fontSize: title.length > 50 ? '64px' : '76px', // adjust size based on length
                fontWeight: 800,
                letterSpacing: '-0.04em',
                lineHeight: 1.15,
                margin: '0 0 32px 0',
                color: '#000000',
              }}
            >
              {title}
            </h1>
          </div>

          {/* Bottom: Author Avatar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
            }}
          >
            <img
              src={avatarBase64}
              alt="Hrushabh Kale"
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                border: '2px solid rgba(0,0,0,0.1)',
                objectFit: 'cover',
              }}
            />
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <div style={{ fontSize: '24px', fontWeight: 800, color: '#111' }}>
                Hrushabh Kale
              </div>
              <div style={{ fontSize: '18px', color: '#71717a', fontWeight: 'bold' }}>
                @hrushabhkale
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Graphic Data/Nodes */}
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
            backgroundColor: '#ffffff',
            boxShadow: '0 20px 40px rgba(0,0,0,0.05)',
            borderRadius: '12px',
            overflow: 'hidden',
          }}
        >
          {/* Dynamic grid pattern */}
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

          {/* Graphic shapes to imply blog article / data (dynamic nodes) */}
          <div
            style={{
              position: 'absolute',
              top: '40px',
              left: '40px',
              width: '80px',
              height: '80px',
              border: '2px dashed rgba(0,0,0,0.15)',
              borderRadius: '50%',
              backgroundColor: '#fafafa',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '120px',
              right: '80px',
              width: '60px',
              height: '60px',
              border: '1px solid rgba(0,0,0,0.2)',
              borderRadius: '12px',
              backgroundColor: '#fafafa',
            }}
          />
          <svg
            style={{ position: 'absolute', top: '80px', left: '120px' }}
            width="100"
            height="60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M 0 0 C 50 0, 50 60, 100 60" stroke="rgba(0,0,0,0.15)" strokeWidth="2" />
          </svg>

          {/* Markers */}
          <div style={{ position: 'absolute', top: '-14px', left: '-8px', color: 'rgba(0,0,0,0.4)', fontSize: '20px' }}>+</div>
          <div style={{ position: 'absolute', top: '-14px', right: '-8px', color: 'rgba(0,0,0,0.4)', fontSize: '20px' }}>+</div>
          <div style={{ position: 'absolute', bottom: '-14px', left: '-8px', color: 'rgba(0,0,0,0.4)', fontSize: '20px' }}>+</div>

          {/* Folded corner */}
          <svg
            style={{ position: 'absolute', bottom: 0, right: 0 }}
            width="100"
            height="100"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 100 L100 100 L100 0 Z" fill="#fafafa" />
            <path d="M0 100 L100 0 Q 50 50 0 100" fill="#ffffff" stroke="rgba(0,0,0,0.1)" strokeWidth="1" />
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
