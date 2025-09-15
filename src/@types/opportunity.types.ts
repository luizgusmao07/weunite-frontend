export interface Skill {
  id: number;
  name: string;
}

export interface Company {
  id: number;
  name: string;
  logo?: string;
}

export interface Subscriber {
  id: number;
  athleteId: number;
  opportunityId: number;
}

export interface CreateOpportunity {
  title: string;
  description: string;
  location: string;
  dateEnd: Date;
  skills: Skill[];
  media?: File;
}

export interface OpportunityRequestDTO {
  title: string;
  description: string;
  location: string;
  dateEnd: Date;
  skills: Skill[];
}

export interface Opportunity {
  id: number;
  title: string;
  description: string;
  location: string;
  dateEnd: Date;
  skills: Skill[];
  company: Company;
  subscribers: Subscriber[];
  createdAt: Date;
  updatedAt?: Date;
}

export interface OpportunityDisplay extends Opportunity {
  companyId: number;
  companyName: string;
  companyLogo?: string;
  applicationsCount: number;
  skillNames: string[];
  isExpired: boolean;
  daysUntilDeadline: number;
}
