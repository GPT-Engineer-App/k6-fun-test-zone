import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Cat, Heart, Info, Paw, Star } from "lucide-react";

const CatBreed = ({ name, description, icon, rating }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    whileHover={{ scale: 1.05 }}
  >
    <Card className="mb-4 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-purple-400 to-pink-400 text-white">
        <CardTitle className="flex items-center gap-2">
          {icon}
          {name}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <CardDescription>{description}</CardDescription>
        <div className="flex items-center mt-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`h-4 w-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`} />
          ))}
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

const Index = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const catBreeds = [
    { name: "Siamese", description: "Known for their distinctive color points and blue eyes.", icon: <Cat className="h-5 w-5 text-blue-500" />, rating: 4 },
    { name: "Maine Coon", description: "One of the largest domestic cat breeds, known for their intelligence and playful personality.", icon: <Cat className="h-5 w-5 text-orange-500" />, rating: 5 },
    { name: "Persian", description: "Recognized for their long fur and flat faces.", icon: <Cat className="h-5 w-5 text-gray-500" />, rating: 3 },
    { name: "Bengal", description: "Known for their wild appearance and energetic personality.", icon: <Cat className="h-5 w-5 text-yellow-500" />, rating: 4 },
  ];

  const catImages = [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cat_November_2010-1a.jpg/1200px-Cat_November_2010-1a.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Orange_tabby_cat_sitting_on_fallen_leaves-Hisashi-01A.jpg/1200px-Orange_tabby_cat_sitting_on_fallen_leaves-Hisashi-01A.jpg",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % catImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

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

        <motion.div
          key={currentImageIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 relative h-[400px] rounded-lg overflow-hidden"
        >
          <img
            src={catImages[currentImageIndex]}
            alt={`Cat ${currentImageIndex + 1}`}
            className="mx-auto object-cover w-full h-full"
          />
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {catImages.map((_, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className={`w-3 h-3 rounded-full ${index === currentImageIndex ? 'bg-white' : 'bg-gray-400'}`}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </div>
        </motion.div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="breeds">Breeds</TabsTrigger>
            <TabsTrigger value="care">Care Tips</TabsTrigger>
          </TabsList>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {catBreeds.map((breed, index) => (
                    <CatBreed key={index} name={breed.name} description={breed.description} icon={breed.icon} rating={breed.rating} />
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="care">
                <Card>
                  <CardHeader>
                    <CardTitle>Cat Care Tips</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-none pl-5 space-y-4">
                      {[
                        { tip: "Provide a balanced diet", icon: "🍽️" },
                        { tip: "Regular veterinary check-ups", icon: "🏥" },
                        { tip: "Keep the litter box clean", icon: "🧹" },
                        { tip: "Offer mental and physical stimulation", icon: "🧠" },
                        { tip: "Groom your cat regularly", icon: "🪮" },
                      ].map((item, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center text-lg"
                        >
                          <span className="mr-2 text-2xl">{item.icon}</span>
                          {item.tip}
                        </motion.li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
            </motion.div>
          </AnimatePresence>
        </Tabs>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { icon: <Heart className="h-4 w-4 mr-1" />, text: "Loving" },
              { icon: <Paw className="h-4 w-4 mr-1" />, text: "Playful" },
              { icon: <Info className="h-4 w-4 mr-1" />, text: "Intelligent" },
              { icon: <Cat className="h-4 w-4 mr-1" />, text: "Independent" },
              { icon: <Star className="h-4 w-4 mr-1" />, text: "Charming" },
            ].map((badge, index) => (
              <Badge
                key={index}
                variant="outline"
                className="text-purple-800 border-purple-800 px-4 py-2 text-lg transition-all hover:bg-purple-100"
              >
                {badge.icon} {badge.text}
              </Badge>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
