export interface BookDetail {
  description:
    | {
        type: string;
        value: string;
      }
    | string;
  title: string;
  covers: number[];
  subject_places: string[];
  subjects: string[];
  subject_people: string[];
  key: string;
  latest_revision: number;
  revision: number;
  created: {
    type: string;
    value: string;
  };
}
