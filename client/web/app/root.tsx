import stylesheet from '~/tailwind.css';
import type { LinksFunction } from '@remix-run/node';
import {
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useLoaderData,
} from '@remix-run/react';
import { GlobalState } from './context/GlobalState';
import axios from 'axios';
import { Toaster } from './components/ui/toaster';

export const links: LinksFunction = () => [
	{ rel: 'stylesheet', href: stylesheet },
];

axios.defaults.withCredentials = true;

export default function App() {
	const { baseUrl }: { baseUrl: string } = useLoaderData();
	return (
		<html lang='en'>
			<head>
				<meta charSet='utf-8' />
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1'
				/>
				<Meta />
				<Links />
			</head>
			<body>
				<GlobalState baseUrl={baseUrl}>
					<Toaster />
					<Outlet />
				</GlobalState>
				<ScrollRestoration />
				<Scripts />
				<LiveReload />
			</body>
		</html>
	);
}

export const loader = async () => {
	const baseUrl: string = process.env.PUBLIC_DOMAIN || '';
	return { baseUrl };
};
