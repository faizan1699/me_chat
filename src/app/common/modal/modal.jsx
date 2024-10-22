"use client";
import { isModalContext } from "@/app/components/layouts/common/commonlayout";
import React, { useContext, useState } from "react";

const Modal = ({ title, children, footerbtntitle, onclickBtn }) => {

  const { isOpen, setIsOpen } = useContext(isModalContext);

  const closeModal = () => {
    setIsOpen(false);
  }

  return (
    <>

      {isOpen && (
        <div
          className="hs-overlay fixed inset-0 z-[80] overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center"
          role="dialog"
          aria-labelledby="modal-title"
        >
          <div className="bg-white border shadow-sm rounded-xl w-full max-w-lg m-3">
            <div className="flex justify-between items-center py-3 px-4 border-b">
              <h3 id="modal-title" className="font-bold text-gray-800">
                {title}
              </h3>
              <button
                type="button"
                onClick={closeModal}
                className="text-gray-800 hover:bg-gray-200 rounded-full p-1"
                aria-label="Close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6L6 18" />
                  <path d="M6 6L18 18" />
                </svg>
              </button>
            </div>
            <>{children}</>
            {footerbtntitle && (<div className="flex justify-end gap-x-2 py-3 px-4 border-t">

              <button
                type="button"
                onClick={onclickBtn}
                className="py-2 px-3 bg-gray-200 text-gray-800 rounded-lg"
              >
                {footerbtntitle}
              </button>

            </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
