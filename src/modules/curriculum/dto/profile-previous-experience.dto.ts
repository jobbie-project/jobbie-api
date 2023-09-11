export class ProfilePreviousExperience {
  company_name: string;
  position: string;
  start_date: Date;
  end_date?: Date;
  location: {
    city: string;
    state: string;
  };
  description: string;
}
