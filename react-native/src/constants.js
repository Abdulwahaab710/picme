/**
 * @providesModule Constants
 */

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
}
