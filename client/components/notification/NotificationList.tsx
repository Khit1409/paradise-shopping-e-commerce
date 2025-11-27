"use client";
import { onErrorModel, onLoadingAction } from "@/redux/app/slice";
import { getUserNotificationThunk } from "@/redux/app/thunk";
import { AppDispatch, RootState } from "@/redux/store";
import { seenNotification } from "@/service/app.service";
import { faHistory } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

export default function NotificationList() {
  const dispatch = useDispatch<AppDispatch>();
  const { notifications } = useSelector((state: RootState) => state.app);

  const handleSeenNotification = async (id: string) => {
    dispatch(onLoadingAction(true));
    const result = await seenNotification(id);
    if (result) {
      dispatch(onLoadingAction(false));
      if (!result.success) {
        dispatch(
          onErrorModel({
            mess: "Có lỗi trong quá trình thay đổi trạng thái thông báo!",
            onError: true,
          })
        );
      } else {
        await dispatch(getUserNotificationThunk());
      }
    }
  };
  return (
    <div className="p-3 bg-white text-gray-700">
      {/* nav option */}
      <div className="mb-3">
        <div className="border border-gray-300 p-2 flex gap-3">
          <button
            onClick={async () => {
              await handleSeenNotification("all");
            }}
            className="hover:underline"
          >
            <strong>Đánh dấu đã đọc toàn bộ</strong>
          </button>
          <button
            onClick={async () => {
              await dispatch(getUserNotificationThunk());
            }}
          >
            <FontAwesomeIcon icon={faHistory} className="" />
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        {notifications.map((not) => (
          <div
            key={not.id}
            className={`flex justify-between p-2 ${not.seen ? "" : "bg-gray-300"}`}
          >
            <div>
              <strong>{not.name}</strong>
            </div>
            <div>
              <p>{not.message}</p>
            </div>
            <div>
              <span>
                {new Date(not.created_at).toLocaleDateString("vi-VN")}
              </span>
            </div>
            <div>
              <button
                disabled={not.seen}
                onClick={async () => await handleSeenNotification(not.id)}
                className="text-sm hover:underline text-blue-500"
              >
                {not.seen ? "Đã đọc" : "Đánh dấu đã đọc"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
