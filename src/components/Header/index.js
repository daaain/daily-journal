import React, { PropTypes } from "react"
import { Link } from "phenomic"

import styles from "./index.css"

const Header = () => (
  <header className={ styles.header }>
    <nav className={ styles.nav }>
      <div className={ styles.navPart1 }>
        <Link className={ styles.link } to={ "/" }>{ "Home" }</Link>
        <Link className={ styles.link } to={ "/journal/" }>{ "Journal" }</Link>
      </div>
    </nav>
  </header>
)

Header.contextTypes = {
  metadata: PropTypes.object.isRequired,
}

export default Header
