// Mock Products with high-fidelity packaging data, bounding box coordinates, and Legal Metrology rule citations
// Exclusive list of 6 items: Amul paneer, Diet coke, Haldiram's Aloo Bhujiya, Hide&Seek Biscuit, Lays Chips, Motherdairy Dahi

export const mockProducts = [
  {
    id: 'prod_001',
    name: 'Fresh Paneer 200g',
    brand: 'Amul',
    category: 'Dairy',
    batchNo: 'AM-PN-2026-44',
    scanDate: new Date().toISOString(),
    status: 'compliant',
    complianceScore: 100,
    packageType: 'Vacuum Sealed Poly Pack',
    pdpAreaCm2: 190,
    imageUrl: '/assets/mock-labels/amul_paneer.svg',
    declarations: {
      mrp: '₹95.00 (Incl. of all taxes)',
      netWeight: '200 g',
      manufacturer: 'Gujarat Cooperative Milk Marketing Federation Ltd. (GCMMF), Anand - 388001, Gujarat',
      countryOfOrigin: 'India',
      expiryDate: 'Use within 30 days from packaging',
      fssaiNo: '10012021000071',
      customerCare: '1800-258-3333 / customercare@amul.coop',
      unitSalePrice: '₹0.48 / g'
    },
    fontAnalysis: [
      { field: 'MRP & Unit Price', requiredMm: 1.5, measuredMm: 2.2, pass: true, ruleRef: 'Schedule II' },
      { field: 'Net Quantity', requiredMm: 2.0, measuredMm: 2.8, pass: true, ruleRef: 'Rule 7 & Schedule II' },
      { field: 'Manufacturer Address', requiredMm: 1.0, measuredMm: 1.4, pass: true, ruleRef: 'Schedule II' },
      { field: 'Customer Care Details', requiredMm: 1.0, measuredMm: 1.2, pass: true, ruleRef: 'Rule 6(1)(f)' }
    ],
    violations: [],
    boundingBoxes: [
      { id: 'box_brand', label: 'Brand & Commodity', value: 'Amul Fresh Paneer', rule: 'Rule 6(1)(b)', status: 'pass', confidence: 99.8, top: 12, left: 16, width: 68, height: 18, fontMm: 11.0, minMm: 3.0 },
      { id: 'box_net_wt', label: 'Net Quantity', value: 'Net Qty: 200 g', rule: 'Rule 6(1)(c) & Rule 12', status: 'pass', confidence: 99.5, top: 34, left: 56, width: 36, height: 12, fontMm: 2.8, minMm: 2.0 },
      { id: 'box_mrp', label: 'MRP & Unit Sale Price', value: 'MRP: ₹95.00 (USP ₹0.48/g)', rule: 'Rule 6(1)(e) & 6(1)(ab)', status: 'pass', confidence: 99.2, top: 48, left: 56, width: 38, height: 14, fontMm: 2.2, minMm: 1.5 },
      { id: 'box_mfr', label: 'Manufacturer & Packer', value: 'Mfd By: GCMMF Ltd., Anand - 388001, Gujarat', rule: 'Rule 6(1)(a)', status: 'pass', confidence: 98.7, top: 66, left: 10, width: 52, height: 16, fontMm: 1.4, minMm: 1.0 },
      { id: 'box_origin', label: 'Country of Origin', value: 'Country of Origin: India', rule: 'Rule 6(1)(aa)', status: 'pass', confidence: 99.6, top: 84, left: 10, width: 38, height: 9, fontMm: 1.3, minMm: 1.0 },
      { id: 'box_care', label: 'Consumer Care Helpline', value: 'Care: 1800-258-3333 / customercare@amul.coop', rule: 'Rule 6(1)(f)', status: 'pass', confidence: 98.2, top: 84, left: 50, width: 44, height: 9, fontMm: 1.2, minMm: 1.0 }
    ]
  },
  {
    id: 'prod_002',
    name: 'Diet Coke Can 200ml',
    brand: 'Coca-Cola',
    category: 'Beverages',
    batchNo: 'CC-DC-881',
    scanDate: new Date().toISOString(),
    status: 'compliant',
    complianceScore: 100,
    packageType: 'Aluminium Can',
    pdpAreaCm2: 175,
    imageUrl: '/assets/mock-labels/diet_coke.svg',
    declarations: {
      mrp: '₹30.00 (Incl. of all taxes)',
      netWeight: '200 ml (Net Volume)',
      manufacturer: 'Hindustan Coca-Cola Beverages Pvt. Ltd., B-91, Mayapuri Ind. Area, New Delhi - 110064',
      countryOfOrigin: 'India',
      expiryDate: 'Best before 6 months from manufacture',
      fssaiNo: '10012011000120',
      customerCare: '1800-208-2653 / indiahelpline@coca-cola.com',
      unitSalePrice: '₹15.00 / 100 ml'
    },
    fontAnalysis: [
      { field: 'MRP & Unit Sale Price', requiredMm: 1.5, measuredMm: 2.0, pass: true, ruleRef: 'Schedule II' },
      { field: 'Net Volume', requiredMm: 2.0, measuredMm: 2.6, pass: true, ruleRef: 'Rule 7 & Schedule II' },
      { field: 'Manufacturer Address', requiredMm: 1.0, measuredMm: 1.2, pass: true, ruleRef: 'Schedule II' },
      { field: 'Customer Grievance Helpline', requiredMm: 1.0, measuredMm: 1.1, pass: true, ruleRef: 'Rule 6(1)(f)' }
    ],
    violations: [],
    boundingBoxes: [
      { id: 'box_brand', label: 'Brand & Commodity', value: 'Diet Coke (Carbonated Beverage)', rule: 'Rule 6(1)(b)', status: 'pass', confidence: 99.9, top: 12, left: 16, width: 68, height: 18, fontMm: 12.0, minMm: 3.0 },
      { id: 'box_net_wt', label: 'Net Quantity', value: 'Net Volume: 200 ml', rule: 'Rule 6(1)(c)', status: 'pass', confidence: 99.4, top: 34, left: 54, width: 38, height: 12, fontMm: 2.6, minMm: 2.0 },
      { id: 'box_mrp', label: 'MRP & Unit Sale Price', value: 'MRP: ₹40.00 (USP ₹20.00/100ml)', rule: 'Rule 6(1)(e) & 6(1)(ab)', status: 'pass', confidence: 99.1, top: 48, left: 54, width: 38, height: 14, fontMm: 2.0, minMm: 1.5 },
      { id: 'box_mfr', label: 'Manufacturer Address', value: 'Hindustan Coca-Cola Beverages Pvt. Ltd., New Delhi', rule: 'Rule 6(1)(a)', status: 'pass', confidence: 98.5, top: 66, left: 10, width: 50, height: 16, fontMm: 1.2, minMm: 1.0 },
      { id: 'box_care', label: 'Consumer Helpline', value: '1800-208-2653 / indiahelpline@coca-cola.com', rule: 'Rule 6(1)(f)', status: 'pass', confidence: 98.0, top: 84, left: 10, width: 80, height: 10, fontMm: 1.1, minMm: 1.0 }
    ]
  },
  {
    id: 'prod_003',
    name: 'Aloo Bhujia 150g',
    brand: "Haldiram's",
    category: 'Snacks',
    batchNo: 'HD-AB-402',
    scanDate: new Date().toISOString(),
    status: 'partial',
    complianceScore: 75,
    packageType: 'Nitrogen Flushed Poly Pouch',
    pdpAreaCm2: 240,
    imageUrl: '/assets/mock-labels/aloo_bhujiya.svg',
    declarations: {
      mrp: '₹42.00 (Incl. of all taxes)',
      netWeight: '150 g',
      manufacturer: 'Haldiram Foods International Pvt. Ltd., 20 Km Stone, Vill-Khedi, Nagpur - 440023, MH',
      countryOfOrigin: 'India',
      expiryDate: 'Best before 6 months from packaging',
      fssaiNo: '10012022000388',
      customerCare: 'customercare@haldirams.com / +91-712-2779451',
      unitSalePrice: '₹0.28 / g'
    },
    fontAnalysis: [
      { field: 'MRP Declaration', requiredMm: 2.0, measuredMm: 2.2, pass: true, ruleRef: 'Schedule II' },
      { field: 'Net Quantity', requiredMm: 2.0, measuredMm: 2.4, pass: true, ruleRef: 'Rule 7 & Schedule II' },
      { field: 'Customer Grievance Details', requiredMm: 1.0, measuredMm: 0.75, pass: false, ruleRef: 'Schedule II Rule 7(1)' }
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
      { id: 'box_brand', label: 'Brand & Commodity', value: "Haldiram's Nagpur Aloo Bhujia", rule: 'Rule 6(1)(b)', status: 'pass', confidence: 99.7, top: 12, left: 16, width: 68, height: 18, fontMm: 10.5, minMm: 4.0 },
      { id: 'box_net_wt', label: 'Net Quantity', value: 'Net Weight: 150 g', rule: 'Rule 6(1)(c)', status: 'pass', confidence: 99.2, top: 34, left: 55, width: 35, height: 12, fontMm: 2.4, minMm: 2.0 },
      { id: 'box_mrp', label: 'MRP & USP', value: 'MRP: ₹42.00 (USP ₹0.28/g)', rule: 'Rule 6(1)(e)', status: 'pass', confidence: 98.9, top: 48, left: 55, width: 35, height: 14, fontMm: 2.2, minMm: 2.0 },
      { id: 'box_mfr', label: 'Manufacturer Address', value: 'Haldiram Foods International Pvt. Ltd., Nagpur', rule: 'Rule 6(1)(a)', status: 'pass', confidence: 98.4, top: 66, left: 10, width: 48, height: 15, fontMm: 1.2, minMm: 1.0 },
      { id: 'box_care', label: 'Customer Care (Sub-minimum Font)', value: 'Care: customercare@haldirams.com (0.75mm)', rule: 'Rule 7(1)', status: 'warning', confidence: 95.8, top: 83, left: 10, width: 80, height: 10, fontMm: 0.75, minMm: 1.0 }
    ]
  },
  {
    id: 'prod_004',
    name: 'Hide & Seek Chocolate Chip Biscuits 120g',
    brand: 'Parle',
    category: 'Snacks',
    batchNo: 'HS-CC-901',
    scanDate: new Date().toISOString(),
    status: 'compliant',
    complianceScore: 100,
    packageType: 'Metallized Pillow Pouch',
    pdpAreaCm2: 160,
    imageUrl: '/assets/mock-labels/hide_and_seek.svg',
    declarations: {
      mrp: '₹30.00 (Incl. of all taxes)',
      netWeight: '120 g',
      manufacturer: 'Parle Products Pvt. Ltd., North Level Crossing, Vile Parle East, Mumbai - 400057, MH',
      countryOfOrigin: 'India',
      expiryDate: 'Best before 6 months from manufacture',
      fssaiNo: '10013022000225',
      customerCare: '1800-22-7799 / cs@parle.biz',
      unitSalePrice: '₹0.25 / g'
    },
    fontAnalysis: [
      { field: 'MRP & Unit Sale Price', requiredMm: 1.5, measuredMm: 2.1, pass: true, ruleRef: 'Schedule II' },
      { field: 'Net Quantity', requiredMm: 1.5, measuredMm: 2.3, pass: true, ruleRef: 'Schedule II' },
      { field: 'Manufacturer Address', requiredMm: 1.0, measuredMm: 1.3, pass: true, ruleRef: 'Schedule II' },
      { field: 'Customer Care Details', requiredMm: 1.0, measuredMm: 1.1, pass: true, ruleRef: 'Rule 6(1)(f)' }
    ],
    violations: [],
    boundingBoxes: [
      { id: 'box_brand', label: 'Brand & Commodity', value: 'Parle Hide & Seek Chocolate Chip Biscuits', rule: 'Rule 6(1)(b)', status: 'pass', confidence: 99.6, top: 12, left: 16, width: 68, height: 18, fontMm: 11.5, minMm: 3.0 },
      { id: 'box_net_wt', label: 'Net Quantity', value: 'Net Weight: 120 g', rule: 'Rule 6(1)(c)', status: 'pass', confidence: 99.2, top: 35, left: 54, width: 36, height: 12, fontMm: 2.3, minMm: 1.5 },
      { id: 'box_mrp', label: 'MRP (Inclusive of Taxes)', value: 'MRP: ₹30.00 (USP ₹0.25/g)', rule: 'Rule 6(1)(e)', status: 'pass', confidence: 98.8, top: 50, left: 54, width: 36, height: 12, fontMm: 2.1, minMm: 1.5 },
      { id: 'box_mfr', label: 'Manufacturer Name', value: 'Parle Products Pvt. Ltd., Mumbai - 400057', rule: 'Rule 6(1)(a)', status: 'pass', confidence: 98.2, top: 66, left: 10, width: 50, height: 15, fontMm: 1.3, minMm: 1.0 },
      { id: 'box_care', label: 'Customer Helpline', value: '1800-22-7799 / cs@parle.biz', rule: 'Rule 6(1)(f)', status: 'pass', confidence: 97.9, top: 84, left: 10, width: 80, height: 10, fontMm: 1.1, minMm: 1.0 }
    ]
  },
  {
    id: 'prod_005',
    name: 'Classic Salted Potato Chips 50g',
    brand: "Lay's",
    category: 'Snacks',
    batchNo: 'LY-CL-50X',
    scanDate: new Date().toISOString(),
    status: 'non-compliant',
    complianceScore: 55,
    packageType: 'Metallized Poly Pouch',
    pdpAreaCm2: 190,
    imageUrl: '/assets/mock-labels/lays_chips.svg',
    declarations: {
      mrp: '₹20.00 (Incl. of all taxes)',
      netWeight: '50 g',
      manufacturer: 'PepsiCo India Holdings Pvt. Ltd., DLF Qutab Enclave, Phase-III, Gurugram - 122002, HR',
      countryOfOrigin: 'NOT DECLARED',
      expiryDate: 'Best before 4 months from packaging',
      fssaiNo: '10014064000435',
      customerCare: '1800-224-020 / feedback@pepsico.com',
      unitSalePrice: 'NOT DECLARED'
    },
    fontAnalysis: [
      { field: 'MRP Declaration', requiredMm: 1.5, measuredMm: 1.8, pass: true, ruleRef: 'Schedule II' },
      { field: 'Net Quantity', requiredMm: 1.5, measuredMm: 1.9, pass: true, ruleRef: 'Schedule II' },
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
      { id: 'box_brand', label: 'Brand & Commodity', value: "Lay's Classic Salted Potato Chips", rule: 'Rule 6(1)(b)', status: 'pass', confidence: 99.8, top: 12, left: 16, width: 68, height: 20, fontMm: 11.0, minMm: 3.0 },
      { id: 'box_net_wt', label: 'Net Quantity', value: 'Net Weight: 50 g', rule: 'Rule 6(1)(c)', status: 'pass', confidence: 99.1, top: 35, left: 54, width: 36, height: 12, fontMm: 1.9, minMm: 1.5 },
      { id: 'box_mrp', label: 'MRP (Inclusive of Taxes)', value: 'MRP: ₹20.00', rule: 'Rule 6(1)(e)', status: 'pass', confidence: 98.7, top: 50, left: 54, width: 36, height: 12, fontMm: 1.8, minMm: 1.5 },
      { id: 'box_mfr', label: 'Manufacturer Name', value: 'PepsiCo India Holdings, Gurugram - 122002', rule: 'Rule 6(1)(a)', status: 'pass', confidence: 98.1, top: 65, left: 10, width: 50, height: 15, fontMm: 1.2, minMm: 1.0 },
      { id: 'box_origin', label: 'Country of Origin (MISSING)', value: 'MISSING: Country of Origin absent', rule: 'Rule 6(1)(aa)', status: 'fail', confidence: 0, top: 82, left: 10, width: 80, height: 12, fontMm: 0, minMm: 1.0 }
    ]
  },
  {
    id: 'prod_006',
    name: 'Classic Dahi 400g',
    brand: 'Mother Dairy',
    category: 'Dairy',
    batchNo: 'MD-DH-77',
    scanDate: new Date().toISOString(),
    status: 'partial',
    complianceScore: 78,
    packageType: 'Plastic Tub / Sealed Foil Lid',
    pdpAreaCm2: 140,
    imageUrl: '/assets/mock-labels/mother_dairy_dahi.svg',
    declarations: {
      mrp: '₹40.00 (Incl. of all taxes)',
      netWeight: '400 g',
      manufacturer: 'Mother Dairy Fruit & Vegetable Pvt. Ltd., Patparganj, Delhi - 110092',
      countryOfOrigin: 'India',
      expiryDate: 'Use by 15 days from packing',
      fssaiNo: '10014011001895',
      customerCare: '1800-180-1018 / consumer.services@motherdairy.com',
      unitSalePrice: '₹0.10 / g'
    },
    fontAnalysis: [
      { field: 'MRP Declaration', requiredMm: 1.5, measuredMm: 1.8, pass: true, ruleRef: 'Schedule II' },
      { field: 'Net Quantity', requiredMm: 1.5, measuredMm: 2.2, pass: true, ruleRef: 'Schedule II' },
      { field: 'Date of Packing / Use-By', requiredMm: 1.0, measuredMm: 0.8, pass: false, ruleRef: 'Rule 6(1)(d)' }
    ],
    violations: [
      {
        rule: 'Rule 6(1)(d)',
        field: 'Month & Year of Packing',
        severity: 'warning',
        description: 'Packing date declaration on foil seal measured 0.8mm height, falling below the mandatory minimum height of 1.0mm.',
        lmSection: 'Sec 18 / Rule 6(1)(d)'
      }
    ],
    boundingBoxes: [
      { id: 'box_brand', label: 'Brand & Commodity', value: 'Mother Dairy Classic Dahi', rule: 'Rule 6(1)(b)', status: 'pass', confidence: 99.7, top: 12, left: 16, width: 68, height: 18, fontMm: 10.0, minMm: 3.0 },
      { id: 'box_net_wt', label: 'Net Quantity', value: 'Net Quantity: 400 g', rule: 'Rule 6(1)(c)', status: 'pass', confidence: 99.4, top: 35, left: 54, width: 36, height: 12, fontMm: 2.2, minMm: 1.5 },
      { id: 'box_mrp', label: 'MRP & USP', value: 'MRP: ₹40.00 (USP ₹0.10/g)', rule: 'Rule 6(1)(e) & 6(1)(ab)', status: 'pass', confidence: 99.0, top: 50, left: 54, width: 36, height: 12, fontMm: 1.8, minMm: 1.5 },
      { id: 'box_mfr', label: 'Manufacturer Address', value: 'Mother Dairy Fruit & Vegetable Pvt. Ltd., Delhi', rule: 'Rule 6(1)(a)', status: 'pass', confidence: 98.3, top: 66, left: 10, width: 48, height: 14, fontMm: 1.2, minMm: 1.0 },
      { id: 'box_care', label: 'Consumer Helpline', value: '1800-180-1018 / consumer.services@motherdairy.com', rule: 'Rule 6(1)(f)', status: 'pass', confidence: 97.8, top: 82, left: 10, width: 80, height: 12, fontMm: 1.1, minMm: 1.0 },
      { id: 'box_pkg_date', label: 'Packing Date Warning', value: 'Pkd: 08/26 (0.8mm Font Warning)', rule: 'Rule 6(1)(d)', status: 'warning', confidence: 91.5, top: 94, left: 10, width: 80, height: 10, fontMm: 0.8, minMm: 1.0 }
    ]
  }
];

