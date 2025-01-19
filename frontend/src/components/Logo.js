import SumUpSundaeTextLogo from '../media/SumUpSundaeTextLogo.svg';

function Logo({height = '100px'}) {
     return <img style={{width: '100%', height: height}} src={SumUpSundaeTextLogo} alt="SumUp Sundae Text Logo" />
}

export default Logo;