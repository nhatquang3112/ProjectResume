import React, {Component} from 'react';

class Header extends Component {

  render(){
    return (
      <div>
        <nav className="navbar ">
          <div className="navbar-brand">
            <a className="navbar-item">
              <img src="https://i.imgur.com/cca8fDa.png" alt="Bulma: a modern CSS framework based on Flexbox" />
            </a>


            <a className="navbar-item"  href="https://github.com/nhatquang3112">
              <label class="label">Contact me</label>

              <span className="icon">
                <i class="fab fa-github"></i>
              </span>

            </a>

          </div>
        </nav>
      </div>
    );
  }
}
export default Header
