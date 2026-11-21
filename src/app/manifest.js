export default function manifest() {
  return {
    name:             "Miguel Ángel — Diseñador y desarrollador",
    short_name:       "Miguel Ángel",
    description:      "Portafolio de diseño y desarrollo de experiencias digitales.",
    start_url:        "/",
    display:          "standalone",
    background_color: "#080808",
    theme_color:      "#e1251b",
    lang:             "es-MX",
    icons: [
      { src: "/photo/miguel-mark.png", sizes: "192x192", type: "image/png" },
      { src: "/photo/miguel-mark.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
