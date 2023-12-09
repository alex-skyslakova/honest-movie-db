// components/AddReviewDialog.tsx
import React from 'react';

interface AddReviewDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onAddReview: (content: string, rating: number) => void;
    content: string;
    rating: number;
    onContentChange: (content: string) => void;
    onRatingChange: (rating: number) => void;
}

const AddReviewDialog: React.FC<AddReviewDialogProps> = (
    {
        isOpen,
        onClose,
        onAddReview,
        content,
        rating,
        onContentChange,
        onRatingChange,
    }) => {
    const calculateColor = (): string => {
        if (rating === 0) return "accent-gray-500";
        else if (rating < 20) return "accent-red-800";
        else if (rating < 35) return "accent-red-600";
        else if (rating < 50) return "accent-orange-400";
        else if (rating < 70) return "accent-orange-300";
        else if (rating < 90) return "accent-lime-500";
        return "accent-lime-400";
    };

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
                    <div className="dark:bg-stone-400 p-4 w-96 rounded-md text-black">
                        <h2 className="text-2xl font-bold mb-4">Add a Review</h2>
                        {/* Review Form */}
                        <form>
                            {/* Content */}
                            <div className="mb-4">
                                <label htmlFor="content" className="block text-sm font-medium  text-gray-700">
                                    Content
                                </label>
                                <textarea
                                    id="content"
                                    name="content"
                                    rows={4}
                                    className="dark:bg-stone-300 mt-1 p-2 w-full border rounded-md"
                                    value={content}
                                    onChange={(e) => onContentChange(e.target.value)}
                                />
                            </div>

                            {/* Rating Slider */}
                            <div className="mb-4">
                                <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
                                    Rating: {rating}
                                </label>
                                <input
                                    type="range"
                                    id="rating"
                                    name="rating"
                                    min="0"
                                    max="100"
                                    value={rating}
                                    onChange={(e) => onRatingChange(Number(e.target.value))}
                                    className={`mt-1 w-full h-6 ${calculateColor()} rounded-md`}
                                />
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    className="dark:bg-stone-500 text-white py-2 px-4 rounded"
                                    onClick={onClose}
                                >
                                    Close
                                </button>
                                <button
                                    type="button"
                                    className="ml-2 dark:bg-stone-700 text-white py-2 px-4 rounded"
                                    onClick={() => onAddReview(content, rating)}
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default AddReviewDialog;
