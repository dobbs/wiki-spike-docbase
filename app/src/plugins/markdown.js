export const Markdown = {
  type: 'markdown',
  deps: ['md'],
  fn: (item, md) => md`${item.text}`
};
