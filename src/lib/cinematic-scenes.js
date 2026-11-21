export const CINEMATIC_SCENES = [
  { id: "hero-section", file: "01-hero", framing: [0, 0] },
  { id: "about-section", file: "02-about", framing: [-1, 1] },
  { id: "work-section", file: "03-projects", framing: [1, 0] },
  { id: "experience-section", file: "04-experience", framing: [-1, -1] },
  { id: "contact-section", file: "05-contact", framing: [0, 1] },
].map(({ id, file, framing }) => ({
  id,
  src: `/videos/${file}.mp4`,
  poster: `/videos/${file}.webp`,
  framing,
}));
