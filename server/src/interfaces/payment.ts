export interface CancelPaymentResponse {
  code: string; // ví dụ: "00"
  desc: string; // ví dụ: "success"
  data: {
    id: string; // paymentLinkId
    orderCode: number | string;
    amount: number;
    amountPaid: number;
    amountRemaining: number;
    status: "CANCELLED" | "COMPLETED" | "PENDING"; // status hiện tại
    createdAt: string; // ISO datetime
    canceledAt?: string; // ISO datetime, nếu có
    cancellationReason?: string;
    transactions: Array<any>; // bạn có thể define chi tiết nếu muốn
  };
  signature: string;
}
