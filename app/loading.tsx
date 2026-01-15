import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-orange-50">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="w-12 h-12 text-orange-500 animate-spin" />
        <p className="text-gray-600 font-semibold animate-pulse">
          Loading VIP Store...
        </p>
      </div>
    </div>
  );
}
