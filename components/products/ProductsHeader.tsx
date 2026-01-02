"use client";

import { Container, Title, Text, Badge, Group } from '@mantine/core';
import { Wheat } from 'lucide-react';
import { GridPattern } from '@/components/ui/grid-pattern';
import { cn } from '@/lib/utils';

export function ProductsHeader() {
  return (
    <div className="relative mt-5 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-linear-to-r from-green-100 to-emerald-100 rounded-xl overflow-hidden">
      {/* Grid Pattern Background */}
      <GridPattern
        width={30}
        height={30}
        x={-1}
        y={-1}
        squares={[
          [4, 4],
          [5, 1],
          [8, 2],
          [10, 5],
          [12, 3],
          [15, 8],
          [18, 10],
          [6, 12],
          [20, 6],
          [3, 15],
        ]}
        className={cn(
          "[mask-image:radial-linear(500px_circle_at_center,white,transparent)]",
          "fill-green-400/20 stroke-green-500/30"
        )}
      />
      
      {/* Content */}
      <div className="relative z-10 text-center">
        <div className="inline-block mb-4">
          <Badge 
            size="lg" 
            variant="light" 
            color="red"
            leftSection={<Wheat size={16} className="text-orange-400" />}
            className="shadow-sm"
          >
            Farming since 2005
          </Badge>
        </div>
        
        <Title 
          order={1} 
          size="3.75rem" 
          fw={700} 
          className="text-black mb-4 tracking-tight"
        >
          Welcome to Sahana's Farm
        </Title>
        
        <div className="flex items-center justify-center">
          <div className="h-1 bg-green-600 w-24 mb-4 rounded-full"></div>
        </div>
        
        <Text 
          size="xl" 
          c="black" 
          maw={900} 
          mx="auto"
        >
          Where every animal is raised with love, care, and respect & nurtured in a safe, natural environment that values their well-being as much as the quality they bring to our lives.
        </Text>
      </div>
    </div>
  );
}