// Dynamic analysis generator for any user-uploaded custom image
export const generateCustomImageAnalysis = (imageName = '', imageSize = 0, customImageUrl = null) => {
  const lowerName = (imageName || '').toLowerCase();
  
  // Smart mapping if user uploaded one of the 6 recognized commodities
  let matchedProduct = null;
  if (lowerName.includes('paneer') || (lowerName.includes('amul') && !lowerName.includes('dahi'))) {
    matchedProduct = mockProducts.find(p => p.id === 'prod_001');
  } else if (lowerName.includes('coke') || lowerName.includes('diet')) {
    matchedProduct = mockProducts.find(p => p.id === 'prod_002');
  } else if (lowerName.includes('bhujia') || lowerName.includes('bhujiya') || lowerName.includes('haldiram')) {
    matchedProduct = mockProducts.find(p => p.id === 'prod_003');
  } else if (lowerName.includes('hide') || lowerName.includes('seek') || lowerName.includes('biscuit')) {
    matchedProduct = mockProducts.find(p => p.id === 'prod_004');
  } else if (lowerName.includes('lay') || lowerName.includes('chips')) {
    matchedProduct = mockProducts.find(p => p.id === 'prod_005');
  } else if (lowerName.includes('dahi') || lowerName.includes('mother')) {
    matchedProduct = mockProducts.find(p => p.id === 'prod_006');
  }

  if (matchedProduct) {
    return {
      ...matchedProduct,
      id: `scan_${Date.now()}`,
      scanDate: new Date().toISOString(),
      imageUrl: customImageUrl || matchedProduct.imageUrl,
      uploadedFileName: imageName || `${matchedProduct.brand}_${matchedProduct.name}`
    };
  }

  // Generic custom packaged commodity profile
  return {
    id: `custom_${Date.now()}`,
    name: imageName ? imageName.replace(/[-_]/g, ' ') : 'Custom Packaged Commodity',
    brand: 'Detected Brand',
    category: 'Packaged Commodity',
    batchNo: `UPLOAD-${Math.floor(1000 + Math.random() * 9000)}`,
    scanDate: new Date().toISOString(),
    status: 'partial',
    complianceScore: 78,
    packageType: 'Rigid / Flexible Container',
    pdpAreaCm2: 260,
    imageUrl: customImageUrl,
    uploadedFileName: imageName,
    declarations: {
      mrp: '₹120.00 (Incl. of all taxes)',
      netWeight: '250 g',
      manufacturer: 'Detected: Quality Packaged Goods Ltd, Industrial Estate, Sector 5',
      countryOfOrigin: 'India',
      expiryDate: 'Best Before 6 Months from packaging',
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
        description: 'Customer grievance font size measured 0.85mm against statutory requirement of minimum 1.0mm for PDP > 200 cm².',
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
