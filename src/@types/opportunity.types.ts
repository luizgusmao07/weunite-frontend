export interface CreateOpportunity {
  companyId: number;
  title: string;
  description: string;
  location: string;
  localDate: Date;
  skills: string[];
  media?: File | null;
}
