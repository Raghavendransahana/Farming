"use client";

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Paper, Stack, Text, Button, Divider, Group, Loader } from '@mantine/core';
import { CheckCircle, Package, ArrowRight } from 'lucide-react';
import { useOrder } from '@/contexts/OrderContext';
import { div } from 'framer-motion/client';

function SuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { getOrderById } = useOrder();
  const [order, setOrder] = useState<ReturnType<typeof getOrderById>>();

  useEffect(() => {
    const orderId = searchParams.get('orderId');
    if (orderId) {
      const foundOrder = getOrderById(orderId);
      setOrder(foundOrder);
    }
  }, [searchParams, getOrderById]);


  return (
    order ?(
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
     

     Success
      </div>) : (
        <div className="min-h-screen flex items-center justify-center">
        <Loader color="#2B8A3E" />
      </div>
    )
  );
}

