
import React, { useState, useEffect } from 'react';
import { JournalRow, JournalType } from '../types';
import { Plus, Trash2, CheckCircle } from 'lucide-react';

interface JournalTableProps {
  type: JournalType;
  defaultDate: string;
  rows: JournalRow[];
  setRows: (rows: JournalRow[]) => void;
  validationState?: { isValidated: boolean };
  solutionRows: JournalRow[];
}

const EmptyRow = (id: string): JournalRow => ({
  id,
  accountNumber: '',
  declTva: '',
  codePopsy: '',
  label: '',
  debit: '',
  credit: ''
});

// Scoring logic (duplicated from App for display purposes if needed, or passed down)
// Here we just display what App passes, or calculate locally for display
const calculateLineScore = (userLine: JournalRow, solLine: JournalRow) => {
    let points = 0;
    let maxPoints = 2; // Default (Account + Amount)
    
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

export const JournalTable: React.FC<JournalTableProps> = ({ 
  type, 
  defaultDate,
  rows, 
  setRows, 
  validationState, 
  solutionRows 
}) => {
  
  const [journalDate, setJournalDate] = useState(defaultDate);

  useEffect(() => {
    setJournalDate(defaultDate);
  }, [defaultDate]);

  useEffect(() => {
    if (rows.length === 0) {
      setRows([EmptyRow('1'), EmptyRow('2'), EmptyRow('3')]);
    }
  }, []);

  const handleChange = (id: string, field: keyof JournalRow, value: string) => {
    if (validationState?.isValidated) return;
    const newRows = rows.map(row => row.id === id ? { ...row, [field]: value } : row);
    setRows(newRows);
  };

  const addRow = () => {
    if (validationState?.isValidated) return;
    setRows([...rows, EmptyRow(Date.now().toString())]);
  };

  const removeRow = (id: string) => {
    if (validationState?.isValidated) return;
    setRows(rows.filter(r => r.id !== id));
  };

  const getJournalTitle = (t: JournalType) => {
    switch(t) {
      case JournalType.ACHAT: return "Journal : Achat";
      case JournalType.VENTE: return "Journal : Vente";
      case JournalType.CAISSE: return "Journal : Caisse";
      case JournalType.FINANCIER: return "Journal : Financier";
      case JournalType.OD: return "Journal : Opérations Diverses";
      default: return "Journal";
    }
  };

  const renderFeedbackRow = (rowIdx: number) => {
      if (!validationState?.isValidated) return null;
      const userRow = rows[rowIdx];
      const solRow = solutionRows[rowIdx];
      
      if (!solRow) return null;

      const score = calculateLineScore(userRow, solRow);
      
      return (
          <tr className="bg-green-50 border-b-2 border-green-200 text-xs text-green-900 animate-in fade-in">
              <td colSpan={7} className="p-2">
                  <div className="flex justify-between items-center font-bold px-2">
                      <span className="text-blue-700">Note: {score.points}/{score.maxPoints} pts</span>
                      <span className="font-mono">Correction: {solRow.accountNumber} {solRow.declTva ? `| TVA:${solRow.declTva}` : ''} {solRow.codePopsy ? `| Code:${solRow.codePopsy}` : ''} | M: {solRow.debit || solRow.credit}</span>
                  </div>
              </td>
          </tr>
      );
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 my-6">
      <div className="bg-slate-800 text-white p-3 flex justify-between items-center">
        <h3 className="font-bold text-lg">{getJournalTitle(type)}</h3>
        <div className="flex items-center gap-2">
           <label className="text-sm font-light">Date :</label>
           <input type="text" value={journalDate} onChange={(e) => setJournalDate(e.target.value)} disabled={validationState?.isValidated} className="bg-slate-700 text-white px-2 py-1 rounded w-32 text-center text-sm border border-slate-600" />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600 font-semibold border-b">
            <tr>
              <th className="p-2 w-24 border-r">No de compte</th>
              <th className="p-2 w-16 border-r">DECL TVA</th>
              <th className="p-2 w-20 border-r">CODE POPSY</th>
              <th className="p-2 border-r text-left">Libellé</th>
              <th className="p-2 w-28 border-r text-right bg-yellow-50/50">Débit</th>
              <th className="p-2 w-28 text-right bg-blue-50/50">Crédit</th>
              <th className="p-2 w-10"></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <React.Fragment key={row.id}>
                <tr className={`border-b hover:bg-gray-50 transition-colors ${validationState?.isValidated ? 'opacity-70' : ''}`}>
                  <td className="p-1 border-r"><input value={row.accountNumber} onChange={(e) => handleChange(row.id, 'accountNumber', e.target.value)} disabled={validationState?.isValidated} className="w-full p-1 bg-yellow-100 font-bold text-center focus:ring-2 focus:ring-blue-400 focus:outline-none" /></td>
                  <td className="p-1 border-r"><input value={row.declTva} onChange={(e) => handleChange(row.id, 'declTva', e.target.value)} disabled={validationState?.isValidated} className="w-full p-1 bg-yellow-100 text-center font-bold focus:ring-2 focus:ring-blue-400 focus:outline-none" /></td>
                  <td className="p-1 border-r"><input value={row.codePopsy} onChange={(e) => handleChange(row.id, 'codePopsy', e.target.value)} disabled={validationState?.isValidated} className="w-full p-1 bg-yellow-100 text-center font-bold focus:ring-2 focus:ring-blue-400 focus:outline-none" /></td>
                  <td className="p-1 border-r"><input value={row.label} onChange={(e) => handleChange(row.id, 'label', e.target.value)} disabled={validationState?.isValidated} className="w-full p-1 bg-transparent focus:ring-2 focus:ring-blue-400 focus:outline-none" /></td>
                  <td className="p-1 border-r bg-yellow-50/30"><input value={row.debit} onChange={(e) => handleChange(row.id, 'debit', e.target.value)} disabled={validationState?.isValidated} className="w-full p-1 bg-yellow-100 text-right font-bold focus:ring-2 focus:ring-blue-400 focus:outline-none" /></td>
                  <td className="p-1 bg-blue-50/30"><input value={row.credit} onChange={(e) => handleChange(row.id, 'credit', e.target.value)} disabled={validationState?.isValidated} className="w-full p-1 bg-yellow-100 text-right font-bold focus:ring-2 focus:ring-blue-400 focus:outline-none" /></td>
                  <td className="p-1 text-center"><button onClick={() => removeRow(row.id)} disabled={validationState?.isValidated} className="text-gray-400 hover:text-red-500 transition-colors disabled:opacity-30"><Trash2 size={16} /></button></td>
                </tr>
                {renderFeedbackRow(idx)}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {!validationState?.isValidated && (
        <div className="bg-gray-50 p-2 flex justify-start border-t">
          <button onClick={addRow} className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800 px-3 py-1 rounded hover:bg-blue-100 transition-colors">
            <Plus size={14} /> Ajouter une ligne
          </button>
        </div>
      )}
    </div>
  );
};
