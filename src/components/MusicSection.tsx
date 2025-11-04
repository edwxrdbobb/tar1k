const MusicSection = () => {
  return (
    <section id="music" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">Music</h2>
          <p className="text-muted-foreground text-center mb-12">
            Stream and listen to the latest releases
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Spotify Embed */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Spotify</h3>
              <div className="rounded-xl overflow-hidden border border-border">
                <iframe
                  style={{ borderRadius: "12px" }}
                  src="https://open.spotify.com/embed/artist/0TnOYISbd1XYRBk9myaseg?utm_source=generator"
                  width="100%"
                  height="380"
                  frameBorder="0"
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Audiomack Embed */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Audiomack</h3>
              <div className="rounded-xl overflow-hidden border border-border bg-card p-6">
                <p className="text-muted-foreground mb-4">
                  Listen on Audiomack for exclusive tracks and releases
                </p>
                <a
                  href="https://audiomack.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                >
                  Listen on Audiomack
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MusicSection;
