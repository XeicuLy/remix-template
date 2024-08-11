import { Link, useLoaderData } from '@remix-run/react';
import { sampleStyle } from '@/style/sample.css';
import type { LoaderFunction, MetaFunction } from '@remix-run/node';

export const meta: MetaFunction = () => {
  return [{ title: 'New Remix App' }, { name: 'description', content: 'Welcome to Remix!' }];
};

export const loader: LoaderFunction = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await response.json();
  return data;
};

export default function Index() {
  const data = useLoaderData<typeof loader>();
  console.log(data);

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.8' }}>
      <h1 className='text-3xl font-bold underline'>Welcome to Remix</h1>
      <ul>
        <li className={sampleStyle}>
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
