
import { LevelData, JournalType } from './types';

// --- DONNÉES DE RÉFÉRENCE ---

export const PLAN_COMPTABLE = [
  { account: "1000", label: "Capital souscrit" },
  { account: "1010", label: "Capital non appelé (-)" },
  { account: "1020", label: "Capital amorti" },
  { account: "2400", label: "Mobilier et matériel de bureau" },
  { account: "2410", label: "Matériel roulant" },
  { account: "4000", label: "Clients" },
  { account: "4050", label: "Créances pour emballages à rendre" },
  { account: "4110", label: "T.V.A. à récupérer sur achat" },
  { account: "4111", label: "T.V.A. déductible intracommunautaire" },
  { account: "4114", label: "T.V.A. à récupérer pour régularisation" },
  { account: "4115", label: "T.V.A. déductible import" },
  { account: "4400", label: "Fournisseurs" },
  { account: "4440", label: "Factures à recevoir" },
  { account: "4450", label: "Dettes pour emballages consignés" },
  { account: "4510", label: "T.V.A. à payer s/ ventes" },
  { account: "4511", label: "T.V.A. à payer intracommunautaire" },
  { account: "4512", label: "T.V.A. à payer import" },
  { account: "4513", label: "T.V.A. due (cocontractant)" },
  { account: "4514", label: "T.V.A. due pour régularisations" },
  { account: "5500", label: "Banques - compte courant" },
  { account: "5501", label: "Banques - chèques émis" },
  { account: "5700", label: "Caisses - espèces" },
  { account: "6040", label: "Achats de marchandises" },
  { account: "6080", label: "Remises, ristournes et rabais obtenus" },
  { account: "6101", label: "Charges locatives constructions" },
  { account: "6106", label: "Entretien et réparations" },
  { account: "6108", label: "Entretien matériel roulant" },
  { account: "6117", label: "Consommation électricité" },
  { account: "6168", label: "Frais de réception" },
  { account: "6530", label: "Charges d'escompte de créances" },
  { account: "7000", label: "Ventes de marchandises" },
  { account: "7070", label: "Prestations de services" },
  { account: "7080", label: "Remises, ristournes et rabais accordés" },
  { account: "7560", label: "Escomptes obtenus des fournisseurs" }
];

export const DECLARATION_TVA = {
  cadreII: [
    { code: "01", label: "6%" },
    { code: "02", label: "12%" },
    { code: "03", label: "21%" },
    { code: "45", label: "COCONTRACTANT" },
    { code: "46", label: "INTRACOMMUNAUTAIRE" },
    { code: "47", label: "EXPORTATION" },
    { code: "48", label: "NC s/Ventes IC" },
    { code: "49", label: "NC s/Autres" }
  ],
  cadreIII: [
    { code: "81", label: "Marchandises, matières premières" },
    { code: "82", label: "SBD" },
    { code: "83", label: "Investissements" },
    { code: "84", label: "NC s/IC" },
    { code: "85", label: "NC autres" },
    { code: "86", label: "Achats IC" },
    { code: "87", label: "Achats Cocontractant (+ PS intracommunautaire)" }
  ],
  cadreIV: [
    { code: "54", label: "TVA s/ventes" },
    { code: "55", label: "TVA IC" },
    { code: "56", label: "TVA Cocontractant" },
    { code: "57", label: "TVA Import" },
    { code: "63", label: "NC s/achats" },
    { code: "xx", label: "TOTAL" }
  ],
  cadreV: [
    { code: "59", label: "TVA déductible (s/achats)" },
    { code: "64", label: "TVA s/NC s/ventes" },
    { code: "YY", label: "TOTAL" }
  ],
  cadreVI: [
    { code: "71", label: "TVA due à l'état (à payer)" },
    { code: "72", label: "TVA due par l'état (à récupérer)" }
  ]
};

export const CODES_POPSY = {
  achats: [
    { code: "6CM", tva: "6%", label: "Marchandises Cocontractant" },
    { code: "6CS", tva: "6%", label: "Services Cocontractant" },
    { code: "6CV", tva: "6%", label: "Investissements Cocontractant" },
    { code: "6IM", tva: "6%", label: "Marchandises Intracommunautaires" },
    { code: "6IS", tva: "6%", label: "Services Intracommunautaires" },
    { code: "6IV", tva: "6%", label: "Investissements Intracommunautaires" },
    { code: "6M", tva: "6%", label: "Marchandises" },
    { code: "6S", tva: "6%", label: "Services" },
    { code: "6V", tva: "6%", label: "Investissements" },
    { code: "6XM", tva: "6%", label: "Marchandises Importations" },
    { code: "6XS", tva: "6%", label: "Services Importations" },
    { code: "6XV", tva: "6%", label: "Investissements Importations" },
    { code: "21CM", tva: "21%", label: "Marchandises Cocontractant" },
    { code: "21CS", tva: "21%", label: "Services Cocontractant" },
    { code: "21CV", tva: "21%", label: "Investissements Cocontractant" },
    { code: "21IM", tva: "21%", label: "Marchandises Intracommunautaires" },
    { code: "21IS", tva: "21%", label: "Services Intracommunautaires" },
    { code: "21IV", tva: "21%", label: "Investissements Intracommunautaires" },
    { code: "21M", tva: "21%", label: "Marchandises - 60" },
    { code: "21S", tva: "21%", label: "Services - 61" },
    { code: "21V", tva: "21%", label: "Investissements - 2" },
    { code: "21XM", tva: "21%", label: "Marchandises Importations" },
    { code: "21XS", tva: "21%", label: "Services Importations" },
    { code: "21XV", tva: "21%", label: "Investissements Importations" }
  ],
  ventes: [
    { code: "0", tva: "0%", label: "TVA 0%" },
    { code: "6", tva: "6%", label: "TVA 6%" },
    { code: "12", tva: "12%", label: "TVA 12%" },
    { code: "21", tva: "21%", label: "TVA 21%" },
    { code: "C0", tva: "0%", label: "TVA 0% Cocontractant" },
    { code: "EX", tva: "", label: "Exonéré" },
    { code: "I0", tva: "0%", label: "TVA 0% Intracommunautaire" },
    { code: "X0", tva: "0%", label: "TVA 0% Exportations" }
  ],
  divers: [
    { code: "21ND", label: "TVA SUR FRAIS DE VOITURE (50% TVA RECUP) = sbd (case 82 décl tva)" },
    { code: "EX", label: "Pour les loyers, timbres, taxes, assurances et emballages consignés" }
  ]
};

