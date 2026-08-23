export const mockProducts = [
  {
    id: 'prod_001',
    name: 'Whole Wheat Atta 5kg',
    brand: 'Aashirvaad',
    category: 'Staples',
    batchNo: 'AWW-2023-09-12',
    scanDate: new Date().toISOString(),
    status: 'compliant',
    complianceScore: 100,
    imageUrl: '/assets/mock-labels/atta.png',
    declarations: {
      mrp: '₹250.00',
      netWeight: '5 kg',
      manufacturer: 'ITC Limited, Kolkata, WB',
      countryOfOrigin: 'India',
      expiryDate: 'Best before 3 months from packaging',
      fssaiNo: '10012031000312',
      customerCare: '1800-425-44444'
    },
    fontAnalysis: [
      { field: 'MRP', requiredMm: 2.0, measuredMm: 2.5, pass: true },
      { field: 'Net Weight', requiredMm: 4.0, measuredMm: 4.5, pass: true },
      { field: 'Customer Care', requiredMm: 1.0, measuredMm: 1.2, pass: true }
    ],
    violations: []
  },
  {
    id: 'prod_002',
    name: 'Refined Sunflower Oil 1L',
    brand: 'Fortune',
    category: 'Edible Oil',
    batchNo: 'FS-593-B',
    scanDate: new Date().toISOString(),
    status: 'partial',
    complianceScore: 75,
    imageUrl: '/assets/mock-labels/oil.png',
    declarations: {
      mrp: '₹145.00',
      netWeight: '1 L',
      manufacturer: 'Adani Wilmar Ltd, Gujarat',
      countryOfOrigin: 'India',
      expiryDate: '12 Months',
      fssaiNo: '10014021000654',
      customerCare: 'Toll free 1800-233-9999'
    },
    fontAnalysis: [
      { field: 'MRP', requiredMm: 2.0, measuredMm: 2.5, pass: true },
      { field: 'Net Weight', requiredMm: 4.0, measuredMm: 4.0, pass: true },
      { field: 'Customer Care', requiredMm: 1.0, measuredMm: 0.8, pass: false }
    ],
    violations: [
      {
        rule: 'Rule 7(1)',
        field: 'Customer Care Font Size',
        severity: 'warning',
        description: 'Customer care font size measured 0.8mm. Must be at least 1.0mm.',
        lmSection: 'Sec 18'
      }
    ]
  },
  {
    id: 'prod_003',
    name: 'Glucose Biscuits 100g',
    brand: 'Parle-G',
    category: 'Snacks',
    batchNo: 'PG-99X-21',
    scanDate: new Date().toISOString(),
    status: 'non-compliant',
    complianceScore: 40,
    imageUrl: '/assets/mock-labels/biscuits.png',
    declarations: {
      netWeight: '100 g',
      manufacturer: 'Parle Products Pvt. Ltd.',
      countryOfOrigin: 'India',
      fssaiNo: '10013022002253'
    },
    fontAnalysis: [
      { field: 'Net Weight', requiredMm: 2.0, measuredMm: 2.1, pass: true }
    ],
    violations: [
      {
        rule: 'Rule 6(1)(e)',
        field: 'Retail Sale Price (MRP)',
        severity: 'critical',
        description: 'MRP not clearly declared on the principal display panel.',
        lmSection: 'Sec 18(1)'
      },
      {
        rule: 'Rule 6(1)(a)',
        field: 'Customer Care',
        severity: 'critical',
        description: 'Consumer care details missing entirely.',
        lmSection: 'Sec 18(1)'
      }
    ]
  },
  {
    id: 'prod_004',
    name: 'Blended Spices 50g',
    brand: 'MDH',
    category: 'Spices',
    batchNo: 'MD-552',
    scanDate: new Date().toISOString(),
    status: 'partial',
    complianceScore: 80,
    imageUrl: '/assets/mock-labels/spices.png',
    declarations: {
      mrp: '₹45.00',
      netWeight: '50g',
      manufacturer: 'Mahashian Di Hatti Pvt Ltd',
      countryOfOrigin: 'India',
      expiryDate: '12 Months',
      fssaiNo: '10012011000431',
      customerCare: 'care@mdhspices.com'
    },
    fontAnalysis: [
      { field: 'MRP', requiredMm: 1.5, measuredMm: 1.5, pass: true }
    ],
    violations: [
      {
        rule: 'Rule 7(2)',
        field: 'Placement of Declarations',
        severity: 'warning',
        description: 'Net weight is not grouped with other mandatory declarations.',
        lmSection: 'Sec 18'
      }
    ]
  },
  {
    id: 'prod_005',
    name: 'Full Cream Milk 500ml',
    brand: 'Amul',
    category: 'Dairy',
    batchNo: 'AM-FL-12',
    scanDate: new Date().toISOString(),
    status: 'compliant',
    complianceScore: 100,
    imageUrl: '/assets/mock-labels/milk.png',
    declarations: {
      mrp: '₹33.00',
      netWeight: '500 ml',
      manufacturer: 'GCMMF Ltd, Anand',
      countryOfOrigin: 'India',
      expiryDate: 'Use by 2 days',
      fssaiNo: '10012021000071',
      customerCare: 'customercare@amul.coop'
    },
    fontAnalysis: [
      { field: 'MRP', requiredMm: 2.0, measuredMm: 2.2, pass: true },
      { field: 'Net Weight', requiredMm: 2.0, measuredMm: 2.5, pass: true }
    ],
    violations: []
  },
  {
    id: 'prod_006',
    name: 'Instant Noodles 70g',
    brand: 'Maggi',
    category: 'Snacks',
    batchNo: 'MG-70-A1',
    scanDate: new Date().toISOString(),
    status: 'non-compliant',
    complianceScore: 50,
    imageUrl: '/assets/mock-labels/noodles.png',
    declarations: {
      mrp: '₹14.00',
      netWeight: '70g',
      expiryDate: '8 Months',
      fssaiNo: '10012011000168',
      customerCare: 'wecare@in.nestle.com'
    },
    fontAnalysis: [
      { field: 'MRP', requiredMm: 1.5, measuredMm: 1.8, pass: true }
    ],
    violations: [
      {
        rule: 'Rule 6(1)(a)',
        field: 'Manufacturer Name/Address',
        severity: 'critical',
        description: 'Name and address of manufacturer not found on label.',
        lmSection: 'Sec 18(1)'
      }
    ]
  },
  {
    id: 'prod_007',
    name: 'Pure Cow Ghee 500g',
    brand: 'Patanjali',
    category: 'Dairy',
    batchNo: 'PT-GHEE-00',
    scanDate: new Date().toISOString(),
    status: 'partial',
    complianceScore: 70,
    imageUrl: '/assets/mock-labels/ghee.png',
    declarations: {
      mrp: '₹320.00',
      netWeight: '500g',
      manufacturer: 'Patanjali Ayurved Ltd',
      countryOfOrigin: 'India',
      expiryDate: '9 Months',
      fssaiNo: '10014012000266',
      customerCare: '1800-180-4108'
    },
    fontAnalysis: [
      { field: 'Net Weight', requiredMm: 2.0, measuredMm: 2.0, pass: true }
    ],
    violations: [
      {
        rule: 'Rule 6(1)(d)',
        field: 'Month/Year of Mfg',
        severity: 'warning',
        description: 'Month and year of manufacture format is incorrect or unreadable.',
        lmSection: 'Sec 18'
      }
    ]
  },
  {
    id: 'prod_008',
    name: 'Potato Chips 26g',
    brand: 'Lay\'s',
    category: 'Snacks',
    batchNo: 'LY-26-Z',
    scanDate: new Date().toISOString(),
    status: 'non-compliant',
    complianceScore: 60,
    imageUrl: '/assets/mock-labels/chips.png',
    declarations: {
      mrp: '₹10.00',
      netWeight: '26g',
      manufacturer: 'PepsiCo India Holdings',
      expiryDate: '4 Months',
      fssaiNo: '10014064000435',
      customerCare: '1800-224-020'
    },
    fontAnalysis: [
      { field: 'MRP', requiredMm: 1.0, measuredMm: 1.2, pass: true }
    ],
    violations: [
      {
        rule: 'Rule 6(1)(aa)',
        field: 'Country of Origin',
        severity: 'critical',
        description: 'Country of origin is not declared on the package.',
        lmSection: 'Sec 18(1)'
      }
    ]
  }
];
