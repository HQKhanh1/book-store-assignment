import { Author } from "./Author";

export interface Book {
  key: string;
  title: string;
  cover_id?: number;
  cover_i?: number;
  authors?: Author[];
  author_name?: string[];
  first_publish_year: number;
}
