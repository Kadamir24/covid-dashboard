import React from 'react';
import styles from './header.module.scss';

const Header = () => (
    <header className={styles.container}>
        <h2 className={styles.title}>COVID-19 Dashboard</h2>
    </header>
);

export default Header;
