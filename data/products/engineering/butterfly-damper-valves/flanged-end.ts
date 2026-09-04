import type { ProductEngineeringData } from '@/types/content';
import { cvColumns } from '../shared';

export const flangedEndEngineering: ProductEngineeringData = {
    tables: [
      {
        id: 'torque-4-14',
        title: 'Required Torque: 4” Through 14”',
        tabLabel: 'Torque',
        kind: 'torque',
        description:
          'Published PDC required torque data for swing-thru butterfly valves.',
        columns: ['Valve Size', '0.5', '1', '2', '3', '4', '5', '6', '8', '10', '12', '14', '16', '18', '20', '22', '24', '25'],
        rows: [
          ['4', '51', '52', '53', '55', '57', '59', '60', '64', '67', '70', '74', '77', '81', '84', '87', '91', '93'],
          ['5', '51', '53', '55', '58', '60', '63', '65', '70', '75', '80', '85', '90', '95', '100', '105', '110', '113'],
          ['6', '52', '54', '58', '61', '65', '69', '73', '80', '88', '96', '103', '111', '118', '126', '134', '141', '145'],
          ['8', '124', '128', '135', '143', '150', '158', '165', '180', '195', '210', '225', '240', '255', '270', '285', '300', '308'],
          ['10', '129', '137', '154', '171', '188', '205', '222', '256', '290', '324', '358', '392', '426', '460', '494', '528', '545'],
          ['12', '132', '143', '166', '189', '212', '235', '258', '304', '350', '396', '442', '488', '534', '580', '626', '672', '695'],
          ['14', '139', '157', '194', '231', '268', '305', '342', '416', '490', '564', '638', '712', '786', '860', '934', '1008', '1045'],
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
          ['Body', 'Ductile Iron'],
          ['Disc', 'Cast Iron'],
          ['Shaft', '416 Stainless Steel'],
          ['Seat', 'Swing-thru'],
          ['Bushing', 'Graphited Bronze'],
          ['Packing', 'Graphited Teflon Braid'],
          ['Packing Nut', 'Brass'],
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
          ['Disc', 'Carbon Steel, 316 Stainless Steel, 304 Stainless Steel'],
          ['Shaft', '316 Stainless Steel, 304 Stainless Steel, Incoloy, Monel'],
          ['Seat', 'Angle'],
          ['Bushing', '316 Stainless Steel, 304 Stainless Steel, Glass Filled Teflon, Metcar'],
          ['Packing', 'Pure Teflon Braid, Teflon V-Ring'],
          ['Packing Nut', '316 Stainless Steel'],
        ],
      },
      {
        id: 'dimensions-4-14',
        title: 'Typical Dimensions: 4” Through 14”',
        tabLabel: 'Dimensions',
        kind: 'dimensions',
        columns: ['Size', 'A', 'B', 'C', 'D', 'E', 'F', 'H', 'J', 'K', 'L', 'M', 'Max ΔP', 'Approx. Wt. (lb)'],
        rows: [
          ['4', '4', '4-1/2', '6-3/8', '5', '9', '4-1/4', '1/2', '6-3/6', '7-1/2', '8', '3/4', '25', '35'],
          ['5', '5', '5', '6-7/8', '5', '10', '4-1/4', '1/2', '7-1/2', '8-1/2', '8', '7/8', '25', '41'],
          ['6', '6', '5-1/2', '7-3/8', '5', '11', '4-1/4', '1/2', '8-1/2', '9-1/2', '8', '7/8', '25', '51'],
          ['8', '8', '7-3/4', '9-5/8', '5-1/2', '13-1/2', '5-1/8', '3/4', '10-5/8', '11-3/4', '8', '7/8', '25', '72'],
          ['10', '10', '8-3/4', '10-5/8', '5-1/2', '16', '5-1/8', '3/4', '12-3/4', '14-1/4', '12', '1', '25', '91'],
          ['12', '12', '9-3/4', '11-5/8', '5-1/2', '19', '5-1/8', '3/4', '15', '17', '12', '1', '25', '120'],
          ['14', '13-1/8', '10-1/2', '12-1/8', '5-1/2', '21', '5-1/8', '3/4', '16-1/4', '18-3/4', '12', '1-1/8', '25', '140'],
        ],
        notes: [
          'Values are reproduced as currently published by PDC, including the published 4-inch J dimension notation.',
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
          ['4', '13', '28', '54', '98', '159', '257', '391', '550', '747'],
          ['5', '21', '43', '88', '158', '265', '429', '636', '913', '1272'],
          ['6', '30', '63', '126', '228', '382', '632', '955', '1370', '1999'],
          ['8', '53', '111', '225', '406', '680', '1125', '1698', '2591', '3853'],
          ['10', '83', '174', '351', '635', '1063', '1758', '2655', '4052', '6361'],
          ['12', '120', '252', '506', '915', '1531', '2533', '3826', '5835', '9164'],
          ['14', '143', '302', '606', '1096', '1835', '3035', '4584', '6992', '10981'],
        ],
      },
    ],
    optionGroups: [
      {
        title: 'Valve Construction',
        items: ['Body', 'Disc', 'Power Shaft', 'Idle Shaft', 'Bushing', 'Braided Packing', 'Packing Nut', 'Shaft Retaining Pin'],
      },
    ],
  };