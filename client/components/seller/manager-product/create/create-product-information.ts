

type CreateInformationList = {
  name: string;
  id: string;
  type: "text" | "number"|"textarea";
  required: boolean;
  title: string;
};

export const CREATE_INFORMATION_FORM: CreateInformationList[] = [
  {
    name: "name",
    id: "name",
    required: true,
    type: "text",
    title: "Tên sản phẩm",
  },
  {
    name: "price",
    type: "number",
    id: "price",
    required: true,
    title: "Giá gốc",
  },
  {
    name: "sale",
    id: "sale",
    type: "number",
    required: false,
    title: "Giá khuyến mại nếu có",
  },
  {
    name: "description",
    id: "description",
    required: true,
    type: "textarea",
    title: "Mô tả sản phẩm",
  },
];
