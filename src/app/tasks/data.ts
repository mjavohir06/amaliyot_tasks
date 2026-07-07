export type Avatar = { gradient: string; initials: string; image?: string };

export type Subtask = { title: string; done: boolean };

export type Person = {
  id: string;
  name: string;
  initials: string;
  gradient: string;
  image?: string;
};

export type Label = {
  id: string;
  name: string;
  color: string;
};

export type ChecklistItem = {
  id: string;
  text: string;
  done: boolean;
};

export type Attachment = {
  id: string;
  name: string;
  meta: string;
  thumbnail: string;
};

export type Comment = {
  id: string;
  personId: string;
  time: string;
  text: string;
  reactions?: string[];
};

export type Card = {
  id: string;
  title: string;
  description?: string;
  date: string;
  tagColors: string[];
  image?: string;
  images?: string[];
  attachments?: number;
  comments?: number;
  avatars: Avatar[];
  subtasks?: { done: number; total: number; items?: Subtask[] };

  // Task-details-modal fields
  status?: "todo" | "in-progress" | "completed";
  assignedTo?: string[];
  createdBy?: string;
  labelIds?: string[];
  dueDate?: string;
  longDescription?: string;
  checklist?: ChecklistItem[];
  attachmentFiles?: Attachment[];
  commentList?: Comment[];
};

export type Column = {
  id: string;
  title: string;
  color: string;
  cards: Card[];
};

const avatarImages: Record<string, string> = {
  AT: "/assets/4.jpg",
  BN: "/assets/2.jpg",
  JH: "/assets/4.jpg",
  JS: "/assets/2.jpg",
  JW: "/assets/4.jpg",
  MK: "/assets/5.jpg",
  RC: "/assets/2.jpg",
  RL: "/assets/5.jpg",
  SB: "/assets/4.jpg",
  TQ: "/assets/5.jpg",
};

const av = (gradient: string, initials: string): Avatar => ({
  gradient,
  initials,
  image: avatarImages[initials],
});

export const people: Person[] = [
  { id: "jane", name: "Jane Wilson", initials: "JW", gradient: "from-rose-400 to-orange-400", image: avatarImages.JW },
  { id: "jacob", name: "Jacob Hawkins", initials: "JH", gradient: "from-sky-400 to-indigo-400", image: avatarImages.JH },
  { id: "regina", name: "Regina Cooper", initials: "RC", gradient: "from-orange-400 to-red-400", image: avatarImages.RC },
  { id: "shane", name: "Shane Black", initials: "SB", gradient: "from-indigo-400 to-sky-400", image: avatarImages.SB },
  { id: "raul", name: "Raul Lopez", initials: "RL", gradient: "from-amber-400 to-rose-400", image: avatarImages.RL },
];

export const labelColorOptions: string[] = [
  "bg-rose-400",
  "bg-teal-400",
  "bg-amber-400",
  "bg-emerald-500",
  "bg-sky-400",
  "bg-emerald-300",
  "bg-lime-300",
  "bg-violet-400",
  "bg-pink-400",
  "bg-gray-200",
];

export const labels: Label[] = [
  { id: "wireframing", name: "Wireframing", color: "bg-sky-400" },
  { id: "design", name: "Design", color: "bg-emerald-500" },
  { id: "frontend", name: "Frontend", color: "bg-teal-400" },
  { id: "backend", name: "Backend", color: "bg-rose-400" },
];

