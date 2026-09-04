import type { ProductEngineeringData } from '@/types/content';
import { cvColumns } from '../shared';

export const excelEngineering: ProductEngineeringData = {
    tables: [
      {
        id: 'standard-materials',
        title: 'Standard Materials & Seat Construction',
        tabLabel: 'Materials',
        kind: 'materials',
        columns: ['Component', '2”–14”', '16”–24”', '26”–60”'],
        rows: [
          ['Body', 'Cast Iron', 'Cast Iron', 'Cast Iron'],
          ['Disc', 'Cast Iron', 'Ductile Iron', 'Cast Iron'],
          ['Shaft', '416 Stainless Steel', '416 Stainless Steel', '416 Stainless Steel'],
          ['Seat', 'Swing-thru', 'Swing-thru', 'Swing-thru'],
          ['Bushing', 'Graphited Bronze', 'Graphited Bronze', 'Graphited Bronze'],
          ['Packing', 'Graphited Teflon Braid', 'Graphited Teflon Braid', 'Graphited Teflon Braid'],
          ['Packing Nut', 'Brass', 'Brass', 'Ductile Iron'],
        ],
      },
      {
        id: 'optional-materials',
        title: 'Optional Materials & Seat Construction',
        tabLabel: 'Options',
        kind: 'materials',
        columns: ['Component', 'Available Options'],
        rows: [
          ['Body', 'High Temperature Iron, Carbon Steel, 316 Stainless Steel, 304 Stainless Steel'],
          ['Disc', 'High Temperature Iron, Carbon Steel, 316 Stainless Steel, 304 Stainless Steel'],
          ['Shaft', '316 Stainless Steel, 304 Stainless Steel, Incoloy, Monel'],
          ['Seat', 'Angle (2”–30”), Metal Step (2”–60”), Tadpole Step (8”–60”)'],
          ['Bushing', '316 Stainless Steel, 304 Stainless Steel, Glass Filled Teflon, Metcar, Macor'],
          ['Packing', 'High Temperature Braid, Pure Teflon Braid, Teflon V-Ring, Spring Loaded'],
          ['Packing Nut', '316 Stainless Steel'],
        ],
      },
      {
        id: 'cv-values',
        title: 'Cv Values for PDC Swing-Thru Butterfly Valves',
        tabLabel: 'Cv Values',
        kind: 'flow',
        description: 'Flow in GPM of 60°F water at 1 psi pressure drop, specific gravity = 1.',
        columns: cvColumns,
        rows: [
          ['2', '2', '5', '11', '20', '34', '49', '64', '83', '90'],
          ['2-1/2', '4', '8', '20', '34', '56', '84', '126', '178', '194'],
          ['3', '6', '14', '30', '51', '85', '132', '202', '279', '370'],
          ['4', '13', '28', '54', '98', '159', '257', '391', '550', '747'],
          ['5', '21', '43', '88', '158', '265', '429', '636', '913', '1272'],
          ['6', '30', '63', '126', '228', '382', '632', '955', '1370', '1999'],
          ['8', '53', '111', '225', '406', '680', '1125', '1698', '2591', '3853'],
          ['10', '83', '174', '351', '635', '1063', '1759', '2655', '4052', '6361'],
        ],
      },
    ],
    optionGroups: [
      { title: 'Large-Series Construction', items: ['Body', 'Disc', 'Power Shaft', 'Idle Shaft', 'Bushing', 'Braided Packing', 'Adjustable Packing Nut', 'Shaft Retaining Pin', 'Threaded Stud (26”–60”)', 'Hexed Jam Nut (26”–60”)'] },
    ],
  };