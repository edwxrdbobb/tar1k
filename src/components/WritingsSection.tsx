import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const WritingsSection = () => {
  const writings = [
    {
      title: "The Evolution of Sound",
      date: "November 2025",
      excerpt: "Exploring how technology and tradition merge to create new musical possibilities...",
      readTime: "5 min read",
    },
    {
      title: "Rhythm and Identity",
      date: "October 2025",
      excerpt: "A reflection on how cultural heritage influences contemporary musical expression...",
      readTime: "7 min read",
    },
    {
      title: "Creative Process Unveiled",
      date: "September 2025",
      excerpt: "An inside look at the journey from concept to finished composition...",
      readTime: "6 min read",
    },
  ];

  return (
    <section id="writings" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">Writings</h2>
          <p className="text-muted-foreground text-center mb-12">
            Thoughts, reflections, and stories from the creative journey
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {writings.map((writing, index) => (
              <Card key={index} className="hover:border-primary transition-colors cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-xl">{writing.title}</CardTitle>
                  <CardDescription className="flex items-center justify-between">
                    <span>{writing.date}</span>
                    <span>{writing.readTime}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{writing.excerpt}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WritingsSection;
