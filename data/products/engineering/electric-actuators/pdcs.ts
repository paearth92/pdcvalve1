import type { ProductEngineeringData } from '@/types/content';

export const pdcsEngineering: ProductEngineeringData = {
  tables: [
    {
      id: 'model-performance',
      title: 'PDCS Model Performance',
      tabLabel: 'Model Data',
      kind: 'models',
      description:
        'Published PDCS output torque, weight, ISO mounting base, manual override, motor running time and spring return time by model.',
      columns: [
        'Model',
        'Torque N·m',
        'Torque in·lbs',
        'Weight kg',
        'Weight lb',
        'ISO 5211 Base',
        'Manual Override',
        'Motor sec/90°',
        'Spring sec/90°',
      ],
      rows: [
        ['PDCS-A', '50', '445', '27', '60', 'F07', 'Optional Handwheel', '7', '3'],
        ['PDCS-B', '130', '1,150', '57', '126', 'F10', 'Optional Handwheel', '7', '8'],
        ['PDCS-C', '200', '1,770', '95', '209', 'F12', 'Optional Handwheel', '11', '12'],
        ['PDCS-D', '260', '2,300', '95', '209', 'F12', 'Optional Handwheel', '14', '12'],
      ],
      notes: [
        'Running time is based on the published 110V AC / 60Hz configuration at 30% duty.',
      ],
    },
  ],
  optionGroups: [
    {
      title: 'Standard Design Features',
      items: [
        'Output torque range: 50 N·m (445 in·lbs) to 260 N·m (2,300 in·lbs)',
        'High-grade aluminum alloy enclosures',
        'Durable polyester powder-coated exterior',
        'O-ring sealed covers with captured stainless-steel fasteners',
        'CSA and NEMA Type 4X enclosure sealing with IP67 ingress protection',
        'Visual position indicator as standard',
        'Adjustable mechanical buffer for the fail end position as standard',
        'ISO 5211 mounting base',
        'Compact mechanical spring set for clockwise (close) or counter-clockwise (open) fail positioning',
      ],
    },
    {
      title: 'Available Options',
      items: [
        'Explosionproof enclosures for hazardous environments: CSA / NEMA Type 7 for Class I Div 1 Groups C & D and CSA / NEMA Type 9 for Class II Div 1 Groups E, F & G',
        'ON/OFF three-position control',
        'Modulating control except with 24V AC/DC',
        '4–20 mA current position transmitter or 1K / 5K potentiometer',
        'Clutch-less geared manual override',
      ],
    },
  ],
};