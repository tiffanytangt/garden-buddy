'use client';
import { Fragment } from 'react';

const getTimeOfDay = (): string => {
    const now = new Date();
    const hour = now.getHours();
    if (hour < 12) {
      return 'morning';
    } else if (hour < 17) {
      return 'afternoon';
    } else {
      return 'evening';
    }
  };
const TodGreeting = ({ name }: {name?: string}) => {

  return <>Good {getTimeOfDay()}{name ? `, ${name}` : '!' }</>;
};

export default TodGreeting;
