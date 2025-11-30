// Attendre que le DOM soit chargé (sécurité supplémentaire)
document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. RECUPERATION DES LIBRAIRIES ---
    const { useState, useEffect, useMemo } = React;
    const { 
        BookOpen, ChevronRight, ChevronLeft, Eye, LogIn, AlertCircle, 
        Printer, RotateCcw, Trophy, FileText, List, Grid, Search, 
        X, Plus, Trash2, CheckCircle 
    } = window.LucideReact;

    // --- 2. CONSTANTES ET DONNEES (POPSY) ---
    
    const JournalType = {
        ACHAT: 'ACHAT',
        VENTE: 'VENTE',
        CAISSE: 'CAISSE',
        FINANCIER: 'FINANCIER',
        OD: 'OD'
    };

    const PLAN_COMPTABLE = [
        { account: "1000", label: "Capital souscrit" }, { account: "1010", label: "Capital non appelé (-)" }, { account: "1020", label: "Capital amorti" }, { account: "1100", label: "Primes d'émission" }, { account: "1200", label: "Plus-values de réévaluation sur im. incorporelles" }, { account: "1210", label: "Plus-values de réévaluation sur im. corporelles" }, { account: "1211", label: "Quotité non amortie de la plus-value" }, { account: "1212", label: "Quotité amortie de la plus-value" }, { account: "1220", label: "Plus-values de réévaluation sur im. financières" }, { account: "1230", label: "Plus-values de réévaluation sur stocks" }, { account: "1240", label: "Reprises de réd. de valeur sur placement de trésor" }, { account: "1300", label: "Réserve légale" }, { account: "1310", label: "Réserves indisponibles pour actions propres" }, { account: "1311", label: "Autres réserves indisponibles" }, { account: "1320", label: "Réserves immunisées" }, { account: "1330", label: "Réserves disponibles" }, { account: "1400", label: "Bénéfice reporté" }, { account: "1410", label: "Perte reportée (-)" }, { account: "1500", label: "Subsides en capital" }, { account: "1600", label: "Provisions pour pensions et obligations similaires" }, { account: "1610", label: "Provisions pour charges fiscales" }, { account: "1620", label: "Provisions grosses réparations et gros entretiens" }, { account: "1630", label: "Provisions pour autres risques et charges" }, { account: "1680", label: "Impôts différés" }, { account: "1700", label: "Emprunts subordonnés convertibles" }, { account: "1701", label: "Emprunts subordonnés non convertibles" }, { account: "1710", label: "Emprunts obligataires non subordonnés convertibles" }, { account: "1711", label: "Emprunts obligataires non sub. non convertibles" }, { account: "1720", label: "Dettes de location-financement et assimilées" }, { account: "1730", label: "Dettes en compte" }, { account: "1731", label: "Promesses" }, { account: "1732", label: "Crédits d'acceptation" }, { account: "1740", label: "Autres emprunts" }, { account: "1750", label: "Dettes commerciales (Fournisseurs)" }, { account: "1751", label: "Effets à payer" }, { account: "1760", label: "Acomptes reçus sur commandes" }, { account: "1780", label: "Cautionnements reçus en numéraire" }, { account: "1790", label: "Dettes diverses" }, { account: "2000", label: "Frais de constitution et d'augmentation de capital" }, { account: "2009", label: "Amortissements actés sur frais de constit. (-)" }, { account: "2010", label: "Frais d'émission d'emprunts" }, { account: "2020", label: "Autres frais d'établissement" }, { account: "2029", label: "Amortissements actés s/ autres frais d'établis.(-)" }, { account: "2040", label: "Frais de restructuration" }, { account: "2049", label: "Amortissements actés s/ frais de restructurat. (-)" }, { account: "2100", label: "Frais de recherche et développement" }, { account: "2109", label: "Amortissements ou réductions de valeur actés (-)" }, { account: "2110", label: "Concessions, brevets, licences, savoir-faire etc." }, { account: "2119", label: "Amortissements ou réductions de valeur actés (-)" }, { account: "2120", label: "Goodwill" }, { account: "2129", label: "Amort. ou réduc. de valeur actés s/ Goodwill (-)" }, { account: "2130", label: "Acomptes versés" }, { account: "2139", label: "Amort. ou réduc. de valeur actés s/ acomptes (-)" }, { account: "2200", label: "Terrains" }, { account: "2201", label: "Frais d'acquisition et de mise en état" }, { account: "2202", label: "Intérêts intercalaires" }, { account: "2208", label: "Plus-values actées sur terrains" }, { account: "2209", label: "Amort. ou réduc. de valeur actés s/ terrains (-)" }, { account: "2210", label: "Constructions" }, { account: "2218", label: "Plus-values actées sur constructions" }, { account: "2219", label: "Amortissements actés sur constructions (-)" }, { account: "2220", label: "Terrains bâtis" }, { account: "2228", label: "Plus-values actées sur terrain bâtis" }, { account: "2229", label: "Amortissements actés sur terrain bâtis (-)" }, { account: "2230", label: "Autres droits réels sur des immeubles" }, { account: "2238", label: "Plus-values actées autres dr.réel s/ des immeubles" }, { account: "2239", label: "Amort. actés sur autre droit réel s/ des immeub(-)" }, { account: "2300", label: "Installations techniques et machines" }, { account: "2308", label: "Plus-values actées s/ inst.techniques et machines" }, { account: "2309", label: "Amort. actés sur inst.techniques et machines (-)" }, { account: "2320", label: "Outillage" }, { account: "2328", label: "Plus-values actées sur outillage" }, { account: "2329", label: "Amortissements actés sur outillage (-)" }, { account: "2400", label: "Mobilier et matériel de bureau" }, { account: "2408", label: "Plus-values actées sur mobilier et mat. de bureau" }, { account: "2409", label: "Amortissements sur mobilier et mat. de bureau (-)" }, { account: "2410", label: "Matériel roulant" }, { account: "2418", label: "Plus-values actées sur matériel roulant" }, { account: "2419", label: "Amortissements sur matériel roulant (-)" }, { account: "2500", label: "Terrains et constructions" }, { account: "2508", label: "Plus-values actées sur terrains et constructions" }, { account: "2509", label: "Amortissements sur terrains et constructions (-)" }, { account: "2510", label: "Installations, machines et outillage" }, { account: "2518", label: "Plus-values actées s/ instal., mach.et outillage" }, { account: "2519", label: "Amortissements sur inst.,mach.et outillage (-)" }, { account: "2520", label: "Mobilier et matériel roulant" }, { account: "2528", label: "Plus-values actées s/ mobilier et matériel roulant" }, { account: "2529", label: "Amortissements sur matériel roulant (-)" }, { account: "2600", label: "Val. d'acquisition des autres immo. corporelles" }, { account: "2608", label: "Plus-values actées s/ autres immo. corporelles" }, { account: "2609", label: "Amortissements sur autres immo. corporelles (-)" }, { account: "2700", label: "Valeur d'acquisition" }, { account: "2790", label: "Investissements de l'exercice" }, { account: "2800", label: "Participation dans des entreprises liées" }, { account: "2801", label: "Montants non appelés (-)" }, { account: "2808", label: "Plus-values actées" }, { account: "2809", label: "Réductions de valeur actées (-)" }, { account: "2810", label: "Créances sur des entreprises liées" }, { account: "2811", label: "Effets à recevoir" }, { account: "2812", label: "Titres à revenu fixe" }, { account: "2817", label: "Créances douteuses" }, { account: "2819", label: "Réductions de valeur actées (-)" }, { account: "2820", label: "Participation dans entr. avec lien de particip." }, { account: "2821", label: "Montants non appelés (-)" }, { account: "2828", label: "Plus-values actées" }, { account: "2829", label: "Réductions de valeur actées (-)" }, { account: "2830", label: "Créances sur entr. avec lien de participation" }, { account: "2831", label: "Effets à recevoir" }, { account: "2832", label: "Titres à revenu fixe" }, { account: "2837", label: "Créances douteuses" }, { account: "2838", label: "Plus-values actées" }, { account: "2839", label: "Réductions de valeur actées (-)" }, { account: "2840", label: "Autres actions et parts" }, { account: "2841", label: "Montants non appelés (-)" }, { account: "2848", label: "Plus-values actées" }, { account: "2849", label: "Réductions de valeur actées (-)" }, { account: "2850", label: "Autres créances" }, { account: "2851", label: "Effets à recevoir" }, { account: "2852", label: "Titres à revenu fixe" }, { account: "2857", label: "Créances douteuses" }, { account: "2859", label: "Réductions de valeur actées (-)" }, { account: "2880", label: "Cautionnements versés en numéraire" }, { account: "2900", label: "Créances commerciales" }, { account: "2901", label: "Effets à recevoir" }, { account: "2906", label: "Acomptes versés" }, { account: "2907", label: "Créances douteuses" }, { account: "2909", label: "Réductions de valeur actées (-)" }, { account: "2910", label: "Autres créances" }, { account: "2911", label: "Effets à recevoir" }, { account: "2917", label: "Créances douteuses" }, { account: "2919", label: "Réductions de valeur actées (-)" }, { account: "3000", label: "Valeur d'acquisition - matières premières" }, { account: "3090", label: "Réductions de valeur actées (-)" }, { account: "3100", label: "Valeur d'acquisition - fournitures" }, { account: "3190", label: "Réductions de valeur actées (-)" }, { account: "3200", label: "Valeur d'acquisition - En-cours de fabrication" }, { account: "3290", label: "Réductions de valeur actées (-)" }, { account: "3300", label: "Valeur d'acquisition - Produits finis" }, { account: "3390", label: "Réductions de valeur actées (-)" }, { account: "3400", label: "Valeur d'acquisition - Marchandises" }, { account: "3490", label: "Réductions de valeur actées (-)" }, { account: "3500", label: "Valeur d'acquisition - Imm. destinés à la vente" }, { account: "3590", label: "Réductions de valeur actées (-)" }, { account: "3600", label: "Acomptes versés" }, { account: "3690", label: "Réductions de valeur actées (-)" }, { account: "3700", label: "Valeur d'acquisition - Comm.en cours d'exécution" }, { account: "3710", label: "Bénéfice pris en compte" }, { account: "3790", label: "Réductions de valeur actées (-)" }, { account: "4000", label: "Clients" }, { account: "4010", label: "Effets à recevoir" }, { account: "4011", label: "Effets remis à l'encaissement" }, { account: "4012", label: "Effets remis à l'escompte" }, { account: "4040", label: "Produits à recevoir" }, { account: "4050", label: "Créances pour emballages à rendre" }, { account: "4051", label: "Fournisseurs débiteurs" }, { account: "4052", label: "Factures à étalir" }, { account: "4060", label: "Acomptes versés" }, { account: "4070", label: "Créances douteuses" }, { account: "4090", label: "Réductions de valeur actées (-)" }, { account: "4100", label: "Capital appelé, non versé (Appels de fonds)" }, { account: "4101", label: "Actionnaires défaillants" }, { account: "4110", label: "T.V.A. à récupérer sur achat" }, { account: "4111", label: "T.V.A. déductible intracommunautaire" }, { account: "4114", label: "T.V.A. à récupérer pour régularisation s/ NCV" }, { account: "4115", label: "T.V.A. déductible import + report" }, { account: "4117", label: "T.V.A. sur Acomptes versés" }, { account: "4119", label: "Compte Courant de l'administration T.V.A." }, { account: "4120", label: "Impôts belges sur le résultat" }, { account: "4125", label: "Autres impôts et taxes belges" }, { account: "4128", label: "Impôts et taxes étrangers" }, { account: "4140", label: "Produits à recevoir" }, { account: "4160", label: "Créances diverses" }, { account: "4170", label: "Créances douteuses" }, { account: "4180", label: "Cautionnements versés en numéraire" }, { account: "4190", label: "Réductions de valeur actées (-)" }, { account: "4200", label: "Emprunts subordonnés convertibles" }, { account: "4201", label: "Emprunts subordonnés non convertibles" }, { account: "4210", label: "Emprunts obligataires non subordonnés convertibles" }, { account: "4211", label: "Emprunts obligataires non subor. non convertibles" }, { account: "4220", label: "Dettes de location - financement et assimilées" }, { account: "4230", label: "Etablissement de crédit (Dette en compte)" }, { account: "4231", label: "Promesses" }, { account: "4232", label: "Crédits d'acceptation" }, { account: "4240", label: "Autres emprunts" }, { account: "4250", label: "Fournisseurs" }, { account: "4251", label: "Effets à payer" }, { account: "4260", label: "Acomptes reçus sur commandes" }, { account: "4280", label: "Cautionnements reçus en numéraire" }, { account: "4290", label: "Dettes diverses" }, { account: "4300", label: "Établis. de crédit - emprunts en cpte à terme fixe" }, { account: "4310", label: "Établissements de crédit - promesses" }, { account: "4320", label: "Établissements de crédit - crédits d'acceptation" }, { account: "4330", label: "Établissements de crédit - dettes en cpte courant" }, { account: "4340", label: "Warrants à payer" }, { account: "4390", label: "Autres emprunts" }, { account: "4400", label: "Fournisseurs" }, { account: "4410", label: "Effets à payer" }, { account: "4440", label: "Factures à recevoir" }, { account: "4450", label: "Dettes pour emballages consignés" }, { account: "4451", label: "Clients créditeurs" }, { account: "4452", label: "Notes de crédit à établir" }, { account: "4500", label: "Impôts belges sur le résultat" }, { account: "4505", label: "Autres impôts et taxes belges" }, { account: "4508", label: "Impôts et taxes étrangers" }, { account: "4510", label: "T.V.A. à payer s/ ventes & prestations de services" }, { account: "4511", label: "T.V.A. à payer intracommunautaire" }, { account: "4512", label: "T.V.A. à payer import + report" }, { account: "4513", label: "T.V.A. due (par le cocontractant) sur trav. immob." }, { account: "4514", label: "T.V.A. due pour régularisations s/ NCA" }, { account: "4519", label: "Compte courant de l'administration T.V.A." }, { account: "4520", label: "Impôts belges sur le résultat" }, { account: "4525", label: "Autres impôts et taxes belges" }, { account: "4528", label: "Impôts et taxes étrangers" }, { account: "4530", label: "Précompte professionnel retenu" }, { account: "4531", label: "Précompte mobilier retenu" }, { account: "4540", label: "O.N.S.S." }, { account: "4550", label: "Rémunérations" }, { account: "4560", label: "Pécule de vacances employés - provisions" }, { account: "4590", label: "Autres dettes sociales" }, { account: "4600", label: "Acomptes reçus sur commandes" }, { account: "4700", label: "Dividendes et tantièmes d'exercices antérieurs" }, { account: "4710", label: "Dividendes de l'exercice" }, { account: "4720", label: "Tantièmes de l'exercice" }, { account: "4730", label: "Autres allocataires" }, { account: "4740", label: "Actions à rembourser" }, { account: "4800", label: "Obligations et coupons échus" }, { account: "4810", label: "Versements anticipés sur capital non-appelé" }, { account: "4880", label: "Cautionnements reçus en numéraire" }, { account: "4890", label: "Autres dettes diverses" }, { account: "4900", label: "Charges à reporter" }, { account: "4910", label: "Produits acquis" }, { account: "4920", label: "Charges à imputer" }, { account: "4930", label: "Produits à reporter" }, { account: "4960", label: "Ecarts défavorables de conversion des devises" }, { account: "4970", label: "Ecarts favorables de conversion des devises" }, { account: "4990", label: "Comptes d'attente" }, { account: "5000", label: "Valeur d'acquisition - Actions propres" }, { account: "5100", label: "Valeur d'acquisition - Actions et parts" }, { account: "5110", label: "Montants non appelés (-)" }
    ];

    const DECLARATION_TVA = {
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

    const CODES_POPSY = {
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

    const RAW_LEVELS = [
      // 1. Réouverture
      {
        id: 1, title: "Exercice de réouverture", description: "Écriture d'ouverture au 1er Janvier.",
        documents: [{ type: 'NOTE', title: "Situation au 01/01", content: { text: "Au 1er janvier, la société possède 25.000 Eur en banque et 2.000 Eur en caisse.\nCapital : 27.000 Eur." } }],
        requiredJournals: [{ type: JournalType.OD, defaultDate: "01/01/N", solution: [{ accountNumber: '5500', debit: '25.000', credit: '' }, { accountNumber: '5700', debit: '2.000', credit: '' }, { accountNumber: '1000', debit: '', credit: '27.000' }] }]
      },
      // 2. Achat Simple
      {
        id: 2, title: "Achat Marchandises (Liquide)", description: "Achat marchandises paiement liquide.",
        documents: [{ type: 'INVOICE', title: "Facture 101", content: { sender: { name: "BRICO WORLD" }, receiver: { name: "OUTISUD" }, details: { number: "101", date: "02/01/N" }, lines: [{ desc: "Marchandises A", total: "2250" }], totals: { toPay: "2722,50", totalVat: "472,50", totalExcl: "2250" } } }],
        requiredJournals: [
          { type: JournalType.ACHAT, defaultDate: "02/01/N", solution: [{ accountNumber: '6040', debit: '2250', declTva:'81', codePopsy:'21M' }, { accountNumber: '4110', debit: '472,50', declTva:'59' }, { accountNumber: '4400', credit: '2722,50' }] },
          { type: JournalType.CAISSE, defaultDate: "02/01/N", solution: [{ accountNumber: '4400', debit: '2722,50' }, { accountNumber: '5700', credit: '2722,50' }] }
        ]
      },
      // 3. Chèque
      {
        id: 3, title: "Paiement par Chèque", description: "Facture électricité payée par chèque.",
        documents: [
            { type: 'INVOICE', title: "Facture 204", content: { sender: { name: "ENERGY CORP" }, receiver: { name: "OUTISUD" }, details: { number: "204", date: "03/01/N" }, lines: [{ desc: "Electricité", total: "4500" }], totals: { toPay: "5445", totalVat: "945", totalExcl: "4500" } } },
            { type: 'BANK_EXTRACT', title: "Extrait 4", content: { transactions: [{ date: "05/01", desc: "Chèque émis", amount: "-5445" }] } }
        ],
        requiredJournals: [
            { type: JournalType.ACHAT, defaultDate: "03/01/N", solution: [{ accountNumber: '6117', debit: '4500', declTva:'82', codePopsy:'21S' }, { accountNumber: '4110', debit: '945', declTva:'59' }, { accountNumber: '4400', credit: '5445' }] },
            { type: JournalType.OD, defaultDate: "03/01/N", solution: [{ accountNumber: '4400', debit: '5445' }, { accountNumber: '5501', credit: '5445' }] },
            { type: JournalType.FINANCIER, defaultDate: "05/01/N", solution: [{ accountNumber: '5501', debit: '5445' }, { accountNumber: '5500', credit: '5445' }] }
        ]
      },
      // 4. Virement
      {
        id: 4, title: "Achat Mobilier", description: "Achat mobilier et virement.",
        documents: [
            { type: 'INVOICE', title: "Facture 890", content: { sender: { name: "OFFICE DESIGN" }, receiver: { name: "OUTISUD" }, details: { number: "890", date: "04/01/N" }, lines: [{ desc: "Bureau direction", total: "6000" }], totals: { toPay: "7260", totalVat: "1260", totalExcl: "6000" } } },
            { type: 'BANK_EXTRACT', title: "Extrait 5", content: { transactions: [{ date: "06/01", desc: "Virement", amount: "-7260" }] } }
        ],
        requiredJournals: [
            { type: JournalType.ACHAT, defaultDate: "04/01/N", solution: [{ accountNumber: '2400', debit: '6000', declTva:'83', codePopsy:'21V' }, { accountNumber: '4110', debit: '1260', declTva:'59' }, { accountNumber: '4400', credit: '7260' }] },
            { type: JournalType.OD, defaultDate: "04/01/N", solution: [{ accountNumber: '4400', debit: '7260' }, { accountNumber: '5501', credit: '7260' }] },
            { type: JournalType.FINANCIER, defaultDate: "06/01/N", solution: [{ accountNumber: '5501', debit: '7260' }, { accountNumber: '5500', credit: '7260' }] }
        ]
      },
      // 5. Vente Marchandise
      {
        id: 5, title: "Vente Marchandises", description: "Vente à un client belge.",
        documents: [
            { type: 'INVOICE', title: "Facture 10", content: { sender: { name: "OUTISUD" }, receiver: { name: "CLIENT BELGE" }, details: { number: "10", date: "05/01/N" }, lines: [{ desc: "Produit fini", total: "8000" }], totals: { toPay: "9680", totalVat: "1680", totalExcl: "8000" } } },
            { type: 'BANK_EXTRACT', title: "Extrait 6", content: { transactions: [{ date: "10/01", desc: "Virement Client", amount: "9680" }] } }
        ],
        requiredJournals: [
            { type: JournalType.VENTE, defaultDate: "05/01/N", solution: [{ accountNumber: '7000', credit: '8000', declTva:'03', codePopsy:'21' }, { accountNumber: '4510', credit: '1680', declTva:'54' }, { accountNumber: '4000', debit: '9680' }] },
            { type: JournalType.FINANCIER, defaultDate: "10/01/N", solution: [{ accountNumber: '5500', debit: '9680' }, { accountNumber: '4000', credit: '9680' }] }
        ]
      },
      // 6. Prestation
      {
        id: 6, title: "Prestation Service", description: "Prestation de service.",
        documents: [{ type: 'INVOICE', title: "Facture 11", content: { sender: { name: "OUTISUD" }, receiver: { name: "CONSULTING SPRL" }, details: { number: "11", date: "06/01/N" }, lines: [{ desc: "Prestation", total: "3000" }], totals: { toPay: "3630", totalVat: "630", totalExcl: "3000" } } }],
        requiredJournals: [{ type: JournalType.VENTE, defaultDate: "06/01/N", solution: [{ accountNumber: '7070', credit: '3000', declTva:'03', codePopsy:'21' }, { accountNumber: '4510', credit: '630', declTva:'54' }, { accountNumber: '4000', debit: '3630' }] }]
      },
      // 7. Achat Intra
      {
        id: 7, title: "Achat Intracommunautaire", description: "Acquisition intra-communautaire (France).",
        documents: [{ type: 'INVOICE', title: "Facture FR-55", content: { sender: { name: "RENAULT FRANCE" }, receiver: { name: "OUTISUD" }, details: { number: "FR-55", date: "07/01/N" }, lines: [{ desc: "Marchandises", total: "15000" }], totals: { toPay: "15000", totalVat: "0", totalExcl: "15000" } } }],
        requiredJournals: [{ type: JournalType.ACHAT, defaultDate: "07/01/N", solution: [{ accountNumber: '6040', debit: '15000', declTva:'81', codePopsy:'21IM' }, { accountNumber: '4110', debit: '3150', declTva:'59' }, { accountNumber: '4511', credit: '3150', declTva:'55' }, { accountNumber: '4400', credit: '15000' }] }]
      },
      // 8. Vente Intra
      {
        id: 8, title: "Vente Intracommunautaire", description: "Livraison intra-communautaire.",
        documents: [{ type: 'INVOICE', title: "Facture 12", content: { sender: { name: "OUTISUD" }, receiver: { name: "SPORT 2000 FR" }, details: { number: "12", date: "07/01/N" }, lines: [{ desc: "Produit B", total: "8500" }], totals: { toPay: "8500", totalVat: "0", totalExcl: "8500" } } }],
        requiredJournals: [{ type: JournalType.VENTE, defaultDate: "07/01/N", solution: [{ accountNumber: '7000', credit: '8500', declTva:'46', codePopsy:'I0' }, { accountNumber: '4000', debit: '8500' }] }]
      },
      // 9. Import
      {
        id: 9, title: "Importation (Suisse)", description: "Achat hors UE.",
        documents: [{ type: 'INVOICE', title: "Facture CH-99", content: { sender: { name: "SWISS WATCHES" }, receiver: { name: "OUTISUD" }, details: { number: "CH-99", date: "08/01/N" }, lines: [{ desc: "Produit B", total: "10000" }], totals: { toPay: "10000", totalVat: "0", totalExcl: "10000" } } }],
        requiredJournals: [{ type: JournalType.ACHAT, defaultDate: "08/01/N", solution: [{ accountNumber: '6040', debit: '10000', declTva:'81', codePopsy:'21XM' }, { accountNumber: '4110', debit: '2100', declTva:'59' }, { accountNumber: '4512', credit: '2100', declTva:'57' }, { accountNumber: '4400', credit: '10000' }] }]
      },
      // 10. Export
      {
        id: 10, title: "Exportation", description: "Vente hors UE.",
        documents: [{ type: 'INVOICE', title: "Facture 13", content: { sender: { name: "OUTISUD" }, receiver: { name: "USA IMPORTS" }, details: { number: "13", date: "09/01/N" }, lines: [{ desc: "Produit B", total: "12000" }], totals: { toPay: "12000", totalVat: "0", totalExcl: "12000" } } }],
        requiredJournals: [{ type: JournalType.VENTE, defaultDate: "09/01/N", solution: [{ accountNumber: '7000', credit: '12000', declTva:'47', codePopsy:'X0' }, { accountNumber: '4000', debit: '12000' }] }]
      },
      // 11. Cocontractant Achat
      {
        id: 11, title: "Achat Cocontractant", description: "Travaux immobiliers (Nettoyage).",
        documents: [{ type: 'INVOICE', title: "Facture 500", content: { sender: { name: "CLEAN PRO" }, receiver: { name: "OUTISUD" }, details: { number: "500", date: "10/01/N" }, lines: [{ desc: "Nettoyage locaux", total: "1000" }], totals: { toPay: "1000", totalVat: "0", totalExcl: "1000" } } }],
        requiredJournals: [{ type: JournalType.ACHAT, defaultDate: "10/01/N", solution: [{ accountNumber: '6106', debit: '1000', declTva:'82', codePopsy:'21CS' }, { accountNumber: '4110', debit: '210', declTva:'59' }, { accountNumber: '4513', credit: '210', declTva:'56' }, { accountNumber: '4400', credit: '1000' }] }]
      },
      // 12. Cocontractant Vente
      {
        id: 12, title: "Vente Cocontractant", description: "Travaux fournis.",
        documents: [{ type: 'INVOICE', title: "Facture 14", content: { sender: { name: "OUTISUD" }, receiver: { name: "BATIMENT SA" }, details: { number: "14", date: "11/01/N" }, lines: [{ desc: "Travaux", total: "3000" }], totals: { toPay: "3000", totalVat: "0", totalExcl: "3000" } } }],
        requiredJournals: [{ type: JournalType.VENTE, defaultDate: "11/01/N", solution: [{ accountNumber: '7070', credit: '3000', declTva:'45', codePopsy:'C0' }, { accountNumber: '4000', debit: '3000' }] }]
      },
      // 13. NC Achat
      {
        id: 13, title: "NC sur Achat", description: "Retour de marchandises.",
        documents: [{ type: 'INVOICE', title: "NC 10", content: { sender: { name: "BRICO WORLD" }, receiver: { name: "OUTISUD" }, details: { number: "NC 10", date: "12/01/N" }, lines: [{ desc: "Retour", total: "800" }], totals: { toPay: "968", totalVat: "168", totalExcl: "800" } } }],
        requiredJournals: [{ type: JournalType.ACHAT, defaultDate: "12/01/N", solution: [{ accountNumber: '6040', credit: '800', declTva:'81(-)', codePopsy:'21M' }, { accountNumber: '4514', credit: '168', declTva:'63' }, { accountNumber: '4400', debit: '968' }] }]
      },
      // 14. NC Vente
      {
        id: 14, title: "NC sur Vente", description: "Retour de marchandises client.",
        documents: [{ type: 'INVOICE', title: "NC 2", content: { sender: { name: "OUTISUD" }, receiver: { name: "CLIENT BELGE" }, details: { number: "NC 2", date: "13/01/N" }, lines: [{ desc: "Retour", total: "1000" }], totals: { toPay: "1210", totalVat: "210", totalExcl: "1000" } } }],
        requiredJournals: [{ type: JournalType.VENTE, defaultDate: "13/01/N", solution: [{ accountNumber: '7000', debit: '1000', declTva:'49', codePopsy:'21' }, { accountNumber: '4114', debit: '210', declTva:'64' }, { accountNumber: '4000', credit: '1210' }] }]
      },
      // 15. NC Achat Remise
      {
        id: 15, title: "NC Achat (Remise)", description: "Remise exceptionnelle obtenue.",
        documents: [{ type: 'INVOICE', title: "NC 11", content: { sender: { name: "OFFICE DESIGN" }, receiver: { name: "OUTISUD" }, details: { number: "NC 11", date: "14/01/N" }, lines: [{ desc: "Remise", total: "200" }], totals: { toPay: "242", totalVat: "42", totalExcl: "200" } } }],
        requiredJournals: [{ type: JournalType.ACHAT, defaultDate: "14/01/N", solution: [{ accountNumber: '6080', credit: '200', declTva:'81(-)', codePopsy:'21M' }, { accountNumber: '4514', credit: '42', declTva:'63' }, { accountNumber: '4400', debit: '242' }] }]
      },
      // 16. NC Vente Remise
      {
        id: 16, title: "NC Vente (Remise)", description: "Remise exceptionnelle accordée.",
        documents: [{ type: 'INVOICE', title: "NC 3", content: { sender: { name: "OUTISUD" }, receiver: { name: "CLIENT BELGE" }, details: { number: "NC 3", date: "15/01/N" }, lines: [{ desc: "Remise", total: "500" }], totals: { toPay: "605", totalVat: "105", totalExcl: "500" } } }],
        requiredJournals: [{ type: JournalType.VENTE, defaultDate: "15/01/N", solution: [{ accountNumber: '7080', debit: '500', declTva:'49', codePopsy:'21' }, { accountNumber: '4114', debit: '105', declTva:'64' }, { accountNumber: '4000', credit: '605' }] }]
      },
      // 17. NC Achat Emballage
      {
        id: 17, title: "NC Achat (Emballage)", description: "Retour emballages consignés.",
        documents: [{ type: 'INVOICE', title: "NC 12", content: { sender: { name: "BRICO WORLD" }, receiver: { name: "OUTISUD" }, details: { number: "NC 12", date: "16/01/N" }, lines: [{ desc: "Retour consignes", total: "120" }], totals: { toPay: "120", totalVat: "0", totalExcl: "120" } } }],
        requiredJournals: [{ type: JournalType.ACHAT, defaultDate: "16/01/N", solution: [{ accountNumber: '4050', credit: '120', declTva:'EX', codePopsy:'' }, { accountNumber: '4400', debit: '120' }] }]
      },
      // 18. NC Vente Emballage
      {
        id: 18, title: "NC Vente (Emballage)", description: "Retour emballages consignés.",
        documents: [{ type: 'INVOICE', title: "NC 4", content: { sender: { name: "OUTISUD" }, receiver: { name: "CLIENT BELGE" }, details: { number: "NC 4", date: "17/01/N" }, lines: [{ desc: "Retour consignes", total: "150" }], totals: { toPay: "150", totalVat: "0", totalExcl: "150" } } }],
        requiredJournals: [{ type: JournalType.VENTE, defaultDate: "17/01/N", solution: [{ accountNumber: '4450', debit: '150', declTva:'EX', codePopsy:'' }, { accountNumber: '4000', credit: '150' }] }]
      },
      // 19. Achat Escompte
      {
        id: 19, title: "Achat + Escompte", description: "Achat avec escompte 2% (conditionnel).",
        documents: [
          { type: 'INVOICE', title: "Facture 600", content: { sender: { name: "TECH STORE" }, receiver: { name: "OUTISUD" }, details: { number: "600", date: "18/01/N" }, lines: [{ desc: "Matériel", total: "2000" }], totals: { bases: [{ rate: "21%", base: "1960", tax: "411,60" }], totalExcl: "2000", totalVat: "411,60", toPay: "2411,60" } } },
          { type: 'NOTE', title: "Info", content: { text: "Paiement immédiat carte bancaire (escompte déduit)." } },
          { type: 'BANK_EXTRACT', title: "Extrait 7", content: { transactions: [{ date: "18/01", desc: "Paiement carte", amount: "-2371,60" }] } }
        ],
        requiredJournals: [
          { type: JournalType.ACHAT, defaultDate: "18/01/N", solution: [{ accountNumber: '6040', debit: '2000', declTva:'81', codePopsy:'21M' }, { accountNumber: '4110', debit: '411,60', declTva:'59' }, { accountNumber: '4400', credit: '2411,60' }] },
          { type: JournalType.OD, defaultDate: "18/01/N", solution: [{ accountNumber: '4400', debit: '2411,60' }, { accountNumber: '7560', credit: '40' }, { accountNumber: '5501', credit: '2371,60' }] },
          { type: JournalType.FINANCIER, defaultDate: "18/01/N", solution: [{ accountNumber: '5501', debit: '2371,60' }, { accountNumber: '5500', credit: '2371,60' }] }
        ]
      },
      // 20. Vente Escompte
      {
        id: 20, title: "Vente + Escompte", description: "Vente avec escompte 2% (conditionnel).",
        documents: [
          { type: 'INVOICE', title: "Facture 15", content: { sender: { name: "OUTISUD" }, receiver: { name: "CLIENT PRO" }, details: { number: "15", date: "19/01/N" }, lines: [{ desc: "Marchandises", total: "3000" }], totals: { bases: [{ rate: "21%", base: "2940", tax: "617,40" }], totalExcl: "3000", totalVat: "617,40", toPay: "3617,40" } } },
          { type: 'BANK_EXTRACT', title: "Extrait 8", content: { transactions: [{ date: "19/01", desc: "Virement reçu", amount: "3557,40" }] } }
        ],
        requiredJournals: [
          { type: JournalType.VENTE, defaultDate: "19/01/N", solution: [{ accountNumber: '7000', credit: '3000', declTva:'03', codePopsy:'21' }, { accountNumber: '4510', credit: '617,40', declTva:'54' }, { accountNumber: '4000', debit: '3617,40' }] },
          { type: JournalType.OD, defaultDate: "19/01/N", solution: [{ accountNumber: '4000', credit: '3617,40' }, { accountNumber: '6530', debit: '60' }, { accountNumber: '5500', debit: '3557,40' }] }
        ]
      },
      // 21. Achat Escompte Ferme
      {
        id: 21, title: "Achat Escompte Ferme", description: "Escompte déduit sur facture.",
        documents: [{ type: 'INVOICE', title: "Facture 601", content: { sender: { name: "TECH STORE" }, receiver: { name: "OUTISUD" }, details: { number: "601", date: "20/01/N" }, lines: [{ desc: "Matériel", total: "3000" }, { desc: "Escompte Ferme", total: "-100" }], totals: { bases: [{ rate: "21%", base: "2900", tax: "609" }], totalExcl: "2900", totalVat: "609", toPay: "3509" } } }],
        requiredJournals: [{ type: JournalType.ACHAT, defaultDate: "20/01/N", solution: [{ accountNumber: '6040', debit: '3000', declTva:'81', codePopsy:'21M' }, { accountNumber: '7560', credit: '100', declTva:'81(-)', codePopsy:'21S' }, { accountNumber: '4110', debit: '609', declTva:'59' }, { accountNumber: '4400', credit: '3509' }] }]
      },
      // 22. Vente Escompte Ferme
      {
        id: 22, title: "Vente Escompte Ferme", description: "Escompte déduit sur facture.",
        documents: [{ type: 'INVOICE', title: "Facture 16", content: { sender: { name: "OUTISUD" }, receiver: { name: "CLIENT PRO" }, details: { number: "16", date: "21/01/N" }, lines: [{ desc: "Marchandises", total: "5000" }, { desc: "Escompte Ferme", total: "-200" }], totals: { bases: [{ rate: "21%", base: "4800", tax: "1008" }], totalExcl: "4800", totalVat: "1008", toPay: "5808" } } }],
        requiredJournals: [{ type: JournalType.VENTE, defaultDate: "21/01/N", solution: [{ accountNumber: '7000', credit: '5000', declTva:'03', codePopsy:'21' }, { accountNumber: '6530', debit: '200', declTva:'03(-)', codePopsy:'21' }, { accountNumber: '4510', credit: '1008', declTva:'54' }, { accountNumber: '4000', debit: '5808' }] }]
      },
      // 23. Achat Emballages
      {
        id: 23, title: "Achat avec Consignes", description: "Frais transport + consignes.",
        documents: [{ type: 'INVOICE', title: "Facture 700", content: { sender: { name: "LOGISTIX" }, receiver: { name: "OUTISUD" }, details: { number: "700", date: "22/01/N" }, lines: [{ desc: "Marchandises", total: "3000" }, { desc: "Transport", total: "200" }, { desc: "Consignes", total: "100" }], totals: { bases: [{ rate: "21%", base: "3200", tax: "672" }], totalExcl: "3300", totalVat: "672", toPay: "3972" } } }],
        requiredJournals: [{ type: JournalType.ACHAT, defaultDate: "22/01/N", solution: [{ accountNumber: '6040', debit: '3200', declTva:'81', codePopsy:'21M' }, { accountNumber: '4050', debit: '100', declTva:'EX', codePopsy:'' }, { accountNumber: '4110', debit: '672', declTva:'59' }, { accountNumber: '4400', credit: '3972' }] }]
      },
      // 24. Vente Emballages
      {
        id: 24, title: "Vente avec Consignes", description: "Frais transport + consignes.",
        documents: [{ type: 'INVOICE', title: "Facture 17", content: { sender: { name: "OUTISUD" }, receiver: { name: "CLIENT LOCAL" }, details: { number: "17", date: "23/01/N" }, lines: [{ desc: "Marchandises", total: "6000" }, { desc: "Transport", total: "300" }, { desc: "Consignes", total: "150" }], totals: { bases: [{ rate: "21%", base: "6300", tax: "1323" }], totalExcl: "6450", totalVat: "1323", toPay: "7773" } } }],
        requiredJournals: [{ type: JournalType.VENTE, defaultDate: "23/01/N", solution: [{ accountNumber: '7000', credit: '6300', declTva:'03', codePopsy:'21' }, { accountNumber: '4510', credit: '1323', declTva:'54' }, { accountNumber: '4450', credit: '150', declTva:'EX' }, { accountNumber: '4000', debit: '7773' }] }]
      },
      // 26. Achat Emballages Vendus (Ex 21 renamed logic)
      {
        id: 26, title: "Achat Emballages Vendus", description: "Emballages comptés comme marchandise.",
        documents: [{ type: 'INVOICE', title: "Facture 702", content: { sender: { name: "PACK CO" }, receiver: { name: "OUTISUD" }, details: { number: "702", date: "24/01/N" }, lines: [{ desc: "Marchandises", total: "1100" }, { desc: "Emballages perdus", total: "50" }], totals: { bases: [{ rate: "21%", base: "1150", tax: "241,50" }], totalExcl: "1150", totalVat: "241,50", toPay: "1391,50" } } }],
        requiredJournals: [{ type: JournalType.ACHAT, defaultDate: "24/01/N", solution: [{ accountNumber: '6040', debit: '1150', declTva:'81', codePopsy:'21M' }, { accountNumber: '4110', debit: '241,50', declTva:'59' }, { accountNumber: '4400', credit: '1391,50' }] }]
      },
      // 27. Vente Emballages Vendus (Ex 22 renamed logic)
      {
        id: 27, title: "Vente Emballages Vendus", description: "Emballages facturés.",
        documents: [{ type: 'INVOICE', title: "Facture 18", content: { sender: { name: "OUTISUD" }, receiver: { name: "PETIT MAGASIN" }, details: { number: "18", date: "25/01/N" }, lines: [{ desc: "Marchandises", total: "850" }, { desc: "Emballages", total: "50" }], totals: { bases: [{ rate: "21%", base: "900", tax: "189" }], totalExcl: "900", totalVat: "189", toPay: "1089" } } }],
        requiredJournals: [{ type: JournalType.VENTE, defaultDate: "25/01/N", solution: [{ accountNumber: '7000', credit: '900', declTva:'03', codePopsy:'21' }, { accountNumber: '4510', credit: '189', declTva:'54' }, { accountNumber: '4000', debit: '1089' }] }]
      },
      // 28. Achat Voiture (Ex 23)
      {
        id: 28, title: "Achat Voiture", description: "TVA 50% Déductible.",
        documents: [{ type: 'INVOICE', title: "Facture 999", content: { sender: { name: "GARAGE BMW" }, receiver: { name: "OUTISUD" }, details: { number: "999", date: "26/01/N" }, lines: [{ desc: "BMW Série 1", total: "30000" }], totals: { bases: [{ rate: "21%", base: "30000", tax: "6300" }], totalExcl: "30000", totalVat: "6300", toPay: "36300" } } }],
        requiredJournals: [{ type: JournalType.ACHAT, defaultDate: "26/01/N", solution: [{ accountNumber: '2410', debit: '33150', declTva:'83', codePopsy:'21ND' }, { accountNumber: '4110', debit: '3150', declTva:'59' }, { accountNumber: '4400', credit: '36300' }] }]
      },
      // 29. Entretien Voiture (Ex 24)
      {
        id: 29, title: "Entretien Voiture", description: "TVA 50% Déductible.",
        documents: [{ type: 'INVOICE', title: "Facture 1000", content: { sender: { name: "GARAGE BMW" }, receiver: { name: "OUTISUD" }, details: { number: "1000", date: "27/01/N" }, lines: [{ desc: "Entretien", total: "800" }], totals: { bases: [{ rate: "21%", base: "800", tax: "168" }], totalExcl: "800", totalVat: "168", toPay: "968" } } }],
        requiredJournals: [{ type: JournalType.ACHAT, defaultDate: "27/01/N", solution: [{ accountNumber: '6108', debit: '884', declTva:'82', codePopsy:'21ND' }, { accountNumber: '4110', debit: '84', declTva:'59' }, { accountNumber: '4400', credit: '968' }] }]
      },
      // 30. Vente Comptoir (Ex 26)
      {
        id: 30, title: "Vente Comptoir", description: "Vente au comptoir.",
        documents: [{ type: 'NOTE', title: "Ticket Caisse", content: { text: "Vente comptoir (21%). Total TVAC: 242 EUR.\nPaiement en liquide." } }],
        requiredJournals: [
          { type: JournalType.VENTE, defaultDate: "28/01/N", solution: [{ accountNumber: '4000', debit: '242', label: 'Client comptoir' }, { accountNumber: '4510', credit: '42', declTva:'54' }, { accountNumber: '7000', credit: '200', declTva:'03', codePopsy:'21' }] },
          { type: JournalType.FINANCIER, defaultDate: "28/01/N", solution: [{ accountNumber: '5700', debit: '242' }, { accountNumber: '4000', credit: '242' }] }
        ]
      },
      // 31. Achat Whisky (Ex 27)
      {
        id: 31, title: "Achat Whisky", description: "Frais de réception (TVA non déd).",
        documents: [{ type: 'INVOICE', title: "Facture 55", content: { sender: { name: "DRINK MARKET" }, receiver: { name: "OUTISUD" }, details: { number: "55", date: "29/01/N" }, lines: [{ desc: "Whisky", total: "200" }], totals: { bases: [{ rate: "21%", base: "200", tax: "42" }], totalExcl: "200", totalVat: "42", toPay: "242" } } }],
        requiredJournals: [{ type: JournalType.ACHAT, defaultDate: "29/01/N", solution: [{ accountNumber: '6168', debit: '242', declTva:'82', codePopsy:'21ND100S' }, { accountNumber: '4400', credit: '242' }] }]
      },
      // 32. Loyer (Ex 28)
      {
        id: 32, title: "Paiement Loyer", description: "Extrait bancaire.",
        documents: [{ type: 'BANK_EXTRACT', title: "Extrait 10", content: { transactions: [{ date: "30/01", desc: "Loyer", amount: "-1000" }] } }],
        requiredJournals: [{ type: JournalType.FINANCIER, defaultDate: "30/01/N", solution: [{ accountNumber: '6101', debit: '1000' }, { accountNumber: '5500', credit: '1000' }] }]
      }
    ];

    // --- 3. FONCTIONS LOGIQUES ---

    const shuffleArray = (array) => {
        const newArr = [...array];
        for (let i = newArr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
        }
        return newArr;
    };

    const calculateLineScore = (userLine, solLine) => {
        let points = 0;
        let maxPoints = 2;
        
        const hasDecl = !!solLine.declTva;
        const hasCode = !!solLine.codePopsy;
        
        if (hasDecl && hasCode) maxPoints = 4;
        else if (hasDecl && !hasCode) maxPoints = 3;
        else maxPoints = 2;

        if (userLine.accountNumber === solLine.accountNumber) points++;
        if (hasDecl && userLine.declTva === solLine.declTva) points++;
        if (hasCode && userLine.codePopsy === solLine.codePopsy) points++;
        
        const userDebit = userLine.debit || "";
        const userCredit = userLine.credit || "";
        const solDebit = solLine.debit || "";
        const solCredit = solLine.credit || "";
        
        if (solDebit && userDebit === solDebit && !userCredit) points++;
        else if (solCredit && userCredit === solCredit && !userDebit) points++;

        return { points, maxPoints };
    };

    // --- 4. COMPOSANTS (UI) ---

    const EmptyRow = (id) => ({ id, accountNumber: '', declTva: '', codePopsy: '', label: '', debit: '', credit: '' });

    const Modal = ({ title, onClose, children }) => (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-white w-full max-w-4xl max-h-[90vh] flex flex-col rounded-xl shadow-2xl animate-[fadeIn_0.2s_ease-out]">
                <div className="flex justify-between p-4 border-b">
                    <h2 className="font-bold text-lg">{title}</h2>
                    <button onClick={onClose}><X /></button>
                </div>
                <div className="overflow-auto p-6">{children}</div>
            </div>
        </div>
    );

    const PlanComptableModal = ({ onClose }) => {
        const [search, setSearch] = useState('');
        const filtered = PLAN_COMPTABLE.filter(i => i.account.includes(search) || i.label.toLowerCase().includes(search.toLowerCase()));
        return (
            <Modal title="Plan Comptable" onClose={onClose}>
                <input autoFocus placeholder="Rechercher..." value={search} onChange={e=>setSearch(e.target.value)} className="w-full border p-2 mb-4 rounded focus:ring-2 focus:ring-blue-500 outline-none" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">{filtered.map(c => <div key={c.account} className="border-b p-1 flex gap-2 hover:bg-gray-50"><span className="font-bold w-12 text-blue-800">{c.account}</span><span>{c.label}</span></div>)}</div>
            </Modal>
        );
    };

    const DeclarationTvaModal = ({ onClose }) => (
        <Modal title="Déclaration TVA" onClose={onClose}>
            <div className="grid md:grid-cols-2 gap-4">
                {Object.entries(DECLARATION_TVA).map(([cadre, items]) => (
                    <div key={cadre} className="border rounded shadow-sm">
                        <div className="bg-gray-100 font-bold p-2 uppercase border-b">{cadre}</div>
                        {items.map(i => <div key={i.code} className="flex border-t"><span className="w-16 bg-gray-50 border-r p-2 font-bold text-center flex items-center justify-center">{i.code}</span><span className="p-2 flex-1">{i.label}</span></div>)}
                    </div>
                ))}
            </div>
        </Modal>
    );

    const CodesPopsyModal = ({ onClose }) => (
        <Modal title="Codes Popsy" onClose={onClose}>
            <div className="grid md:grid-cols-2 gap-4">
                <div><h3 className="font-bold bg-yellow-200 p-2 mb-2 rounded">Achats</h3>{CODES_POPSY.achats.map(c => <div key={c.code} className="flex text-sm border-b hover:bg-gray-50"><span className="w-16 font-bold bg-yellow-100 p-1 flex items-center justify-center border-r">{c.code}</span><span className="p-1 flex-1">{c.label}</span></div>)}</div>
                <div><h3 className="font-bold bg-orange-200 p-2 mb-2 rounded">Ventes</h3>{CODES_POPSY.ventes.map(c => <div key={c.code} className="flex text-sm border-b hover:bg-gray-50"><span className="w-16 font-bold bg-orange-100 p-1 flex items-center justify-center border-r">{c.code}</span><span className="p-1 flex-1">{c.label}</span></div>)}</div>
            </div>
        </Modal>
    );

    const JournalTable = ({ type, defaultDate, rows, setRows, validationState, solutionRows }) => {
        const [journalDate, setJournalDate] = useState(defaultDate);
        useEffect(() => setJournalDate(defaultDate), [defaultDate]);
        useEffect(() => { if (rows.length === 0) setRows([EmptyRow('1'), EmptyRow('2'), EmptyRow('3')]); }, []);

        const updateRow = (id, field, val) => {
            if(validationState.isValidated) return;
            setRows(rows.map(r => r.id === id ? { ...r, [field]: val } : r));
        };
        const addRow = () => {
            if(validationState.isValidated) return;
            setRows([...rows, EmptyRow(Date.now().toString())]);
        };
        const removeRow = (id) => {
            if(validationState.isValidated) return;
            setRows(rows.filter(r => r.id !== id));
        };

        const renderFeedbackRow = (rowIdx) => {
            if (!validationState.isValidated) return null;
            const userRow = rows[rowIdx];
            const solRow = solutionRows[rowIdx];
            if (!solRow) return null;
            const score = calculateLineScore(userRow, solRow);
            
            return (
                <tr className="bg-green-50 border-b-2 border-green-200 text-xs text-green-900">
                    <td colSpan="7" className="p-2">
                        <div className="flex justify-between items-center font-bold">
                            <span>Note: {score.points}/{score.maxPoints} pts</span>
                            <span className="font-mono">Correction: {solRow.accountNumber} | TVA: {solRow.declTva} | Code: {solRow.codePopsy} | M: {solRow.debit || solRow.credit}</span>
                        </div>
                    </td>
                </tr>
            );
        };

        return (
            <div className="bg-white rounded-lg shadow-lg border overflow-hidden mb-8 animate-[fadeIn_0.5s_ease-out]">
                <div className="bg-slate-800 text-white p-3 flex justify-between items-center">
                    <h3 className="font-bold">{type}</h3>
                    <div className="flex items-center gap-2 text-sm">
                        <span>Date:</span>
                        <input value={journalDate} onChange={e => setJournalDate(e.target.value)} disabled={validationState.isValidated} className="text-black rounded px-1 w-24 text-center" />
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-100 border-b">
                            <tr>
                                <th className="p-2 border-r w-24">Compte</th>
                                <th className="p-2 border-r w-16">TVA</th>
                                <th className="p-2 border-r w-20">Popsy</th>
                                <th className="p-2 border-r min-w-[150px]">Libellé</th>
                                <th className="p-2 w-24 bg-yellow-50 text-right">Débit</th>
                                <th className="p-2 w-24 bg-blue-50 text-right">Crédit</th>
                                <th className="w-8"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((row, idx) => (
                                <React.Fragment key={row.id}>
                                    <tr className="border-b hover:bg-gray-50">
                                        <td className="p-1 border-r"><input value={row.accountNumber} onChange={e => updateRow(row.id, 'accountNumber', e.target.value)} disabled={validationState.isValidated} className="w-full text-center font-bold bg-yellow-100 p-1 rounded" placeholder="ex: 6040"/></td>
                                        <td className="p-1 border-r"><input value={row.declTva} onChange={e => updateRow(row.id, 'declTva', e.target.value)} disabled={validationState.isValidated} className="w-full text-center bg-yellow-100 p-1 rounded" /></td>
                                        <td className="p-1 border-r"><input value={row.codePopsy} onChange={e => updateRow(row.id, 'codePopsy', e.target.value)} disabled={validationState.isValidated} className="w-full text-center bg-yellow-100 p-1 rounded" /></td>
                                        <td className="p-1 border-r"><input value={row.label} onChange={e => updateRow(row.id, 'label', e.target.value)} disabled={validationState.isValidated} className="w-full p-1 rounded" /></td>
                                        <td className="p-1 border-r bg-yellow-50"><input value={row.debit} onChange={e => updateRow(row.id, 'debit', e.target.value)} disabled={validationState.isValidated} className="w-full text-right font-bold bg-yellow-100 p-1 rounded" /></td>
                                        <td className="p-1 bg-blue-50"><input value={row.credit} onChange={e => updateRow(row.id, 'credit', e.target.value)} disabled={validationState.isValidated} className="w-full text-right font-bold bg-yellow-100 p-1 rounded" /></td>
                                        <td className="p-1 text-center"><button onClick={() => removeRow(row.id)} disabled={validationState.isValidated} className="text-red-400 hover:text-red-600"><Trash2 size={14}/></button></td>
                                    </tr>
                                    {renderFeedbackRow(idx)}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
                {!validationState.isValidated && <div className="p-2 bg-gray-50 border-t"><button onClick={addRow} className="text-blue-600 text-xs flex items-center gap-1 hover:text-blue-800"><Plus size={12} /> Ajouter ligne</button></div>}
            </div>
        );
    };

    const InvoiceViewer = ({ content }) => {
        const senderName = content.sender?.name || "Inconnu";
        const receiverName = content.receiver?.name || "Client";
        return (
            <div className="bg-white border shadow p-6 text-sm mb-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-gray-200 text-xs px-2 py-1 text-gray-500">FACTURE</div>
                <div className="flex justify-between mb-6">
                    <div className="w-1/2">
                        <h3 className="font-bold text-lg">{senderName}</h3>
                        <p className="text-xs">{content.sender?.vat}</p>
                    </div>
                    <div className="border-2 border-gray-300 p-3 w-1/3 rounded bg-gray-50">
                        <p className="text-xs text-gray-500 uppercase tracking-wide">Destinataire</p>
                        <h3 className="font-bold">{receiverName}</h3>
                    </div>
                </div>
                <div className="mb-4 font-bold border-b pb-1 flex justify-between">
                    <span>Facture {content.details?.number}</span>
                    <span>{content.details?.date}</span>
                </div>
                <table className="w-full mb-4">
                    <thead><tr className="border-b text-gray-500"><th className="text-left font-normal">Libellé</th><th className="text-right font-normal">Montant</th></tr></thead>
                    <tbody>
                        {content.lines?.map((l, i) => <tr key={i}><td className="py-1">{l.desc}</td><td className="text-right font-mono">{l.total}</td></tr>)}
                    </tbody>
                </table>
                <div className="flex justify-end">
                    <div className="w-2/3 border-t pt-2">
                        {content.totals?.bases && content.totals.bases.map((b,i)=> (
                            <div key={i} className="flex justify-between text-xs text-gray-500">
                                <span>Base {b.rate}: {b.base}</span>
                                <span>TVA: {b.tax}</span>
                            </div>
                        ))}
                        <div className="flex justify-between mt-1"><span>Total HT:</span><span>{content.totals?.totalExcl}</span></div>
                        <div className="flex justify-between"><span>Total TVA:</span><span>{content.totals?.totalVat}</span></div>
                        <div className="text-right font-bold text-lg bg-yellow-50 p-2 border-t-2 border-slate-800 mt-2">A Payer: {content.totals?.toPay} €</div>
                    </div>
                </div>
            </div>
        );
    };

    const BankExtractViewer = ({ content }) => (
        <div className="bg-blue-50 border border-blue-200 p-4 mb-4 text-sm font-mono shadow-sm">
            <div className="font-bold text-blue-900 border-b border-blue-300 mb-2 flex justify-between">
                <span>{content.title}</span>
            </div>
            {content.transactions.map((t, i) => (
                <div key={i} className="flex justify-between bg-white p-2 mb-1 border rounded">
                    <span>{t.date} - {t.desc}</span>
                    <span className={String(t.amount).includes('-') ? 'text-red-600' : 'text-green-600 font-bold'}>{t.amount}</span>
                </div>
            ))}
        </div>
    );

    const DocumentViewer = ({ doc }) => {
        if (doc.type === 'INVOICE') return <InvoiceViewer content={doc.content} />;
        if (doc.type === 'BANK_EXTRACT') return <BankExtractViewer content={doc.content} />;
        return <div className="bg-yellow-100 border-l-4 border-yellow-400 p-4 text-center italic text-yellow-900 mb-4 rounded shadow-sm">{doc.content.text}</div>;
    };

    const FinalReport = ({ userEmail, scores, onRestart }) => {
        const totalObtained = Object.values(scores).reduce((sum, s) => sum + s.obtained, 0);
        const totalPossible = Object.values(scores).reduce((sum, s) => sum + s.possible, 0);
        const percentage = totalPossible > 0 ? Math.round((totalObtained / totalPossible) * 100) : 0;

        return (
            <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-4 print-block">
                <div className="bg-white p-10 rounded-2xl shadow-xl text-center max-w-2xl w-full animate-[fadeIn_0.5s_ease-out]">
                    <div className="inline-flex items-center justify-center w-24 h-24 bg-yellow-100 rounded-full text-yellow-500 mb-6"><Trophy size={48} /></div>
                    <h1 className="text-4xl font-bold text-slate-800 mb-2">Félicitations !</h1>
                    <p className="text-slate-600 text-lg mb-8">Vous avez terminé tous les exercices, <span className="font-bold text-slate-800">{userEmail.split('@')[0]}</span>.</p>
                    <div className="bg-slate-800 text-white p-6 rounded-lg mb-8">
                        <div className="text-sm uppercase opacity-70">Score Final</div>
                        <div className="text-4xl font-bold text-yellow-400">{totalObtained} / {totalPossible}</div>
                        <div className="text-lg">{percentage}%</div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center print-hidden">
                        <button onClick={() => window.print()} className="flex items-center justify-center gap-2 px-6 py-4 bg-slate-800 text-white rounded-xl hover:bg-slate-900 transition-all font-semibold shadow-lg"><Printer size={20} /> Imprimer le rapport</button>
                        <button onClick={onRestart} className="flex items-center justify-center gap-2 px-6 py-4 bg-white border-2 border-slate-200 text-slate-700 rounded-xl hover:border-slate-300 hover:bg-slate-50 transition-all font-semibold"><RotateCcw size={20} /> Rejouer</button>
                    </div>
                </div>
            </div>
        );
    };

    // --- 5. APPLICATION PRINCIPALE ---

    const App = () => {
        const [userEmail, setUserEmail] = useState('');
        const [isAuthenticated, setIsAuthenticated] = useState(false);
        const [shuffledLevels, setShuffledLevels] = useState([]);
        const [levelIdx, setLevelIdx] = useState(0);
        const [allUserAnswers, setAllUserAnswers] = useState({});
        const [validatedLevels, setValidatedLevels] = useState({});
        const [scores, setScores] = useState({});
        const [showSolution, setShowSolution] = useState(false);
        const [activeModal, setActiveModal] = useState(null); 
        const [isCompleted, setIsCompleted] = useState(false);

        // Initialisation : Mélange des niveaux avec Niveau 1 fixe
        useEffect(() => {
            const levelOne = RAW_LEVELS.find(l => l.id === 1);
            const others = shuffleArray(RAW_LEVELS.filter(l => l.id !== 1));
            setShuffledLevels([levelOne, ...others]);
        }, []);

        const currentLevel = shuffledLevels[levelIdx];
        const isLevelValidated = !!validatedLevels[currentLevel?.id];
        const currentScore = scores[currentLevel?.id];

        const handleLogin = (e) => {
            e.preventDefault();
            if(userEmail.includes('@') && userEmail.length > 5) setIsAuthenticated(true);
        };

        const updateAnswers = (journalIdx, rows) => {
            setAllUserAnswers(prev => ({
                ...prev,
                [currentLevel.id]: { ...(prev[currentLevel.id] || {}), [journalIdx]: rows }
            }));
        };

        const handleValidateLevel = () => {
            let levelObtained = 0;
            let levelPossible = 0;

            currentLevel.requiredJournals.forEach((journal, jIdx) => {
                const userRows = allUserAnswers[currentLevel.id]?.[jIdx] || [];
                journal.solution.forEach((solRow, rIdx) => {
                    const userRow = userRows[rIdx] || {accountNumber:''};
                    const { points, maxPoints } = calculateLineScore(userRow, solRow);
                    levelObtained += points;
                    levelPossible += maxPoints;
                });
            });

            setScores(prev => ({ ...prev, [currentLevel.id]: { obtained: levelObtained, possible: levelPossible } }));
            setValidatedLevels(prev => ({ ...prev, [currentLevel.id]: true }));
        };

        const handleRestart = () => {
            setIsCompleted(false);
            setLevelIdx(0);
            setAllUserAnswers({});
            setValidatedLevels({});
            setScores({});
            // Remélanger
            const levelOne = RAW_LEVELS.find(l => l.id === 1);
            const others = shuffleArray(RAW_LEVELS.filter(l => l.id !== 1));
            setShuffledLevels([levelOne, ...others]);
        };

        if (!isAuthenticated) {
            return (
                <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
                    <div className="bg-white p-8 rounded-xl max-w-md w-full shadow-2xl animate-[fadeIn_0.5s_ease-out]">
                        <h1 className="text-2xl font-bold mb-4 flex items-center gap-2 text-slate-800"><BookOpen className="text-yellow-500"/> Compta POPSY</h1>
                        <p className="text-sm text-gray-600 mb-6">Exercices d'enregistrement comptable (31 Niveaux).</p>
                        <form onSubmit={handleLogin} className="space-y-4">
                            <input type="email" required placeholder="prénom.nom@istlm.org" value={userEmail} onChange={e => setUserEmail(e.target.value)} className="w-full border p-3 rounded focus:ring-2 focus:ring-yellow-400 outline-none" />
                            <button type="submit" className="w-full bg-slate-900 text-white p-3 rounded font-bold hover:bg-slate-800 transition-colors">Commencer</button>
                        </form>
                    </div>
                </div>
            );
        }

        if (isCompleted) return <FinalReport userEmail={userEmail} scores={scores} onRestart={handleRestart} />;
        if (!currentLevel) return <div>Chargement...</div>;

        return (
            <div className="min-h-screen flex flex-col pb-20 print:pb-0">
                <div className="bg-slate-900 text-white p-4 sticky top-0 z-40 print-hidden shadow-lg">
                    <div className="container mx-auto flex justify-between items-center">
                        <div className="font-bold flex items-center gap-2"><BookOpen size={20} className="text-yellow-500"/> Exercice {levelIdx + 1} / {shuffledLevels.length}</div>
                        <div className="flex gap-2">
                            <button disabled={levelIdx===0} onClick={() => {setLevelIdx(l => l-1); window.scrollTo(0,0)}} className="p-2 bg-slate-800 rounded hover:bg-slate-700 disabled:opacity-50 transition-colors"><ChevronLeft/></button>
                            {isLevelValidated ? (
                                <button onClick={() => { if(levelIdx < shuffledLevels.length -1) {setLevelIdx(l => l+1); window.scrollTo(0,0)} else {setIsCompleted(true);} }} className="px-4 py-2 bg-yellow-500 text-slate-900 rounded font-bold hover:bg-yellow-400 transition-colors flex items-center gap-1">Suivant <ChevronRight size={16}/></button>
                            ) : (
                                <button onClick={handleValidateLevel} className="px-4 py-2 bg-green-600 text-white rounded font-bold hover:bg-green-700 transition-colors flex items-center gap-1"><CheckCircle size={16}/> Valider</button>
                            )}
                        </div>
                    </div>
                </div>

                <div className="container mx-auto p-4 flex flex-col lg:flex-row gap-8 print-block">
                    <div className="lg:w-1/2 print:w-full print:mb-8">
                        <h2 className="text-2xl font-bold mb-2">{currentLevel.title}</h2>
                        <p className="mb-6 text-gray-600">{currentLevel.description}</p>
                        {currentLevel.documents.map((doc, i) => <DocumentViewer key={i} doc={doc} />)}
                    </div>
                    <div className="lg:w-1/2 print:w-full">
                        {isLevelValidated && currentScore && (
                            <div className="bg-slate-800 text-white p-4 rounded-lg mb-4 flex justify-between items-center shadow-lg animate-[fadeIn_0.3s_ease-out]">
                                <span className="font-bold text-lg"><Trophy className="inline mr-2 text-yellow-400"/> Score Exercice :</span>
                                <span className="text-2xl font-bold text-yellow-400">{currentScore.obtained} / {currentScore.possible} points</span>
                            </div>
                        )}
                        {currentLevel.requiredJournals.map((journal, idx) => (
                            <JournalTable 
                                key={`${currentLevel.id}-${idx}`}
                                type={journal.type}
                                defaultDate={journal.defaultDate}
                                rows={allUserAnswers[currentLevel.id]?.[idx] || []}
                                setRows={rows => updateAnswers(idx, rows)}
                                validationState={{ isValidated: isLevelValidated }}
                                solutionRows={journal.solution}
                            />
                        ))}
                    </div>
                </div>

                <div className="fixed bottom-0 w-full bg-white border-t p-3 print-hidden z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
                    <div className="container mx-auto flex justify-between items-center">
                        <div className="flex gap-2 overflow-x-auto pb-1">
                            <button onClick={() => setActiveModal('PLAN')} className="px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded text-sm font-bold flex gap-2 text-slate-700 whitespace-nowrap"><List size={16}/> Plan</button>
                            <button onClick={() => setActiveModal('TVA')} className="px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded text-sm font-bold flex gap-2 text-slate-700 whitespace-nowrap"><FileText size={16}/> TVA</button>
                            <button onClick={() => setActiveModal('CODES')} className="px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded text-sm font-bold flex gap-2 text-slate-700 whitespace-nowrap"><Grid size={16}/> Popsy</button>
                        </div>
                    </div>
                </div>

                {activeModal === 'PLAN' && <PlanComptableModal onClose={() => setActiveModal(null)} />}
                {activeModal === 'TVA' && <DeclarationTvaModal onClose={() => setActiveModal(null)} />}
                {activeModal === 'CODES' && <CodesPopsyModal onClose={() => setActiveModal(null)} />}
            </div>
        );
    };

    // --- 6. DEMARRAGE ---
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(<App />);
});