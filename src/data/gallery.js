export const galleryCategories = ["All", "Gym", "Classes", "Trainers", "Events"]

// size: "normal" | "tall" | "wide"
// The first nine items (and the next nine) are sized so the "All" grid
// tiles perfectly with no gaps. If you change sizes, keep each batch of 9
// adding up to 12 cells (normal = 1, tall = 2, wide = 2).
export const galleryItems = [
  { id: 1,  src: "/gallery/photo-1.webp",  category: "Gym",      size: "wide",   alt: "Main gym floor with rows of racks and free weights" },
  { id: 2,  src: "/gallery/photo-2.webp",  category: "Classes",  size: "normal", alt: "Group HIIT class working in sync during a morning session" },
  { id: 3,  src: "/gallery/photo-3.webp",  category: "Trainers", size: "tall",   alt: "Trainer demonstrating a deadlift setup to a member" },
  { id: 4,  src: "/gallery/photo-4.webp",  category: "Events",   size: "normal", alt: "Members celebrating together at a community challenge day" },
  { id: 5,  src: "/gallery/photo-5.webp",  category: "Gym",      size: "normal", alt: "Dumbbell rack lined with weights in the strength area" },
  { id: 6,  src: "/gallery/photo-6.webp",  category: "Classes",  size: "wide",   alt: "Members stretching during a yoga and mobility class" },
  { id: 7,  src: "/gallery/photo-7.webp",  category: "Trainers", size: "normal", alt: "Coach giving feedback during a one-to-one session" },
  { id: 8,  src: "/gallery/photo-8.webp",  category: "Gym",      size: "normal", alt: "Athlete chalking up before a heavy barbell lift" },
  { id: 9,  src: "/gallery/photo-9.webp",  category: "Events",   size: "normal", alt: "Members posing after finishing a group fitness event" },

  { id: 10, src: "/gallery/photo-10.webp", category: "Classes",  size: "normal", alt: "Boxing class practising pad work with a coach" },
  { id: 11, src: "/gallery/photo-11.webp", category: "Gym",      size: "tall",   alt: "Cardio area with treadmills facing large windows" },
  { id: 12, src: "/gallery/photo-12.webp", category: "Trainers", size: "normal", alt: "Trainers gathered on the gym floor before a class" },
  { id: 13, src: "/gallery/photo-13.webp", category: "Classes",  size: "wide",   alt: "Participants holding plank positions in a core class" },
  { id: 14, src: "/gallery/photo-14.webp", category: "Events",   size: "normal", alt: "Prize presentation at the Strivo member challenge" },
  { id: 15, src: "/gallery/photo-15.webp", category: "Gym",      size: "normal", alt: "Functional training zone with kettlebells and battle ropes" },
  { id: 16, src: "/gallery/photo-16.webp", category: "Trainers", size: "normal", alt: "Coach spotting a member on the bench press" },
  { id: 17, src: "/gallery/photo-17.webp", category: "Classes",  size: "wide",   alt: "Spin class riders pushing through the final sprint" },
  { id: 18, src: "/gallery/photo-18.webp", category: "Events",   size: "normal", alt: "Members and coaches sharing a post-workout moment" },
]

// DEMO CONTENT: replace with real, permission-based member photos and
// verified stories. Set `timeframe` only when it is verified.
export const transformations = [
  {
    id: "t1",
    label: "Jack R",
    before: "/gallery/Before-1.webp",
    after: "/gallery/After-1.webp",
    beforeAlt: "Sample member at the start of their training journey",
    afterAlt: "Sample member after several months of consistent training",
    caption: "Started with two coached sessions a week and built a routine around strength basics.",
    timeframe: null,
    quote: "I finally have a routine I look forward to.",
  },
  {
    id: "t2",
    label: "Nicholas D",
    before: "/gallery/Before-2.webp",
    after: "/gallery/After-2.webp",
    beforeAlt: "Sample member before joining group classes",
    afterAlt: "Sample member after joining group classes",
    caption: "Joined group classes to stay accountable and found a training community.",
    timeframe: null,
    quote: null,
  },
  {
    id: "t3",
    label: "Sarah M",
    before: "/gallery/Before-3.jpeg",
    after: "/gallery/After-3.webp",
    beforeAlt: "Sample member at their first assessment",
    afterAlt: "Sample member at a later progress review",
    caption: "Followed a personal training plan with regular progress reviews.",
    timeframe: null,
    quote: "Having a plan made all the difference.",
  },
]