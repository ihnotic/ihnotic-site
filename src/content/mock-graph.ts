export type LaneId =
  | "leadership-ip"
  | "fabric-architecture"
  | "hardware-homelab"
  | "professional-timeline";

export interface LaneDefinition {
  id: LaneId;
  label: string;
  shorthand: string;
  description: string;
  accent: string;
  stats: string[];
}

export interface GraphMetric {
  label: string;
  value: string;
}

export interface GraphNode {
  id: string;
  lane: LaneId;
  title: string;
  eyebrow: string;
  summary: string;
  x: number;
  y: number;
  size: "sm" | "md" | "lg";
  status: string;
  focusLabel: string;
  metrics: GraphMetric[];
  detail: string[];
}

export interface GraphEdge {
  source: string;
  target: string;
  relation: string;
}

export interface TimelineEntry {
  year: string;
  label: string;
  detail: string;
}

export const lanes: LaneDefinition[] = [
  {
    id: "leadership-ip",
    label: "Leadership & IP",
    shorthand: "L/IP",
    description: "Patent maps, RFC direction, and advisory signal paths.",
    accent: "#d16a3d",
    stats: ["12 patents", "4 RFC tracks"],
  },
  {
    id: "fabric-architecture",
    label: "Fabric Architecture",
    shorthand: "FAB",
    description: "PCIe topology, pooling constraints, RAS surfaces, NUMA tradeoffs.",
    accent: "#0b8b8f",
    stats: ["Gen5/Gen6", "64-256 lanes"],
  },
  {
    id: "hardware-homelab",
    label: "Hardware & Homelab",
    shorthand: "LAB",
    description: "Workstation routing, monitor matrices, print profiles, calibration logs.",
    accent: "#5b6f80",
    stats: ["TB4 map", "ABS/PLA"],
  },
  {
    id: "professional-timeline",
    label: "Professional Timeline",
    shorthand: "TL",
    description: "Milestones, board roles, keynotes, and architecture inflection points.",
    accent: "#8b4d63",
    stats: ["2016-2026", "Boards + keynotes"],
  },
];

