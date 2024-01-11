import React from 'react';
import styles from './Loader.module.css'

export function Loader(){
    return (
        <div className={styles.loading}>
            <span>.</span>
            <span>.</span>
            <span>.</span>
        </div>
    )
}