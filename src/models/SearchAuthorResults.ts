export interface SearchAuthorResults {
  numFound: number;
  start: number;
  numFoundExact: boolean;
  docs: { author_key: string; author_name: string }[];
  num_found: number;
  q: string;
  offset: null | number;
}
