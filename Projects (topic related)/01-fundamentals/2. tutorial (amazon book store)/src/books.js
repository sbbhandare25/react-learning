// NEED TO IMPORT EACH AND EVERY IMAGE INDIVIDUALLY.
import img1 from './images/good-energy.jpg'
import img2 from './images/places-youll-go.jpg'

export const bookList = [
  {
    id: 1,
    author: 'Casey Means',
    title: 'Good Energy',
    // Public image. This can accessed publicly using url:	http://localhost:3000/images/good-energy.jpg *
    // img: './images/good-energy.jpg',
    // Local image. OPTIMIZED by react when creating prod build.
    img: img1,
  },
  {
    id: 2,
    title: "Oh, the Places You'll Go!",
    author: 'Dr. Seuss',
    // Public image.
    img: './images/places-youll-go.jpg',
    // Local image. OPTIMIZED by react when creating prod build.
    img: img2,
  },
]
