import React from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import s from './ProgressBar.module.css'

const ProgressBar = () => {
  return (
    <div className={s.progressBarWrapper}>
        <LinearProgress color="secondary" />
    </div>
  )
}

export default ProgressBar;