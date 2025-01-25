/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from 'recharts';

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

const ProductChart = () => {
  const [chartData, setChartData] = useState<
    Array<{ month: string; desktop: number }>
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 5000));

      const data = [
        { month: 'January', desktop: 186 },
        { month: 'February', desktop: 305 },
        { month: 'March', desktop: 237 },
        { month: 'April', desktop: 73 },
        { month: 'May', desktop: 209 },
        { month: 'June', desktop: 214 },
      ];

      setChartData(data);
      setIsLoading(false)
    };

    fetchData();
  }, []);
  if (isLoading) {
    return <Skeleton className="h-[500px] w-full" />;
  }

  return (
    <ChartContainer config={chartConfig} className='h-[500px] max-h-[500px]'>
      <BarChart
        accessibilityLayer
        data={chartData}
        margin={{
          top: 20,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey='month'
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Bar dataKey='desktop' fill='var(--color-desktop)' radius={8}>
          <LabelList
            position='top'
            offset={12}
            className='fill-foreground'
            fontSize={12}
          />
        </Bar>
      </BarChart>
    </ChartContainer>
  );
};

export default ProductChart;
