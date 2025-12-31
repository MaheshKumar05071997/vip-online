import fs from "fs";
import path from "path";
import Navbar from "@/components/Navbar";
import { MerinoClientGrid } from "./client-grid"; // We will create this next

export default function MerinoGalleryPage() {
  // 1. SERVER SIDE: Read the 'public/merino' folder automatically
  const directoryPath = path.join(process.cwd(), "public/merino");
  let images: string[] = [];

  try {
    const files = fs.readdirSync(directoryPath);
    // Filter to keep only images
    images = files.filter((file) => /\.(jpg|jpeg|png|webp)$/i.test(file));
  } catch (err) {
    console.error("Error reading folder:", err);
  }

  return (
    <main className="min-h-screen bg-orange-50">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          Merino Laminates Collection
        </h1>
        <p className="text-center text-gray-500 mb-12">
          Found {images.length} designs in the catalog.
        </p>

        {/* Pass the file list to the client component */}
        <MerinoClientGrid initialImages={images} />
      </div>
    </main>
  );
}