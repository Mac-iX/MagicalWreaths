// ============================================================
// MAGICAL WREATHS — SITE CONTENT (the ONE file to edit)
// ============================================================
// HOW TO ADD A PHOTO:
//   1. Drop the image into attached_assets/ (repo root)
//   2. Add an import to src/data/images.ts
//   3. Add one entry to the right array below
// The site rebuilds and the photo appears automatically.
//
// HOW TO ADD/UPDATE A MARKET EVENT:
//   Add one entry to the `events` array at the bottom.
//   Empty array = site shows the general "Find Debbie at the
//   Market" text only. Entries appear as a list on the homepage.
// ============================================================

import {
  springWreath,
  coastalWreath,
  sunWreath,
  farmhouseWreath,
  tropicalWreath,
  lemonWreath,
  orangeWreath,
  ladybugWreath,
  floralBurstWreath,
  watermelonWelcome,
  coastalBow,
  patrioticBow,
  floralBow,
  booth1,
  booth2,
} from "./images";

export type Collection = {
  title: string;
  desc: string;
  /** Must match an OrderForm WREATH_STYLES id: full-floral, everyday-greenery, seasonal, coastal, holiday, farmhouse */
  style: string;
  image: string;
  /** true = crop to fill the tile; false = show the whole photo */
  cover: boolean;
};

export const collections: Collection[] = [
  {
    title: "Spring Garden",
    desc: "Bursting with gerbera daisies, sunflowers, and colorful blooms for a joyful front door.",
    style: "full-floral",
    image: springWreath,
    cover: false,
  },
  {
    title: "Coastal Charm",
    desc: "Navy mesh, seashells, and a lighthouse centerpiece. Perfect for beach lovers.",
    style: "coastal",
    image: coastalWreath,
    cover: false,
  },
  {
    title: "Best is Yet to Come",
    desc: "Vibrant orange citrus wreath with a 'The Best is Yet to Come' sign and deep plum bow. Bold and joyful.",
    style: "seasonal",
    image: orangeWreath,
    cover: true,
  },
  {
    title: "Ladybug Love",
    desc: "Red polka dots, gingham ribbon, and sweet ladybug accents. Charming and one of a kind.",
    style: "full-floral",
    image: ladybugWreath,
    cover: true,
  },
  {
    title: "Summer Sunshine",
    desc: "Bright and playful with a happy sun face and cheerful ribbon accents.",
    style: "seasonal",
    image: sunWreath,
    cover: false,
  },
  {
    title: "Farmhouse Style",
    desc: "Burlap bows, gingham ribbon, and Southern charm that says 'hey y'all' to every guest.",
    style: "farmhouse",
    image: farmhouseWreath,
    cover: false,
  },
  {
    title: "Tropical Flair",
    desc: "Hot pink deco mesh, flamingo accents, and tropical flowers for a bold statement.",
    style: "seasonal",
    image: tropicalWreath,
    cover: false,
  },
  {
    title: "Lemon Grove",
    desc: "Fresh lemons, burlap base, and a striped bow. Sunshine on your door all season long.",
    style: "everyday-greenery",
    image: lemonWreath,
    cover: false,
  },
  {
    title: "Summer Floral Burst",
    desc: "An explosion of gerberas, daisies, and butterflies in every summer color — full, lush, and joyful.",
    style: "full-floral",
    image: floralBurstWreath,
    cover: true,
  },
  {
    title: "Watermelon Welcome",
    desc: "Sweet watermelon door hanger with a layered gingham bow — the perfect summer greeting.",
    style: "seasonal",
    image: watermelonWelcome,
    cover: true,
  },
];

export type Bow = {
  title: string;
  desc: string;
  image: string;
};

export const bows: Bow[] = [
  {
    title: "Coastal Retreat",
    desc: "Turquoise starfish ribbon, sandy stripes, and seashell fabric. Pure beach house charm.",
    image: coastalBow,
  },
  {
    title: "Americana Pride",
    desc: "Stars, stripes, and 'We the People' ribbon layered into a bold patriotic statement.",
    image: patrioticBow,
  },
  {
    title: "Floral & Denim",
    desc: "Hot pink polka dots, garden florals, and soft denim. Feminine, fun, and one of a kind.",
    image: floralBow,
  },
];

export const boothPhotos = [booth1, booth2];

export type Testimonial = {
  name: string;
  location: string;
  text: string;
};

export const testimonials: Testimonial[] = [
  {
    name: "Linda H.",
    location: "Oak Island, NC",
    text: "Debbie made the most gorgeous coastal wreath for our beach house door. Every neighbor that walks by asks where we got it. She truly puts her heart into every piece.",
  },
  {
    name: "Carol Ann B.",
    location: "Wilmington, NC",
    text: "I ordered a custom bow for my mailbox and it stopped traffic — literally. Three people knocked on my door asking for Debbie's number. Quality and care like you just don't find anymore.",
  },
  {
    name: "Patsy F.",
    location: "Shallotte, NC",
    text: "She had my wreath done in less than a week and it was exactly what I described. Southern charm through and through. I've already ordered two more for Christmas gifts.",
  },
];

export type MarketEvent = {
  title: string;
  date: string;
  time: string;
  location: string;
  note?: string;
};

// Upcoming market appearances — add entries here (soonest first).
// Example:
//   { title: "Oak Island Farmers Market", date: "Saturday, October 3", time: "9:00 AM – 1:00 PM", location: "Oak Island Town Park", note: "Booth #12" },
export const events: MarketEvent[] = [];