// EXERCICES (31 Niveaux, Ex 25 supprimé)
export const RAW_LEVELS: LevelData[] = [
  // 1. Réouverture
  {
    id: 1, title: "Exercice de réouverture", description: "Écriture d'ouverture au 1er Janvier.",
    documents: [{ type: 'NOTE', title: "Situation au 01/01", content: { text: "Au 1er janvier, la société possède 25.000 Eur en banque et 2.000 Eur en caisse.\nCapital : 27.000 Eur." } }],
    requiredJournals: [{ type: JournalType.OD, defaultDate: "01/01/N", solution: [{ id: 's1', accountNumber: '5500', debit: '25.000', credit: '', declTva: '', codePopsy: '', label: '' }, { id: 's2', accountNumber: '5700', debit: '2.000', credit: '', declTva: '', codePopsy: '', label: '' }, { id: 's3', accountNumber: '1000', debit: '', credit: '27.000', declTva: '', codePopsy: '', label: '' }] }]
  },
  // 2. Achat Simple
  {
    id: 2, title: "Achat Marchandises (Liquide)", description: "Achat marchandises paiement liquide.",
    documents: [{ type: 'INVOICE', title: "Facture 105", content: { sender: { name: "BRICO WORLD", vat: "BE 0424.850.991" }, receiver: { name: "SPRL OUTISUD", vat: "BE 0415.776.939" }, details: { number: "105", date: "02/01/N" }, lines: [{ desc: "Produit B", total: "2500" }, { desc: "RRR", total: "-250" }], totals: { toPay: "2722,50", totalVat: "472,50", totalExcl: "2250,00", bases: [{ rate: "21%", base: "2250", tax: "472,50" }] } } }],
    requiredJournals: [
      { type: JournalType.ACHAT, defaultDate: "02/01/N", solution: [{ id: 's1', accountNumber: '6040', debit: '2250', credit: '', declTva: '81', codePopsy: '21M', label: '' }, { id: 's2', accountNumber: '4110', debit: '472,50', credit: '', declTva: '59', codePopsy: '', label: '' }, { id: 's3', accountNumber: '4400', credit: '2722,50', debit: '', declTva: '', codePopsy: '', label: '' }] },
      { type: JournalType.CAISSE, defaultDate: "02/01/N", solution: [{ id: 's1', accountNumber: '4400', debit: '2722,50', credit: '', declTva: '', codePopsy: '', label: '' }, { id: 's2', accountNumber: '5700', credit: '2722,50', debit: '', declTva: '', codePopsy: '', label: '' }] }
    ]
  },
  // 3. Chèque
  {
    id: 3, title: "Paiement par Chèque", description: "Facture électricité payée par chèque.",
    documents: [
        { type: 'INVOICE', title: "Fac 204", content: { sender: { name: "TOTAL ENERGIES" }, receiver: { name: "OUTISUD" }, details: { number: "204", date: "03/01/N" }, lines: [{ desc: "Facture", total: "4500" }], totals: { toPay: "5445", totalVat: "945", totalExcl: "4500", bases: [{ rate: "21%", base: "4500", tax: "945" }] } } },
        { type: 'BANK_EXTRACT', title: "Extrait 31", content: { account: "068-...", transactions: [{ date: "05/01/N", desc: "Chèque", amount: "-5.445,00" }] } }
    ],
    requiredJournals: [
        { type: JournalType.ACHAT, defaultDate: "03/01/N", solution: [{ id: 's1', accountNumber: '6117', debit: '4500', credit: '', declTva: '82', codePopsy: '21S', label: '' }, { id: 's2', accountNumber: '4110', debit: '945', credit: '', declTva: '59', codePopsy: '', label: '' }, { id: 's3', accountNumber: '4400', credit: '5445', debit: '', declTva: '', codePopsy: '', label: '' }] },
        { type: JournalType.OD, defaultDate: "03/01/N", solution: [{ id: 's1', accountNumber: '4400', debit: '5445', credit: '', declTva: '', codePopsy: '', label: '' }, { id: 's2', accountNumber: '5501', credit: '5445', debit: '', declTva: '', codePopsy: '', label: '' }] },
        { type: JournalType.FINANCIER, defaultDate: "05/01/N", solution: [{ id: 's1', accountNumber: '5501', debit: '5445', credit: '', declTva: '', codePopsy: '', label: '' }, { id: 's2', accountNumber: '5500', credit: '5445', debit: '', declTva: '', codePopsy: '', label: '' }] }
    ]
  },
  // 4. Virement
  {
    id: 4, title: "Achat Mobilier", description: "Achat mobilier et virement.",
    documents: [
        { type: 'INVOICE', title: "Fac 110", content: { sender: { name: "OFFICE DEPOT" }, receiver: { name: "OUTISUD" }, details: { number: "110", date: "04/01/N" }, lines: [{ desc: "Bureau", total: "6000" }], totals: { toPay: "7260", totalVat: "1260", totalExcl: "6000", bases: [{ rate: "21%", base: "6000", tax: "1260" }] } } },
        { type: 'BANK_EXTRACT', title: "Extrait 32", content: { transactions: [{ date: "06/01/N", desc: "Virement", amount: "-7.260,00" }] } }
    ],
    requiredJournals: [
        { type: JournalType.ACHAT, defaultDate: "04/01/N", solution: [{ id: 's1', accountNumber: '2400', debit: '6000', credit: '', declTva: '83', codePopsy: '21V', label: '' }, { id: 's2', accountNumber: '4110', debit: '1260', credit: '', declTva: '59', codePopsy: '', label: '' }, { id: 's3', accountNumber: '4400', credit: '7260', debit: '', declTva: '', codePopsy: '', label: '' }] },
        { type: JournalType.OD, defaultDate: "04/01/N", solution: [{ id: 's1', accountNumber: '4400', debit: '7260', credit: '', declTva: '', codePopsy: '', label: '' }, { id: 's2', accountNumber: '5501', credit: '7260', debit: '', declTva: '', codePopsy: '', label: '' }] },
        { type: JournalType.FINANCIER, defaultDate: "06/01/N", solution: [{ id: 's1', accountNumber: '5501', debit: '7260', credit: '', declTva: '', codePopsy: '', label: '' }, { id: 's2', accountNumber: '5500', credit: '7260', debit: '', declTva: '', codePopsy: '', label: '' }] }
    ]
  },
  // 5. Vente
  {
    id: 5, title: "Ex 1 - Vente Marchandises", description: "Facture de vente et paiement reçu.",
    documents: [
        { type: 'INVOICE', title: "Fac 505", content: { sender: { name: "OUTISUD" }, receiver: { name: "GENERAL CONSTRUCTION" }, details: { number: "505", date: "05/01/N" }, lines: [{ desc: "Produit B", total: "8000" }], totals: { toPay: "9680", totalVat: "1680", totalExcl: "8000", bases: [{ rate: "21%", base: "8000", tax: "1680" }] } } },
        { type: 'BANK_EXTRACT', title: "Extrait 33", content: { transactions: [{ date: "12/01/N", desc: "Virement Client", amount: "9.680,00" }] } }
    ],
    requiredJournals: [
        { type: JournalType.VENTE, defaultDate: "05/01/N", solution: [{ id: 's1', accountNumber: '7000', credit: '8000', debit: '', declTva: '03', codePopsy: '21', label: '' }, { id: 's2', accountNumber: '4510', credit: '1680', debit: '', declTva: '54', codePopsy: '', label: '' }, { id: 's3', accountNumber: '4000', debit: '9680', credit: '', declTva: '', codePopsy: '', label: '' }] },
        { type: JournalType.FINANCIER, defaultDate: "12/01/N", solution: [{ id: 's1', accountNumber: '5500', debit: '9680', credit: '', declTva: '', codePopsy: '', label: '' }, { id: 's2', accountNumber: '4000', credit: '9680', debit: '', declTva: '', codePopsy: '', label: '' }] }
    ]
  },
  // 6. Prestation
  {
    id: 6, title: "Ex 2 - Prestation Service", description: "Prestation de service avec RRR.",
    documents: [{ type: 'INVOICE', title: "Fac 510", content: { sender: { name: "OUTISUD" }, receiver: { name: "IMMO PLUS" }, details: { number: "510", date: "06/01/N" }, lines: [{ desc: "Prestation", total: "3000" }, { desc: "RRR 10%", total: "-300" }], totals: { toPay: "3267,00", totalVat: "567,00", totalExcl: "2700,00", bases: [{ rate: "21%", base: "2700", tax: "567" }] } } }],
    requiredJournals: [{ type: JournalType.VENTE, defaultDate: "06/01/N", solution: [{ id: 's1', accountNumber: '7070', credit: '2700', debit: '', declTva: '03', codePopsy: '21', label: '' }, { id: 's2', accountNumber: '4510', credit: '567', debit: '', declTva: '54', codePopsy: '', label: '' }, { id: 's3', accountNumber: '4000', debit: '3267', credit: '', declTva: '', codePopsy: '', label: '' }] }]
  },
  // 7. Achat Intra (CLEAN)
  {
    id: 7, title: "Ex 3 - Achat Intra-comm", description: "Acquisition intra-communautaire.",
    documents: [{ type: 'INVOICE', title: "Fac 1569", content: { sender: { name: "RENAULT FRANCE" }, receiver: { name: "OUTISUD" }, details: { number: "1569", date: "07/01/N" }, lines: [{ desc: "Produit B", total: "15000" }, { desc: "RRR", total: "-1500" }], totals: { toPay: "13500", totalVat: "0", totalExcl: "13500" } } }],
    requiredJournals: [{ type: JournalType.ACHAT, defaultDate: "07/01/N", solution: [{ id: 's1', accountNumber: '6040', debit: '13500', credit: '', declTva: '81', codePopsy: '21IM', label: '' }, { id: 's2', accountNumber: '4110', debit: '2835', credit: '', declTva: '59', codePopsy: '', label: '' }, { id: 's3', accountNumber: '4511', credit: '2835', debit: '', declTva: '55', codePopsy: '', label: '' }, { id: 's4', accountNumber: '4400', credit: '13500', debit: '', declTva: '', codePopsy: '', label: '' }] }]
  },
  // 8. Vente Intra (CLEAN)
  {
    id: 8, title: "Ex 4 - Vente Intra-comm", description: "Livraison intra-communautaire.",
    documents: [{ type: 'INVOICE', title: "Fac 550", content: { sender: { name: "OUTISUD" }, receiver: { name: "SPORT 2000 FR" }, details: { number: "550", date: "07/01/N" }, lines: [{ desc: "Produit B", total: "8500" }], totals: { toPay: "8500", totalVat: "0", totalExcl: "8500" } } }],
    requiredJournals: [{ type: JournalType.VENTE, defaultDate: "07/01/N", solution: [{ id: 's1', accountNumber: '7000', credit: '8500', debit: '', declTva: '46', codePopsy: 'I0', label: '' }, { id: 's2', accountNumber: '4000', debit: '8500', credit: '', declTva: '', codePopsy: '', label: '' }] }]
  },
  // 9. Import
  {
    id: 9, title: "Ex 5 - Importation", description: "Achat hors UE (Suisse).",
    documents: [{ type: 'INVOICE', title: "Fac 150", content: { sender: { name: "WATCHES CH" }, receiver: { name: "OUTISUD" }, details: { number: "150", date: "08/01/N" }, lines: [{ desc: "Produit B", total: "10000" }], totals: { toPay: "10000", totalVat: "0", totalExcl: "10000" } } }],
    requiredJournals: [{ type: JournalType.ACHAT, defaultDate: "08/01/N", solution: [{ id: 's1', accountNumber: '6040', debit: '10000', credit: '', declTva: '81', codePopsy: '21XM', label: '' }, { id: 's2', accountNumber: '4110', debit: '2100', credit: '', declTva: '59', codePopsy: '', label: '' }, { id: 's3', accountNumber: '4512', credit: '2100', debit: '', declTva: '57', codePopsy: '', label: '' }, { id: 's4', accountNumber: '4400', credit: '10000', debit: '', declTva: '', codePopsy: '', label: '' }] }]
  },
  // 10. Export
  {
    id: 10, title: "Ex 6 - Exportation", description: "Vente hors UE (Suisse).",
    documents: [{ type: 'INVOICE', title: "Fac 600", content: { sender: { name: "OUTISUD" }, receiver: { name: "CHOCOLATE CH" }, details: { number: "600", date: "09/01/N" }, lines: [{ desc: "Produit B", total: "12000" }], totals: { toPay: "12000", totalVat: "0", totalExcl: "12000" } } }],
    requiredJournals: [{ type: JournalType.VENTE, defaultDate: "09/01/N", solution: [{ id: 's1', accountNumber: '7000', credit: '12000', debit: '', declTva: '47', codePopsy: 'X0', label: '' }, { id: 's2', accountNumber: '4000', debit: '12000', credit: '', declTva: '', codePopsy: '', label: '' }] }]
  },
  // 11. Cocontractant Achat
  {
    id: 11, title: "Ex 7 - Achat Cocontractant", description: "Travaux immobiliers (Nettoyage).",
    documents: [{ type: 'INVOICE', title: "Fac 789", content: { sender: { name: "CLEAN PRO" }, receiver: { name: "OUTISUD" }, details: { number: "789", date: "10/01/N" }, lines: [{ desc: "Nettoyage", total: "1000" }], totals: { toPay: "1000", totalVat: "0", totalExcl: "1000" } } }],
    requiredJournals: [{ type: JournalType.ACHAT, defaultDate: "10/01/N", solution: [{ id: 's1', accountNumber: '6106', debit: '1000', credit: '', declTva: '82', codePopsy: '21CS', label: '' }, { id: 's2', accountNumber: '4110', debit: '210', credit: '', declTva: '59', codePopsy: '', label: '' }, { id: 's3', accountNumber: '4513', credit: '210', debit: '', declTva: '56', codePopsy: '', label: '' }, { id: 's4', accountNumber: '4400', credit: '1000', debit: '', declTva: '', codePopsy: '', label: '' }] }]
  },
  // 12. Cocontractant Vente
  {
    id: 12, title: "Ex 8 - Vente Cocontractant", description: "Travaux immobiliers fournis.",
    documents: [{ type: 'INVOICE', title: "Fac 620", content: { sender: { name: "OUTISUD" }, receiver: { name: "BUILD PRO" }, details: { number: "620", date: "11/01/N" }, lines: [{ desc: "Travaux", total: "3000" }], totals: { toPay: "3000", totalVat: "0", totalExcl: "3000" } } }],
    requiredJournals: [{ type: JournalType.VENTE, defaultDate: "11/01/N", solution: [{ id: 's1', accountNumber: '7070', credit: '3000', debit: '', declTva: '45', codePopsy: 'C0', label: '' }, { id: 's2', accountNumber: '4000', debit: '3000', credit: '', declTva: '', codePopsy: '', label: '' }] }]
  },
  // 13. NC Achat
  {
    id: 13, title: "Ex 9 - NC Achat", description: "Retour de marchandises.",
    documents: [{ type: 'INVOICE', title: "NC 30", content: { sender: { name: "IT WORLD" }, receiver: { name: "OUTISUD" }, details: { number: "NC 30", date: "12/01/N" }, lines: [{ desc: "Retour", total: "800" }], totals: { toPay: "968", totalVat: "168", totalExcl: "800", bases: [{ rate: "21%", base: "800", tax: "168" }] } } }],
    requiredJournals: [{ type: JournalType.ACHAT, defaultDate: "12/01/N", solution: [{ id: 's1', accountNumber: '6040', credit: '800', debit: '', declTva: '81(-)', codePopsy: '21M', label: '' }, { id: 's2', accountNumber: '4514', credit: '168', debit: '', declTva: '63', codePopsy: '', label: '' }, { id: 's3', accountNumber: '4400', debit: '968', credit: '', declTva: '', codePopsy: '', label: '' }] }]
  },
  // 14. NC Vente
  {
    id: 14, title: "Ex 10 - NC Vente", description: "Retour de marchandises client.",
    documents: [{ type: 'INVOICE', title: "NC 200", content: { sender: { name: "OUTISUD" }, receiver: { name: "GENERAL CONSTRUCTION" }, details: { number: "NC 200", date: "13/01/N" }, lines: [{ desc: "Retour", total: "1000" }], totals: { toPay: "1210", totalVat: "210", totalExcl: "1000", bases: [{ rate: "21%", base: "1000", tax: "210" }] } } }],
    requiredJournals: [{ type: JournalType.VENTE, defaultDate: "13/01/N", solution: [{ id: 's1', accountNumber: '7000', debit: '1000', credit: '', declTva: '49', codePopsy: '21', label: '' }, { id: 's2', accountNumber: '4114', debit: '210', credit: '', declTva: '64', codePopsy: '', label: '' }, { id: 's3', accountNumber: '4000', credit: '1210', debit: '', declTva: '', codePopsy: '', label: '' }] }]
  },
  // 15. NC Achat Remise
  {
    id: 15, title: "Ex 11 - NC Achat (Remise)", description: "Remise exceptionnelle obtenue.",
    documents: [{ type: 'INVOICE', title: "NOTE DE CREDIT N°40", content: { sender: { name: "IT WORLD" }, receiver: { name: "OUTISUD" }, details: { number: "NC 40", date: "14/01/N" }, lines: [{ desc: "Remise", total: "200" }], totals: { toPay: "242", totalVat: "42", totalExcl: "200", bases: [{ rate: "21%", base: "200", tax: "42" }] } } }],
    requiredJournals: [{ type: JournalType.ACHAT, defaultDate: "14/01/N", solution: [{ id: 's1', accountNumber: '6080', debit: '', credit: '200', declTva: '81(-)', codePopsy: '21M', label: '' }, { id: 's2', accountNumber: '4514', debit: '', credit: '42', declTva: '63', codePopsy: '', label: '' }, { id: 's3', accountNumber: '4400', debit: '242', credit: '', declTva: '', codePopsy: '', label: '' }] }]
  },
  // 16. NC Vente Remise
  {
    id: 16, title: "Ex 12 - NC Vente (Remise)", description: "Remise exceptionnelle accordée.",
    documents: [{ type: 'INVOICE', title: "NOTE DE CREDIT N°220", content: { sender: { name: "SPRL OUTISUD" }, receiver: { name: "GENERAL CONSTRUCTION" }, details: { number: "NC 220", date: "15/01/N" }, lines: [{ desc: "Remise", total: "500" }], totals: { toPay: "605", totalVat: "105", totalExcl: "500", bases: [{ rate: "21%", base: "500", tax: "105" }] } } }],
    requiredJournals: [{ type: JournalType.VENTE, defaultDate: "15/01/N", solution: [{ id: 's1', accountNumber: '7080', debit: '500', credit: '', declTva: '49', codePopsy: '21', label: '' }, { id: 's2', accountNumber: '4114', debit: '105', credit: '', declTva: '64', codePopsy: '', label: '' }, { id: 's3', accountNumber: '4000', debit: '', credit: '605', declTva: '', codePopsy: '', label: '' }] }]
  },
  // 17. NC Achat Emballage
  {
    id: 17, title: "Ex 13 - NC Achat (Emballage)", description: "Retour emballages consignés (Achat).",
    documents: [{ type: 'INVOICE', title: "NOTE DE CREDIT N°50", content: { sender: { name: "IT WORLD" }, receiver: { name: "OUTISUD" }, details: { number: "NC 50", date: "16/01/N" }, lines: [{ desc: "Emballage consignés", total: "120" }], totals: { toPay: "120", totalVat: "0", totalExcl: "120" } } }],
    requiredJournals: [{ type: JournalType.ACHAT, defaultDate: "16/01/N", solution: [{ id: 's1', accountNumber: '4050', debit: '', credit: '120', declTva: 'EX', codePopsy: '', label: '' }, { id: 's2', accountNumber: '4400', debit: '120', credit: '', declTva: '', codePopsy: '', label: '' }] }]
  },
  // 18. NC Vente Emballage
  {
    id: 18, title: "Ex 14 - NC Vente (Emballage)", description: "Retour emballages consignés (Vente).",
    documents: [{ type: 'INVOICE', title: "NOTE DE CREDIT N°260", content: { sender: { name: "SPRL OUTISUD" }, receiver: { name: "GENERAL CONSTRUCTION" }, details: { number: "NC 260", date: "17/01/N" }, lines: [{ desc: "Emballage consignés", total: "150" }], totals: { toPay: "150", totalVat: "0", totalExcl: "150" } } }],
    requiredJournals: [{ type: JournalType.VENTE, defaultDate: "17/01/N", solution: [{ id: 's1', accountNumber: '4450', debit: '150', credit: '', declTva: 'EX', codePopsy: '', label: '' }, { id: 's2', accountNumber: '4000', debit: '', credit: '150', declTva: '', codePopsy: '', label: '' }] }]
  },
  // 19. Achat Escompte
  {
    id: 19, title: "Ex 15 - Achat + Escompte", description: "Achat avec escompte 2% (conditionnel).",
    documents: [
      { type: 'INVOICE', title: "Facture 600", content: { sender: { name: "TECH STORE" }, receiver: { name: "OUTISUD" }, details: { number: "600", date: "18/01/N" }, lines: [{ desc: "Matériel", total: "2000" }], totals: { bases: [{ rate: "21%", base: "1960", tax: "411,60" }], totalExcl: "2000", totalVat: "411,60", toPay: "2411,60" } } },
      { type: 'NOTE', title: "Info", content: { text: "Paiement immédiat carte bancaire (escompte déduit)." } },
      { type: 'BANK_EXTRACT', title: "Extrait 7", content: { transactions: [{ date: "18/01", desc: "Paiement carte", amount: "-2371,60" }] } }
    ],
    requiredJournals: [
      { type: JournalType.ACHAT, defaultDate: "18/01/N", solution: [{ id: 's1', accountNumber: '6040', debit: '2000', credit: '', declTva: '81', codePopsy: '21M', label: '' }, { id: 's2', accountNumber: '4110', debit: '411,60', credit: '', declTva: '59', codePopsy: '', label: '' }, { id: 's3', accountNumber: '4400', credit: '2411,60', debit: '', declTva: '', codePopsy: '', label: '' }] },
      { type: JournalType.OD, defaultDate: "18/01/N", solution: [{ id: 's1', accountNumber: '4400', debit: '2411,60', credit: '', declTva: '', codePopsy: '', label: '' }, { id: 's2', accountNumber: '7560', credit: '40', debit: '', declTva: '', codePopsy: '', label: '' }, { id: 's3', accountNumber: '5501', credit: '2371,60', debit: '', declTva: '', codePopsy: '', label: '' }] },
      { type: JournalType.FINANCIER, defaultDate: "18/01/N", solution: [{ id: 's1', accountNumber: '5501', debit: '2371,60', credit: '', declTva: '', codePopsy: '', label: '' }, { id: 's2', accountNumber: '5500', credit: '2371,60', debit: '', declTva: '', codePopsy: '', label: '' }] }
    ]
  },
  // 20. Vente Escompte
  {
    id: 20, title: "Ex 16 - Vente + Escompte", description: "Vente avec escompte 2% (conditionnel).",
    documents: [
      { type: 'INVOICE', title: "Facture 150", content: { sender: { name: "OUTISUD" }, receiver: { name: "CLIENT PRO" }, details: { number: "150", date: "19/01/N" }, lines: [{ desc: "Marchandises", total: "3000" }], totals: { bases: [{ rate: "21%", base: "2940", tax: "617,40" }], totalExcl: "3000", totalVat: "617,40", toPay: "3617,40" } } },
      { type: 'BANK_EXTRACT', title: "Extrait 8", content: { transactions: [{ date: "19/01", desc: "Virement reçu", amount: "3557,40" }] } }
    ],
    requiredJournals: [
      { type: JournalType.VENTE, defaultDate: "19/01/N", solution: [{ id: 's1', accountNumber: '7000', credit: '3000', debit: '', declTva: '03', codePopsy: '21', label: '' }, { id: 's2', accountNumber: '4510', credit: '617,40', debit: '', declTva: '54', codePopsy: '', label: '' }, { id: 's3', accountNumber: '4000', debit: '3617,40', credit: '', declTva: '', codePopsy: '', label: '' }] },
      { type: JournalType.OD, defaultDate: "19/01/N", solution: [{ id: 's1', accountNumber: '4000', credit: '3617,40', debit: '', declTva: '', codePopsy: '', label: '' }, { id: 's2', accountNumber: '6530', debit: '60', credit: '', declTva: '', codePopsy: '', label: '' }, { id: 's3', accountNumber: '5500', debit: '3557,40', credit: '', declTva: '', codePopsy: '', label: '' }] }
    ]
  },
  // 21. Achat Escompte Ferme
  {
    id: 21, title: "Ex 17 - Achat Escompte Ferme", description: "Escompte ferme déduit sur facture.",
    documents: [{ type: 'INVOICE', title: "Facture 601", content: { sender: { name: "TECH STORE" }, receiver: { name: "OUTISUD" }, details: { number: "601", date: "20/01/N" }, lines: [{ desc: "Matériel", total: "3000" }, { desc: "Escompte Ferme", total: "-100" }], totals: { bases: [{ rate: "21%", base: "2900", tax: "609" }], totalExcl: "2900", totalVat: "609", toPay: "3509" } } }],
    requiredJournals: [{ type: JournalType.ACHAT, defaultDate: "20/01/N", solution: [{ id: 's1', accountNumber: '6040', debit: '3000', credit: '', declTva: '81', codePopsy: '21M', label: '' }, { id: 's2', accountNumber: '7560', credit: '100', debit: '', declTva: '81(-)', codePopsy: '21S', label: '' }, { id: 's3', accountNumber: '4110', debit: '609', credit: '', declTva: '59', codePopsy: '', label: '' }, { id: 's4', accountNumber: '4400', credit: '3509', debit: '', declTva: '', codePopsy: '', label: '' }] }]
  },
  // 22. Vente Escompte Ferme
  {
    id: 22, title: "Ex 18 - Vente Escompte Ferme", description: "Escompte ferme déduit sur facture.",
    documents: [{ type: 'INVOICE', title: "Facture 160", content: { sender: { name: "OUTISUD" }, receiver: { name: "CLIENT PRO" }, details: { number: "160", date: "21/01/N" }, lines: [{ desc: "Marchandises", total: "5000" }, { desc: "Escompte Ferme", total: "-200" }], totals: { bases: [{ rate: "21%", base: "4800", tax: "1008" }], totalExcl: "4800", totalVat: "1008", toPay: "5808" } } }],
    requiredJournals: [{ type: JournalType.VENTE, defaultDate: "21/01/N", solution: [{ id: 's1', accountNumber: '7000', credit: '5000', debit: '', declTva: '03', codePopsy: '21', label: '' }, { id: 's2', accountNumber: '6530', debit: '200', credit: '', declTva: '03(-)', codePopsy: '21', label: '' }, { id: 's3', accountNumber: '4510', credit: '1008', debit: '', declTva: '54', codePopsy: '', label: '' }, { id: 's4', accountNumber: '4000', debit: '5808', credit: '', declTva: '', codePopsy: '', label: '' }] }]
  },
  // 23. Achat Emballages
  {
    id: 23, title: "Ex 19 - Achat + Emballages", description: "Achat avec frais de transport et emballages consignés.",
    documents: [{ type: 'INVOICE', title: "Facture 700", content: { sender: { name: "LOGISTIX" }, receiver: { name: "OUTISUD" }, details: { number: "700", date: "22/01/N" }, lines: [{ desc: "Marchandises", total: "3000" }, { desc: "Transport", total: "200" }, { desc: "Consignes", total: "100" }], totals: { bases: [{ rate: "21%", base: "3200", tax: "672" }], totalExcl: "3300", totalVat: "672", toPay: "3972" } } }],
    requiredJournals: [{ type: JournalType.ACHAT, defaultDate: "22/01/N", solution: [{ id: 's1', accountNumber: '6040', debit: '3200', credit: '', declTva: '81', codePopsy: '21M', label: '' }, { id: 's2', accountNumber: '4050', debit: '100', credit: '', declTva: 'EX', codePopsy: '', label: '' }, { id: 's3', accountNumber: '4110', debit: '672', credit: '', declTva: '59', codePopsy: '', label: '' }, { id: 's4', accountNumber: '4400', credit: '3972', debit: '', declTva: '', codePopsy: '', label: '' }] }]
  },
  // 24. Vente Emballages
  {
    id: 24, title: "Ex 20 - Vente + Emballages", description: "Vente avec frais de transport et emballages consignés.",
    documents: [{ type: 'INVOICE', title: "Facture 170", content: { sender: { name: "OUTISUD" }, receiver: { name: "CLIENT LOCAL" }, details: { number: "170", date: "23/01/N" }, lines: [{ desc: "Marchandises", total: "6000" }, { desc: "Transport", total: "300" }, { desc: "Consignes", total: "150" }], totals: { bases: [{ rate: "21%", base: "6300", tax: "1323" }], totalExcl: "6450", totalVat: "1323", toPay: "7773" } } }],
    requiredJournals: [{ type: JournalType.VENTE, defaultDate: "23/01/N", solution: [{ id: 's1', accountNumber: '7000', credit: '6300', debit: '', declTva: '03', codePopsy: '21', label: '' }, { id: 's2', accountNumber: '4510', credit: '1323', debit: '', declTva: '54', codePopsy: '', label: '' }, { id: 's3', accountNumber: '4450', credit: '150', debit: '', declTva: 'EX', codePopsy: '', label: '' }, { id: 's4', accountNumber: '4000', debit: '7773', credit: '', declTva: '', codePopsy: '', label: '' }] }]
  },
  // 26. Achat Emballages Vendus (Ex 21)
  {
    id: 26, title: "Ex 21 - Achat Emballages Vendus", description: "Emballages comptés comme marchandise.",
    documents: [{ type: 'INVOICE', title: "Facture 702", content: { sender: { name: "PACK CO" }, receiver: { name: "OUTISUD" }, details: { number: "702", date: "24/01/N" }, lines: [{ desc: "Marchandises", total: "1100" }, { desc: "Emballages perdus", total: "50" }], totals: { bases: [{ rate: "21%", base: "1150", tax: "241,50" }], totalExcl: "1150", totalVat: "241,50", toPay: "1391,50" } } }],
    requiredJournals: [{ type: JournalType.ACHAT, defaultDate: "24/01/N", solution: [{ id: 's1', accountNumber: '6040', debit: '1150', credit: '', declTva: '81', codePopsy: '21M', label: '' }, { id: 's2', accountNumber: '4110', debit: '241,50', credit: '', declTva: '59', codePopsy: '', label: '' }, { id: 's3', accountNumber: '4400', credit: '1391,50', debit: '', declTva: '', codePopsy: '', label: '' }] }]
  },
  // 27. Vente Emballages Vendus (Ex 22)
  {
    id: 27, title: "Ex 22 - Vente Emballages Vendus", description: "Emballages facturés.",
    documents: [{ type: 'INVOICE', title: "Facture 180", content: { sender: { name: "OUTISUD" }, receiver: { name: "PETIT MAGASIN" }, details: { number: "180", date: "25/01/N" }, lines: [{ desc: "Marchandises", total: "850" }, { desc: "Emballages", total: "50" }], totals: { bases: [{ rate: "21%", base: "900", tax: "189" }], totalExcl: "900", totalVat: "189", toPay: "1089" } } }],
    requiredJournals: [{ type: JournalType.VENTE, defaultDate: "25/01/N", solution: [{ id: 's1', accountNumber: '7000', credit: '900', debit: '', declTva: '03', codePopsy: '21', label: '' }, { id: 's2', accountNumber: '4510', credit: '189', debit: '', declTva: '54', codePopsy: '', label: '' }, { id: 's3', accountNumber: '4000', debit: '1089', credit: '', declTva: '', codePopsy: '', label: '' }] }]
  },
  // 28. Achat Voiture (Ex 23)
  {
    id: 28, title: "Ex 23 - Achat Voiture", description: "Achat BMW Série 1. Déductibilité TVA 50%.",
    documents: [{ type: 'INVOICE', title: "Facture 999", content: { sender: { name: "GARAGE BMW" }, receiver: { name: "OUTISUD" }, details: { number: "999", date: "26/01/N" }, lines: [{ desc: "ACHAT BMW SERIE 1", total: "30000" }], totals: { bases: [{ rate: "21%", base: "30000", tax: "6300" }], totalExcl: "30000", totalVat: "6300", toPay: "36300" } } }],
    requiredJournals: [{ type: JournalType.ACHAT, defaultDate: "26/01/N", solution: [{ id: 's1', accountNumber: '2410', debit: '33150', credit: '', declTva: '83', codePopsy: '21ND', label: '' }, { id: 's2', accountNumber: '4110', debit: '3150', credit: '', declTva: '59', codePopsy: '', label: '' }, { id: 's3', accountNumber: '4400', credit: '36300', debit: '', declTva: '', codePopsy: '', label: '' }] }]
  },
  // 29. Entretien Voiture (Ex 24)
  {
    id: 29, title: "Ex 24 - Entretien Voiture", description: "Entretien BMW. Déductibilité TVA 50%.",
    documents: [{ type: 'INVOICE', title: "Facture 1000", content: { sender: { name: "GARAGE BMW" }, receiver: { name: "OUTISUD" }, details: { number: "1000", date: "27/01/N" }, lines: [{ desc: "Entretien", total: "800" }], totals: { bases: [{ rate: "21%", base: "800", tax: "168" }], totalExcl: "800", totalVat: "168", toPay: "968" } } }],
    requiredJournals: [{ type: JournalType.ACHAT, defaultDate: "27/01/N", solution: [{ id: 's1', accountNumber: '6108', debit: '884', credit: '', declTva: '82', codePopsy: '21ND', label: '' }, { id: 's2', accountNumber: '4110', debit: '84', credit: '', declTva: '59', codePopsy: '', label: '' }, { id: 's3', accountNumber: '4400', credit: '968', debit: '', declTva: '', codePopsy: '', label: '' }] }]
  },
  // 30. Vente Comptoir (Ex 26)
  {
    id: 30, title: "Ex 26 - Vente Comptoir", description: "Vente au comptoir (TVA 21%) 302,50€ TVAC.",
    documents: [{ type: 'NOTE', title: "Énoncé", content: { text: "Vous réalisez une vente le 28/01 au comptoir (TVA 21%) d'un montant de 302,50 € TVAC.\nLe client vous paie en liquide." } }],
    requiredJournals: [
      {
        type: JournalType.VENTE, defaultDate: "28/01/N",
        solution: [
          { id: 's1', accountNumber: '4000', debit: '302,50', credit: '', declTva: '', codePopsy: '', label: 'Client comptoir' },
          { id: 's2', accountNumber: '4510', credit: '52,50', debit: '', declTva: '54', codePopsy: '', label: '' },
          { id: 's3', accountNumber: '7000', credit: '250', debit: '', declTva: '03', codePopsy: '21', label: '' },
        ]
      },
      {
        type: JournalType.FINANCIER, defaultDate: "28/01/N",
        solution: [
          { id: 's1', accountNumber: '5700', debit: '302,50', credit: '', declTva: '', codePopsy: '', label: '' },
          { id: 's2', accountNumber: '4000', credit: '302,50', debit: '', declTva: '', codePopsy: '', label: '' },
        ]
      }
    ]
  },
  // 31. Achat Whisky (Ex 27)
  {
    id: 31, title: "Ex 27 - Achat Whisky", description: "Achat de whisky. TVA non déductible.",
    documents: [
      {
        type: 'INVOICE', title: "Facture 55",
        content: {
          sender: { name: "DRINK MARKET" }, receiver: { name: "OUTISUD" }, details: { number: "55", date: "29/01/N" },
          lines: [{ qty: 1, desc: "whisky", pu: "300", total: "300" }],
          totals: { bases: [{ rate: "21%", base: "300", tax: "63" }], totalExcl: "300", totalVat: "63", toPay: "363" }
        }
      }
    ],
    requiredJournals: [
      {
        type: JournalType.ACHAT, defaultDate: "29/01/N",
        solution: [
          { id: 's1', accountNumber: '6168', debit: '363', credit: '', declTva: '82', codePopsy: '21ND100S', label: '' },
          { id: 's2', accountNumber: '4400', credit: '363', debit: '', declTva: '', codePopsy: '', label: '' },
        ]
      }
    ]
  },
  // 32. Loyer (Ex 28)
  {
    id: 32, title: "Ex 28 - Loyer", description: "Paiement du loyer.",
    documents: [
      {
        type: 'BANK_EXTRACT', title: "Extrait n°396",
        content: {
          account: "068-4567890-02", prevDate: "29/01/N", prevBalance: "1.530",
          transactions: [{ date: "30/01/N", desc: "Loyer du bâtiment", amount: "-1.200" }],
          newDate: "31/01/N", newBalance: "330"
        }
      }
    ],
    requiredJournals: [
      {
        type: JournalType.FINANCIER, defaultDate: "30/01/N",
        solution: [
          { id: 's1', accountNumber: '6101', debit: '1200', credit: '', declTva: '', codePopsy: '', label: '' },
          { id: 's2', accountNumber: '5500', credit: '1200', debit: '', declTva: '', codePopsy: '', label: '' },
        ]
      }
    ]
  },
  // ADDED FAKE EXERCISES TO REACH 31 DISTINCT LEVELS IF NEEDED OR REUSE LOGIC
  // Since we have ~28 real scenarios + variants, let's ensure we have 31 distinct items in the array.
  // The provided list is around 30. I will duplicate simple ones with different numbers/names to reach 31 if strictly needed.
  // Based on your last request, I provided ~32 items. Removing Ex 25 leaves 31.
  // The array above has 31 items (Ex 1 to 32, excluding Ex 25).
];
