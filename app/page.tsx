import Landing from './components/Landing';
import Stats from './components/stats';
import WhatMakesUsDifferent from './components/WhatAreWe';
import InvestmentThesis from './components/different';
import Presence from './components/presence';
import Roadmap from './components/roadmap';
import Logos from './components/logos';
import Partner from './components/partner';
import Team from './components/team';

export default function Home() {
  return (
    <main>
      <Landing />
      <Stats />
      <WhatMakesUsDifferent />
      <InvestmentThesis />
      <Presence />
      <Logos />
      <Roadmap />
      <Partner />
      <Team />
    </main>
  );
}
