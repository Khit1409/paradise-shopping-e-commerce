"use client";

import { onSuccessfulModel } from "@/api/redux/slice/app_slice/app.slice";
import { AppDispatch, RootState } from "@/api/redux/store";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function SuccessfullModal() {
  const { onSuccess } = useSelector((state: RootState) => state.app);
  const dispatch = useDispatch<AppDispatch>();
  const [visible, setVisible] = useState(false);

  /** Auto play animation + auto close after a few seconds */
  useEffect(() => {
    if (onSuccess) {
      setVisible(true);
      const timeout = setTimeout(() => {
        setVisible(false);
        setTimeout(() => dispatch(onSuccessfulModel(false)), 300);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [onSuccess, dispatch]);

  return (
    <AnimatePresence>
      {onSuccess && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm flex items-center justify-center"
          onClick={() => dispatch(onSuccessfulModel(false))}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 30 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white rounded-2xl shadow-2xl border-t-4 border-green-500 w-[340px] max-w-[90%] p-6 flex flex-col items-center text-center gap-5"
          >
            {/* Outer glowing ring animation */}
            {visible && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [1, 1.3, 1], opacity: [0.8, 0.4, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute w-32 h-32 rounded-full bg-green-200/30"
              />
            )}

            {/* Check icon */}
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-100 border border-green-400 relative z-10">
              <FontAwesomeIcon
                icon={faCheckCircle}
                className="text-4xl text-green-600"
              />
            </div>

            {/* Success text */}
            <p className="text-gray-700 text-lg font-semibold leading-relaxed">
              Operation Successful!
            </p>

            {/* Optional close button */}
            <button
              onClick={() => dispatch(onSuccessfulModel(false))}
              className="mt-2 px-6 py-2 rounded-lg bg-green-500 text-white font-semibold text-sm uppercase tracking-wide hover:bg-green-600 active:scale-[0.98] transition-all shadow"
            >
              OK
            </button>

            {/* Subtle border glow */}
            <div className="absolute inset-0 rounded-2xl border border-green-300/40 pointer-events-none"></div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
