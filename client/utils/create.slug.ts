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
