import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@mui/styles';
import { login } from '../../actions/loginActions';
import logo from '../../assets/imgs/logo_banner.png';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    width: 450,
    height: 'fit-content',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    zIndex: 1000,
    padding: '40px 20px',
  },
  img: {
    maxWidth: '80%',
    marginBottom: 20,
  },
  innerBody: {
    lineHeight: '150%',
  },
  splashHeader: {
    fontSize: '2.5rem',
    marginBottom: 20,
    color: theme.palette.primary.main,
  },
  splashTip: {
    fontSize: '1rem',
    animation: '$blinker 1s linear infinite',
    color: theme.palette.text.main,
    fontFamily: "'Oswald', sans-serif !important",
    fontWeight: 'normal'
  },
  splashTipHighlight: {
    fontWeight: 500,
    color: theme.palette.primary.main,
    backgroundColor: '#3b3b3b', 
    padding: '3px 6px', 
    borderRadius: '3px',
    fontFamily: "'Oswald', sans-serif !important",
    fontWeight: 'bold'
  },
  '@keyframes blinker': {
    '50%': {
      opacity: 0.3,
    },
  },
}));

const Splash = (props) => {
  const classes = useStyles();

  const handleKeyPress = (e) => {
    if (e.which === 13 || e.which === 32 || e.which === 1) {
      props.login();
    }
  };

  useEffect(() => {
    ['click', 'keydown', 'keyup'].forEach(function (e) {
      window.addEventListener(e, handleKeyPress);
    });

    return () => {
      ['click', 'keydown', 'keyup'].forEach(function (e) {
        window.removeEventListener(e, handleKeyPress);
      });
    };
  }, []);

  return (
    <div className={classes.wrapper}>
      <div className={classes.innerBody}>
        {/* <span className={classes.splashHeader}>
          Welcome to <span className={classes.splashBranding}></span>
        </span> */}
        <img className={classes.img} src={logo} alt="Logo" />
        <br />
        <span className={classes.splashTip}>
          Press{' '}
          <span className={classes.splashTipHighlight}>ENTER</span>
          {' / '}
          <span className={classes.splashTipHighlight}>SPACE</span>
          {' / '}
          <span className={classes.splashTipHighlight}>LEFT MOUSE</span> To Select Character
        </span>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  loading: state.loader.loading,
  message: state.loader.message,
});

export default connect(mapStateToProps, { login })(Splash);