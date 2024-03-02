import type { MetaFunction } from '@remix-run/node';
import { About } from '~/components/landing/about';
import Contact from '~/components/landing/contact';
import { Landing } from '~/components/landing/landing';

export const meta: MetaFunction = () => {
	return [
		{ title: 'KaizenKlass' },
		{ property: 'og:title', content: 'KaizenKlass' },
		{
			name: 'description',
			content:
				'a community of people who are willing to collaborate and help each other out with the ever pressing issue of assignments',
		},
		{
			property: 'og:description',
			content:
				'a community of people who are willing to collaborate and help each other out with the ever pressing issue of assignments',
		},
		{
			property: 'og:image',
			itemprop: 'image',
			content: 'https://kaizenklass.me/assets/meta.png',
		},
		{
			property: 'og:image:width',
			content: '526',
		},
		{
			property: 'og:image:height',
			content: '275',
		},
		{
			property: 'og:site_name',
			content: 'Kaizen Klass',
		},
		// <meta property="og:site_name" content="Site Name" />
	];
};

export default function Index() {
	return (
		<main className='w-full min-h-screen'>
			<Landing />
			<About />
			<Contact />
		</main>
	);
}
