// notificationUtils.js
import { useRef } from 'react';
import { notification } from 'antd';

let api;

export function useInternalNotification() {
  const apiRef = useRef(api);

  if (!apiRef.current) {
    apiRef.current = notification.useNotification();
  }

  return {
    open: apiRef.current.open,
    close: apiRef.current.close,
  };
}

export function openNotificationWithIcon(type, msg, des) {
  return {
    message: msg,
    description: des,
    type: type,
  };
}
