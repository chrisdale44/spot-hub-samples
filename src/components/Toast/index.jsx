"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useAtom } from "jotai";
import { toastAtom } from "@/state";
import {
  IoClose,
  IoCheckmarkCircle,
  IoWarning,
  IoAlert,
  IoInformationCircle,
} from "@/icons"; // Icons
import { cn } from "@/utils/cn";

const toastStyles = {
  success: {
    bg: "bg-[#d4edda] text-[#155724]",
    icon: <IoCheckmarkCircle className="text-[#155724] w-5 h-5" />,
  },
  warning: {
    bg: "bg-[#fff3cd] text-[#856404]",
    icon: <IoWarning className="text-[#856404] w-5 h-5" />,
  },
  error: {
    bg: "bg-[#f8d7da] text-[#721c24]",
    icon: <IoAlert className="text-[#721c24] w-5 h-5" />,
  },
  info: {
    bg: "bg-[#d1ecf1] text-[#0c5460]",
    icon: <IoInformationCircle className="text-[#0c5460] w-5 h-5" />,
  },
};

const animationLength = 1000;

const Toast = () => {
  const [toast, setToast] = useAtom(toastAtom);
  const [show, setShow] = useState(false);

  const closeToast = useCallback(() => {
    setShow(false);
    return setTimeout(() => {
      setToast(null);
    }, animationLength);
  }, [setToast, setShow]);

  useEffect(() => {
    const timers = [];

    if (toast) {
      setShow(true);
      timers.push(
        setTimeout(() => {
          timers.push(closeToast());
        }, 2000)
      );
    }

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [toast, setToast, closeToast]);

  return (
    <div
      className={cn(
        `fixed bottom-4 left-4 right-4 max-w-sm mx-auto p-4 border-l-4 rounded-md shadow-lg flex items-start space-x-3 z-[1002] transition-transform`,
        {
          "animate-slide-up": show,
          "animate-slide-down": !show,
        },
        toast && toastStyles[toast.type]?.bg
      )}
    >
      {toast && (
        <>
          <div>{toastStyles[toast.type]?.icon}</div>
          <div className="flex-1">
            <p className="font-semibold">
              {toast?.title ||
                toast.type.charAt(0).toUpperCase() + toast.type.slice(1)}
            </p>
            <p>{toast?.message}</p>
          </div>
          <button
            onClick={closeToast}
            className="p-1 text-gray-500 transition-colors duration-300 hover:text-gray-700"
          >
            <IoClose className="w-5 h-5" />
          </button>
        </>
      )}
    </div>
  );
};

export default Toast;
