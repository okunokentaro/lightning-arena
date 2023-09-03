import { PreconditionError } from 'universal/src';
import { RawData } from 'ws';

export function convertToString(data: RawData): string {
  if (data instanceof Buffer) {
    return data.toString('utf-8');
  }

  if (data instanceof ArrayBuffer) {
    // ArrayBufferの場合は一度Bufferに変換してから文字列に変換します。
    return Buffer.from(data).toString('utf-8');
  }

  if (Array.isArray(data)) {
    // Bufferの配列の場合、それぞれのBufferを文字列に変換して連結します。
    return data.map((buffer) => buffer.toString('utf-8')).join('');
  }

  throw new PreconditionError('unsupported type');
}
