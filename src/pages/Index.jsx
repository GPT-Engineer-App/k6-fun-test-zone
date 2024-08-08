import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { Cat, Heart, Info, Paw } from "lucide-react";

const CatBreed = ({ name, description, icon }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {icon}
          {name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  </motion.div>
);

const Index = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const catBreeds = [
    { name: "Siamese", description: "Known for their distinctive color points and blue eyes.", icon: <Cat className="h-5 w-5 text-blue-500" /> },
    { name: "Maine Coon", description: "One of the largest domestic cat breeds, known for their intelligence and playful personality.", icon: <Cat className="h-5 w-5 text-orange-500" /> },
    { name: "Persian", description: "Recognized for their long fur and flat faces.", icon: <Cat className="h-5 w-5 text-gray-500" /> },
  ];

  const catImages = [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cat_November_2010-1a.jpg/1200px-Cat_November_2010-1a.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Orange_tabby_cat_sitting_on_fallen_leaves-Hisashi-01A.jpg/1200px-Orange_tabby_cat_sitting_on_fallen_leaves-Hisashi-01A.jpg",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100 p-8">
      <div className="max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl font-bold mb-6 text-center text-purple-800"
        >
          All About Cats
        </motion.h1>

        <Carousel className="mb-8">
          <CarouselContent>
            {catImages.map((src, index) => (
              <CarouselItem key={index}>
                <img
                  src={src}
                  alt={`Cat ${index + 1}`}
                  className="mx-auto object-cover w-full h-[400px] rounded-lg"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="breeds">Breeds</TabsTrigger>
            <TabsTrigger value="care">Care Tips</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <Card>
              <CardHeader>
                <CardTitle>Cat Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xl text-gray-700">
                  Cats are fascinating creatures that have been domesticated for thousands of years. They are known for their
                  independence, agility, and affectionate nature. Cats come in various breeds, each with its unique
                  characteristics and personalities.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="breeds">
            <h2 className="text-2xl font-semibold mb-4 text-purple-800">Popular Cat Breeds</h2>
            {catBreeds.map((breed, index) => (
              <CatBreed key={index} name={breed.name} description={breed.description} icon={breed.icon} />
            ))}
          </TabsContent>
          <TabsContent value="care">
            <Card>
              <CardHeader>
                <CardTitle>Cat Care Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Provide a balanced diet</li>
                  <li>Regular veterinary check-ups</li>
                  <li>Keep the litter box clean</li>
                  <li>Offer mental and physical stimulation</li>
                  <li>Groom your cat regularly</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-center space-x-4">
          <Badge variant="outline" className="text-purple-800 border-purple-800">
            <Heart className="h-4 w-4 mr-1" /> Loving
          </Badge>
          <Badge variant="outline" className="text-purple-800 border-purple-800">
            <Paw className="h-4 w-4 mr-1" /> Playful
          </Badge>
          <Badge variant="outline" className="text-purple-800 border-purple-800">
            <Info className="h-4 w-4 mr-1" /> Intelligent
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default Index;
