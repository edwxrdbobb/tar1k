const GallerySection = () => {
  // Placeholder images - these would be replaced with actual performance photos
  const images = [
    { id: 1, alt: "Live performance" },
    { id: 2, alt: "Studio session" },
    { id: 3, alt: "Concert crowd" },
    { id: 4, alt: "Backstage moment" },
    { id: 5, alt: "Stage setup" },
    { id: 6, alt: "Festival appearance" },
  ];

  return (
    <section id="gallery" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">Gallery</h2>
          <p className="text-muted-foreground text-center mb-12">
            Moments from performances, studio sessions, and creative work
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {images.map((image) => (
              <div
                key={image.id}
                className="aspect-square rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-border overflow-hidden hover:scale-105 transition-transform cursor-pointer"
              >
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-muted-foreground">{image.alt}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
