// @flow

import variable from './../variables/platform';

export default (variables /* : * */ = variable) => {
  const iconTheme = {
    fontSize: variables.iconFontSize,
    color: variable.textColor,
    '.list': {
        fontSize:variables.inputFontSize-8
        }
  };

  return iconTheme;
};
