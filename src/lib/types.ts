export type PipelineStage =
  | "new"
  | "qualified"
  | "reaching_out"
  | "teaming"
  | "submitted";

export type SetAside =
  | "Small Business"
  | "8(a)"
  | "HUBZone"
  | "SDVOSB"
  | "WOSB"
  | "None";

export type OpportunityStatus =
  | "reviewing"
  | "bidding"
  | "partnered"
  | "submitted"
  | "archived";

export interface User {
  id: string;
  email: string;
  full_name: string;
  company_id: string;
  role: string;
  avatar_url?: string;
  created_at: string;
}

export interface Company {
  id: string;
  name: string;
  cage_code: string;
  duns: string;
  naics_codes: string[];
  capabilities: string[];
  size_standard?: string;
  certifications: string[];
  location: string;
  website?: string;
  employee_count: number;
  annual_revenue: string;
  created_at: string;
}

export interface ContractorProfile {
  id: string;
  name: string;
  cage_code: string;
  duns: string;
  naics_codes: string[];
  capabilities: string[];
  agencies_worked_with: string[];
  location: string;
  website: string;
  employee_count: number;
  annual_revenue: string;
  past_award_count: number;
  past_award_value: string;
  is_prime: boolean;
  size_standard?: string;
  certifications?: string[];
  teaming_fit_score?: number;
  contact_name?: string;
  contact_email?: string;
  contact_phone?: string;
  tags: string[];
  created_at: string;
}

export interface Opportunity {
  id: string;
  title: string;
  solicitation_number: string;
  agency: string;
  sub_agency?: string;
  description: string;
  naics_code: string;
  set_aside: SetAside;
  contract_type: string;
  estimated_value: string;
  place_of_performance: string;
  posted_date: string;
  due_date: string;
  status: OpportunityStatus;
  pipeline_stage: PipelineStage;
  attachments: string[];
  url?: string;
  created_at: string;
}

export interface SavedOpportunity {
  id: string;
  user_id: string;
  opportunity_id: string;
  tags: string[];
  notes: string;
  pipeline_stage: PipelineStage;
  created_at: string;
}

export interface SavedContractor {
  id: string;
  user_id: string;
  contractor_id: string;
  notes: string;
  created_at: string;
}

export interface Note {
  id: string;
  user_id: string;
  entity_type: "opportunity" | "contractor";
  entity_id: string;
  content: string;
  created_at: string;
}

export interface SavedSearch {
  id: string;
  user_id: string;
  name: string;
  filters: Record<string, string | string[]>;
  alert_enabled: boolean;
  alert_frequency: "daily" | "weekly" | "instant";
  created_at: string;
}

export interface PastAward {
  id: string;
  contractor_id: string;
  title: string;
  agency: string;
  value: string;
  award_date: string;
  naics_code: string;
  description: string;
}

export interface DashboardMetrics {
  total_opportunities: number;
  tracked_opportunities: number;
  saved_primes: number;
  upcoming_deadlines: number;
  pipeline_counts: Record<PipelineStage, number>;
  opportunities_by_agency: { agency: string; count: number }[];
  opportunities_by_month: { month: string; count: number }[];
}
