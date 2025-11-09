'use client';

import { useState, useEffect, useMemo } from "react";
import { X, ChevronLeft, ChevronRight, Filter } from "lucide-react";
// import Link from "next/link";

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  category: "live" | "studio" | "backstage" | "promo" | "portrait";
}

const IMAGES_PER_PAGE = 12;

const GalleryPage = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Generate 50 images from public/ta1.jpeg to ta50.jpeg
  const allImages: GalleryImage[] = useMemo(() => {
    const images: GalleryImage[] = [];
    const categories: GalleryImage["category"][] = ["live", "studio", "backstage", "promo", "portrait"];
    
    for (let i = 1; i <= 50; i++) {
      images.push({
        id: i,
        src: `/ta${i}.jpeg`,
        alt: `Gallery image ${i}`,
        category: categories[i % categories.length],
      });
    }
    return images;
  }, []);

  // Filter images
  const filteredImages = useMemo(() => {
    if (selectedCategory === "all") return allImages;
    return allImages.filter(img => img.category === selectedCategory);
  }, [allImages, selectedCategory]);

  // Pagination
  const totalPages = Math.ceil(filteredImages.length / IMAGES_PER_PAGE);
  const paginatedImages = filteredImages.slice(
    (currentPage - 1) * IMAGES_PER_PAGE,
    currentPage * IMAGES_PER_PAGE
  );

  // Reset to page 1 when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  const categoryLabels: Record<string, string> = {
    all: "All Images",
    live: "Live Performances",
    studio: "Studio Sessions",
    backstage: "Backstage",
    promo: "Promo Shoots",
    portrait: "Portraits",
  };

  return (
    <>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <a href="/" className="text-2xl font-bold">
                tar1k
              </a>
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors md:hidden"
              >
                <Filter className="w-4 h-4" />
                <span>Filter</span>
              </button>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          {/* Hero */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Gallery</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Explore 50+ moments from live shows, studio sessions, and creative journeys
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <aside className={`${isFilterOpen ? 'block' : 'hidden'} md:block lg:w-64 flex-shrink-0`}>
              <div className="sticky top-24 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Categories</h3>
                  <div className="space-y-2">
                    {Object.entries(categoryLabels).map(([key, label]) => (
                      <button
                        key={key}
                        onClick={() => {
                          setSelectedCategory(key);
                          setIsFilterOpen(false);
                        }}
                        className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                          selectedCategory === key
                            ? "bg-primary text-primary-foreground font-medium"
                            : "hover:bg-secondary/50"
                        }`}
                      >
                        {label}
                        <span className="ml-2 text-sm opacity-70">
                          ({key === "all" ? allImages.length : allImages.filter(i => i.category === key).length})
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            {/* Gallery Grid */}
            <main className="flex-1">
              {paginatedImages.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-muted-foreground">No images found in this category.</p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
                    {paginatedImages.map((image) => (
                      <button
                        key={image.id}
                        onClick={() => setSelectedImage(image.src)}
                        className="group aspect-square rounded-xl overflow-hidden border border-border shadow-md hover:shadow-xl transition-all duration-300 hover:border-white/30"
                      >
                        <img
                          src={image.src}
                          alt={image.alt}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                          <p className="text-white text-sm font-medium truncate">
                            {image.alt}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2 mt-12">
                      <button
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                        className="p-2 rounded-lg bg-secondary/50 hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>

                      <div className="flex items-center gap-1">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`px-3 py-1 rounded-lg text-sm transition-all ${
                              currentPage === page
                                ? "bg-primary text-primary-foreground font-medium"
                                : "hover:bg-secondary/50"
                            }`}
                          >
                            {page}
                          </button>
                        ))}
                      </div>

                      <button
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-lg bg-secondary/50 hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </>
              )}
            </main>
          </div>
        </div>

        {/* Full-Screen Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all backdrop-blur-sm"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="relative max-w-6xl w-full h-full max-h-screen">
              <img
                src={selectedImage}
                alt="Full screen view"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default GalleryPage;