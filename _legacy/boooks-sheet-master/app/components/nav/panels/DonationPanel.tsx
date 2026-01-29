import React, { useEffect, useState } from "react";

export default function DonationPanel({
  payload,
  onClose,
}: {
  payload: { bookId?: string; userId?: string; type?: "wish" | "person" | "general" } | null;
  onClose: () => void;
}) {
  // minimal book shape; in real app replace with real data fetch
  const [selectedBook, setSelectedBook] = useState<{ id: string; title: string; price: number; active: number } | null>(null);
  const [amount, setAmount] = useState<string>("");
  const [duration, setDuration] = useState<number>(4);
  const parsedAmount = Number(amount);

  useEffect(() => {
    if (payload?.bookId) {
      // populate with placeholder — replace with real fetch if available
      setSelectedBook({
        id: payload.bookId,
        title: `Book ${payload.bookId}`,
        price: 120,
        active: 42,
      });
    } else {
      setSelectedBook(null);
    }

    // reset form when opening with different payload
    setAmount("");
    setDuration(4);
  }, [payload?.bookId]);

  const getCurrentActive = (b: { active: number }) => b.active ?? 0;

  const handleDonate = () => {
    if (!parsedAmount || parsedAmount <= 0) return;
    // Replace with real donation call
    console.log("donation", {
      type: payload?.type ?? "general",
      bookId: payload?.bookId,
      userId: payload?.userId,
      amount: parsedAmount,
      duration,
    });
    onClose();
  };

  const handleCancel = () => {
    setAmount("");
    setDuration(4);
    onClose();
  };

  return (
    <div className="p-[8px]">
      {/* <h2 className="text-2xl font-semibold mb-2">Donate</h2> */}
      {/* <p className="text-sm text-gray-400 mb-4">
        {payload?.type === "wish"
          ? `Donating to wish ${payload.bookId ?? ""}`
          : payload?.type === "person"
          ? `Donating to user ${payload.userId ?? ""}`
          : "General donation"}
      </p> */}

      <div className="mb-4">
        <h3 className="text-xl font-normal mb-1">{selectedBook ? selectedBook.title : "General Donation"}</h3>
        <p className="text-sm text-gray-400 mb-4">
          {selectedBook ? `${selectedBook.price} kr • Active: ${getCurrentActive(selectedBook)} kr` : "No specific book selected"}
        </p>

        <div className="mb-5">
          <label className="block text-sm text-gray-400 mb-2">Amount (kr)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0"
            className="w-full bg-gray-800 border border-gray-700 rounded-xl p-4 text-lg focus:border-pink-500 focus:outline-none"
            min="1"
          />
        </div>

        <div className="grid grid-cols-4 gap-2 mb-5">
          {[25, 50, 100, 200].map((preset) => (
            <button
              key={preset}
              onClick={() => setAmount(preset.toString())}
              className="bg-gray-800 hover:bg-gray-700 py-3 rounded-xl text-sm font-medium transition-colors"
            >
              {preset}
            </button>
          ))}
        </div>

        <div className="mb-6">
          <label className="block text-sm text-gray-400 mb-2">Duration (months)</label>
          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 3, 4].map((months) => (
              <button
                key={months}
                onClick={() => setDuration(months)}
                className={`py-3 rounded-xl text-sm font-medium transition-colors ${
                  duration === months ? "bg-pink-500 text-white" : "bg-gray-800 hover:bg-gray-700"
                }`}
              >
                {months}m
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleCancel}
            className="flex-1 bg-gray-800 py-4 rounded-xl font-medium hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleDonate}
            disabled={!parsedAmount || parsedAmount <= 0}
            className="flex-1 bg-pink-500 py-4 rounded-xl font-medium hover:bg-pink-600 disabled:bg-gray-800 disabled:text-gray-600 transition-colors"
          >
            Donate
          </button>
        </div>
      </div>

      {/* <button onClick={onClose} className="text-sm text-gray-400 mt-4">
        Close
      </button> */}
    </div>
  );
}