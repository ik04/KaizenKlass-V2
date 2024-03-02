import { Link } from '@remix-run/react';

const Contact = () => {
	return (
		<section className='w-full bg-main flex flex-col md:flex-row items-center p-4 md:p-16'>
			<div className='max-w-7xl 2xl:max-w-screen-2xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-8'>
				<section className='flex flex-col md:gap-10 gap-4'>
					<h2 className='font-display text-highlight md:text-7xl text-3xl text-center md:text-left'>
						Drop me a Mail
					</h2>
					<p className='font-base text-highlightSecondary text-sm md:text-2xl'>
						Feedback is invaluable to me and i hope to improve the
						experience of using this application while development
						is ongoing, i'd love to heard your thoughts on the site
						and if and how its been helping you out.
					</p>
					<p className='font-base text-highlightSecondary text-sm md:text-2xl'>
						if you have any suggesstions regarding what i should
						implement next feel free to drop them as well, you can
						also use this to request assignments or request to
						contribute to the site, i would greatly appreciate your
						input.
					</p>
					<Link
						to='mailto:kaizenklass5@gmail.com'
						target='_blank'
						role='button'
						className='flex items-center space-x-3 md:space-x-6 md:w-full p-4 md:p-0 md:h-16 h-10 bg-highlightSecondary justify-center rounded-3xl hover:bg-secondary hover:text-highlight transition-all duration-300 ease-in-out focus:bg-secondary focus:text-highlight md:text-3xl text-xl font-base cursor-pointer'
					>
						<img
							src='/assets/email.png'
							className='md:w-12 w-5'
							alt=''
						/>
						<p className='text-main md:text-3xl text-xl font-base'>
							Email me now!
						</p>
					</Link>
				</section>
				<section className='w-full h-full flex items-center justify-center'>
					<div className='w-full max-w-xs md:max-w-sm'>
						<img
							src='/assets/about-3.jpg'
							alt=''
							className='w-full h-auto object-cover'
						/>
					</div>
				</section>
			</div>
		</section>
	);
};

export default Contact;
