import { Link } from '@remix-run/react';
import type { MetaFunction } from '@remix-run/node';

export const meta: MetaFunction = () => {
  return [{ title: 'New Remix App' }, { name: 'description', content: 'Welcome to Remix!' }];
};

export default function Index() {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.8' }}>
      <h1 className='text-3xl font-bold underline'>Welcome to Remix</h1>
      <ul>
        <li>
          <a target='_blank' href='https://remix.run/tutorials/blog' rel='noreferrer'>
            15m Quickstart Blog Tutorial
          </a>
        </li>
        <li>
          <a target='_blank' href='https://remix.run/tutorials/jokes' rel='noreferrer'>
            Deep Dive Jokes App Tutorial
          </a>
        </li>
        <li>
          <a target='_blank' href='https://remix.run/docs' rel='noreferrer'>
            Remix Docs
          </a>
        </li>
        <li>
          <Link className='underline' target='_blank' to='https://remix-docs-ja.techtalk.jp/' rel='noreferrer'>
            Remix JP Docs
          </Link>
        </li>
      </ul>
    </div>
  );
}
