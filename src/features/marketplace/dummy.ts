export const categories = [
  { id: "all", name: "All Categories" },
  { id: "outdoor", name: "Outdoor Gear", icon: "🏕️" },
  { id: "electronics", name: "Electronics", icon: "📱" },
  { id: "tools", name: "Tools", icon: "🔨" },
  { id: "sports", name: "Sports Equipment", icon: "🏀" },
  { id: "party", name: "Party & Events", icon: "🎉" },
  { id: "vehicles", name: "Vehicles", icon: "🚗" },
  { id: "clothing", name: "Clothing", icon: "👕" },
  { id: "home", name: "Home & Garden", icon: "🏡" },
];

export const items = [
  {
    id: 1,
    title: "Mountain Bike",
    description: "Trek 21-Speed Mountain Bike in excellent condition",
    price: 35,
    priceUnit: "day",
    image: "/placeholder.svg?height=300&width=400",
    category: "sports",
    location: "Padang, Indonesia",
    lat: -0.9471,
    lng: 100.4172,
    distance: 1.2,
    rating: 4.9,
    reviews: 12,
    owner: {
      name: "Sarah M.",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.8,
    },
    saved: false,
  },
  {
    id: 2,
    title: "DSLR Camera",
    description: "Canon EOS with 2 lenses and carrying case",
    price: 50,
    priceUnit: "day",
    image: "/placeholder.svg?height=300&width=400",
    category: "electronics",
    location: "Bungus, Padang, Indonesia",
    lat: -1.0255,
    lng: 100.3776,
    distance: 8.5,
    rating: 4.7,
    reviews: 8,
    owner: {
      name: "John D.",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.9,
    },
    saved: true,
  },
  {
    id: 3,
    title: "Camping Tent",
    description: "4-Person Waterproof Tent with easy setup",
    price: 25,
    priceUnit: "day",
    image: "/placeholder.svg?height=300&width=400",
    category: "outdoor",
    location: "Lubuk Begalung, Padang, Indonesia",
    lat: -0.9956,
    lng: 100.3899,
    distance: 6.2,
    rating: 4.8,
    reviews: 15,
    owner: {
      name: "Ryan K.",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.7,
    },
    saved: false,
  },
  {
    id: 4,
    title: "Power Drill Set",
    description: "Cordless drill with multiple bits and attachments",
    price: 15,
    priceUnit: "day",
    image: "/placeholder.svg?height=300&width=400",
    category: "tools",
    location: "Kuranji, Padang, Indonesia",
    lat: -0.8833,
    lng: 100.4,
    distance: 7.1,
    rating: 4.6,
    reviews: 6,
    owner: {
      name: "Emily W.",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.5,
    },
    saved: false,
  },
  {
    id: 5,
    title: "Kayak",
    description: "Single-person kayak with paddle and life vest",
    price: 40,
    priceUnit: "day",
    image: "/placeholder.svg?height=300&width=400",
    category: "outdoor",
    location: "Air Tawar, Padang, Indonesia",
    lat: -0.9005,
    lng: 100.3547,
    distance: 5.3,
    rating: 4.9,
    reviews: 10,
    owner: {
      name: "Alex T.",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.8,
    },
    saved: true,
  },
  {
    id: 6,
    title: "Projector",
    description: "HD Projector with HDMI and Bluetooth connectivity",
    price: 30,
    priceUnit: "day",
    image: "/placeholder.svg?height=300&width=400",
    category: "electronics",
    location: "Padang, Indonesia",
    lat: -0.9523,
    lng: 100.4268,
    distance: 2.1,
    rating: 4.7,
    reviews: 9,
    owner: {
      name: "Jamie L.",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.6,
    },
    saved: false,
  },
  {
    id: 7,
    title: "Electric Scooter",
    description: "Foldable electric scooter with 25-mile range",
    price: 45,
    priceUnit: "day",
    image: "/placeholder.svg?height=300&width=400",
    category: "vehicles",
    location: "Padang, Indonesia",
    lat: -0.9421,
    lng: 100.4089,
    distance: 1.9,
    rating: 4.8,
    reviews: 14,
    owner: {
      name: "Chris P.",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.7,
    },
    saved: false,
  },
  {
    id: 8,
    title: "Lawn Mower",
    description: "Self-propelled gas lawn mower in great condition",
    price: 20,
    priceUnit: "day",
    image: "/placeholder.svg?height=300&width=400",
    category: "home",
    location: "Padang, Indonesia",
    lat: -0.938,
    lng: 100.4245,
    distance: 3.4,
    rating: 4.5,
    reviews: 7,
    owner: {
      name: "Taylor S.",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.4,
    },
    saved: false,
  },
  {
    id: 9,
    title: "Stand-Up Paddleboard",
    description: "Inflatable SUP with pump, paddle, and carrying bag",
    price: 35,
    priceUnit: "day",
    image: "/placeholder.svg?height=300&width=400",
    category: "outdoor",
    location: "Padang, Indonesia",
    lat: -0.9612,
    lng: 100.4156,
    distance: 5.1,
    rating: 4.9,
    reviews: 18,
    owner: {
      name: "Morgan L.",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.9,
    },
    saved: false,
  },
  {
    id: 10,
    title: "DJ Equipment",
    description: "Complete DJ setup with mixer, speakers, and lights",
    price: 120,
    priceUnit: "day",
    image: "/placeholder.svg?height=300&width=400",
    category: "party",
    location: "Padang, Indonesia",
    lat: -0.9299,
    lng: 100.4103,
    distance: 3.8,
    rating: 4.7,
    reviews: 11,
    owner: {
      name: "DJ Max",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.8,
    },
    saved: false,
  },
  {
    id: 11,
    title: "Snowboard",
    description: "Burton 158cm with bindings, perfect for intermediate riders",
    price: 40,
    priceUnit: "day",
    image: "/placeholder.svg?height=300&width=400",
    category: "sports",
    location: "Padang, Indonesia",
    lat: -0.9557,
    lng: 100.4201,
    distance: 2.7,
    rating: 4.6,
    reviews: 9,
    owner: {
      name: "Zoe K.",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.5,
    },
    saved: false,
  },
  {
    id: 12,
    title: "Drone",
    description: "DJI Mavic Air 2 with extra batteries and carrying case",
    price: 65,
    priceUnit: "day",
    image: "/placeholder.svg?height=300&width=400",
    category: "electronics",
    location: "Padang, Indonesia",
    lat: -0.9445,
    lng: 100.4132,
    distance: 1.5,
    rating: 4.8,
    reviews: 14,
    owner: {
      name: "Theo J.",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.7,
    },
    saved: false,
  },
  {
    id: 13,
    title: "Pressure Washer",
    description: "3000 PSI gas pressure washer with multiple nozzles",
    price: 45,
    priceUnit: "day",
    image: "/placeholder.svg?height=300&width=400",
    category: "tools",
    location: "Padang, Indonesia",
    lat: -0.9658,
    lng: 100.4312,
    distance: 4.3,
    rating: 4.5,
    reviews: 8,
    owner: {
      name: "Hank G.",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.6,
    },
    saved: false,
  },
  {
    id: 14,
    title: "Road Bike",
    description: "Specialized carbon fiber road bike, size medium",
    price: 50,
    priceUnit: "day",
    image: "/placeholder.svg?height=300&width=400",
    category: "sports",
    location: "Padang, Indonesia",
    lat: -0.9334,
    lng: 100.4189,
    distance: 2.2,
    rating: 4.9,
    reviews: 16,
    owner: {
      name: "Liam P.",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.8,
    },
    saved: false,
  },
  {
    id: 15,
    title: "Karaoke Machine",
    description:
      "Professional karaoke system with 2 microphones and song library",
    price: 55,
    priceUnit: "day",
    image: "/placeholder.svg?height=300&width=400",
    category: "party",
    location: "Padang, Indonesia",
    lat: -0.9498,
    lng: 100.4056,
    distance: 3.1,
    rating: 4.7,
    reviews: 12,
    owner: {
      name: "Sophia R.",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.6,
    },
    saved: false,
  },
  {
    id: 16,
    title: "Carpet Cleaner",
    description: "Professional-grade carpet cleaner with upholstery attachment",
    price: 35,
    priceUnit: "day",
    image: "/placeholder.svg?height=300&width=400",
    category: "home",
    location: "Padang, Indonesia",
    lat: -0.9402,
    lng: 100.4223,
    distance: 1.8,
    rating: 4.6,
    reviews: 9,
    owner: {
      name: "Nina C.",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.5,
    },
    saved: false,
  },
  {
    id: 17,
    title: "GoPro Camera",
    description: "GoPro Hero 10 with accessories and waterproof case",
    price: 40,
    priceUnit: "day",
    image: "/placeholder.svg?height=300&width=400",
    category: "electronics",
    location: "Padang, Indonesia",
    lat: -0.9578,
    lng: 100.4087,
    distance: 2.9,
    rating: 4.8,
    reviews: 15,
    owner: {
      name: "Omar T.",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.7,
    },
    saved: false,
  },
  {
    id: 18,
    title: "Folding Tables",
    description: "Set of 2 tables and 12 chairs for events and parties",
    price: 45,
    priceUnit: "day",
    image: "/placeholder.svg?height=300&width=400",
    category: "party",
    location: "Padang, Indonesia",
    lat: -0.9267,
    lng: 100.4278,
    distance: 3.5,
    rating: 4.5,
    reviews: 10,
    owner: {
      name: "Priya M.",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.6,
    },
    saved: false,
  },
  {
    id: 19,
    title: "Surfboard",
    description: "7ft beginner-friendly foam surfboard",
    price: 30,
    priceUnit: "day",
    image: "/placeholder.svg?height=300&width=400",
    category: "outdoor",
    location: "Padang, Indonesia",
    lat: -0.9689,
    lng: 100.4167,
    distance: 6.2,
    rating: 4.7,
    reviews: 11,
    owner: {
      name: "Kai L.",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.8,
    },
    saved: false,
  },
  {
    id: 20,
    title: "Air Compressor",
    description: "Portable air compressor with various attachments",
    price: 25,
    priceUnit: "day",
    image: "/placeholder.svg?height=300&width=400",
    category: "tools",
    location: "Padang, Indonesia",
    lat: -0.9365,
    lng: 100.4145,
    distance: 2.4,
    rating: 4.6,
    reviews: 8,
    owner: {
      name: "Victor H.",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.5,
    },
    saved: false,
  },
  {
    id: 21,
    title: "Telescope",
    description: "8-inch Dobsonian telescope with tripod and eyepieces",
    price: 45,
    priceUnit: "day",
    image: "/placeholder.svg?height=300&width=400",
    category: "electronics",
    location: "Padang, Indonesia",
    lat: -0.9534,
    lng: 100.4334,
    distance: 4.7,
    rating: 4.9,
    reviews: 13,
    owner: {
      name: "Stella N.",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.8,
    },
    saved: false,
  },
  {
    id: 22,
    title: "Canoe",
    description: "2-person canoe with paddles and life vests",
    price: 50,
    priceUnit: "day",
    image: "/placeholder.svg?height=300&width=400",
    category: "outdoor",
    location: "Padang, Indonesia",
    lat: -0.9723,
    lng: 100.4089,
    distance: 5.3,
    rating: 4.8,
    reviews: 14,
    owner: {
      name: "River J.",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.7,
    },
    saved: false,
  },
  {
    id: 23,
    title: "Sewing Machine",
    description: "Brother computerized sewing machine with accessories",
    price: 20,
    priceUnit: "day",
    image: "/placeholder.svg?height=300&width=400",
    category: "home",
    location: "Padang, Indonesia",
    lat: -0.9456,
    lng: 100.4289,
    distance: 1.6,
    rating: 4.7,
    reviews: 9,
    owner: {
      name: "Tara B.",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.6,
    },
    saved: false,
  },
  {
    id: 24,
    title: "Snowshoes",
    description: "Pair of adjustable snowshoes with poles",
    price: 15,
    priceUnit: "day",
    image: "/placeholder.svg?height=300&width=400",
    category: "outdoor",
    location: "Padang, Indonesia",
    lat: -0.9312,
    lng: 100.4234,
    distance: 3.2,
    rating: 4.6,
    reviews: 7,
    owner: {
      name: "Frost Y.",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.5,
    },
    saved: false,
  },
];
