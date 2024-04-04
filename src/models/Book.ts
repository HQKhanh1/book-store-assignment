interface Book {
  key: string; // Unique identifier for the book
  title: string;
  edition_count: number;
  cover_id?: number; // Optional field for cover ID
  cover_edition_key?: string; // Optional field for cover edition key
  subject: string[]; // Array of subject categories
  ia_collection: string[]; // Array of collections the book belongs to
  lendinglibrary: boolean; // Whether the book is available for lending
  printdisabled: boolean; // Whether the book is available in a print-disabled format
  lending_edition?: string; // Optional field for lending edition key
  lending_identifier?: string; // Optional field for lending identifier
  authors: Author[]; // Array of authors associated with the book
  first_publish_year: number;
  ia: string; // ISBN identifier
  public_scan: boolean;
  has_fulltext: boolean;
  availability: Availability; // Availability information for the book
}
