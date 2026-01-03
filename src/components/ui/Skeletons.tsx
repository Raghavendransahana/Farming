import { Skeleton } from '@mantine/core';

export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-lg">
      <Skeleton height={280} />
      <div className="p-6">
        <Skeleton height={28} width="70%" mb="sm" radius="md" />
        <Skeleton height={18} width="50%" mb="lg" radius="sm" />
        <div className="flex items-center gap-2">
          <Skeleton height={20} width={20} circle />
          <Skeleton height={18} width="60%" radius="sm" />
        </div>
      </div>
    </div>
  );
}

export function ProductDetailSkeleton() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
        <Skeleton height={400} />
        <div className="p-8">
          <Skeleton height={32} width="40%" mb="lg" radius="md" />
          <Skeleton height={20} width="100%" mb="sm" radius="sm" />
          <Skeleton height={20} width="95%" mb="lg" radius="sm" />
          
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div>
              <Skeleton height={16} width="30%" mb="xs" radius="sm" />
              <Skeleton height={20} width="60%" radius="sm" />
            </div>
            <div>
              <Skeleton height={16} width="30%" mb="xs" radius="sm" />
              <Skeleton height={20} width="60%" radius="sm" />
            </div>
          </div>
          
          <Skeleton height={48} radius="lg" />
        </div>
      </div>
    </div>
  );
}
