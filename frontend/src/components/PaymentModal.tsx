import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2 } from 'lucide-react';
import qrImage from '../assets/QR.jpeg';

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    planName: string;
    amount: string;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, planName, amount }) => {
    const handleComplete = () => {
        const phoneNumber = '9227129224';
        const message = `hello i have completed the payment for this plan ( ${planName} ) kindly check it ,  transaction id  : ( Enter id )  ,  UTR number : ( Enter UTR )  , Amount : ${amount}`;
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                            <h3 className="text-xl font-bold text-gray-900">Payment Details</h3>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                            >
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="p-8 flex flex-col items-center text-center">
                            <div className="mb-6">
                                <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">Selected Plan</p>
                                <h4 className="text-2xl font-bold text-indigo-600">{planName}</h4>
                                <p className="text-3xl font-extrabold text-gray-900 mt-2">{amount}</p>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-2xl border-2 border-dashed border-gray-200 mb-8 w-full max-w-[240px]">
                                <img
                                    src={qrImage}
                                    alt="Payment QR Code"
                                    className="w-full h-auto rounded-lg shadow-sm"
                                />
                                <p className="text-xs text-gray-500 mt-3 font-medium">Scan to pay via any UPI app</p>
                            </div>

                            <div className="space-y-4 w-full">
                                <button
                                    onClick={handleComplete}
                                    className="w-full py-4 px-6 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
                                >
                                    <CheckCircle2 className="w-5 h-5" />
                                    Completed Payment ? Click Here
                                </button>
                                <button
                                    onClick={onClose}
                                    className="w-full py-3 px-6 text-gray-500 font-semibold hover:text-gray-700 transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>

                        {/* Footer Info */}
                        <div className="px-8 py-4 bg-gray-50 border-t border-gray-100 text-center">
                            <p className="text-xs text-gray-500">
                                After payment, you will be redirected to WhatsApp to share the transaction details for verification.
                            </p>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default PaymentModal;
