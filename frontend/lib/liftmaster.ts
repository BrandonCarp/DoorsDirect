// LiftMaster operators (openers) and accessories carried by Doors Direct.
// Images are served from LiftMaster's own CDN / product imagery.

export type OperatorSeries = "Basic" | "Plus" | "Premium";

export interface Operator {
  model: string;
  series: OperatorSeries;
  drive: string;
  motor: string;
  shortDesc: string;
  included: string[];
  image: string;
  url: string;
}

export const operators: Operator[] = [
  {
    model: "2220L",
    series: "Basic",
    drive: "DC Chain Drive",
    motor: "3/4 HP",
    shortDesc:
      "Wi-Fi chain drive with a built-in 360° camera — a dependable, connected entry-level opener.",
    included: [
      "L993S 3-button remote",
      "L955W Multi-Function wall control",
      "Integrated 360° camera",
      "myQ app + Wi-Fi",
      "LED lighting",
    ],
    image:
      "https://allsecurityequipment.com/cdn/shop/files/LiftMaster-2220L-Chain-Drive-Garage-Opener-3-4HP-Motor-1.png?v=1760539189",
    url: "https://www.liftmaster.com/dc-chain-drive-wi-fi-with-integrated-camera/p/2220L",
  },
  {
    model: "2420L",
    series: "Basic",
    drive: "DC Chain Drive",
    motor: "3/4 HP",
    shortDesc:
      "Everything in the 2220L plus integrated battery backup so the door works during power outages.",
    included: [
      "L993M 3-button remote",
      "L955W Multi-Function wall control",
      "Integrated 360° camera",
      "Battery backup (485LM)",
      "myQ app + Wi-Fi",
    ],
    image: "https://embed.widencdn.net/img/cgi/gjlfij1aco/420px/2420L_1BEN_LM_1.png",
    url: "https://www.liftmaster.com/3-4-hps-chain-drive-opener-with-built-in-camera-battery-backup-and-myq-connectivity/p/2420L",
  },
  {
    model: "6580L",
    series: "Plus",
    drive: "DC Belt Drive",
    motor: "1 HPs*",
    shortDesc:
      "Quiet 1 HP belt drive with battery backup, dual LED lighting, and a wireless keypad included.",
    included: [
      "Two L993M 3-button remotes",
      "L979M wireless keypad",
      "L957W Motion-Detecting wall control",
      "Integrated 360° camera",
      "Dual LED lighting (1,500 lumens)",
      "Battery backup + myQ / Wi-Fi",
    ],
    image: "https://embed.widencdn.net/img/cgi/ga2uduteab/420px/6580L_LM1.png",
    url: "https://www.liftmaster.com/liftmaster-1-hps-belt-drive-opener-with-battery-backup-and-myq-connectivity/p/6580L",
  },
  {
    model: "6690L",
    series: "Plus",
    drive: "DC Belt Drive",
    motor: "1-1/4 HPs*",
    shortDesc:
      "Top belt-drive model — extra lifting power, a 2,000-lumen LED light ring, and a smart wall control.",
    included: [
      "Two L993M 3-button remotes",
      "L979M wireless keypad",
      "L958W Smart Control Panel",
      "Integrated 360° camera",
      "LED light ring (2,000 lumens)",
      "Battery backup + myQ / Wi-Fi",
    ],
    image: "https://embed.widencdn.net/img/cgi/kpvqnscbtz/420px/6690L_LM1.png",
    url: "https://www.liftmaster.com/liftmaster-1-1-4-hps-belt-drive-opener-with-battery-backup-and-myq-connectivity/p/6690L",
  },
  {
    model: "98022",
    series: "Premium",
    drive: "Wall Mount (Jackshaft)",
    motor: "DC — lifts up to 850 lbs",
    shortDesc:
      "Space-saving wall-mount jackshaft that frees the ceiling — quiet, powerful, with battery backup.",
    included: [
      "L993M 3-button remote",
      "880LMW Smart Control Panel",
      "841LM Automatic Garage Door Lock",
      "837LM remote LED light (1,000 lumens)",
      "Battery backup (485LM)",
      "myQ app + Wi-Fi",
    ],
    image:
      "https://embed.widencdn.net/img/cgi/vwh3za0nqm/420px/98022-RJO-w-accessories-1200x1200.png",
    url: "https://www.liftmaster.com/premium-series-dc-battery-backup-wall-mount-wi-fi-garage-door-opener/p/98022MC",
  },
  {
    model: "98032",
    series: "Premium",
    drive: "Wall Mount (Jackshaft), Heavy-Duty",
    motor: "DC — lifts 400–1,100 lbs",
    shortDesc:
      "Heavy-duty wall-mount for tall and heavy doors, with dual battery backup and a lifetime motor warranty.",
    included: [
      "L993M 3-button remote",
      "880LMW Smart Control Panel",
      "841LM Automatic Garage Door Lock",
      "837LM remote LED light (1,000 lumens)",
      "Dual battery backup (2× 485LM)",
      "myQ app + Wi-Fi",
    ],
    image:
      "https://allsecurityequipment.com/cdn/shop/files/LiftMaster-Residential-Wall-Mounted-Opener-98032-1.jpg?v=1708700412",
    url: "https://www.liftmaster.com/premium-series-heavy-duty-dc-battery-backup-wall-mount-wi-fi-garage-door-opener/p/98032MC",
  },
];

