/**
 * Register user form list
 */
export const REGISTER_LIST = [
  {
    name: "firtname",
    label: "Họ của bạn",
    type: "text",
    icon: "faUserPen",
    title: "Nhập họ của bạn",
  },
  {
    name: "lastname",
    label: "Tên của bạn",
    type: "text",
    icon: "faUserPen",
    title: "Nhập tên của bạn",
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    icon: "faEnvelope",
    title: "Nhập email của bạn",
  },
  {
    name: "password",
    label: "Mật khẩu",
    type: "password",
    icon: "faLock",
    title: "Nhập mật khẩu của bạn",
  },

  {
    name: "repassword",
    label: "Nhập lại mật khẩu",
    type: "password",
    icon: "faLock",
    title: "Nhập lại mật khẩu của bạn",
  },
  {
    name: "phone",
    label: "Số điện thoại",
    type: "tel",
    icon: "faPhone",
    title: "Nhập số điện thoại của bạn",
  },
];
/**
 * Register seller store
 */

export const registerStoreList = [
  {
    name: "store_name",
    type: "text",
    icon: "faStore",
    title: "Nhập tên cửa hàng của bạn",
  },
  {
    name: "store_email",
    type: "email",
    icon: "faEnvelope",
    title: "Nhập email liên hệ cửa hàng hoặc của bạn",
  },
  {
    name: "store_password",
    type: "password",
    icon: "faLock",
    title: "Nhập mật khẩu cửa cửa hàng",
  },
  {
    name: "store_phone",
    type: "tel",
    icon: "faPhone",
    title: "Nhập số điện thoại liên hệ của cửa hàng bạn",
  },
  {
    name: "store_specific_address",
    type: "text",
    icon: "faPhone",
    title: "Nhập địa chỉ cụ thể của shop",
  },
];
/**
 * login data form
 */
export const USER_LOGIN = [
  {
    name: "email",
    mess: "Nhập email đã đăng ký của bạn...",
    type: "email",
    title: "Your email",
  },
  {
    name: "password",
    mess: "Nhập mật khẩu đã đăng ký của bạn...",
    type: "password",
    title: "Your password",
  },
];