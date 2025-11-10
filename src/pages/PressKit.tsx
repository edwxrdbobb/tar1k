import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const PressKit = () => {
  const pressKitPath = encodeURI("/tar1k august updated press kit.pdf");

  return (
    <div className="min-h-screen bg-background py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-5xl text-center mb-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Press Kit</h1>
          <p className="text-muted-foreground">
            Artist bio, photos, logos, and key facts. Download the complete press kit below.
          </p>
          <div className="mt-6">
            <a href={pressKitPath} download>
              <Button size="lg" className="px-8">Download Press Kit (PDF)</Button>
            </a>
          </div>
        </div>

        <Card className="mx-auto max-w-5xl">
          <CardContent className="p-0">
            <div className="w-full h-[75vh]">
              <object data={pressKitPath} type="application/pdf" className="w-full h-full">
                <iframe src={pressKitPath} className="w-full h-full" title="Press Kit PDF" />
              </object>
            </div>
          </CardContent>
        </Card>

        <div className="mx-auto max-w-5xl text-center mt-6">
          <a href={pressKitPath} download>
            <Button variant="secondary">Download PDF</Button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default PressKit;

