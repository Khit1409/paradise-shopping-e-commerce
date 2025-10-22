type FormCreateProductType = {
  name: string;
  require: boolean;
  type: "text" | "email" | "tel" | "number" | "textarea";
  title: string;
  note: string;
};

export const CREATE_PRODUCT_BASIC_INPUT_LIST: FormCreateProductType[] = [
  {
    name: "name",
    require: true,
    type: "text",
    title: "Nhập tên sản phẩm",
    note: "*Lưu ý nhập tên sản phẩm phải đúng mới sản phẩm.",
  },
  {
    name: "hashtag",
    require: true,
    type: "text",
    title: "Nhập hashtag sản phẩm",
    note: "*Lưu ý hashtag cách nhau bằng dấu phẩy và mỗi hashtag bắt đầu bằng # , ví dụ :#thoitrang,#ao_nam_nu.",
  },
  {
    name: "price",
    require: true,
    type: "number",
    title: "Nhập giá sản phẩm",
    note: "* Giá sản phẩm phải phù hợp với sản phẩm của bạn, rất quan trọng.",
  },
  {
    name: "sale",
    require: false,
    type: "number",
    title: "Nhập giá khuyến mại sản phẩm.",
    note: "* Giá khuyến mại không quan trọng. Nếu bạn muốn đăng và giảm giá ngay thì có thể nhập.",
  },
  {
    name: "description",
    require: true,
    type: "textarea",
    title: "Nhập mô tả sản phẩm",
    note: "*Lưu ý mô tả sản phẩm đúng như hiện trạng sản phẩm của bạn.",
  },
];
