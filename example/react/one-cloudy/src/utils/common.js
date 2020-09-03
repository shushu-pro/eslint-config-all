/**
 * 本文件存在一系列通用的，可以供各个平台都使用的资源
 */

export const noop = () => {};

export const { isArray } = Array;

export const isFunction = func => typeof func === 'function';

export const autoCompleteValueSplitter = '@:';

/**
 * a@b => {a: b}
 * @param {string} val 输入内容
 */
export const parseAutoCompleteValue = val => {
  if (!val) return {};

  const kv = val.split(autoCompleteValueSplitter);
  if (kv.length !== 2) throw new Error('parsing autocomplete value error => invalid val: ' + val);

  return {
    [kv[0]]: kv[1],
  };
};
