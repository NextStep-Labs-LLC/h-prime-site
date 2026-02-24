import { makeRouteHandler } from '@keystatic/next/route-handler';
import config from '../../../../keystatic.config';

// Явно указываем базовый путь для работы на Vercel
const handler = makeRouteHandler({
  config,
  localBaseDirectory: process.cwd(),
});

export const { GET, POST } = handler;

