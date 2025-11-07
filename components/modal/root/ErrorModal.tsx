"use client";


import { AppDispatch, RootState } from "@/redux/store";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { onErrorModel } from "@/redux/app/slice";

export default function ErrorModal() {
  const { onError, message } = useSelector((state: RootState) => state.app);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <AnimatePresence>
      {onError && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-9999 bg-black/50 backdrop-blur-sm flex items-center justify-center"
          onClick={() => dispatch(onErrorModel({ onError: false, mess: "" }))}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 30 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white shadow-2xl border-t-4 border-red-500 w-[380px] max-w-[90%] p-6 flex flex-col items-center text-center gap-5"
          >
            {/* Icon */}
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-100 border border-red-400">
              <FontAwesomeIcon
                icon={faTriangleExclamation}
                className="text-4xl text-red-500"
              />
            </div>

            {/* Message */}
            <p className="text-gray-700 text-lg font-medium leading-relaxed">
              {message ?? "An unexpected error has occurred."}
            </p>

            {/* Button */}
            <button
              onClick={() =>
                dispatch(onErrorModel({ onError: false, mess: "" }))
              }
              className="mt-2 px-6 py-2 bg-red-500 text-white font-semibold text-sm uppercase tracking-wide hover:bg-red-600 active:scale-[0.98] transition-all shadow"
            >
              OK
            </button>

            {/* Subtle glow effect */}
            <div className="absolute inset-0 rounded-2xl border border-red-300/40 pointer-events-none"></div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
