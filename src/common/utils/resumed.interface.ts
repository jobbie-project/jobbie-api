export interface Resume {
  meta?: {
    theme?: string;
  };
  basics?: {
    name?: string;
    label?: string;
    image?: string;
    summary?: string;
    website?: string;
    email?: string;
    location?: {
      city?: string;
      countryCode?: string;
    };
    profiles?: {
      username?: string;
      url?: string;
      network?: string;
    }[];
  };
  education?: {
    endDate?: string;
    startDate?: string;
    area?: string;
    studyType?: string;
    institution?: string;
  }[];
  references?: {
    reference?: string;
    name?: string;
  }[];
  skills?: {
    keywords?: string[];
    level?: string;
    name?: string;
  }[];
  awards?: {
    title?: string;
    awarder?: string;
  }[];
  work?: {
    summary?: string;
    website?: string;
    name?: string;
    location?: string;
    position?: string;
    startDate?: string;
    endDate?: string;
    highlights?: string[];
  }[];
  interests?: {
    name?: string;
  }[];
}
