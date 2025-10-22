import AC from './json/AC.json'
import AL from './json/AL.json'
import AM from './json/AM.json'
import AP from './json/AP.json'
import BA from './json/BA.json'
import CE from './json/CE.json'
import DF from './json/DF.json'
import ES from './json/ES.json'
import GO from './json/GO.json'
import MA from './json/MA.json'
import MG from './json/MG.json'
import MS from './json/MS.json'
import MT from './json/MT.json'
import PA from './json/PA.json'
import PB from './json/PB.json'
import PE from './json/PE.json'
import PI from './json/PI.json'
import PR from './json/PR.json'
import RJ from './json/RJ.json'
import RN from './json/RN.json'
import RO from './json/RO.json'
import RR from './json/RR.json'
import RS from './json/RS.json'
import SC from './json/SC.json'
import SE from './json/SE.json'
import SP from './json/SP.json'
import TO from './json/TO.json'

export const CITIES_BY_UF = {
  AC,
  AL,
  AM,
  AP,
  BA,
  CE,
  DF,
  ES,
  GO,
  MA,
  MG,
  MS,
  MT,
  PA,
  PB,
  PE,
  PI,
  PR,
  RJ,
  RN,
  RO,
  RR,
  RS,
  SC,
  SE,
  SP,
  TO,
}
export type UFCode = keyof typeof CITIES_BY_UF
