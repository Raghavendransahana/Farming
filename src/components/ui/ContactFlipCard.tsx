"use client";

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { X, Phone, Mail, User as UserIcon } from 'lucide-react';

interface ContactFlipCardProps {
  ownerName: string;
  ownerPhone: string;
  ownerEmail: string;
}

export default function ContactFlipCard({ ownerName, ownerPhone, ownerEmail }: ContactFlipCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Contact Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="w-full py-4 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition-colors"
      >
        Contact Owner
      </button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              onClick={handleClose}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity"
            />

            {/* Modal Container */}
            <div className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none">
              <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg pointer-events-auto relative">
                {/* Close Button */}
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors z-10"
                >
                  <X size={20} className="text-gray-600" />
                </button>

                {/* Header */}
                <div className="bg-green-600/90 px-8 py-10 text-center">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <UserIcon size={36} className="text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Owner Contact</h2>
                  <p className="text-green-50 mt-2">Get in touch with the farm owner</p>
                </div>

                {/* Contact Details */}
                <div className="p-8 space-y-4">
                  {/* Name */}
                  <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="p-3 bg-green-100 rounded-lg">
                      <UserIcon size={20} className="text-green-700" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 font-medium mb-1">Name</p>
                      <p className="text-lg font-semibold text-gray-900">{ownerName}</p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="p-3 bg-green-100 rounded-lg">
                      <Phone size={20} className="text-green-700" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 font-medium mb-1">Phone</p>
                      <a
                        href={`tel:${ownerPhone}`}
                        className="text-lg font-semibold text-green-700 hover:text-green-800 hover:underline"
                      >
                        {ownerPhone}
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="p-3 bg-green-100 rounded-lg">
                      <Mail size={20} className="text-green-700" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 font-medium mb-1">Email</p>
                      <a
                        href={`mailto:${ownerEmail}`}
                        className="text-lg font-semibold text-green-700 hover:text-green-800 hover:underline break-all"
                      >
                        {ownerEmail}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}