export const nodes: GraphNode[] = [
  {
    id: "leadership.patent-portfolio",
    lane: "leadership-ip",
    title: "Patent Portfolio",
    eyebrow: "Leadership & IP",
    summary: "Executive map of fabric control, arbitration, and pooled resource claims.",
    x: 16,
    y: 18,
    size: "md",
    status: "Mapped to fabric strategy",
    focusLabel: "Patent mesh",
    metrics: [
      { label: "Families", value: "12" },
      { label: "Active themes", value: "4" },
    ],
    detail: [
      "Clustered around scale-up control planes, switch arbitration, and composable GPU access.",
      "Referenced as an origin point for several architecture notes.",
    ],
  },
  {
    id: "leadership.rfc-strategy",
    lane: "leadership-ip",
    title: "RFC Strategy",
    eyebrow: "Leadership & IP",
    summary: "Working set of standards-facing positions tied to composable fabric behavior.",
    x: 38,
    y: 11,
    size: "sm",
    status: "Drafted for external alignment",
    focusLabel: "RFC queue",
    metrics: [
      { label: "Tracks", value: "4" },
      { label: "Dependencies", value: "9" },
    ],
    detail: [
      "Frames interoperability and control-path assumptions as publishable standards work.",
      "Feeds directly into the architecture lane rather than standing alone as blog content.",
    ],
  },
  {
    id: "timeline.board-roles",
    lane: "professional-timeline",
    title: "Board & Advisory Roles",
    eyebrow: "Professional Timeline",
    summary: "Current advisory and governance nodes linked to technical decision authority.",
    x: 14,
    y: 51,
    size: "sm",
    status: "Current roles",
    focusLabel: "Board signal",
    metrics: [
      { label: "Active roles", value: "3" },
      { label: "Sectors", value: "Infra / AI / Systems" },
    ],
    detail: [
      "Should read as a technical chronology node, not a biography sidebar.",
      "Acts as a bridge between the timeline lane and the leadership lane.",
    ],
  },
  {
    id: "fabric.supernode",
    lane: "fabric-architecture",
    title: "SuperNODE Topology",
    eyebrow: "Fabric Architecture",
    summary: "Primary concept node for switch-fabric scale-up and pooled accelerator layout.",
    x: 56,
    y: 28,
    size: "lg",
    status: "Default focus node",
    focusLabel: "SuperNODE",
    metrics: [
      { label: "GPU domain", value: "8-32" },
      { label: "Switch tiers", value: "2" },
      { label: "Target link", value: "PCIe Gen6" },
    ],
    detail: [
      "This is the visual center of the mockup and the first node the URL hash focuses.",
      "Every surrounding lane should be able to connect into this surface without becoming a blog roll.",
    ],
  },
  {
    id: "fabric.numa-map",
    lane: "fabric-architecture",
    title: "NUMA Locality Map",
    eyebrow: "Fabric Architecture",
    summary: "Distance and placement model for pooled GPUs, host memory, and switch attachment.",
    x: 75,
    y: 22,
    size: "md",
    status: "Latency budget view",
    focusLabel: "NUMA map",
    metrics: [
      { label: "Latency bands", value: "3" },
      { label: "Host groups", value: "4" },
    ],
    detail: [
      "Explains where pooled access stops being useful and where local attachment wins.",
      "This should prefer hard budgets and placement rules over descriptive prose.",
    ],
  },
  {
    id: "fabric.ras-paths",
    lane: "fabric-architecture",
    title: "RAS Error Paths",
    eyebrow: "Fabric Architecture",
    summary: "Escalation and containment model for link faults, poison, and serviceability events.",
    x: 84,
    y: 47,
    size: "md",
    status: "Fault containment view",
    focusLabel: "RAS graph",
    metrics: [
      { label: "Error classes", value: "7" },
      { label: "Containment hops", value: "3" },
    ],
    detail: [
      "Shows how reliability artifacts can live inside the same explorer without feeling like docs navigation.",
      "Should later support tighter edge labeling at higher zoom bands.",
    ],
  },
  {
    id: "timeline.keynote",
    lane: "professional-timeline",
    title: "Conference Keynotes",
    eyebrow: "Professional Timeline",
    summary: "Public technical milestones expressed as event nodes rather than a resume list.",
    x: 36,
    y: 46,
    size: "sm",
    status: "Public signal",
    focusLabel: "Keynote path",
    metrics: [
      { label: "Talks", value: "6" },
      { label: "Formats", value: "Keynote / Panel / Workshop" },
    ],
    detail: [
      "Connects the narrative of public talks back into the architecture and leadership material.",
      "A timeline node should still feel like part of the graph, not a footer archive.",
    ],
  },
  {
    id: "lab.tb4-routing",
    lane: "hardware-homelab",
    title: "M4 Max TB4 Routing",
    eyebrow: "Hardware & Homelab",
    summary: "Multi-monitor and hub topology map for a workstation-grade Thunderbolt layout.",
    x: 49,
    y: 71,
    size: "md",
    status: "Homelab active",
    focusLabel: "TB4 route",
    metrics: [
      { label: "Displays", value: "3" },
      { label: "Hubs", value: "2" },
    ],
    detail: [
      "This lane should feel technical enough to sit next to fabric architecture, not off in a casual blog corner.",
      "Mockup uses this as the bridge between abstract systems work and concrete desk-side topology.",
    ],
  },
  {
    id: "lab.bambu-profile",
    lane: "hardware-homelab",
    title: "Bambu Material Profiles",
    eyebrow: "Hardware & Homelab",
    summary: "ABS and PLA fabrication parameters expressed as exact profiles, not project stories.",
    x: 77,
    y: 76,
    size: "sm",
    status: "Calibration log",
    focusLabel: "Print profile",
    metrics: [
      { label: "Materials", value: "ABS / PLA" },
      { label: "Flow delta", value: "0.96-1.02" },
    ],
    detail: [
      "Captures hardware and fabrication work in the same artifact model used for architecture content.",
      "Should later expand into parameter tables and linked experiment nodes.",
    ],
  },
  {
    id: "timeline.2016-origin",
    lane: "professional-timeline",
    title: "2016 Systems Inflection",
    eyebrow: "Professional Timeline",
    summary: "Start of the visible chronology tracked as a graph node instead of a page section.",
    x: 18,
    y: 84,
    size: "sm",
    status: "Chronology anchor",
    focusLabel: "2016",
    metrics: [
      { label: "Epoch", value: "2016" },
      { label: "Role shift", value: "Platform systems" },
    ],
    detail: [
      "Timeline anchors should remain lightweight but still participate in relation highlighting.",
      "Used here to show chronology as part of the explorer rather than a separate route.",
    ],
  },
  {
    id: "timeline.2020-scale",
    lane: "professional-timeline",
    title: "2020 Scale-Up Shift",
    eyebrow: "Professional Timeline",
    summary: "Marks the transition into composable infrastructure and pooled accelerator focus.",
    x: 43,
    y: 87,
    size: "sm",
    status: "Chronology anchor",
    focusLabel: "2020",
    metrics: [
      { label: "Epoch", value: "2020" },
      { label: "Focus", value: "Composable infra" },
    ],
    detail: [
      "Links the narrative timeline directly into fabric architecture nodes.",
      "Should later align to a denser chronology rail in the bottom band.",
    ],
  },
  {
    id: "timeline.2026-current",
    lane: "professional-timeline",
    title: "2026 Current State",
    eyebrow: "Professional Timeline",
    summary: "Current operating edge of the graph with active board roles and architecture work.",
    x: 73,
    y: 89,
    size: "sm",
    status: "Current epoch",
    focusLabel: "2026",
    metrics: [
      { label: "Epoch", value: "2026" },
      { label: "Status", value: "Active" },
    ],
    detail: [
      "This node anchors the present tense of the explorer without collapsing into a bio panel.",
      "Should always stay reachable through hash focus and the bottom chronology strip.",
    ],
  },
];