export type AccessoryCategory = "Remotes" | "Keypads" | "Control Panels";

export interface Accessory {
  model: string;
  name: string;
  category: AccessoryCategory;
  desc: string;
  image: string;
  url: string;
}

export const accessories: Accessory[] = [
  // Remotes
  {
    model: "L993M",
    name: "3-Button Remote",
    category: "Remotes",
    desc: "Controls up to three doors or myQ light accessories with up to 1,300 ft. range, ultra-secure encryption, and myQ setup.",
    image:
      "https://embed.widencdn.net/img/cgi/vvzdvowaek/420px/MYQ-3TX-RED-F-HR_L993M_LM_1.png",
    url: "https://www.liftmaster.com/liftmaster-3-button-remote/p/L993M",
  },
  {
    model: "893MAX",
    name: "Universal 3-Button Remote",
    category: "Remotes",
    desc: "Universal visor remote that operates up to three garage door openers or myQ light accessories, with Security+ 2.0 protection.",
    image: "https://embed.widencdn.net/img/cgi/3ttq1ozgvq/420px/893MAX_hero_1.png",
    url: "https://www.liftmaster.com/893max-universal-gate-and-garage-door-opener-remote/p/G893MAXMC",
  },
  // Keypads
  {
    model: "L979M",
    name: "Wireless Keypad",
    category: "Keypads",
    desc: "Keyless entry keypad for color learn-button openers — open and close the door with a personal PIN, no remote needed.",
    image:
      "https://embed.widencdn.net/img/cgi/et8p5gll6j/420px/L979MKeypad1_LM_1.png",
    url: "https://www.liftmaster.com/liftmaster-keypad/p/L979M",
  },
  {
    model: "L979U",
    name: "Universal Wireless Keypad",
    category: "Keypads",
    desc: "Universal keyless entry keypad that works with LiftMaster and other major garage door opener brands.",
    image:
      "https://embed.widencdn.net/img/cgi/ymc8zaddj9/420px/Accessories-CG1.3327_L979U_LM_1.png",
    url: "https://www.liftmaster.com/liftmaster-keypad-universal/p/L979U",
  },
  // Control Panels
  {
    model: "L955W",
    name: "Multi-Function Wall Control",
    category: "Control Panels",
    desc: "Large push bar plus a light control button and built-in programming for Security+ 3.0 systems.",
    image:
      "https://embed.widencdn.net/img/cgi/s625omhv6e/420px/MYQ-MFWC-F_L955W_LM_1.png",
    url: "https://www.liftmaster.com/multi-function-garage-control-panel/p/L955W",
  },
  {
    model: "L957W",
    name: "Motion-Detecting Wall Control",
    category: "Control Panels",
    desc: "Automatically turns on garage lights when it senses motion, with a large door-control push button.",
    image:
      "https://embed.widencdn.net/img/cgi/ngdtuzc31p/420px/MYQ-PIRWC-F_L957W_LM_1.png",
    url: "https://www.liftmaster.com/motion-detecting-control-panel/p/L957W",
  },
  {
    model: "L958W",
    name: "Smart Control Panel (LCD)",
    category: "Control Panels",
    desc: "LCD display showing temperature and time, motion-activated lighting, and Security+ 3.0 compatibility.",
    image:
      "https://embed.widencdn.net/img/cgi/cjw3ypomva/436px/MYQ-LCDWC-F_L958W_LM_1.png",
    url: "https://www.liftmaster.com/smart-control-panel/p/L958W",
  },
  {
    model: "889LM",
    name: "myQ Control Panel",
    category: "Control Panels",
    desc: "Motion-detecting control panel that enables smartphone control and automated lighting when paired with myQ.",
    image: "https://embed.widencdn.net/img/cgi/hmphqdql3m/420px/889LM_hero_1.png",
    url: "https://www.liftmaster.com/myq-control-panel/p/889LMMC",
  },
];
