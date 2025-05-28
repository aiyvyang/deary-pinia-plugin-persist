import { defineConfig } from 'vitepress'

const META_URL = 'https://aiyvyang.github.io/deary-pinia-plugin-persist/'
const META_TITLE = 'Deary Pinia Plugin Persist'
const META_DESCRIPTION = 'Persist pinia state data in uniAppStorage.'

export default defineConfig({
  base: '/deary-pinia-plugin-persist/',
  title: META_TITLE,
  description: META_DESCRIPTION,
  lang: 'en-US',
  head: [
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:url', content: META_URL }],
    ['meta', { property: 'og:title', content: META_TITLE }],
    ['meta', { property: 'og:description', content: META_DESCRIPTION }],
    ['meta', { property: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { property: 'twitter:url', content: META_URL }],
    ['meta', { property: 'twitter:title', content: META_TITLE }],
    ['meta', { property: 'twitter:description', content: META_DESCRIPTION }],
  ],
  themeConfig: {
    nav: [
      { text: 'Guide', link: '/' },
      { text: 'Gitee', link: 'https://gitee.com/aiyvyang/deary-pinia-plugin-persist' },
      { text: 'Github', link: 'https://github.com/aiyvyang/deary-pinia-plugin-persist' },
    ],

    sidebar: [
      {
        text: 'Guide',
        children: [
          {
            text: 'Install',
            link: '/',
          },
          {
            text: 'Basic Usage',
            link: '/basic-usage',
          },
          {
            text: 'Advanced Usage',
            children: [
              {
                text: 'Strategies',
                link: '/advanced/strategies',
              },
              {
                text: 'Custom storage key',
                link: '/advanced/custom-key',
              },
              {
                text: 'Custom Storage',
                link: '/advanced/custom-storage',
              },
            ],
          },
        ],
      },
    ],
  },
})
