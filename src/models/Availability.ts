interface Availability {
  status: string; // Availability status (e.g., "open", "closed")
  available_to_browse: boolean;
  available_to_borrow: boolean;
  available_to_waitlist: boolean;
  is_printdisabled: boolean;
  is_readable: boolean;
  is_lendable: boolean;
  is_previewable: boolean;
  identifier: string; // ISBN identifier
  isbn: string;
  oclc?: string; // Optional field for OCLC number
  openlibrary_work?: string; // Optional field for Open Library work ID
  openlibrary_edition?: string; // Optional field for Open Library edition ID
  last_loan_date?: string; // Optional field for last loan date
  num_waitlist?: number; // Optional field for number of people on waitlist
  last_waitlist_date?: string; // Optional field for last waitlist date
  is_restricted: boolean;
  is_browseable: boolean;
}
