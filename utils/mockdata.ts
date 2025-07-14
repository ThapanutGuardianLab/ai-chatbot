import { Activity, Company, Lead, Rep } from "@/types/common";

export const leads: Lead[] = [
  {
    id: "9f07c800-1a0e-4c2c-bc5e-e8dff23b7394",
    name: "Sarah Chen",
    companyId: "bdbf982a-0ad0-4b8e-88e1-c67fc2902cf4", // TechCorp Inc.
    title: "VP of Engineering",
    score: 87,
    priority: "high",
    stage: "qualification",
    dealValue: 125000,
    ownerId: "3b892f94-21cc-4c3e-9a84-f8ca2f8fa9ee", // Sarah Johnson
  },
  {
    id: "b9c612e6-7bb8-4ad5-bf01-0acac5c58ae7",
    name: "Marcus Johnson",
    companyId: "47b4b29a-f6fc-490b-aacf-597292b8b2be", // GlobalSystems Ltd
    title: "CTO",
    score: 73,
    priority: "high",
    stage: "proposal",
    dealValue: 89000,
    ownerId: "9a1d8f4b-cbbd-4bf1-84c2-50a2c6a437f8", // Michael Chen
  },
  {
    id: "adf388db-3e5e-4e69-82d6-7a988f417ae9",
    name: "Emily Rodriguez",
    companyId: "d38c09ff-7593-407f-a380-dad103ec5440", // StartupXYZ
    title: "Head of Operations",
    score: 92,
    priority: "high",
    stage: "negotiation",
    dealValue: 45000,
    ownerId: "f8e6547a-f7cc-46ea-9293-61e06c6f6915", // Lisa Park
  },
  {
    id: "82b2a3f2-3db1-4a8d-b9d6-6cbd2d9ea066",
    name: "David Park",
    companyId: "a0b510f2-4156-46a9-b6e5-64c42c6c334b", // Enterprise Solutions
    title: "Director of IT",
    score: 61,
    priority: "medium",
    stage: "discovery",
    dealValue: 200000,
    ownerId: "48f776f8-6aee-4dbd-8592-13d07b8c3957", // Alex Rodriguez
  },
  {
    id: "512748b2-3427-4b3e-a6d1-274146cf17d7",
    name: "Lisa Thompson",
    companyId: "92d4a3c5-b542-4c4f-8c95-96ee7c6633e9", // MidSize Corp
    title: "VP of Sales",
    score: 79,
    priority: "medium",
    stage: "qualification",
    dealValue: 67000,
    ownerId: "d2e3b593-c05f-4383-82ae-09f0a38f4c0d", // David Wilson
  },
  {
    id: "16a8d640-43e1-4ec3-b3ef-99fc8022eaa5",
    name: "Robert Kim",
    companyId: "8b845c4a-d6b6-4ce5-93e1-6ddad64d75b2", // InnovateTech
    title: "CEO",
    score: 95,
    priority: "high",
    stage: "closing",
    dealValue: 180000,
    ownerId: "48f776f8-6aee-4dbd-8592-13d07b8c3957", // Alex Rodriguez
  },
  {
    id: "bbf4e5f8-7701-44d2-aac6-e08e188ad899",
    name: "Jennifer Walsh",
    companyId: "f2ff5a53-7bb7-46e6-b8e3-942a16c92f25", // DataFlow Systems
    title: "VP of Technology",
    score: 58,
    priority: "low",
    stage: "discovery",
    dealValue: 35000,
    ownerId: "f8e6547a-f7cc-46ea-9293-61e06c6f6915", // Lisa Park
  },
];

export const companies: Company[] = [
  {
    id: "bdbf982a-0ad0-4b8e-88e1-c67fc2902cf4",
    name: "TechCorp Inc.",
  },
  {
    id: "47b4b29a-f6fc-490b-aacf-597292b8b2be",
    name: "GlobalSystems Ltd",
  },
  {
    id: "d38c09ff-7593-407f-a380-dad103ec5440",
    name: "StartupXYZ",
  },
  {
    id: "a0b510f2-4156-46a9-b6e5-64c42c6c334b",
    name: "Enterprise Solutions",
  },
  {
    id: "92d4a3c5-b542-4c4f-8c95-96ee7c6633e9",
    name: "MidSize Corp",
  },
  {
    id: "8b845c4a-d6b6-4ce5-93e1-6ddad64d75b2",
    name: "InnovateTech",
  },
  {
    id: "f2ff5a53-7bb7-46e6-b8e3-942a16c92f25",
    name: "DataFlow Systems",
  },
];

