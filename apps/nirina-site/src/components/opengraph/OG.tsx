interface OGProps {
  title: string
  heroImageURL?: string
  author?: string
  publishedDate?: string
}

export default function OG({ title, heroImageURL, author, publishedDate }: OGProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '1200px',
        height: '630px',
        backgroundColor: '#ffffff',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Rainbow Background - simplified for Satori compatibility */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: '#f0f4ff',
          backgroundImage: 'linear-gradient(135deg, #f0f8ff 0%, #f5f0ff 50%, #fff0f5 100%)',
          zIndex: 0,
          opacity: 1,
        }}
      />

      {/* Content Container */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          height: '100%',
          padding: '3rem',
          zIndex: 1,
          position: 'relative',
        }}
      >
        {/* Text Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 2,
            justifyContent: 'center',
          }}
        >
          <h1
            style={{
              fontSize: '5rem',
              fontWeight: 'bold',
              color: '#1a1a1a',
              fontFamily: 'DMSerifText',
              marginBottom: '2rem',
              lineHeight: '1.1',
            }}
          >
            {title}
          </h1>

          {(author || publishedDate) && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
                marginTop: '1rem',
              }}
            >
              {author && (
                <p
                  style={{
                    fontSize: '2.5rem',
                    fontWeight: 'medium',
                    color: '#444444',
                    fontFamily: 'sans-serif',
                  }}
                >
                  Écrit par {author}
                </p>
              )}

              {publishedDate && (
                <p
                  style={{
                    fontSize: '2rem',
                    color: '#666666',
                    fontFamily: 'sans-serif',
                  }}
                >
                  {publishedDate}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Hero Image */}
        {heroImageURL && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              marginTop: '1rem',
              alignItems: 'center',
              marginLeft: '2rem',
              width: '200px',
            }}
          >
            <img
              src={heroImageURL}
              style={{
                width: '200px',
                height: '200px',
                objectFit: 'cover',
                borderRadius: '50%',
                boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
              }}
            />
          </div>
        )}
      </div>
    </div>
  )
}
