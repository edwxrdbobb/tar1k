import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Music, Users, Heart } from "lucide-react";

const CommunitySection = () => {
  const initiatives = [
    {
      icon: Music,
      title: "Music Workshops",
      description: "Educational sessions bringing music education to underserved communities",
    },
    {
      icon: Users,
      title: "Collaborative Projects",
      description: "Working with emerging artists to create and share new musical works",
    },
    {
      icon: Heart,
      title: "Charitable Performances",
      description: "Benefit concerts supporting local arts programs and social causes",
    },
  ];

  return (
    <section id="community" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">Community Work</h2>
          <p className="text-muted-foreground text-center mb-12">
            Giving back through music and creative collaboration
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {initiatives.map((initiative, index) => {
              const Icon = initiative.icon;
              return (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{initiative.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{initiative.description}</CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
