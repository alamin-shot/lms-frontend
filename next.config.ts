/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		staleTimes: {
			dynamic: 0,
		},
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'picsum.photos',
				port: '',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: 'fastly.picsum.photos',
				port: '',
				pathname: '/**',
			},
		],
	},
};

module.exports = nextConfig;
