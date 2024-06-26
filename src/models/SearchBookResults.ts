import { Book } from "./Book";

export interface SearchBookResults {
  numFound: number;
  start: number;
  numFoundExact: boolean;
  docs: Book[];
  num_found: number;
  q: string;
  offset: null | number;
}
