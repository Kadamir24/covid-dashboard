import React from 'react';

const TotalNumber = (props: {
    styles: { readonly [key: string]: string },
    title: string,
    number: number,
}) => {
    const {
        styles, title, number,
    } = props;
    return (
        <div className={styles['total-number']}>
            <h2 className={styles.title}>{title}</h2>
            <h3 className={styles.number}>{number}</h3>
        </div>
    );
};

export default TotalNumber;
