import { Outlet, Link } from "react-router-dom";
import { Fragment } from "react";
import { ReactComponent as CrownLogo } from '../../assets/crown.svg';
import './navigation.styles.scss';

const Navigation = () => {
    return (
      <Fragment>
        <div className="navigation">
          <Link className="logo-container" to="/">
            <CrownLogo className="Logo"></CrownLogo>
          </Link>
          
          <div className="nav-links-container">
            <Link className="nav-link" to="/shop">
              Shop
            </Link>
            <Link className="nav-link" to="/auth">
              Sign in
            </Link>
          </div>
        </div>
        <Outlet></Outlet>
      </Fragment>
    )
  }

  export default Navigation;