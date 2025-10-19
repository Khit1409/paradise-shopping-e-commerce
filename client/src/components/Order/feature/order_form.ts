export const orderForm = [
  {
    id: 1,
    name: "",
    type: "",
    title: "",
    mess: "",
  },
];

export const shippingMethod: {
  id: number;
  name: string;
  value: "COD" | "FLASH";
  icon: string;
}[] = [
  {
    id: 1,
    name: "Hỏa tốc",
    value: "FLASH",
    icon: "faTruckFast",
  },
  { id: 2, value: "COD", name: "COD", icon: "faTruck" },
];

export const payMethod: {
  id: number;
  name: string;
  icon: string;
  value: "ONLINE" | "COD";
}[] = [
  { id: 1, name: "Banking", icon: "faBuildingColumns", value: "ONLINE" },
  { id: 2, name: "Thanh toán khi nhận hàng", icon: "faGift", value: "COD" },
];
