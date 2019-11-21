import { makeStyles } from "@material-ui/core";
const useStyles = makeStyles(theme => ({
  updateInfoWrapper: {
    maxWidth: '900px',
    margin: '10px auto 0',
    display: 'grid',
    placeItems: 'center'
  },
  button: {
    border: 'none',
    margin: '0'
  },
  formWrapper: {
    display: 'grid',
    placeItems: 'center',
    width: '100%'
  },
  intafyLogo: {
    margin: '20px 0 30px'
  },
  textField: {
    width: '400px'
  },
  allTextFields: {
    // display: 'none'
  },
  photoWrapper: {
    height: '100px',
    width: '100px',
    borderRadius: '50%',
    overflow: 'hidden'
  },
  phofilePhoto: {
    width: 'auto',
    height: '135px',

  },
  imageDiv: {
    display: 'grid',
    placeItems: 'center'

  },
  input: {
    padding: '10px'
  },
  buttonDiv: {
    width: '400px',
    margin: '10px 0 50px'
  }
}));
export default useStyles;
