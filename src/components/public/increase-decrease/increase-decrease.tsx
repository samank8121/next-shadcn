import clsx from 'clsx';
import React from 'react';
import { Minus, Plus, Trash } from 'lucide-react';

import { Button } from '@/components/ui/button';

type IncreaseDecreaseProps = {
  value?: number;
  addBtnText?: string;
  maxValue?: number;
  className?: string;
  onChange?: (value: number) => void;
};

const IncreaseDecrease: React.FC<IncreaseDecreaseProps> = ({
  value = 0,
  addBtnText,
  maxValue = 999,
  onChange,
  className,
}) => {
  const onChanging = (newValue: number) => {
    if (newValue <= maxValue) {
      if (onChange) {
        onChange(newValue);
      }
    }
  };

  return (
    <div className={clsx('flex flex-row h-9', className)}>
      {value === 0 && (
        <Button
          size='lg'
          name='Add'
          className={clsx('h-9 w-9 flex justify-start', { 'w-max rounded-full': addBtnText })}
          onClick={() => {
            onChanging(1);
          }}
        >
          <Plus strokeWidth={3} />
          {addBtnText}
        </Button>
      )}
      {value !== 0 && (
        <div className='flex flex-row justify-between items-center rounded-md min-w-[115px]'>
          <Button
            size='sm'
            className='h-9 w-9'
            data-testid='decrease'
            onClick={() => {
              onChanging(value - 1);
            }}
          >
            {value === 1 ? (
              <Trash/>
            ) : (
              <Minus/>
            )}
          </Button>
          <span>{value}</span>
          <Button
            size='sm'
            data-testid='increase'
            onClick={() => {
              onChanging(value + 1);
            }}
          >
            <Plus />
          </Button>
        </div>
      )}
    </div>
  );
};

IncreaseDecrease.displayName = 'IncreaseDecrease';
export default IncreaseDecrease;
