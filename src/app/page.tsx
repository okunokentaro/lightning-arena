'use client';

import {
  FormEvent,
  FormEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

export default function Home() {
  const [message, setMessage] = useState('');
  const [input, setInput] = useState('');
  const wsRef = useRef<WebSocket>();

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:7777');
    wsRef.current = socket;

    socket.addEventListener('message', (ev) => {
      if (typeof ev.data === 'string') {
        setMessage(ev.data);
        return;
      }
    });

    return () => socket.close();
  }, []);

  const handleSubmit: FormEventHandler = useCallback(
    (ev: FormEvent<HTMLFormElement>) => {
      ev.preventDefault();
      wsRef.current?.send(input);
    },
    [input],
  );

  return (
    <div>
      <h1>{JSON.stringify(message)}</h1>
      <form onSubmit={handleSubmit}>
        <input
          className="text-zinc-800"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button>送信</button>
      </form>
    </div>
  );
}
