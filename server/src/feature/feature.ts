export function createUrlNav(str: string): string {
  const result = str
    .toLowerCase() // chu thuong
    .normalize("NFD") // tách dấu
    .replace(/[\u0300-\u036f]/g, "") // xóa các ký tự dấu
    .replace(/đ/g, "d") // thay đ -> d
    .replace(/Đ/g, "D") // thay Đ -> D
    .split(" ") // xoa cach
    .join("_"); // noi nhau
  return `/${result}`;
}

export function createSlug(str: string): string {
  const result = str
    .toLowerCase() // chu thuong
    .normalize("NFD") // tách dấu
    .replace(/[\u0300-\u036f]/g, "") // xóa các ký tự dấu
    .replace(/đ/g, "d") // thay đ -> d
    .replace(/Đ/g, "D") // thay Đ -> D
    .split(" ") // xoa cach
    .join("-"); // noi nhau
  return result;
}

export function createHashtag(str: string): string {
  const result = str
    .toLowerCase() // chu thuong
    .normalize("NFD") // tách dấu
    .replace(/[\u0300-\u036f]/g, "") // xóa các ký tự dấu
    .replace(/đ/g, "d") // thay đ -> d
    .replace(/Đ/g, "D") // thay Đ -> D
    .split(" ") // xoa cach
    .join("-"); // noi nhau
  return `#${result}`;
}

export function createSlugAddress(str: string): string {
  const srtArr = str.split("-");
  const result = srtArr[srtArr.length - 1]
    .toLowerCase() // chu thuong
    .normalize("NFD") // tách dấu
    .replace(/[\u0300-\u036f]/g, "") // xóa các ký tự dấu
    .replace(/đ/g, "d") // thay đ -> d
    .replace(/Đ/g, "D") // thay Đ -> D
    .split(" ") // xoa cach
    .join("-"); // noi nhau
  return result;
}
