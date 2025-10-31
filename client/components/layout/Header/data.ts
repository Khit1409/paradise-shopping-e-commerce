/**
 * navbar list using for seller dashboard routing page
 *
 */
export const SELLER_NAV = [
  {
    id: 1,
    category: "Trang chủ",
    items: [
      {
        id: 101,
        name: "Thông tin cửa hàng",
        url: "/seller",
        icon: "faHome",
      },
      {
        id: 102,
        name: "Chỉnh sửa cửa hàng",
        url: "/seller/setting-store",
        icon: "faGear",
      },
    ],
  },
  {
    id: 3,
    category: "Quản lý sản phẩm",
    items: [
      {
        id: 301,
        name: "Kho sản phẩm",
        url: "/seller/manager-product-store",
        icon: "faStore",
      },
      {
        id: 302,
        name: "Thêm sản phẩm",
        url: "/seller/add-new-product",
        icon: "faStore",
      },
    ],
  },
];
