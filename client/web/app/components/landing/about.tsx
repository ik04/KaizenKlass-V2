export const About = () => {
	return (
		<section className='bg-main flex flex-col gap-8 md:gap-20 p-4 md:p-16'>
			<div className='flex justify-center items-center max-w-7xl 2xl:max-w-screen-2xl mx-auto w-full'>
				<section className='grid grid-cols-1 md:grid-cols-2 gap-8'>
					<div className='flex flex-col gap-6 md:gap-4 md:items-start'>
						<h2 className='font-display text-center md:text-left text-highlight text-3xl md:text-7xl'>
							Why Does This Exist
						</h2>
						<p className='font-base text-highlightSecondary text-justify text-sm md:text-2xl md:mt-5'>
							The Purpose of this project is to build a community
							of people who are willing to collaborate and help
							each other out with the ever pressing issue of
							assignments, for me personally i feel that i don't
							learn much from them and they pile up on me which
							does nothing to alleviate my stress.
						</p>

						<p className='font-base text-highlightSecondary text-justify text-sm md:text-2xl'>
							I know that this problem isn't limited to myself and
							so i want to build a platform to combat these
							issues. i'll also creep in features to help out
							students generally as well as point them to
							organizations that can help them grow. Join the
							Community and make life easier for everyone involved
							:)
						</p>
					</div>
					<div className='w-full flex items-center justify-center'>
						<div className='w-full max-w-xs md:max-w-sm'>
							<img
								src='/assets/about.png'
								alt=''
								className='w-full h-auto object-cover'
							/>
						</div>
					</div>
				</section>
			</div>
			<div className='flex justify-center items-center max-w-7xl 2xl:max-w-screen-2xl mx-auto w-full'>
				<section className='grid grid-cols-1 md:grid-cols-2 gap-8'>
					<div className='purpose flex flex-col space-y-5 md:space-y-4 items-center md:items-start order-first md:order-last'>
						<h2 className='font-display text-highlight mt-3 text-center md:text-left md:mt-0 md:mb-3 text-3xl md:text-7xl'>
							What's in store
						</h2>
						<p className='font-base text-highlightSecondary text-justify md:text-start text-sm md:text-2xl'>
							In the future i hope to make a mobile version of
							this that's more accessible to everyone and scale up
							this application to include other years and
							branches. i also intend to creep in features such as
							markdown integration for easier sharing of code
							snippets, a notes section for just material related
							to subjects, a tests section with old test papers,
							more themes and maybe even a fun corner to relax
							while surfing the site.
						</p>

						<p className='font-base text-highlightSecondary text-justify md:text-start text-sm md:text-2xl'>
							I hope to get more developers on board so that i can
							make this project into something truly remarkable
							and at the same time help out my peers through this
							persistent stress. things are still rough around the
							edges but i thoroughly enjoyed making this and i
							hope everyone who visits this site finds some use
							for it.
						</p>
					</div>
					<div className='w-full flex items-center justify-center order-last md:order-first'>
						<div className='w-full max-w-xs md:max-w-sm'>
							<img
								src='/assets/about-2.jpg'
								alt=''
								className='w-full h-auto object-contain'
							/>
						</div>
					</div>
				</section>
			</div>
		</section>
	);
};
