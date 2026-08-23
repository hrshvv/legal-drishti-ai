// Mock Products with high-fidelity packaging data, bounding box coordinates, and Legal Metrology rule citations

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
    packageType: 'Flexible Poly Pouch',
    pdpAreaCm2: 450,
    imageUrl: '/assets/mock-labels/atta.png',
    declarations: {
      mrp: '₹250.00 (Incl. of all taxes)',
      netWeight: '5 kg',
      manufacturer: 'ITC Limited, 37 J.L. Nehru Road, Kolkata - 700071, WB',
      countryOfOrigin: 'India',
      expiryDate: 'Best before 3 months from packaging',
      fssaiNo: '10012031000312',
      customerCare: '1800-425-44444 / itccares@itc.in',
      unitSalePrice: '₹50.00 / kg'
    },
    fontAnalysis: [
      { field: 'MRP & Unit Price', requiredMm: 2.0, measuredMm: 2.6, pass: true, ruleRef: 'Schedule II' },
      { field: 'Net Quantity', requiredMm: 4.0, measuredMm: 4.8, pass: true, ruleRef: 'Rule 7 & Schedule II' },
      { field: 'Manufacturer Address', requiredMm: 1.0, measuredMm: 1.4, pass: true, ruleRef: 'Schedule II' },
      { field: 'Consumer Care Details', requiredMm: 1.0, measuredMm: 1.2, pass: true, ruleRef: 'Rule 6(1)(f)' }
    ],
    violations: [],
    boundingBoxes: [
      { id: 'box_brand', label: 'Brand & Commodity', value: 'Aashirvaad Whole Wheat Atta', rule: 'Rule 6(1)(b)', status: 'pass', confidence: 99.8, top: 12, left: 18, width: 64, height: 18, fontMm: 12.0, minMm: 4.0 },
      { id: 'box_net_wt', label: 'Net Quantity', value: 'Net Qty: 5 kg', rule: 'Rule 6(1)(c) & Rule 12', status: 'pass', confidence: 99.4, top: 34, left: 58, width: 34, height: 12, fontMm: 4.8, minMm: 4.0 },
      { id: 'box_mrp', label: 'MRP & Unit Sale Price', value: 'MRP: ₹250.00 (USP ₹50/kg)', rule: 'Rule 6(1)(e) & 6(1)(ab)', status: 'pass', confidence: 99.1, top: 48, left: 56, width: 38, height: 14, fontMm: 2.6, minMm: 2.0 },
      { id: 'box_mfr', label: 'Manufacturer & Packer', value: 'Mfd By: ITC Limited, Kolkata - 700071', rule: 'Rule 6(1)(a)', status: 'pass', confidence: 98.6, top: 66, left: 10, width: 48, height: 16, fontMm: 1.4, minMm: 1.0 },
      { id: 'box_origin', label: 'Country of Origin', value: 'Country of Origin: India', rule: 'Rule 6(1)(aa)', status: 'pass', confidence: 99.5, top: 84, left: 10, width: 38, height: 9, fontMm: 1.3, minMm: 1.0 },
      { id: 'box_care', label: 'Consumer Care Helpline', value: 'Care: 1800-425-44444 / itccares@itc.in', rule: 'Rule 6(1)(f)', status: 'pass', confidence: 97.9, top: 84, left: 50, width: 44, height: 9, fontMm: 1.2, minMm: 1.0 }
    ]
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
    packageType: 'HDPE Bottle / Pouch',
    pdpAreaCm2: 320,
    imageUrl: '/assets/mock-labels/oil.png',
    declarations: {
      mrp: '₹145.00 (Incl. of all taxes)',
      netWeight: '1 L (Net Volume at 30°C)',
      manufacturer: 'Adani Wilmar Ltd, Fortune House, Gujarat',
      countryOfOrigin: 'India',
      expiryDate: '12 Months from packaging',
      fssaiNo: '10014021000654',
      customerCare: 'Toll free 1800-233-9999'
    },
    fontAnalysis: [
      { field: 'MRP Declaration', requiredMm: 2.0, measuredMm: 2.4, pass: true, ruleRef: 'Schedule II' },
      { field: 'Net Quantity', requiredMm: 4.0, measuredMm: 4.0, pass: true, ruleRef: 'Rule 7 & Schedule II' },
      { field: 'Customer Care Details', requiredMm: 1.0, measuredMm: 0.75, pass: false, ruleRef: 'Schedule II Rule 7(1)' }
    ],
    violations: [
      {
        rule: 'Schedule II / Rule 7(1)',
        field: 'Customer Care Font Size',
        severity: 'warning',
        description: 'Customer grievance font size measured 0.75mm. Schedule II mandates minimum 1.0mm height for PDP > 200 cm².',
        lmSection: 'Sec 18(1) / Rule 7(1)'
      }
    ],
    boundingBoxes: [
      { id: 'box_brand', label: 'Brand & Commodity', value: 'Fortune Refined Sunflower Oil', rule: 'Rule 6(1)(b)', status: 'pass', confidence: 99.7, top: 12, left: 16, width: 68, height: 18, fontMm: 10.5, minMm: 4.0 },
      { id: 'box_net_wt', label: 'Net Quantity', value: 'Net Volume: 1 L', rule: 'Rule 6(1)(c)', status: 'pass', confidence: 99.2, top: 33, left: 55, width: 35, height: 12, fontMm: 4.0, minMm: 4.0 },
      { id: 'box_mrp', label: 'MRP (Incl. Taxes)', value: 'MRP: ₹145.00', rule: 'Rule 6(1)(e)', status: 'pass', confidence: 98.9, top: 48, left: 55, width: 35, height: 14, fontMm: 2.4, minMm: 2.0 },
      { id: 'box_mfr', label: 'Manufacturer Address', value: 'Adani Wilmar Ltd, Gujarat', rule: 'Rule 6(1)(a)', status: 'pass', confidence: 98.4, top: 66, left: 10, width: 48, height: 15, fontMm: 1.2, minMm: 1.0 },
      { id: 'box_care', label: 'Customer Care (Sub-minimum Font)', value: 'Care: 1800-233-9999 (0.75mm)', rule: 'Rule 7(1)', status: 'warning', confidence: 95.8, top: 83, left: 10, width: 80, height: 10, fontMm: 0.75, minMm: 1.0 }
    ]
  },
  {
    id: 'prod_003',
    name: 'Potato Chips 26g',
    brand: 'Lay\'s',
    category: 'Snacks',
    batchNo: 'LY-26-Z',
    scanDate: new Date().toISOString(),
    status: 'non-compliant',
    complianceScore: 55,
    packageType: 'Metallized Poly Pouch',
    pdpAreaCm2: 180,
    imageUrl: '/assets/mock-labels/chips.png',
    declarations: {
      mrp: '₹10.00 (Incl. of all taxes)',
      netWeight: '26 g',
      manufacturer: 'PepsiCo India Holdings Pvt Ltd, Gurugram, HR',
      countryOfOrigin: 'NOT DECLARED',
      expiryDate: '4 Months from Packaging',
      fssaiNo: '10014064000435',
      customerCare: '1800-224-020 / feedback@pepsico.com'
    },
    fontAnalysis: [
      { field: 'MRP Declaration', requiredMm: 1.0, measuredMm: 1.3, pass: true, ruleRef: 'Schedule II' },
      { field: 'Net Quantity', requiredMm: 1.5, measuredMm: 1.6, pass: true, ruleRef: 'Schedule II' },
      { field: 'Country of Origin', requiredMm: 1.0, measuredMm: 0.0, pass: false, ruleRef: 'Rule 6(1)(aa)' }
    ],
    violations: [
      {
        rule: 'Rule 6(1)(aa)',
        field: 'Country of Origin',
        severity: 'critical',
        description: 'Mandatory Country of Origin / Country of Manufacture declaration is completely absent on the package.',
        lmSection: 'Sec 18(1) / Rule 6(1)(aa)'
      },
      {
        rule: 'Rule 6(1)(ab)',
        field: 'Unit Sale Price',
        severity: 'warning',
        description: 'Unit Sale Price (₹/g) is omitted on retail package.',
        lmSection: 'Sec 18 / Rule 6(1)(ab)'
      }
    ],
    boundingBoxes: [
      { id: 'box_brand', label: 'Brand & Commodity', value: 'Lay\'s Classic Salted Chips', rule: 'Rule 6(1)(b)', status: 'pass', confidence: 99.8, top: 12, left: 16, width: 68, height: 20, fontMm: 11.0, minMm: 3.0 },
      { id: 'box_net_wt', label: 'Net Quantity', value: 'Net Weight: 26 g', rule: 'Rule 6(1)(c)', status: 'pass', confidence: 99.1, top: 35, left: 54, width: 36, height: 12, fontMm: 1.6, minMm: 1.5 },
      { id: 'box_mrp', label: 'MRP (Inclusive of Taxes)', value: 'MRP: ₹10.00', rule: 'Rule 6(1)(e)', status: 'pass', confidence: 98.7, top: 50, left: 54, width: 36, height: 12, fontMm: 1.3, minMm: 1.0 },
      { id: 'box_mfr', label: 'Manufacturer Name', value: 'PepsiCo India Holdings, Gurugram', rule: 'Rule 6(1)(a)', status: 'pass', confidence: 98.1, top: 65, left: 10, width: 50, height: 15, fontMm: 1.1, minMm: 1.0 },
      { id: 'box_origin', label: 'Country of Origin (MISSING)', value: 'MISSING: Country of Origin absent', rule: 'Rule 6(1)(aa)', status: 'fail', confidence: 0, top: 82, left: 10, width: 80, height: 12, fontMm: 0, minMm: 1.0 }
    ]
  },
  {
    id: 'prod_004',
    name: 'Glucose Biscuits 100g',
    brand: 'Parle-G',
    category: 'Snacks',
    batchNo: 'PG-99X-21',
    scanDate: new Date().toISOString(),
    status: 'non-compliant',
    complianceScore: 40,
    packageType: 'Wax Wrapper / BOPP Film',
    pdpAreaCm2: 120,
    imageUrl: '/assets/mock-labels/biscuits.png',
    declarations: {
      mrp: 'NOT LEGIBLE / MISSING',
      netWeight: '100 g',
      manufacturer: 'Parle Products Pvt. Ltd., Mumbai',
      countryOfOrigin: 'India',
      fssaiNo: '10013022002253'
    },
    fontAnalysis: [
      { field: 'Net Quantity', requiredMm: 1.5, measuredMm: 1.8, pass: true, ruleRef: 'Schedule II' },
      { field: 'MRP Declaration', requiredMm: 1.0, measuredMm: 0.0, pass: false, ruleRef: 'Rule 6(1)(e)' },
      { field: 'Customer Grievance', requiredMm: 1.0, measuredMm: 0.0, pass: false, ruleRef: 'Rule 6(1)(f)' }
    ],
    violations: [
      {
        rule: 'Rule 6(1)(e)',
        field: 'Retail Sale Price (MRP)',
        severity: 'critical',
        description: 'Maximum Retail Price (MRP) is not declared or illegible on the Principal Display Panel.',
        lmSection: 'Sec 18(1) / Rule 6(1)(e)'
      },
      {
        rule: 'Rule 6(1)(f)',
        field: 'Consumer Care Details',
        severity: 'critical',
        description: 'Consumer grievance redressal helpline, email, and address are completely absent.',
        lmSection: 'Sec 18(1) / Rule 6(1)(f)'
      }
    ],
    boundingBoxes: [
      { id: 'box_brand', label: 'Brand & Commodity', value: 'Parle-G Glucose Biscuits', rule: 'Rule 6(1)(b)', status: 'pass', confidence: 99.4, top: 12, left: 14, width: 72, height: 22, fontMm: 14.0, minMm: 3.0 },
      { id: 'box_net_wt', label: 'Net Quantity', value: 'Net Wt: 100 g', rule: 'Rule 6(1)(c)', status: 'pass', confidence: 98.9, top: 38, left: 52, width: 38, height: 12, fontMm: 1.8, minMm: 1.5 },
      { id: 'box_mrp', label: 'MRP (MISSING / UNREADABLE)', value: 'MRP: Unreadable / Missing on PDP', rule: 'Rule 6(1)(e)', status: 'fail', confidence: 12.4, top: 52, left: 52, width: 38, height: 14, fontMm: 0, minMm: 1.0 },
      { id: 'box_mfr', label: 'Manufacturer Name', value: 'Parle Products Pvt. Ltd., Mumbai', rule: 'Rule 6(1)(a)', status: 'pass', confidence: 97.8, top: 68, left: 10, width: 48, height: 14, fontMm: 1.1, minMm: 1.0 },
      { id: 'box_care', label: 'Consumer Helpline (MISSING)', value: 'Customer Care Details Missing', rule: 'Rule 6(1)(f)', status: 'fail', confidence: 0, top: 84, left: 10, width: 80, height: 10, fontMm: 0, minMm: 1.0 }
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
    packageType: 'Multilayer Poly Pouch',
    pdpAreaCm2: 240,
    imageUrl: '/assets/mock-labels/milk.png',
    declarations: {
      mrp: '₹33.00 (Incl. of all taxes)',
      netWeight: '500 ml',
      manufacturer: 'GCMMF Ltd, Anand - 388001, Gujarat',
      countryOfOrigin: 'India',
      expiryDate: 'Use by 2 days from packing',
      fssaiNo: '10012021000071',
      customerCare: 'customercare@amul.coop / 1800-258-3333',
      unitSalePrice: '₹66.00 / L'
    },
    fontAnalysis: [
      { field: 'MRP Declaration', requiredMm: 2.0, measuredMm: 2.4, pass: true, ruleRef: 'Schedule II' },
      { field: 'Net Quantity', requiredMm: 2.0, measuredMm: 2.7, pass: true, ruleRef: 'Schedule II' },
      { field: 'Customer Care Details', requiredMm: 1.0, measuredMm: 1.3, pass: true, ruleRef: 'Schedule II' }
    ],
    violations: [],
    boundingBoxes: [
      { id: 'box_brand', label: 'Brand & Commodity', value: 'Amul Gold Full Cream Milk', rule: 'Rule 6(1)(b)', status: 'pass', confidence: 99.9, top: 12, left: 18, width: 64, height: 18, fontMm: 10.0, minMm: 3.0 },
      { id: 'box_net_wt', label: 'Net Volume', value: 'Net Volume: 500 ml', rule: 'Rule 6(1)(c)', status: 'pass', confidence: 99.6, top: 34, left: 54, width: 38, height: 12, fontMm: 2.7, minMm: 2.0 },
      { id: 'box_mrp', label: 'MRP & Unit Price', value: 'MRP: ₹33.00 (USP ₹66.00/L)', rule: 'Rule 6(1)(e)', status: 'pass', confidence: 99.3, top: 48, left: 54, width: 38, height: 14, fontMm: 2.4, minMm: 2.0 },
      { id: 'box_mfr', label: 'Manufacturer Address', value: 'GCMMF Ltd, Anand, Gujarat', rule: 'Rule 6(1)(a)', status: 'pass', confidence: 98.7, top: 66, left: 10, width: 50, height: 16, fontMm: 1.4, minMm: 1.0 },
      { id: 'box_care', label: 'Consumer Helpline', value: 'Care: 1800-258-3333 / amul.coop', rule: 'Rule 6(1)(f)', status: 'pass', confidence: 98.1, top: 84, left: 10, width: 80, height: 10, fontMm: 1.3, minMm: 1.0 }
    ]
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
    packageType: 'Pillow Pouch',
    pdpAreaCm2: 210,
    imageUrl: '/assets/mock-labels/noodles.png',
    declarations: {
      mrp: '₹14.00 (Incl. of all taxes)',
      netWeight: '70 g',
      manufacturer: 'NOT FOUND / OMITTED',
      countryOfOrigin: 'India',
      expiryDate: '8 Months from mfg',
      fssaiNo: '10012011000168',
      customerCare: 'wecare@in.nestle.com / 1800-103-1947'
    },
    fontAnalysis: [
      { field: 'MRP Declaration', requiredMm: 1.5, measuredMm: 1.8, pass: true, ruleRef: 'Schedule II' },
      { field: 'Net Quantity', requiredMm: 1.5, measuredMm: 1.9, pass: true, ruleRef: 'Schedule II' },
      { field: 'Manufacturer Address', requiredMm: 1.0, measuredMm: 0.0, pass: false, ruleRef: 'Rule 6(1)(a)' }
    ],
    violations: [
      {
        rule: 'Rule 6(1)(a)',
        field: 'Manufacturer Name & Address',
        severity: 'critical',
        description: 'Complete name and physical manufacturing premises address is absent on the package.',
        lmSection: 'Sec 18(1) / Rule 6(1)(a)'
      }
    ],
    boundingBoxes: [
      { id: 'box_brand', label: 'Brand & Commodity', value: 'Maggi 2-Minute Noodles', rule: 'Rule 6(1)(b)', status: 'pass', confidence: 99.8, top: 12, left: 16, width: 68, height: 20, fontMm: 12.0, minMm: 3.0 },
      { id: 'box_net_wt', label: 'Net Weight', value: 'Net Weight: 70 g', rule: 'Rule 6(1)(c)', status: 'pass', confidence: 99.2, top: 35, left: 54, width: 36, height: 12, fontMm: 1.9, minMm: 1.5 },
      { id: 'box_mrp', label: 'MRP (Inclusive of Taxes)', value: 'MRP: ₹14.00', rule: 'Rule 6(1)(e)', status: 'pass', confidence: 99.0, top: 50, left: 54, width: 36, height: 12, fontMm: 1.8, minMm: 1.5 },
      { id: 'box_mfr', label: 'Manufacturer Address (MISSING)', value: 'MISSING: Manufacturer Address Absent', rule: 'Rule 6(1)(a)', status: 'fail', confidence: 0, top: 66, left: 10, width: 80, height: 14, fontMm: 0, minMm: 1.0 },
      { id: 'box_care', label: 'Customer Helpline', value: 'wecare@in.nestle.com / 1800-103-1947', rule: 'Rule 6(1)(f)', status: 'pass', confidence: 97.6, top: 84, left: 10, width: 80, height: 10, fontMm: 1.2, minMm: 1.0 }
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
    packageType: 'Plastic Jar / Carton',
    pdpAreaCm2: 280,
    imageUrl: '/assets/mock-labels/ghee.png',
    declarations: {
      mrp: '₹320.00 (Incl. of all taxes)',
      netWeight: '500 g',
      manufacturer: 'Patanjali Ayurved Ltd, Haridwar, UK',
      countryOfOrigin: 'India',
      expiryDate: '9 Months from mfg',
      fssaiNo: '10014012000266',
      customerCare: '1800-180-4108'
    },
    fontAnalysis: [
      { field: 'Net Quantity', requiredMm: 2.0, measuredMm: 2.0, pass: true, ruleRef: 'Schedule II' },
      { field: 'Month/Year of Mfg', requiredMm: 1.5, measuredMm: 0.9, pass: false, ruleRef: 'Rule 6(1)(d)' }
    ],
    violations: [
      {
        rule: 'Rule 6(1)(d)',
        field: 'Month/Year of Mfg',
        severity: 'warning',
        description: 'Month and year of packaging format is unclear and measured 0.9mm font height (sub-minimum).',
        lmSection: 'Sec 18 / Rule 6(1)(d)'
      }
    ],
    boundingBoxes: [
      { id: 'box_brand', label: 'Brand & Commodity', value: 'Patanjali Pure Cow Ghee', rule: 'Rule 6(1)(b)', status: 'pass', confidence: 99.5, top: 12, left: 16, width: 68, height: 18, fontMm: 11.0, minMm: 3.0 },
      { id: 'box_net_wt', label: 'Net Quantity', value: 'Net Weight: 500 g', rule: 'Rule 6(1)(c)', status: 'pass', confidence: 99.0, top: 35, left: 54, width: 36, height: 12, fontMm: 2.0, minMm: 2.0 },
      { id: 'box_mrp', label: 'MRP (Inclusive of Taxes)', value: 'MRP: ₹320.00', rule: 'Rule 6(1)(e)', status: 'pass', confidence: 98.8, top: 50, left: 54, width: 36, height: 12, fontMm: 2.1, minMm: 2.0 },
      { id: 'box_mfr', label: 'Manufacturer Address', value: 'Patanjali Ayurved Ltd, Haridwar', rule: 'Rule 6(1)(a)', status: 'pass', confidence: 98.2, top: 66, left: 10, width: 48, height: 14, fontMm: 1.2, minMm: 1.0 },
      { id: 'box_mfg_date', label: 'Mfg Date (Sub-standard Font)', value: 'Mfg Date: 09/23 (0.9mm)', rule: 'Rule 6(1)(d)', status: 'warning', confidence: 92.4, top: 82, left: 10, width: 80, height: 12, fontMm: 0.9, minMm: 1.5 }
    ]
  },
  {
    id: 'prod_008',
    name: 'Blended Spices 50g',
    brand: 'MDH',
    category: 'Spices',
    batchNo: 'MD-552',
    scanDate: new Date().toISOString(),
    status: 'partial',
    complianceScore: 80,
    packageType: 'Duplex Paper Carton',
    pdpAreaCm2: 150,
    imageUrl: '/assets/mock-labels/spices.png',
    declarations: {
      mrp: '₹45.00 (Incl. of all taxes)',
      netWeight: '50 g',
      manufacturer: 'Mahashian Di Hatti Pvt Ltd, New Delhi',
      countryOfOrigin: 'India',
      expiryDate: '12 Months from packaging',
      fssaiNo: '10012011000431',
      customerCare: 'care@mdhspices.com'
    },
    fontAnalysis: [
      { field: 'MRP Declaration', requiredMm: 1.5, measuredMm: 1.5, pass: true, ruleRef: 'Schedule II' },
      { field: 'Net Quantity Placement', requiredMm: 1.5, measuredMm: 1.5, pass: false, ruleRef: 'Rule 7(2)' }
    ],
    violations: [
      {
        rule: 'Rule 7(2)',
        field: 'Placement of Declarations',
        severity: 'warning',
        description: 'Net quantity declaration is not grouped with other mandatory declarations on the Principal Display Panel.',
        lmSection: 'Sec 18 / Rule 7(2)'
      }
    ],
    boundingBoxes: [
      { id: 'box_brand', label: 'Brand & Commodity', value: 'MDH Garam Masala', rule: 'Rule 6(1)(b)', status: 'pass', confidence: 99.6, top: 12, left: 16, width: 68, height: 18, fontMm: 10.0, minMm: 3.0 },
      { id: 'box_net_wt', label: 'Net Weight (Misplaced)', value: 'Net Weight: 50 g (Isolated)', rule: 'Rule 7(2)', status: 'warning', confidence: 98.4, top: 35, left: 54, width: 36, height: 12, fontMm: 1.5, minMm: 1.5 },
      { id: 'box_mrp', label: 'MRP (Inclusive of Taxes)', value: 'MRP: ₹45.00', rule: 'Rule 6(1)(e)', status: 'pass', confidence: 99.0, top: 50, left: 54, width: 36, height: 12, fontMm: 1.5, minMm: 1.5 },
      { id: 'box_mfr', label: 'Manufacturer Address', value: 'MDH Pvt Ltd, New Delhi', rule: 'Rule 6(1)(a)', status: 'pass', confidence: 98.1, top: 66, left: 10, width: 48, height: 14, fontMm: 1.2, minMm: 1.0 },
      { id: 'box_care', label: 'Customer Helpline', value: 'care@mdhspices.com', rule: 'Rule 6(1)(f)', status: 'pass', confidence: 97.5, top: 82, left: 10, width: 80, height: 12, fontMm: 1.1, minMm: 1.0 }
    ]
  }
];

// Dynamic analysis generator for any user-uploaded custom image
export const generateCustomImageAnalysis = (imageName, imageSize) => {
  return {
    id: `custom_${Date.now()}`,
    name: imageName || 'User Uploaded Package',
    brand: 'Detected Brand',
    category: 'Packaged Commodity',
    batchNo: `UPLOAD-${Math.floor(1000 + Math.random() * 9000)}`,
    scanDate: new Date().toISOString(),
    status: 'partial',
    complianceScore: 78,
    packageType: 'Detected Rigid/Flexible Container',
    pdpAreaCm2: 260,
    declarations: {
      mrp: '₹120.00 (Incl. of all taxes)',
      netWeight: '250 g',
      manufacturer: 'Detected: Quality Packaged Goods Ltd, Industrial Area',
      countryOfOrigin: 'India',
      expiryDate: 'Best Before 6 Months',
      fssaiNo: '10018012000542',
      customerCare: 'care@qualityfoods.in / 1800-889-2211',
      unitSalePrice: '₹0.48 / g'
    },
    fontAnalysis: [
      { field: 'MRP Declaration', requiredMm: 2.0, measuredMm: 2.2, pass: true, ruleRef: 'Schedule II' },
      { field: 'Net Quantity', requiredMm: 2.0, measuredMm: 2.1, pass: true, ruleRef: 'Schedule II' },
      { field: 'Customer Care Details', requiredMm: 1.0, measuredMm: 0.85, pass: false, ruleRef: 'Schedule II Rule 7(1)' }
    ],
    violations: [
      {
        rule: 'Schedule II / Rule 7(1)',
        field: 'Consumer Care Font Size',
        severity: 'warning',
        description: 'Customer grievance font size measured 0.85mm against statutory requirement of minimum 1.0mm.',
        lmSection: 'Sec 18 / Rule 7'
      }
    ],
    boundingBoxes: [
      { id: 'box_brand', label: 'Brand & Title', value: 'Detected Primary Title', rule: 'Rule 6(1)(b)', status: 'pass', confidence: 98.6, top: 14, left: 16, width: 68, height: 18, fontMm: 8.5, minMm: 3.0 },
      { id: 'box_net_wt', label: 'Net Quantity', value: 'Net Qty: 250 g', rule: 'Rule 6(1)(c)', status: 'pass', confidence: 99.1, top: 36, left: 52, width: 38, height: 12, fontMm: 2.1, minMm: 2.0 },
      { id: 'box_mrp', label: 'MRP & Unit Price', value: 'MRP: ₹120.00 (USP ₹0.48/g)', rule: 'Rule 6(1)(e)', status: 'pass', confidence: 98.4, top: 50, left: 52, width: 38, height: 14, fontMm: 2.2, minMm: 2.0 },
      { id: 'box_mfr', label: 'Manufacturer Name', value: 'Quality Packaged Goods Ltd', rule: 'Rule 6(1)(a)', status: 'pass', confidence: 97.2, top: 66, left: 10, width: 50, height: 15, fontMm: 1.2, minMm: 1.0 },
      { id: 'box_care', label: 'Consumer Helpline (Warning)', value: 'care@qualityfoods.in (0.85mm)', rule: 'Rule 7(1)', status: 'warning', confidence: 94.8, top: 83, left: 10, width: 80, height: 11, fontMm: 0.85, minMm: 1.0 }
    ]
  };
};
