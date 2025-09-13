import React from 'react'
import styles from './home.module.scss';
import Herobanner from './herobanner';
import ExploreDifferent from './exploreDifferent';
import ChooseYourPath from './chooseYourPath';
import JoinPrivate from './joinPrivate';
import HowitWorks from './howitWorks';
import AutomateSection from './automateSection';
import ThisJourney from './thisJourney';
import GetCertified from './getCertified';
import Articles from './articles';
import ContactUs from './contactUs';
export default function HomePage() {
  return (
    <div>
      <Herobanner/>
      <ExploreDifferent/>
      <ChooseYourPath/>
      <JoinPrivate/>
      <HowitWorks/>
      <AutomateSection/>
      <ThisJourney/>
      <GetCertified/>
      <Articles/>
      <ContactUs/>
    </div>
  )
}
