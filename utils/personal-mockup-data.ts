import { Lead, Company, Rep, Activity } from "@/types/common";
export const sarahLead: Lead = {
  id: "9f07c800-1a0e-4c2c-bc5e-e8dff23b7394",
  name: "Sarah Chen",
  companyId: "bdbf982a-0ad0-4b8e-88e1-c67fc2902cf4", // TechCorp Inc.
  title: "VP of Engineering",
  score: 87,
  priority: "high",
  stage: "qualification",
  dealValue: 125000,
  ownerId: "3b892f94-21cc-4c3e-9a84-f8ca2f8fa9ee", // Sarah Johnson
};

export const sarahCompany: Company = {
  id: "bdbf982a-0ad0-4b8e-88e1-c67fc2902cf4",
  name: "TechCorp Inc.",
};
export const sarahOwner: Rep = {
  id: "3b892f94-21cc-4c3e-9a84-f8ca2f8fa9ee",
  name: "Sarah Johnson",
  title: "Sales Rep",
  deals: 18,
  revenue: 342000,
  target: 400000,
  unknownValue: 24.1,
  performance: 85.5,
};

export const sarahActivities: Activity[] = [
  {
    id: "b7e4a3bb-3e2d-4b26-a7d6-7a19e8e229b3",
    leadId: "9f07c800-1a0e-4c2c-bc5e-e8dff23b7394",
    date: new Date("2025-06-30T09:30:00"),
    type: "Email",
    channel: "Email",
    description: "Cold introduction from mutual contact",
    outcome: "Replied",
    ownerId: "3b892f94-21cc-4c3e-9a84-f8ca2f8fa9ee", // Sarah Johnson
  },
  {
    id: "63e21407-f8c1-4c8d-877d-57c07b1c7bca",
    leadId: "9f07c800-1a0e-4c2c-bc5e-e8dff23b7394", // Sarah Chen
    date: new Date("2025-07-02T13:00:00"),
    type: "Meeting",
    channel: "Video",
    description: "Internal prep meeting to map decision process",
    outcome: "Completed",
    ownerId: "3b892f94-21cc-4c3e-9a84-f8ca2f8fa9ee", // Sarah Johnson
  },
  {
    id: "ed7b0d21-f1df-4c31-88e7-39a27a482c20",
    leadId: "9f07c800-1a0e-4c2c-bc5e-e8dff23b7394", // Sarah Chen
    date: new Date("2025-07-03T15:10:00"),
    type: "Email",
    channel: "Outreach",
    description: "Nurture email about ROI calculator",
    outcome: "Clicked",
    notes: "downloaded",
    ownerId: "3b892f94-21cc-4c3e-9a84-f8ca2f8fa9ee", // Sarah Johnson
  },
  {
    id: "4e76a59f-0b2c-416b-9e2b-9c2e5c3ee701",
    leadId: "9f07c800-1a0e-4c2c-bc5e-e8dff23b7394", // Sarah Chen
    date: new Date("2025-07-04T11:45:00"),
    type: "Call",
    channel: "Phone",
    description: "Follow-up on security questionnaire",
    outcome: "Completed",
    notes: "sent SOC 2 docs",
    ownerId: "3b892f94-21cc-4c3e-9a84-f8ca2f8fa9ee", // Sarah Johnson
  },
  {
    id: "2b1cf4a2-4c74-4b69-8a97-c99e4c49c4f6",
    leadId: "9f07c800-1a0e-4c2c-bc5e-e8dff23b7394", // Sarah Chen
    date: new Date("2025-07-07T09:00:00"),
    type: "Task",
    channel: "CRM Note",
    description: "Logged win/loss reasons from similar past deal",
    outcome: "Completed",
    ownerId: "3b892f94-21cc-4c3e-9a84-f8ca2f8fa9ee", // Sarah Johnson
  },
  {
    id: "b76345ca-1847-48d0-9f7d-05e2f50e6f5a",
    leadId: "9f07c800-1a0e-4c2c-bc5e-e8dff23b7394", // Sarah Chen
    date: new Date("2025-07-08T16:30:00"),
    type: "Meeting",
    channel: "Video",
    description: "Detailed product demo with Sarah + 2 staff",
    outcome: "Completed",
    notes: "questions on API limits",
    ownerId: "3b892f94-21cc-4c3e-9a84-f8ca2f8fa9ee", // Sarah Johnson
  },
  {
    id: "f7b48fdd-97a4-4de2-81a2-cfc327da4f9e",
    leadId: "9f07c800-1a0e-4c2c-bc5e-e8dff23b7394", // Sarah Chen
    date: new Date("2025-07-09T14:15:00"),
    type: "Email",
    channel: "Outreach",
    description: "Sent technical one-pager and case study",
    outcome: "Opened",
    notes: "forwarded internally",
    ownerId: "3b892f94-21cc-4c3e-9a84-f8ca2f8fa9ee", // Sarah Johnson
  },
  {
    id: "e5d0d3f2-f9e7-4bba-8c8c-8b7d426eebcb",
    leadId: "9f07c800-1a0e-4c2c-bc5e-e8dff23b7394", // Sarah Chen
    date: new Date("2025-07-10T10:00:00"),
    type: "Call",
    channel: "Phone",
    description:
      "Quick qualification call to confirm TechCorp’s current pain points",
    outcome: "Completed",
    notes: "strong interest",
    ownerId: "3b892f94-21cc-4c3e-9a84-f8ca2f8fa9ee", // Sarah Johnson
  },
];
