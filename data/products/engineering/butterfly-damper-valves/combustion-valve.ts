import type { ProductEngineeringData } from '@/types/content';
import { cvColumns } from '../shared';

export const combustionValveEngineering: ProductEngineeringData = {
    tables: [
      {
        id: 'materials',
        title: 'Standard Materials & Seat Construction',
        tabLabel: 'Materials',
        kind: 'materials',
        columns: ['Component', 'Cold Service (450°F)', 'Hot Service (900°F)'],
        rows: [
          ['Body', 'Cast Iron', 'Cast Iron'],
          ['Disc', 'Carbon Iron', 'Carbon Iron'],
          ['Shaft', '416 Stainless Steel', '316 Stainless Steel'],
          ['Seat', 'Swing-thru, Paddle Disc', 'Swing-thru, Paddle Disc'],
          ['Bushing', 'Graphited Bronze', 'Metallized Carbon'],
          ['Packing', 'Graphited Teflon', 'Graphited Yarn Reinforced with Inconel Wire'],
          ['Packing Nut', 'Brass', '316 Stainless Steel'],
        ],
      },
      {
        id: 'dimensions',
        title: 'Valve Dimensions',
        tabLabel: 'Dimensions',
        kind: 'dimensions',
        columns: ['Valve Size', 'Assembly Number', 'A', 'B', 'C', 'D', 'E'],
        rows: [
          ['2”', '221-017-000-ZZ', '2', '2-3/4', '5-3/8', '1-1/2', '3-7/8'],
          ['2.5”', '221-027-000-ZZ', '2-1/2', '3', '5-5/8', '1-1/2', '4-5/8'],
          ['3”', '221-037-000-ZZ', '3', '3-1/8', '5-7/8', '1-1/2', '5-1/4'],
          ['4”', '221-047-000-ZZ', '4', '4-1/4', '6-3/8', '1-1/2', '6-3/8'],
          ['5”', '221-057-000-ZZ', '5', '4-7/8', '6-7/8', '1-1/2', '7-1/2'],
          ['6”', '221-067-000-ZZ', '6', '5-3/8', '7-3/8', '1-1/2', '8-9/16'],
          ['8”', '221-077-000-ZZ', '8', '6-1/2', '8-3/8', '1-1/2', '10-3/4'],
          ['10”', '221-087-000-ZZ', '10', '8', '10-5/8', '1-7/8', '13'],
          ['12”', '221-097-000-ZZ', '12', '9-1/2', '11-5/8', '1-7/8', '15-1/4'],
          ['14”', '221-107-000-ZZ', '13-1/8', '10-1/2', '12-1/8', '1-7/8', '16-3/8'],
        ],
      },
      {
        id: 'cv-values',
        title: 'Cv Values',
        tabLabel: 'Cv Values',
        kind: 'flow',
        description: 'Flow in GPM of 60°F water at 1 psi pressure drop, specific gravity = 1.',
        columns: cvColumns,
        rows: [
          ['2”', '2', '5', '12', '21', '36', '51', '67', '87', '95'],
          ['2.5”', '4', '8', '21', '36', '59', '88', '132', '187', '204'],
          ['3”', '6', '15', '32', '54', '89', '139', '212', '293', '389'],
          ['4”', '14', '29', '57', '103', '167', '270', '411', '578', '784'],
          ['5”', '22', '45', '92', '166', '278', '450', '668', '959', '1,336'],
          ['6”', '32', '66', '132', '239', '401', '664', '1,003', '1,439', '2,099'],
          ['8”', '56', '117', '236', '426', '714', '1,181', '1,783', '2,721', '4,046'],
          ['10”', '87', '183', '369', '667', '1,116', '1,847', '2,788', '4,255', '6,679'],
          ['12”', '126', '265', '531', '960', '1,608', '2,660', '4,017', '6,127', '9,622'],
          ['14”', '150', '317', '636', '1,151', '1,927', '3,187', '4,813', '7,342', '11,530'],
        ],
      },
    ],
    optionGroups: [
      { title: 'Valve Construction', items: ['Valve Body', 'Valve Disc', 'Power End Shaft', 'Inboard Bushing', 'Packing', 'Packing Nut', 'Pin', 'Pipe Plug'] },
    ],
  };