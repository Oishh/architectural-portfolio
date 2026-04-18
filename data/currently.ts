export type CurrentlyEntry = {
  reading: string;
  visiting: string;
  drawing: string;
  thinking: string;
  weekLabel: string;
  updatedAt: string; // ISO date
};

export const currently: CurrentlyEntry = {
  reading: "A Pattern Language — Christopher Alexander",
  visiting: "Barangay Poblacion walkups, Makati",
  drawing: "Stair sections for tight-plan residences",
  thinking:
    "How do you design for Manila's heat without hiding from it?",
  weekLabel: "Week 16 of 2026",
  updatedAt: "2026-04-18",
};