export const reps: Rep[] = [
  {
    id: "48f776f8-6aee-4dbd-8592-13d07b8c3957",
    name: "Alex Rodriguez",
    title: "Senior Sales Rep",
    deals: 23,
    revenue: 485000,
    target: 500000,
    unknownValue: 28.5,
    performance: 97,
  },
  {
    id: "3b892f94-21cc-4c3e-9a84-f8ca2f8fa9ee",
    name: "Sarah Johnson",
    title: "Sales Rep",
    deals: 18,
    revenue: 342000,
    target: 400000,
    unknownValue: 24.1,
    performance: 85.5,
  },
  {
    id: "9a1d8f4b-cbbd-4bf1-84c2-50a2c6a437f8",
    name: "Michael Chen",
    title: "Sales Rep",
    deals: 15,
    revenue: 298000,
    target: 350000,
    unknownValue: 31.2,
    performance: 85.1,
  },
  {
    id: "f8e6547a-f7cc-46ea-9293-61e06c6f6915",
    name: "Lisa Park",
    title: "Junior Sales Rep",
    deals: 12,
    revenue: 185000,
    target: 250000,
    unknownValue: 19.8,
    performance: 74,
  },
  {
    id: "d2e3b593-c05f-4383-82ae-09f0a38f4c0d",
    name: "David Wilson",
    title: "Sales Rep",
    deals: 19,
    revenue: 412000,
    target: 400000,
    unknownValue: 26.7,
    performance: 103,
  },
];

