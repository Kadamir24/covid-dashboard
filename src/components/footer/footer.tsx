import React from 'react';
import styles from './footer.module.scss';

const Footer = () => (
    <footer className={styles.container}>
        <a href="https://rs.school/"><img className={styles.logo} alt="logo blyat" src="https://rs.school/images/rs_school_js.svg" /></a>
        <div className={styles.authors}>
            <a className={styles.author} href="https://github.com/kadamir24">@Kadamir24</a>
            <a className={styles.author} href="https://github.com/enthusiast17">@enthusiast17</a>
        </div>
    </footer>
);

export default Footer;