export const columns: Column[] = [
  {
    id: "todo",
    title: "TODO",
    color: "bg-amber-400",
    cards: [
      {
        id: "1",
        title: "Brand Logo Design",
        description: "Make a redesign of the logo in corporate colors.",
        date: "Jun 17",
        tagColors: ["bg-emerald-400", "bg-gray-200"],
        attachments: 2,
        comments: 5,
        avatars: [av("from-rose-400 to-orange-400", "JS"), av("from-sky-400 to-indigo-400", "MK")],
        status: "todo",
        assignedTo: ["jane", "jacob"],
        createdBy: "shane",
        labelIds: ["design"],
        dueDate: "Jun 20, 2026, 6:00 PM",
        longDescription: "Redesign the current logo using the updated corporate color palette. Deliver both light and dark variants.",
        checklist: [
          { id: "c1", text: "Collect brand guidelines", done: true },
          { id: "c2", text: "Draft 3 concepts", done: false },
          { id: "c3", text: "Get client feedback", done: false },
        ],
      },
      {
        id: "2",
        title: "New Header Image",
        date: "Jun 17",
        tagColors: ["bg-emerald-400", "bg-gray-200"],
        image: "/assets/image1.png",
        attachments: 1,
        comments: 3,
        avatars: [av("from-amber-400 to-rose-400", "RL")],
        status: "todo",
        assignedTo: ["raul"],
        createdBy: "shane",
        labelIds: ["design", "frontend"],
        dueDate: "Jun 21, 2026, 12:00 PM",
      },
      {
        id: "3",
        title: "Wireframe for App",
        description: "Make a wireframe for an app for pre-presentation.",
        date: "Jun 17",
        tagColors: ["bg-emerald-400", "bg-gray-200"],
        comments: 1,
        avatars: [av("from-orange-400 to-red-400", "BN"), av("from-indigo-400 to-sky-400", "TQ")],
        status: "todo",
        assignedTo: ["regina", "jacob"],
        createdBy: "jane",
        labelIds: ["wireframing"],
        dueDate: "Jun 22, 2026, 9:00 AM",
      },
    ],
  },
  {
    id: "in-progress",
    title: "IN PROGRESS",
    color: "bg-sky-400",
    cards: [
      {
        id: "4",
        title: "Updating Modules",
        description: "Step-by-step update of modules.",
        date: "Jun 17",
        tagColors: ["bg-emerald-400", "bg-gray-200"],
        subtasks: { done: 2, total: 4 },
        attachments: 2,
        comments: 5,
        avatars: [av("from-rose-400 to-orange-400", "JS"), av("from-sky-400 to-indigo-400", "MK")],
        status: "in-progress",
        assignedTo: ["jane", "jacob"],
        createdBy: "shane",
        labelIds: ["backend"],
        dueDate: "Jun 19, 2026, 3:00 PM",
        checklist: [
          { id: "c1", text: "Update auth module", done: true },
          { id: "c2", text: "Update payments module", done: true },
          { id: "c3", text: "Update notifications module", done: false },
          { id: "c4", text: "Regression test", done: false },
        ],
      },
      {
        id: "5",
        title: "Template Progress",
        description: "Designing cool UI design templates.",
        date: "Jun 17",
        tagColors: ["bg-emerald-400", "bg-gray-200"],
        subtasks: {
          done: 3,
          total: 4,
          items: [
            { title: "Inbox Template", done: true },
            { title: "Chat Template", done: true },
            { title: "Tasks Template", done: true },
            { title: "Projects Template", done: false },
          ],
        },
        attachments: 2,
        comments: 5,
        avatars: [av("from-orange-400 to-red-400", "BN"), av("from-indigo-400 to-sky-400", "TQ")],
        status: "in-progress",
        assignedTo: ["jane", "jacob", "regina"],
        createdBy: "shane",
        labelIds: ["design", "frontend"],
        dueDate: "Jun 17, 2026, 9:00 AM",
        longDescription:
          "We need to develop several options (Inbox template, Chat template, Tasks template, Projects template) to carefully work out the medium details.",
        checklist: [
          { id: "c1", text: "Inbox Template", done: true },
          { id: "c2", text: "Chat Template", done: true },
          { id: "c3", text: "Tasks Template", done: true },
          { id: "c4", text: "Projects Template", done: false },
        ],
        attachmentFiles: [
          { id: "a1", name: "Wireframe Mockup", meta: "Uploaded on 15.03.2020 at 13:56", thumbnail: "from-orange-300 to-rose-400" },
          { id: "a2", name: "Picture flying", meta: "Uploaded on 15.03.2020 at 14:02", thumbnail: "from-teal-300 to-emerald-500" },
          { id: "a3", name: "Picture flying", meta: "Uploaded on 15.03.2020 at 14:05", thumbnail: "from-sky-300 to-indigo-500" },
        ],
        commentList: [
          { id: "cm1", personId: "jane", time: "4 hr ago", text: "Hi Cody, any progress on the project?", reactions: ["🎉"] },
          { id: "cm2", personId: "jacob", time: "1 hr ago", text: 'Hi Jane! Yes, I just finished developing the "Chat" template.' },
          { id: "cm3", personId: "regina", time: "30 min ago", text: "Hi Jacob, will you be able to finish the last item of the task by tomorrow?" },
        ],
      },
    ],
  },
  {
    id: "completed",
    title: "COMPLETED",
    color: "bg-emerald-400",
    cards: [
      {
        id: "6",
        title: "Refresh Photo Slider",
        date: "Jun 17",
        tagColors: ["bg-emerald-400", "bg-gray-200"],
        images: [
          "/assets/image1.png",
          "/assets/3.jpg",
          "/assets/3.jpg",
        ],
        attachments: 3,
        comments: 2,
        avatars: [av("from-rose-400 to-orange-400", "JS"), av("from-sky-400 to-indigo-400", "MK")],
        status: "completed",
        assignedTo: ["jane", "jacob"],
        createdBy: "shane",
        labelIds: ["frontend"],
        dueDate: "Jun 15, 2026, 5:00 PM",
      },
      {
        id: "7",
        title: "Server Startup",
        description: "Running the server in test mode and configuring.",
        date: "Jun 17",
        tagColors: ["bg-emerald-400", "bg-gray-200"],
        comments: 17,
        avatars: [av("from-orange-400 to-red-400", "BN"), av("from-indigo-400 to-sky-400", "TQ")],
        status: "completed",
        assignedTo: ["regina", "shane"],
        createdBy: "jane",
        labelIds: ["backend"],
        dueDate: "Jun 14, 2026, 11:00 AM",
      },
      {
        id: "8",
        title: "New Background",
        date: "Jun 17",
        tagColors: ["bg-emerald-400", "bg-gray-200"],
        image: "/assets/3.jpg",
        attachments: 1,
        comments: 2,
        avatars: [av("from-amber-400 to-rose-400", "RL")],
        status: "completed",
        assignedTo: ["raul"],
        createdBy: "shane",
        labelIds: ["design"],
        dueDate: "Jun 13, 2026, 4:00 PM",
      },
    ],
  },
];
