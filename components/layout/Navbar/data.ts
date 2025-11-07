export const NAV_TOGGLE_LIST = [
  {
    toggleIcon: "faCartShopping",
    toggleUrl: "/user/my-cart",
  },
  {
    toggleIcon: "faMessage",
    toggleUrl: "/user/my_message",
  },
  {
    toggleIcon: "faBell",
    toggleUrl: "/user/my-notificate",
  },
  {
    toggleIcon: "faUser",
    toggleUrl: "/user/my-profile",
  },
];

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
        icon: ["faHome"],
      },
      {
        id: 102,
        name: "Chỉnh sửa cửa hàng",
        url: "/seller/setting-store",
        icon: ["faGear"],
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
        icon: ["faStore"],
      },
      {
        id: 302,
        name: "Thêm sản phẩm",
        url: "/seller/add-new-product",
        icon: ["faShirt"],
      },
    ],
  },
  {
    id: 4,
    category: "Quản lý đơn hàng",
    items: [
      {
        id: 401,
        name: "Đơn hàng của bạn",
        url: "/seller/your-store-order",
        icon: ["faCartShopping"],
      },
      {
        id: 402,
        name: "Danh sách đơn hàng bán chạy nhất",
        url: "/seller/your-popular-order",
        icon: ["faCartFlatbedSuitcase"],
      },
      {
        id: 403,
        name: "Đơn hàng chưa xử lý",
        url: "/",
        icon: ["faShoppingBag"],
      },
    ],
  },
  {
    id: 5,
    category: "Quản lý hoạt động",
    items: [
      {
        id: 401,
        name: "Lịch sử đăng nhập",
        url: "/seller/your-sign-in-history",
        icon: ["faHistory"],
      },
      {
        id: 402,
        name: "Lịch sử chỉnh sửa",
        url: "/seller/your-popular-order",
        icon: ["faGear"],
      },
    ],
  },
];
