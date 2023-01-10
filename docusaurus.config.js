// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

const GITHUB_LINK = "https://github.com/rivertwilight/fav";

/** @type {import('@docusaurus/types').Config} */
const config = {
	title: "René's Bookmark | 收藏夹",
	tagline: "Dinosaurs are cool",
	url: "https://fav.rene.wang",
	baseUrl: "/",
	onBrokenLinks: "ignore",
	onBrokenMarkdownLinks: "warn",
	favicon: "img/favicon.ico",

	// GitHub pages deployment config.
	// If you aren't using GitHub pages, you don't need these.
	organizationName: "rivertwilight", // Usually your GitHub org/user name.
	projectName: "fav", // Usually your repo name.

	// Even if you don't use internalization, you can use this field to set useful
	// metadata like html lang. For example, if your site is Chinese, you may want
	// to replace "en" with "zh-Hans".
	i18n: {
		defaultLocale: "en",
		locales: ["en"],
	},

	presets: [
		[
			"classic",
			/** @type {import('@docusaurus/preset-classic').Options} */
			({
				docs: {
					routeBasePath: "/",
					sidebarPath: require.resolve("./sidebars.js"),
					// Please change this to your repo.
					// Remove this to remove the "edit this page" links.
					editUrl:
						"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
				},
				blog: false,
				theme: {
					customCss: require.resolve("./src/css/custom.css"),
				},
			}),
		],
	],

	themeConfig:
		/** @type {import('@docusaurus/preset-classic').ThemeConfig} */
		({
			navbar: {
				title: "René 的收藏夹",
				logo: {
					alt: "My Site Logo",
					src: "img/icon-192.png",
				},
				items: [
					// {
					// 	type: "doc",
					// 	docId: "intro",
					// 	position: "left",
					// 	label: "Bookmarks",
					// },
					{
						href: GITHUB_LINK,
						label: "GitHub",
						position: "right",
					},
				],
			},
			footer: {
				style: "dark",
				links: [
					{
						title: "More",
						items: [
							{
								label: "Blog",
								to: "https://www.rene.wang",
							},
							{
								label: "GitHub",
								href: GITHUB_LINK,
							},
						],
					},
				],
				copyright: `Copyright © ${new Date().getFullYear()} René Wang.`,
			},
			prism: {
				theme: lightCodeTheme,
				darkTheme: darkCodeTheme,
			},
		}),
};

module.exports = config;
