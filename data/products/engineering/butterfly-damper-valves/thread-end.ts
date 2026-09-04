import type { ProductEngineeringData } from '@/types/content';
import { cvColumns } from '../shared';

export const threadEndEngineering: ProductEngineeringData = {
    tables: [
      {
        id: 'materials',
        title: 'Materials & Seat Construction',
        tabLabel: 'Materials',
        kind: 'materials',
        columns: ['Component', 'Standard', 'Optional'],
        rows: [
          ['Body', 'Cast Iron', '—'],
          ['Disc', 'Carbon Steel', '—'],
          ['Shaft', 'Stainless Steel', '—'],
          ['Seals', 'EPT O-Rings', 'Viton O-Rings to 300°F'],
          ['Seat', 'Angle', 'Swing-Thru'],
        ],
      },
      {
        id: 'dimensions',
        title: 'Typical Dimensions: 1” Through 4”',
        tabLabel: 'Dimensions',
        kind: 'dimensions',
        columns: ['Size (NPT)', 'A', 'B', 'C', 'D', 'E', 'F', 'Approx. Wt. (lb)'],
        rows: [
          ['1', '1.04', '2-3/4', '1-1/2', '1-9/16', '2-1/2', '2-7/8', '3.5'],
          ['1-1/2', '1.6', '2-3/4', '1-1/2', '1-9/16', '2-1/2', '2-7/8', '3'],
          ['2', '2.04', '2-7/8', '1-5/8', '1-11/16', '2-7/8', '3-5/8', '4'],
          ['2-1/2', '2.44', '3-5/8', '2-1/16', '2', '3-1/2', '4', '5'],
          ['3', '3.04', '3-7/8', '2-3/8', '2-11/16', '4-1/8', '4-3/4', '6'],
          ['4', '4.02', '4-1/2', '2-7/8', '2-15/16', '5-1/8', '5-5/16', '10'],
        ],
        notes: ['Maximum differential pressure is 5 PSI. Maximum containment pressure is 25 PSI.'],
      },
      {
        id: 'cv-values',
        title: 'Cv Values for PDC Thread End Series Valves',
        tabLabel: 'Cv Values',
        kind: 'flow',
        description: 'Flow in GPM of 60°F water at 1 psi pressure drop, specific gravity = 1.',
        columns: cvColumns,
        rows: [
          ['1', '1', '3.5', '8', '12', '16', '20', '32', '42', '45'],
          ['1.5', '2.1', '4.5', '9', '17', '31', '51', '80', '137', '219'],
          ['2', '3.5', '7', '15', '27', '51', '83', '130', '222', '355'],
          ['2.5', '4.9', '10', '22', '39', '73', '119', '186', '317', '508'],
          ['3', '8', '16', '34', '61', '113', '185', '289', '493', '789'],
          ['4', '13', '28', '60', '106', '198', '323', '505', '862', '1380'],
        ],
      },
    ],
    optionGroups: [
      { title: 'Manual Handle Styles', items: ['Style A: thumb screw friction lock with infinitely variable disc positioning', 'Style C: locking handle friction lock with infinitely variable disc positioning'] },
    ],
  };