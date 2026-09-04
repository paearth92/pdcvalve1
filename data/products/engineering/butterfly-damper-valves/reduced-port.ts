import type { ProductEngineeringData } from '@/types/content';
import { cvColumns } from '../shared';

export const reducedPortEngineering: ProductEngineeringData = {
    tables: [
      {
        id: 'torque-reduced-3-10',
        title: 'Required Torque: Reduced Port 3” Through 10”',
        tabLabel: 'Torque 3–10',
        kind: 'torque',
        description:
          'Published PDC required torque data for swing-thru butterfly valves.',
        columns: ['Valve Size', '0.5', '1', '5', '10', '15', '20', '25', '30', '40', '50', '60', '70', '80', '90', '100', '125', '150'],
        rows: [
          ['3 x 2.5', '50', '51', '53', '55', '58', '60', '63', '65', '70', '75', '80', '85', '90', '95', '100', '113', '125'],
          ['4 x 3', '50', '51', '54', '57', '61', '64', '68', '71', '78', '85', '92', '99', '106', '113', '120', '138', '155'],
          ['5 x 4', '51', '52', '59', '67', '76', '84', '93', '101', '118', '135', '152', '169', '186', '203', '220', '263', '—'],
          ['6 x 5', '51', '53', '63', '75', '88', '100', '113', '125', '150', '175', '200', '225', '250', '275', '300', '—', '—'],
          ['8 x 6', '52', '54', '69', '88', '107', '126', '145', '164', '202', '240', '278', '316', '354', '—', '—', '—', '—'],
          ['10 x 8', '124', '128', '158', '195', '233', '270', '308', '345', '420', '495', '570', '645', '720', '795', '—', '—', '—'],
        ],
        notes: [
          'Required torque in lb-in with the disc in the closed position for temperatures up to 450°F.',
          'Published values apply to normal clean service conditions.',
        ],
      },
      {
        id: 'torque-reduced-12-14',
        title: 'Required Torque: Reduced Port 12” Through 14”',
        tabLabel: 'Torque 12–14',
        kind: 'torque',
        description:
          'Published PDC required torque data for swing-thru butterfly valves.',
        columns: ['Valve Size', '0.5', '1', '3', '5', '8', '10', '13', '15', '20', '25', '30', '35', '40', '45', '50', '60', '70'],
        rows: [
          ['10 x 12', '129', '137', '171', '205', '256', '290', '341', '375', '460', '545', '630', '715', '800', '885', '970', '1140', '1310'],
          ['14 x 12', '132', '143', '189', '235', '304', '350', '419', '465', '580', '695', '810', '925', '1040', '1155', '1270', '—', '—'],
        ],
        notes: [
          'Required torque in lb-in with the disc in the closed position for temperatures up to 450°F.',
          'Published values apply to normal clean service conditions.',
        ],
      },
      {
        id: 'standard-materials',
        title: 'Standard Materials & Seat Construction',
        tabLabel: 'Standard Materials',
        kind: 'materials',
        columns: ['Component', 'Standard Construction'],
        rows: [
          ['Body', 'Cast Iron'], ['Disc', 'Cast Iron'], ['Shaft', '416 Stainless Steel'],
          ['Seat', 'Swing-thru'], ['Bushing', 'Graphited Bronze'], ['Packing', 'Graphited Teflon Braid'], ['Packing Nut', 'Brass'],
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
          ['Seat', 'Angle (3”–4”), Metal Step (3”–14”), Tadpole Step (8”–14”)'],
          ['Bushing', '316 Stainless Steel, 304 Stainless Steel, Glass Filled Teflon, Metcar, Macor'],
          ['Packing', 'High Temperature Braid, Pure Teflon Braid, Teflon V-Ring'],
          ['Packing Nut', '316 Stainless Steel'],
        ],
      },
      {
        id: 'dimensions',
        title: 'Typical Dimensions: 3” Through 14”',
        tabLabel: 'Dimensions',
        kind: 'dimensions',
        columns: ['Size', 'A', 'B', 'C', 'D', 'E', 'F', 'H', 'Max ΔP', 'Approx. Wt. (lb)'],
        rows: [
          ['3 x 2-1/2', '2-1/2', '4-3/8', '5-7/8', '1-1/2', '5-1/4', '4-1/4', '1/2', '150', '12'],
          ['4 x 3', '3', '4-7/8', '6-3/8', '1-1/2', '6-1/4', '4-1/4', '1/2', '150', '15'],
          ['5 x 4', '4', '5-3/8', '6-7/8', '1-1/2', '7-3/8', '4-1/4', '1/2', '125', '20'],
          ['6 x 5', '5', '5-7/8', '7-3/8', '1-1/2', '8-1/2', '4-1/4', '1/2', '100', '27'],
          ['8 x 6', '6', '7-3/4', '9-5/8', '1-7/8', '10-3/4', '5-1/8', '3/4', '80', '60'],
          ['10 x 8', '8', '8-3/4', '10-5/8', '1-7/8', '13', '5-1/8', '3/4', '90', '65'],
          ['12 x 10', '10', '9-1/2', '11-5/8', '1-7/8', '15-1/4', '5-1/8', '3/4', '70', '80'],
          ['14 x 12', '12', '10-1/2', '12-1/8', '1-7/8', '16-3/8', '5-1/8', '3/4', '50', '86'],
        ],
        notes: ['MAX ΔP is based on the 0° disc position using standard materials at a maximum temperature of 450°F.'],
      },
      {
        id: 'cv-values',
        title: 'Cv Values for PDC Swing-Thru Butterfly Valves',
        tabLabel: 'Cv Values',
        kind: 'flow',
        description: 'Flow in GPM of 60°F water at 1 psi pressure drop, specific gravity = 1.',
        columns: cvColumns,
        rows: [
          ['3 x 2.5', '4', '8', '20', '34', '56', '84', '126', '178', '194'],
          ['4 x 3', '6', '14', '30', '51', '85', '132', '202', '279', '370'],
          ['5 x 4', '13', '28', '54', '98', '159', '257', '391', '550', '747'],
          ['6 x 5', '21', '43', '88', '158', '265', '429', '636', '913', '1272'],
          ['8 x 6', '30', '63', '126', '228', '382', '632', '955', '1370', '1999'],
          ['10 x 8', '53', '111', '225', '406', '680', '1125', '1698', '2591', '3853'],
          ['12 x 10', '83', '174', '351', '635', '1063', '1759', '2655', '4052', '6361'],
          ['14 x 12', '120', '252', '506', '914', '1531', '2533', '3826', '5835', '9164'],
        ],
      },
    ],
  };