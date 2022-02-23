import ejs from 'ejs';
ejs.delimiter = '?';

export default {
  compileHtmlData: (source: string, data: object) => {
    const template = ejs.compile(source);
    return template(data);
  },
};