export const edges: GraphEdge[] = [
  { source: "leadership.patent-portfolio", target: "fabric.supernode", relation: "derived_from" },
  { source: "leadership.rfc-strategy", target: "fabric.supernode", relation: "references" },
  { source: "timeline.board-roles", target: "leadership.patent-portfolio", relation: "advises" },
  { source: "timeline.keynote", target: "fabric.supernode", relation: "presented_at" },
  { source: "fabric.supernode", target: "fabric.numa-map", relation: "depends_on" },
  { source: "fabric.supernode", target: "fabric.ras-paths", relation: "depends_on" },
  { source: "fabric.supernode", target: "lab.tb4-routing", relation: "implemented_in" },
  { source: "lab.tb4-routing", target: "lab.bambu-profile", relation: "extends" },
  { source: "timeline.2016-origin", target: "timeline.2020-scale", relation: "chronology" },
  { source: "timeline.2020-scale", target: "timeline.2026-current", relation: "chronology" },
  { source: "timeline.2020-scale", target: "fabric.supernode", relation: "derived_from" },
  { source: "timeline.2026-current", target: "timeline.board-roles", relation: "chronology" },
  { source: "timeline.2026-current", target: "leadership.rfc-strategy", relation: "references" },
];

export const timeline: TimelineEntry[] = [
  {
    year: "2016",
    label: "Systems inflection",
    detail: "Platform systems work becomes the first explicit chronology anchor.",
  },
  {
    year: "2020",
    label: "Composable scale-up",
    detail: "Topology, pooling, and interconnect constraints become the center of gravity.",
  },
  {
    year: "2024",
    label: "Board and keynote signal",
    detail: "Public and advisory surfaces connect back into the technical graph.",
  },
  {
    year: "2026",
    label: "Current operating graph",
    detail: "Leadership, fabric work, and homelab notes live in one artifact system.",
  },
];
