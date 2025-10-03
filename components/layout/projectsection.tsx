"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github } from 'lucide-react';
import Image from 'next/image';
import { TResponse } from '@/zod/response.typeschema';
import { TProject } from '@/zod/project.typeschema';
import Link from 'next/link';

// Client component if you want client-side fetching
"use client";

import { useEffect, useState } from "react";

export default function ProjectsSection() {
  const [resData, setResData] = useState<TResponse<TProject[]> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      const url = process.env.NEXT_PUBLIC_BACKEND_URL;

      try {
        const res = await fetch(`${url}/api/projects/get-all`, {
          method: "GET",
          cache: "no-store",
          headers: { "Content-Type": "application/json" },
        });

        const data: TResponse<TProject[]> = await res.json();
        setResData(data);
      } catch (error) {
        console.error("Fetch error:", error);
        setResData({
          success: false,
          message: "Failed to load projects",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl container text-center text-muted-foreground">
          Loading projects...
        </div>
      </section>
    );
  }

  if (!resData || !resData.success) {
    return (
      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl container text-center text-red-500">
          {resData?.message ?? "Failed to load projects"}
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="px-6 py-20">
      <div className="mx-auto max-w-6xl container">
        {/* Section header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 font-bold text-foreground text-3xl md:text-4xl text-balance">
            Featured Projects
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground text-lg text-balance">
            A collection of projects that showcase my skills in full-stack
            development, UI/UX design, and problem-solving.
          </p>
        </div>

        {/* Projects grid */}
        {resData.data.length === 0 ? (
          <p className="text-muted-foreground text-center">No projects found.</p>
        ) : (
          <div className="gap-8 grid grid-cols-1 md:grid-cols-2">
            {resData.data.map((project) => (
              <Card
                key={project.id}
                className="group bg-card hover:bg-card/80 border-border overflow-hidden transition-colors duration-300"
              >
                {/* Project image */}
                <div className="relative overflow-hidden">
                  <Image
                    src={project.thumbnailUrl ?? "/placeholder.png"}
                    alt={project.name}
                    width={500}
                    height={300}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-background/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <CardHeader>
                  <CardTitle className="text-card-foreground text-xl">
                    {project.name}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground leading-relaxed">
                    {project.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Features/Tech stack */}
                  <div className="flex flex-wrap gap-2">
                    {project.features?.map((feature, index) => (
                      <Badge
                        key={feature + index}
                        variant="secondary"
                        className="text-xs"
                      >
                        {feature}
                      </Badge>
                    ))}
                  </div>

                  {/* Action buttons */}
                  <div className="flex items-center gap-3 pt-2">
                    <Button size="sm" asChild>
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink size={16} className="mr-2" />
                        Live Site
                      </a>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <a
                        href={project.projectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github size={16} className="mr-2" />
                        Code
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* View all projects button */}
        <div className="mt-12 text-center">
          <Button variant="outline" size="lg" asChild>
            <Link href="/projects">View All Projects</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
