import API from "./api";

export function generateBookListUrl(data: BookListQueryGenre): string {
  const transferPageToOffset = String(Number(data.page) * 12);
  const url = `${API.API_PATH.APP.BOOKS.SUBJECT}/${data.genres}${API.API_PATH.APP.BOOKS.ENDPOINT}?offset=${transferPageToOffset}`;
  return url;
}

export function toBookListPage(data: BookListQueryGenre): string {
  const url = `/?genres=${data.genres}&&page=${data.page}`;
  return url;
}
