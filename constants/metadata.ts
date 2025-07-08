export const metadata = {
  title: "Dev Overflow",
  description:
    "Dev Overflow is a community-driven platform to ask and answer real-world programming questions. Learn, grow, and connect with developers around the world.",

  generator: "Next.js",
  applicationName: "Devflow",
  referrer: "origin-when-cross-origin",

  keywords: [
    "Dev Overflow",
    "programming questions",
    "developer Q&A",
    "web development",
    "JavaScript",
    "React",
    "Node.js",
    "algorithms",
    "data structures",
    "developer community",
  ],

  authors: [{ name: "Mingqi Xu" }, { name: "Devflow Project" }],
  creator: "Mingqi Xu",
  publisher: "Devflow Project",

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: "/images/site-logo.svg", // regular favicon
    shortcut: "/favicon.ico", // browser address bar icon
    apple: "/apple-touch-icon.png", // Apple devices
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#5bbad5",
      },
    ],
  },

  // Optional: Theme color for browser UI and mobile experience
  themeColor: "#18181b",

  // Optional: Color for Microsoft tiles and pinned sites
  msapplication: {
    TileColor: "#ffffff",
    TileImage: "/mstile-150x150.png",
  },
};
