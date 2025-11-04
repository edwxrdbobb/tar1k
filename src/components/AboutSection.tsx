const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">About TAR1K</h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                TAR1K is a musical artist dedicated to pushing the boundaries of contemporary sound. 
                With a unique blend of rhythm, melody, and storytelling, each composition creates 
                an immersive experience that resonates with listeners across the globe.
              </p>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                Drawing inspiration from diverse musical traditions and modern production techniques, 
                TAR1K crafts sonic landscapes that are both innovative and deeply personal. The music 
                explores themes of identity, connection, and the human experience.
              </p>

              <p className="text-lg text-muted-foreground leading-relaxed">
                With performances spanning intimate venues to major stages, TAR1K continues to evolve 
                as an artist, constantly exploring new creative territories and connecting with audiences 
                through the universal language of music.
              </p>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-border flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl font-bold text-primary mb-4">TAR1K</div>
                  <p className="text-muted-foreground">Musical Artist</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
