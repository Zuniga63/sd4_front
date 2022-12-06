import { useState } from 'react';
import {
  decrement,
  increment,
  incrementByAmount,
  selectCount,
} from 'src/features/counter';
import { getKanyeQuote, kanyeQuoteSelector } from 'src/features/kanye';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';

import { Button, NumberInput, useMantineColorScheme } from '@mantine/core';
import AppLayout from 'src/components/layouts/app';

export default function Home() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  const [incrementAmount, setIncrementAmount] = useState<number | undefined>(0);
  const count = useAppSelector(selectCount);
  const { data, pending, error } = useAppSelector(kanyeQuoteSelector);
  const dispatch = useAppDispatch();

  return (
    <AppLayout title="Home" description="This is an Amaizing App">
      <div className="px-4 py-4">
        <h2 className="text-lg font-bold">
          Welcome to the greatest app in the world!
        </h2>
        <p className="mb-4 text-sm">
          The current number is{' '}
          <span className="font-bold italic dark:text-blue-500">{count}</span>{' '}
        </p>

        <div className="mb-4 flex items-center gap-x-4">
          <NumberInput
            value={incrementAmount}
            hideControls
            className="flex-grow"
            size="xs"
            min={0}
            onChange={setIncrementAmount}
          />
          <Button
            size="xs"
            disabled={!incrementAmount}
            onClick={() => dispatch(incrementByAmount(incrementAmount || 0))}
          >
            Increment By Amount
          </Button>
        </div>

        <div className="mb-4 flex justify-evenly">
          <Button size="xs" color="green" onClick={() => dispatch(increment())}>
            Increment By 1
          </Button>
          <Button
            size="xs"
            color="grape"
            disabled={count <= 0}
            onClick={() => dispatch(decrement())}
          >
            Decrement by 1
          </Button>
        </div>

        <div className="mb-4">
          <p className="mb-3 rounded-lg border border-dark px-4 py-2 text-xs text-dark dark:border-light dark:text-light">
            {data.quote}
          </p>
          {error ? <span>Hay un error</span> : null}
          <Button
            size="xs"
            color="green"
            loading={pending}
            onClick={() => dispatch(getKanyeQuote())}
          >
            Get Cite
          </Button>
        </div>

        <Button onClick={() => toggleColorScheme()}>
          Change to {colorScheme === 'dark' ? 'light' : 'dark'}{' '}
        </Button>
      </div>
    </AppLayout>
  );
}
