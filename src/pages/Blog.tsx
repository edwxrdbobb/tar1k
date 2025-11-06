'use client';

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  slug: string;
  image: string;
}

const mockPosts: BlogPost[] = [
  {
    id: 1,
    title: "Behind the Scenes: Recording 'No Sense' Acoustic Reprise",
    excerpt: "Dive into the intimate studio sessions where raw emotion meets refined production. From Sierra Leone influences to final mixes.",
    date: "October 15, 2025",
    category: "Studio",
    slug: "no-sense-acoustic-reprise",
    image: "/ta1.jpeg", // Or Google Drive: "https://drive.google.com/uc?export=view&id=YOUR_ID"
  },
  {
    id: 2,
    title: "Tour Diary: First Live Show in Freetown",
    excerpt: "Relive the energy of my debut performance back home. Crowd reactions, setlist surprises, and what afro-fusion means to me.",
    date: "September 28, 2025",
    category: "Live",
    slug: "freetown-tour-debut",
    image: "/ta2.jpeg",
  },
  {
    id: 3,
    title: "The Making of 'Work': Blending Rap and Soul",
    excerpt: "How Caribbean rhythms and personal storytelling shaped my latest single. Plus, a sneak peek at the music video.",
    date: "August 10, 2025",
    category: "Releases",
    slug: "making-of-work",
    image: "/ta3.jpeg",
  },
  {
    id: 4,
    title: "Playlist Curated: Influences from Patch Am Freestyle",
    excerpt: "10 tracks that inspired my jazz-infused freestyle. From old Sierra Leone legends to modern global beats.",
    date: "July 22, 2025",
    category: "Playlists",
    slug: "patch-am-influences",
    image: "/ta4.jpeg",
  },
  {
    id: 5,
    title: "Reflections on Luv 2 Luv U: Love in Afro-Fusion",
    excerpt: "Exploring themes of connection in my new track. Lyrics breakdown, fan stories, and upcoming acoustic versions.",
    date: "June 5, 2025",
    category: "Releases",
    slug: "luv-2-luv-u-reflections",
    image: "/ta5.jpeg",
  },
  // Add more up to 50+ as needed
];

const POSTS_PER_PAGE = 3;

const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  const filteredPosts = mockPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  useEffect(() => {
    cardsRef.current.forEach((card, index) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: index * 0.1,
      });
    });
  }, [paginatedPosts]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background py-12">
      {/* Header */}
      <div className="container mx-auto px-4 mb-12">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Blog</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Stories behind the music, tour tales, and creative insights from TAR1K.
          </p>
        </div>

        {/* Search */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {paginatedPosts.map((post, index) => (
            <div key={post.id} ref={(el) => (cardsRef.current[index] = el!)}>
              <a href={`/blog/${post.slug}`}>
                <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">{post.category}</Badge>
                      <div className="text-sm text-muted-foreground flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {post.date}
                      </div>
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {post.title}
                    </CardTitle>
                    <CardDescription>{post.excerpt}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Button variant="ghost" className="w-full justify-start">
                      Read More
                    </Button>
                  </CardContent>
                </Card>
              </a>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Previous
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => handlePageChange(page)}
              >
                {page}
              </Button>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;