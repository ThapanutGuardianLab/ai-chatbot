export type nextActionResponse = {
  nextActions: string;
};

export type Lead = {
  id: string;
  name: string; // Contact name
  companyId: string; // FK to Company
  title: string;
  score: number;
  priority: "low" | "medium" | "high";
  stage: "qualification" | "discovery" | "proposal" | "negotiation" | "closing";
  dealValue: float64;
  ownerId: string; // FK to Rep
};

export type Company = {
  id: string;
  name: string;
};

export type Rep = {
  id: string;
  name: string;
  title: string;
  deals: number;
  revenue: float64;
  target: float64;
  performance: number;
  unknownValue: float64;
  performance: float64;
};

export type Activity = {
  id: string;
  leadId: string;
  date: Date;
  type: "Task" | "Email" | "Call" | "Meeting" | "Social";
  channel:
    | "Phone"
    | "Email"
    | "Video"
    | "LinkedIn"
    | "On-site"
    | "Internal"
    | "Research"
    | "CRM Note"
    | "Follow-up"
    | "Proposal"
    | "Recap"
    | "Outreach"
    | "Nurture"
    | "Intro";
  description: string;
  outcome:
    | "Completed"
    | "Opened"
    | "Replied"
    | "Clicked"
    | "Accepted"
    | "Engaged";
  notes?: string;
  ownerId: string; // FK to Rep
};
