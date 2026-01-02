export interface Animal {
  id: string;
  name: string;
  type: string;
  description: string;
  location: string;
  state: string;
  ownerName: string;
  ownerPhone: string;
  ownerEmail: string;
  image: string;
  price: string;
  originalPrice?: string;
  rating?: number;
  reviews?: number;
  colors?: string[];
  sizes?: string[];
}

export const animals: Animal[] = [
  {
    id: "1",
    name: "Gir Cow",
    type: "Cow",
    description: "Healthy Gir breed cow, excellent milk producer. Well-maintained and vaccinated. Known for high-quality milk production.",
    location: "Ahmedabad",
    state: "Gujarat",
    ownerName: "Sahana",
    ownerPhone: "+91 9600389319",
    ownerEmail: "sahana@nativefarm.com",
    image: "/image.png",
    price: "₹65,000",
    originalPrice: "₹75,000",
    rating: 4.5,
    reviews: 132,
    colors: ["Brown", "White", "Beige"],
    sizes: ["Small", "Medium", "Large"]
  },
  {
    id: "2",
    name: "Beetal Goat",
    type: "Goat",
    description: "Premium Beetal breed goat, known for high milk and meat quality. Healthy, active and well-bred for farming.",
    location: "Jaipur",
    state: "Rajasthan",
    ownerName: "Sahana",
    ownerPhone: "+91 9600389319",
    ownerEmail: "sahana@nativefarm.com",
    image: "/goat.png",
    price: "₹18,000",
    originalPrice: "₹22,000",
    rating: 4.8,
    reviews: 89,
    colors: ["Brown", "White"],
    sizes: ["Small", "Medium"]
  },
  {
    id: "3",
    name: "Deccani Sheep",
    type: "Sheep",
    description: "Pure Deccani breed sheep, excellent wool and meat quality. Hardy, disease-resistant and perfect for farming.",
    location: "Pune",
    state: "Maharashtra",
    ownerName: "Sahana",
    ownerPhone: "+91 9600389319",
    ownerEmail: "sahana@nativefarm.com",
    image: "/sheepp.png",
    price: "₹12,000",
    originalPrice: "₹15,000",
    rating: 4.6,
    reviews: 67,
    colors: ["White", "Gray"],
    sizes: ["Small", "Medium", "Large"]
  },
  {
    id: "4",
    name: "Aseel Chicken",
    type: "Chicken",
    description: "Traditional Aseel breed chicken, known for strength and quality meat. Free-range raised with natural feed.",
    location: "Coimbatore",
    state: "Tamil Nadu",
    ownerName: "Sahana",
    ownerPhone: "+91 9600389319",
    ownerEmail: "sahana@nativefarm.com",
    image: "/chicken.png",
    price: "₹2,500",
    originalPrice: "₹3,000",
    rating: 4.9,
    reviews: 201,
    colors: ["Red", "Brown"],
    sizes: ["Small", "Medium"]
  },
  {
    id: "5",
    name: "Indigenous Pig",
    type: "Pig",
    description: "Local breed pig, well-fed and healthy. Suitable for farming and meat production with excellent growth rate.",
    location: "Guwahati",
    state: "Assam",
    ownerName: "Sahana",
    ownerPhone: "+91 9600389319",
    ownerEmail: "sahana@nativefarm.com",
    image: "/pig.png",
    price: "₹15,000",
    originalPrice: "₹18,000",
    rating: 4.7,
    reviews: 54,
    colors: ["Pink", "Brown"],
    sizes: ["Medium", "Large"]
  },
  {
    id: "6",
     type: "Duck",
  name: "Native Farm Duck",
  description: "Local duck breed, healthy and active. Ideal for egg and meat production with strong disease resistance.",
  location: "Kochi",
  state: "Kerala",
  ownerName: "Sahana",
  ownerPhone: "+91 9600389319",
  ownerEmail: "sahana@nativefarm.com",
  image: "/duck.png",
  price: "₹2,500",
  originalPrice: "₹3,200",
  rating: 4.6,
  reviews: 38,
  colors: ["White", "Brown"],
  sizes: ["Small", "Medium"]
}


];

export function getAnimalById(id: string): Animal | undefined {
  return animals.find(animal => animal.id === id);
}
