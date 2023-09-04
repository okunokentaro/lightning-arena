'use client';

import { ReactElement, useCallback, useMemo, useState } from 'react';
import { Wheel } from 'react-custom-roulette';

import { useVerifyPin } from '../pin';

type Props = Readonly<{
  ip: string;
}>;

export function LotteryPagePresentation({ ip }: Props): ReactElement {
  const { isVerified } = useVerifyPin(ip);
  const [spin, setSpin] = useState<boolean>(false);
  const [prize, setPrize] = useState<number>(0);

  const data = useMemo(() => {
    return [
      { option: '0' },
      { option: '1' },
      { option: '2' },
      { option: '3' },
      { option: '4' },
      { option: '5' },
      { option: '6' },
      { option: '7' },
      { option: '8' },
    ];
  }, []);

  const handleClick = useCallback(() => {
    setSpin(true);
    const i = Math.floor(Math.random() * data.length);
    setPrize(i);
  }, [data]);

  return isVerified ? (
    <>
      <Wheel
        mustStartSpinning={spin}
        spinDuration={0.4}
        prizeNumber={prize}
        data={data}
        backgroundColors={['#3e3e3e', '#df3428', '#28df34']}
        textColors={['#ffffff']}
        onStopSpinning={(): void => {
          setSpin(false);
        }}
      />
      <button onClick={handleClick}>spin</button>
    </>
  ) : (
    <></>
  );
}