export const activities: Activity[] = [
  {
    id: "3e8a7f32-9d75-4e68-bb24-c5f2c44bc682",
    leadId: "bbf4e5f8-7701-44d2-aac6-e08e188ad899", // Jennifer Walsh
    date: new Date("2025-06-22T08:45:00"),
    type: "Task",
    channel: "Research",
    description: "Mapped tech stack & data initiatives",
    outcome: "Completed",
    ownerId: "f8e6547a-f7cc-46ea-9293-61e06c6f6915", // Lisa Park
  },
  {
    id: "6a4735cc-ff3d-44d7-a71d-0ca1f1d344d1",
    leadId: "bbf4e5f8-7701-44d2-aac6-e08e188ad899",
    date: new Date("2025-06-24T09:10:00"),
    type: "Email",
    channel: "Email",
    description: "Personalised email referencing recent funding",
    outcome: "Opened",
    ownerId: "f8e6547a-f7cc-46ea-9293-61e06c6f6915", // Lisa Park
  },
  {
    id: "cfd1df39-c18e-47f2-bbcc-5625e6a14656",
    leadId: "82b2a3f2-3db1-4a8d-b9d6-6cbd2d9ea066", // David Park
    date: new Date("2025-06-26T11:45:00"),
    type: "Task",
    channel: "Research",
    description: "Completed account research & tech stack mapping",
    outcome: "Completed",
    ownerId: "48f776f8-6aee-4dbd-8592-13d07b8c3957", // Alex Rodriguez
  },
  {
    id: "a8622ab9-36a9-4b35-8b68-7c471b6c0667",
    leadId: "bbf4e5f8-7701-44d2-aac6-e08e188ad899",
    date: new Date("2025-06-26T14:00:00"),
    type: "Call",
    channel: "Phone",
    description: "Cold call – booked demo",
    outcome: "Completed",
    ownerId: "f8e6547a-f7cc-46ea-9293-61e06c6f6915", // Lisa Park
  },
  {
    id: "f3a5d5a3-6d13-4b14-93c4-fd9d9f836e8c",
    leadId: "bbf4e5f8-7701-44d2-aac6-e08e188ad899",
    date: new Date("2025-06-27T11:00:00"),
    type: "Social",
    channel: "LinkedIn",
    description: "Commented on her post about AI trends",
    outcome: "Engaged",
    ownerId: "f8e6547a-f7cc-46ea-9293-61e06c6f6915", // Lisa Park
  },
  {
    id: "8228a7db-b370-4b7a-8b0a-618bc9a0cb35",
    leadId: "82b2a3f2-3db1-4a8d-b9d6-6cbd2d9ea066",
    date: new Date("2025-06-28T08:30:00"),
    type: "Social",
    channel: "LinkedIn",
    description: "Connection request + note",
    outcome: "Accepted",
    ownerId: "48f776f8-6aee-4dbd-8592-13d07b8c3957", // Alex Rodriguez
  },
  {
    id: "2d4b5992-223b-4e21-a282-426a1eb78d8d",
    leadId: "b9c612e6-7bb8-4ad5-bf01-0acac5c58ae7",
    date: new Date("2025-06-28T08:45:00"),
    type: "Social",
    channel: "LinkedIn",
    description: "Personalised connection request + note",
    outcome: "Accepted",
    ownerId: "9a1d8f4b-cbbd-4bf1-84c2-50a2c6a437f8", // Michael Chen
  },
  {
    id: "3e77bc20-cfb9-4bde-a329-0a252fc0e6ac",
    leadId: "bbf4e5f8-7701-44d2-aac6-e08e188ad899",
    date: new Date("2025-06-29T10:30:00"),
    type: "Email",
    channel: "Email",
    description: "Shared whitepaper on data governance",
    outcome: "Clicked",
    ownerId: "f8e6547a-f7cc-46ea-9293-61e06c6f6915", // Lisa Park
  },
  {
    id: "a1f0b2ac-c441-4b52-b27c-1c72e20f3133",
    leadId: "b9c612e6-7bb8-4ad5-bf01-0acac5c58ae7",
    date: new Date("2025-06-30T09:00:00"),
    type: "Email",
    channel: "Email",
    description: "CTO nurture email referencing industry report",
    outcome: "Opened",
    ownerId: "9a1d8f4b-cbbd-4bf1-84c2-50a2c6a437f8", // Michael Chen
  },
  {
    id: "b7e4a3bb-3e2d-4b26-a7d6-7a19e8e229b3",
    leadId: "9f07c800-1a0e-4c2c-bc5e-e8dff23b7394", // Sarah Chen
    date: new Date("2025-06-30T09:30:00"),
    type: "Email",
    channel: "Email",
    description: "Cold introduction from mutual contact",
    outcome: "Replied",
    ownerId: "3b892f94-21cc-4c3e-9a84-f8ca2f8fa9ee", // Sarah Johnson
  },
  {
    id: "f97de2d0-3c04-4292-8511-0e9e01a7f17c",
    leadId: "512748b2-3427-4b3e-a6d1-274146cf17d7", // Lisa Thompson
    date: new Date("2025-06-30T10:15:00"),
    type: "Task",
    channel: "Research",
    description: "Prepared tailored talk-track",
    outcome: "Completed",
    ownerId: "d2e3b593-c05f-4383-82ae-09f0a38f4c0d", // David Wilson
  },
  {
    id: "0f32a20f-1a7f-404a-a8c9-5e2a5f2b6d88",
    leadId: "adf388db-3e5e-4e69-82d6-7a988f417ae9", // Emily Rodriguez
    date: new Date("2025-06-30T10:50:00"),
    type: "Email",
    channel: "Email",
    description: "Inbound request follow-up",
    outcome: "Replied",
    ownerId: "f8e6547a-f7cc-46ea-9293-61e06c6f6915", // Lisa Park
  },
  {
    id: "9a40c690-0e12-4e97-bbed-62084e270d2a",
    leadId: "16a8d640-43e1-4ec3-b3ef-99fc8022eaa5", // Robert Kim
    date: new Date("2025-07-01T08:50:00"),
    type: "Meeting",
    channel: "Video",
    description: "Initial discovery w/ CEO",
    outcome: "Completed",
    ownerId: "48f776f8-6aee-4dbd-8592-13d07b8c3957", // Alex Rodriguez
  },
  {
    id: "a7c7375d-f53b-4b39-89c2-34c2a69dbb2c",
    leadId: "82b2a3f2-3db1-4a8d-b9d6-6cbd2d9ea066", // David Park
    date: new Date("2025-07-01T09:00:00"),
    type: "Email",
    channel: "Email",
    description: "Personalised email w/ ROI stats",
    outcome: "Opened",
    ownerId: "48f776f8-6aee-4dbd-8592-13d07b8c3957", // Alex Rodriguez
  },
  {
    id: "f811a2d4-60e0-415c-8ad7-5a8e409e2c6a",
    leadId: "bbf4e5f8-7701-44d2-aac6-e08e188ad899", // Jennifer Walsh
    date: new Date("2025-07-01T15:20:00"),
    type: "Meeting",
    channel: "Video",
    description: "Intro demo focusing on data workflows",
    outcome: "Completed",
    ownerId: "f8e6547a-f7cc-46ea-9293-61e06c6f6915", // Lisa Park
  },
  {
    id: "d36af22e-4608-4ffb-9f20-6380d7cb4aa3",
    leadId: "adf388db-3e5e-4e69-82d6-7a988f417ae9", // Emily Rodriguez
    date: new Date("2025-07-02T11:35:00"),
    type: "Meeting",
    channel: "Video",
    description: "Pilot kickoff w/ Ops team",
    outcome: "Completed",
    ownerId: "f8e6547a-f7cc-46ea-9293-61e06c6f6915", // Lisa Park
  },
  {
    id: "eb4a519d-6c4a-4c63-bcc2-9f63a925b4e0",
    leadId: "512748b2-3427-4b3e-a6d1-274146cf17d7", // Lisa Thompson
    date: new Date("2025-07-02T12:55:00"),
    type: "Email",
    channel: "Email",
    description: "Personalised email with benchmark stats",
    outcome: "Opened",
    ownerId: "d2e3b593-c05f-4383-82ae-09f0a38f4c0d", // David Wilson
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
    id: "07db1b04-81e8-4f70-836a-354cbb4d2b92",
    leadId: "bbf4e5f8-7701-44d2-aac6-e08e188ad899", // Jennifer Walsh
    date: new Date("2025-07-02T13:45:00"),
    type: "Email",
    channel: "Recap",
    description: "Summarised call + next steps",
    outcome: "Opened",
    ownerId: "f8e6547a-f7cc-46ea-9293-61e06c6f6915", // Lisa Park
  },
  {
    id: "2c5d2d0d-3b5a-4639-9120-7c87d1a66c72",
    leadId: "b9c612e6-7bb8-4ad5-bf01-0acac5c58ae7", // Marcus Johnson
    date: new Date("2025-07-02T14:00:00"),
    type: "Call",
    channel: "Phone",
    description: "Initial qualification call",
    outcome: "Completed",
    notes: "passed",
    ownerId: "9a1d8f4b-cbbd-4bf1-84c2-50a2c6a437f8", // Michael Chen
  },
  {
    id: "c3e6bc8d-0eaf-4a3c-8135-4338e8a7b4aa",
    leadId: "82b2a3f2-3db1-4a8d-b9d6-6cbd2d9ea066", // David Park
    date: new Date("2025-07-02T14:00:00"),
    type: "Call",
    channel: "Phone",
    description: "Initial cold call – scheduled discovery",
    outcome: "Completed",
    ownerId: "48f776f8-6aee-4dbd-8592-13d07b8c3957", // Alex Rodriguez
  },
  {
    id: "557a661b-fd91-4e5a-89a9-1d9f9e8109f2",
    leadId: "adf388db-3e5e-4e69-82d6-7a988f417ae9", // Emily Rodriguez
    date: new Date("2025-07-03T09:00:00"),
    type: "Call",
    channel: "Phone",
    description: "Stakeholder mapping call",
    outcome: "Completed",
    notes: "identified finance approver",
    ownerId: "f8e6547a-f7cc-46ea-9293-61e06c6f6915", // Lisa Park
  },
  {
    id: "b6a2533a-78a3-4b4b-bc48-5fcb7f5b3eaa",
    leadId: "bbf4e5f8-7701-44d2-aac6-e08e188ad899", // Jennifer Walsh
    date: new Date("2025-07-03T09:00:00"),
    type: "Call",
    channel: "Phone",
    description: "Discovery call to surface pain points",
    outcome: "Completed",
    notes: "mild interest",
    ownerId: "f8e6547a-f7cc-46ea-9293-61e06c6f6915", // Lisa Park
  },
  {
    id: "7c9a51f0-55b3-4e4a-a731-7a1e7f5938b0",
    leadId: "82b2a3f2-3db1-4a8d-b9d6-6cbd2d9ea066", // David Park
    date: new Date("2025-07-03T09:15:00"),
    type: "Email",
    channel: "Outreach",
    description: "Shared Gartner whitepaper on AI in IT Ops",
    outcome: "Clicked",
    ownerId: "48f776f8-6aee-4dbd-8592-13d07b8c3957", // Alex Rodriguez
  },
  {
    id: "6a2e7d94-84b8-4b4b-9a24-46f2d563ed8f",
    leadId: "16a8d640-43e1-4ec3-b3ef-99fc8022eaa5", // Robert Kim
    date: new Date("2025-07-03T09:30:00"),
    type: "Call",
    channel: "Phone",
    description: "Technical due-diligence with CTO",
    outcome: "Completed",
    notes: "no blockers",
    ownerId: "48f776f8-6aee-4dbd-8592-13d07b8c3957", // Alex Rodriguez
  },
  {
    id: "b1c1ee04-8493-4b4c-88db-99a2d9273b45",
    leadId: "b9c612e6-7bb8-4ad5-bf01-0acac5c58ae7", // Marcus Johnson
    date: new Date("2025-07-03T10:30:00"),
    type: "Meeting",
    channel: "Video",
    description: "Discovery meeting (needs timeline budget)",
    outcome: "Completed",
    notes: "12-week timeline",
    ownerId: "9a1d8f4b-cbbd-4bf1-84c2-50a2c6a437f8", // Michael Chen
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
    id: "42ea72a7-7a68-4620-9332-3747843e4171",
    leadId: "512748b2-3427-4b3e-a6d1-274146cf17d7", // Lisa Thompson
    date: new Date("2025-07-04T11:00:00"),
    type: "Call",
    channel: "Phone",
    description: "Cold outreach – booked demo",
    outcome: "Completed",
    ownerId: "d2e3b593-c05f-4383-82ae-09f0a38f4c0d", // David Wilson
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
    id: "988451d9-51bb-4ff0-a76e-23e5c372aeb3",
    leadId: "512748b2-3427-4b3e-a6d1-274146cf17d7", // Lisa Thompson
    date: new Date("2025-07-05T09:40:00"),
    type: "Social",
    channel: "LinkedIn",
    description: "Liked her recent post & commented",
    outcome: "Engaged",
    ownerId: "d2e3b593-c05f-4383-82ae-09f0a38f4c0d", // David Wilson
  },
  {
    id: "c48f648a-0c9a-4e06-9f04-3c48e1b17694",
    leadId: "16a8d640-43e1-4ec3-b3ef-99fc8022eaa5", // Robert Kim
    date: new Date("2025-07-05T10:00:00"),
    type: "Email",
    channel: "Follow-up",
    description: "Shared competitive comparison matrix",
    outcome: "Opened",
    notes: "responded",
    ownerId: "48f776f8-6aee-4dbd-8592-13d07b8c3957", // Alex Rodriguez
  },
  {
    id: "176b16f3-cce1-4db1-b7e7-45841a0ac2a7",
    leadId: "adf388db-3e5e-4e69-82d6-7a988f417ae9", // Emily Rodriguez
    date: new Date("2025-07-05T10:20:00"),
    type: "Email",
    channel: "Nurture",
    description: "Sent blog on operational excellence with AI",
    outcome: "Clicked",
    ownerId: "f8e6547a-f7cc-46ea-9293-61e06c6f6915", // Lisa Park
  },
  {
    id: "ae7d3bca-cabf-4f99-8876-2fba45e1c4b0",
    leadId: "82b2a3f2-3db1-4a8d-b9d6-6cbd2d9ea066", // David Park
    date: new Date("2025-07-05T10:30:00"),
    type: "Meeting",
    channel: "Video",
    description: "Intro meeting with IT & Procurement",
    outcome: "Completed",
    ownerId: "48f776f8-6aee-4dbd-8592-13d07b8c3957", // Alex Rodriguez
  },
  {
    id: "5f92865e-cc75-4229-a65d-c7d09e77a2ee",
    leadId: "b9c612e6-7bb8-4ad5-bf01-0acac5c58ae7", // Marcus Johnson
    date: new Date("2025-07-05T15:45:00"),
    type: "Email",
    channel: "Follow-up",
    description: "Summarised demo + attached deck",
    outcome: "Opened",
    ownerId: "9a1d8f4b-cbbd-4bf1-84c2-50a2c6a437f8", // Michael Chen
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
    id: "3d4e7d81-b229-4a2a-b3d2-0e344c2901f0",
    leadId: "512748b2-3427-4b3e-a6d1-274146cf17d7", // Lisa Thompson
    date: new Date("2025-07-07T10:10:00"),
    type: "Email",
    channel: "Nurture",
    description: "Shared customer success story (MidSize peer)",
    outcome: "Clicked",
    ownerId: "d2e3b593-c05f-4383-82ae-09f0a38f4c0d", // David Wilson
  },
  {
    id: "7eebc0d0-86f7-4d6a-9d89-4ad2eecfe929",
    leadId: "b9c612e6-7bb8-4ad5-bf01-0acac5c58ae7", // Marcus Johnson
    date: new Date("2025-07-07T11:00:00"),
    type: "Meeting",
    channel: "Video",
    description: "Live technical demo with architecture deep-dive",
    outcome: "Completed",
    notes: "positive",
    ownerId: "9a1d8f4b-cbbd-4bf1-84c2-50a2c6a437f8", // Michael Chen
  },
  {
    id: "b02e1e53-0615-4412-94b2-012f6f38335d",
    leadId: "adf388db-3e5e-4e69-82d6-7a988f417ae9", // Emily Rodriguez
    date: new Date("2025-07-07T13:45:00"),
    type: "Task",
    channel: "CRM Note",
    description: "Logged renewal likelihood score",
    outcome: "Completed",
    ownerId: "f8e6547a-f7cc-46ea-9293-61e06c6f6915", // Lisa Park
  },
  {
    id: "6dca5305-8a7f-4d0a-b462-6c63b7f4f24a",
    leadId: "16a8d640-43e1-4ec3-b3ef-99fc8022eaa5", // Robert Kim
    date: new Date("2025-07-07T14:20:00"),
    type: "Task",
    channel: "Internal",
    description: "Secured executive approval for 15 % discount",
    outcome: "Completed",
    ownerId: "48f776f8-6aee-4dbd-8592-13d07b8c3957", // Alex Rodriguez
  },
  {
    id: "d2e86b0d-3889-4d32-8873-8b7426a6c132",
    leadId: "82b2a3f2-3db1-4a8d-b9d6-6cbd2d9ea066", // David Park
    date: new Date("2025-07-07T15:00:00"),
    type: "Email",
    channel: "Recap",
    description: "Sent call recap + requested data samples",
    outcome: "Opened",
    ownerId: "48f776f8-6aee-4dbd-8592-13d07b8c3957", // Alex Rodriguez
  },
  {
    id: "a4c28e19-6a0e-4163-bb33-ff276ea18d91",
    leadId: "82b2a3f2-3db1-4a8d-b9d6-6cbd2d9ea066", // David Park
    date: new Date("2025-07-08T12:40:00"),
    type: "Call",
    channel: "Phone",
    description: "Discovery call focused on integration scope",
    outcome: "Completed",
    ownerId: "48f776f8-6aee-4dbd-8592-13d07b8c3957", // Alex Rodriguez
  },
  {
    id: "e13f0bfc-27d5-4621-8d67-8215bba3c39c",
    leadId: "512748b2-3427-4b3e-a6d1-274146cf17d7", // Lisa Thompson
    date: new Date("2025-07-08T14:00:00"),
    type: "Meeting",
    channel: "Video",
    description: "Intro demo focused on sales workflow",
    outcome: "Completed",
    ownerId: "d2e3b593-c05f-4383-82ae-09f0a38f4c0d", // David Wilson
  },
  {
    id: "8ff3818d-cf10-49f9-a9d5-2e8a6ffb55a1",
    leadId: "adf388db-3e5e-4e69-82d6-7a988f417ae9", // Emily Rodriguez
    date: new Date("2025-07-08T14:10:00"),
    type: "Meeting",
    channel: "Video",
    description: "Pilot success review – shared KPIs",
    outcome: "Completed",
    notes: "32 % efficiency uptick",
    ownerId: "f8e6547a-f7cc-46ea-9293-61e06c6f6915", // Lisa Park
  },
  {
    id: "9d785f41-1869-434d-a5e1-c854097e27f6",
    leadId: "16a8d640-43e1-4ec3-b3ef-99fc8022eaa5", // Robert Kim
    date: new Date("2025-07-08T15:10:00"),
    type: "Meeting",
    channel: "On-site",
    description: "Executive briefing & ROI presentation",
    outcome: "Completed",
    notes: "impressed",
    ownerId: "48f776f8-6aee-4dbd-8592-13d07b8c3957", // Alex Rodriguez
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
    id: "903a6c7d-08fa-4623-9d78-718ab53f9a8a",
    leadId: "b9c612e6-7bb8-4ad5-bf01-0acac5c58ae7", // Marcus Johnson
    date: new Date("2025-07-08T17:00:00"),
    type: "Call",
    channel: "Phone",
    description: "Proposal walkthrough & Q&A",
    outcome: "Completed",
    ownerId: "9a1d8f4b-cbbd-4bf1-84c2-50a2c6a437f8", // Michael Chen
  },
  {
    id: "9f1b3f94-bb7a-4cc4-95a1-c4d7d575da4a",
    leadId: "b9c612e6-7bb8-4ad5-bf01-0acac5c58ae7", // Marcus Johnson
    date: new Date("2025-07-09T09:20:00"),
    type: "Email",
    channel: "Proposal",
    description: "Sent full pricing proposal incl. enterprise discount",
    outcome: "Opened",
    notes: "awaiting feedback",
    ownerId: "9a1d8f4b-cbbd-4bf1-84c2-50a2c6a437f8", // Michael Chen
  },
  {
    id: "ba37c6b4-e27b-4003-9c41-e3d4f00e62b1",
    leadId: "512748b2-3427-4b3e-a6d1-274146cf17d7", // Lisa Thompson
    date: new Date("2025-07-09T13:30:00"),
    type: "Call",
    channel: "Phone",
    description: "Qualification call (budget authority)",
    outcome: "Completed",
    ownerId: "d2e3b593-c05f-4383-82ae-09f0a38f4c0d", // David Wilson
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
    id: "f2a1e24c-c044-438d-9df1-9e8a38cabb40",
    leadId: "adf388db-3e5e-4e69-82d6-7a988f417ae9", // Emily Rodriguez
    date: new Date("2025-07-09T16:25:00"),
    type: "Email",
    channel: "Proposal",
    description: "Shared revised proposal w/ legal language",
    outcome: "Opened",
    notes: "forwarded to CFO",
    ownerId: "f8e6547a-f7cc-46ea-9293-61e06c6f6915", // Lisa Park
  },
  {
    id: "6c27f93f-c869-47a9-9a99-701f65f34e46",
    leadId: "16a8d640-43e1-4ec3-b3ef-99fc8022eaa5", // Robert Kim
    date: new Date("2025-07-09T16:45:00"),
    type: "Email",
    channel: "Proposal",
    description: "Sent final redlined contract",
    outcome: "Opened",
    notes: "reviewed by legal",
    ownerId: "48f776f8-6aee-4dbd-8592-13d07b8c3957", // Alex Rodriguez
  },
  {
    id: "a9cb7c99-9d2b-44ed-83f7-7d6a64e8c852",
    leadId: "512748b2-3427-4b3e-a6d1-274146cf17d7", // Lisa Thompson
    date: new Date("2025-07-10T08:00:00"),
    type: "Email",
    channel: "Follow-up",
    description: "Sent agenda for qualification call",
    outcome: "Opened",
    notes: "confirmed",
    ownerId: "d2e3b593-c05f-4383-82ae-09f0a38f4c0d", // David Wilson
  },
  {
    id: "f463eec3-8d3f-4e3a-a449-c3471534f849",
    leadId: "adf388db-3e5e-4e69-82d6-7a988f417ae9", // Emily Rodriguez
    date: new Date("2025-07-10T09:00:00"),
    type: "Call",
    channel: "Phone",
    description: "Negotiation call around payment terms",
    outcome: "Completed",
    notes: "sent redline",
    ownerId: "f8e6547a-f7cc-46ea-9293-61e06c6f6915", // Lisa Park
  },
  {
    id: "05c2b5d2-e6eb-4e06-bb67-fdc5ca929f55",
    leadId: "16a8d640-43e1-4ec3-b3ef-99fc8022eaa5", // Robert Kim
    date: new Date("2025-07-10T09:15:00"),
    type: "Call",
    channel: "Phone",
    description: "Final negotiation on MSA",
    outcome: "Completed",
    notes: "agreed terms",
    ownerId: "48f776f8-6aee-4dbd-8592-13d07b8c3957", // Alex Rodriguez
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
  {
    id: "c06d6f26-ff72-4bdb-9a5e-0a0e504c95ec",
    leadId: "16a8d640-43e1-4ec3-b3ef-99fc8022eaa5", // Robert Kim
    date: new Date("2025-07-10T11:00:00"),
    type: "Meeting",
    channel: "Video",
    description: "Signing call – contract walkthrough",
    outcome: "Completed",
    notes: "verbal yes",
    ownerId: "48f776f8-6aee-4dbd-8592-13d07b8c3957", // Alex Rodriguez
  },
];
