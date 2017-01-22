/**
 * @providesModule Constants
 */

const server = {
  url: 'http://localhost:8000',
};

const colors = {
  white: '#FFFFFF',
  whiteTransparent: '#FFFFFFB2',
  grey: '#495867',
  greyTransparent: '#495867B2',
  darkBlue: '#577399',
  darkBlueTransparent: '#577399B2',
  paleBlue: '#BDD5EA',
  paleBlueTransparent: '#BDD5EAB2',
  lightBlue: '#F7F7FF',
  lightBlueTransparent: '#F7F7FFB2',
  orange: '#FE5F55',
  orangeTransparent: '#FE5F55B2',
  darkGrey: '#1D1D1D',
  darkGreyTransparent: '#1D1D1DB2',
};

const textSize = {
  title: 24,
  large: 20,
  body: 18,
  secondaryBody: 16,
  caption: 14,
};

const marginSize = {
  compact: 4,
  regular: 8,
  expanded: 12,
};

module.exports = {
  Colors: {
    ...colors,
    primary: colors.paleBlue,
    accent: colors.orange,
    primaryWhite: colors.lightBlue,
    secondaryWhite: colors.lightBlueTransparent,
    primaryBlack: colors.darkGrey,
    secondaryBlack: colors.darkGreyTransparent,
  },

  Sizes: {
    Margins: marginSize,
    Text: textSize,
  },

  Server: {
    ...server,
  },
}
