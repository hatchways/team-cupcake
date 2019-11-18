import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    dialogWrapper: {
        maxWidth: '1000px'
    },
    shareMusicWrapper: {
        width: '800px',
        // height: '100vh',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridTemplateRows: '400px',
    },
    shareYourMusicWrapper: {
    },
    shareButtonWrapper: {
        gridColumn: 'span 2',
        placeSelf: 'center',
    },
    mainBody: {
        margin: '40px'  
    },
    button: {
        margin: theme.spacing(1),
        backgroundColor: '#4a76fd',
        padding: '8px 50px',
        textTransform: 'capitalize',
        boxShadow: 'none'
    },
    h1: {

    },
    musicTitleBox: {
        display: 'grid',
        gridTemplateColumns: '1.5fr 7fr 2fr',
        alignItems: 'center'
    },
    storeLogo: {
        height: '30px'
    },
    songTitle: {
        margin: '0',
        fontSize: '1.5em'
    },
    songHeader: {
        margin: '0'
    },
    descriptionWrapper: {
        margin: '30px 0 0 0'
    },
    descriptionHeader: {
        margin: '0'
    },
    uploadPhoto: {
        display: 'grid'
    },
    uploadPhotoWrapper: {
        display: 'grid',
        placeItems: 'center',
        placeContent: 'center'
    },
    photoUploaded: {
        height: '200px'
    },
    textField: {
        boxShadow: '0px 0px 5px -3px rgba(0,0,0,0.75)'
    }
}));
export default useStyles;
