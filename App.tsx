
import React, { useState, useEffect } from 'react';
import { RAW_LEVELS } from './constants';
import { DocumentViewer } from './components/DocumentViewer';
import { JournalTable } from './components/JournalTable';
import { PlanComptableModal, DeclarationTvaModal, CodesPopsyModal } from './components/ReferenceTools';
import { JournalRow, JournalType, LevelData } from './types';
import { BookOpen, ChevronRight, ChevronLeft, Eye, RefreshCw, LogIn, AlertCircle, Printer, RotateCcw, Trophy, FileText, List, Grid, CheckCircle } from 'lucide-react';

const LoginScreen: React.FC<{ onLogin: (email: string) => void }> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.toLowerCase().endsWith('@istlm.org') || email.length < 12) {
      setError("L'adresse email doit être au format prénom.nom@istlm.org");
      return;
    }
    onLogin(email);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full overflow-hidden flex flex-col md:flex-row">
        <div className="bg-yellow-500 md:w-1/3 p-8 flex flex-col justify-between text-slate-900">
          <div><BookOpen size={48} className="mb-4" /><h1 className="text-2xl font-bold leading-tight">Exercices de comptabilité POPSY</h1></div>
          <div className="mt-8 text-sm font-semibold opacity-80">Institut Saint-Luc Frameries</div>
        </div>
        <div className="p-8 md:w-2/3">
          <h2 className="text-xl font-bold mb-4 text-slate-800">Bienvenue</h2>
          <p className="text-slate-600 mb-6 text-sm leading-relaxed">Exercices comptables (Achats, Ventes, OD, Financier). Réalisé par Mr Depret.</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Adresse Email</label>
              <input id="email" type="email" required placeholder="prénom.nom@istlm.org" value={email} onChange={(e) => { setEmail(e.target.value); setError(''); }} className={`w-full p-3 border rounded-lg focus:ring-2 focus:outline-none transition-colors ${error ? 'border-red-300 focus:ring-red-200' : 'border-gray-300 focus:ring-yellow-200'}`} />
              {error && <div className="flex items-center gap-2 text-red-600 text-xs mt-2"><AlertCircle size={14} /><span>{error}</span></div>}
            </div>
            <button type="submit" className="w-full bg-slate-800 text-white font-bold py-3 rounded-lg hover:bg-slate-900 transition-colors flex items-center justify-center gap-2"><span>Commencer</span><LogIn size={18} /></button>
          </form>
        </div>
      </div>
    </div>
  );
};

interface FinalReportProps {
    userEmail: string;
    scores: Record<number, { obtained: number, possible: number }>;
    levels: LevelData[];
    onPrint: () => void;
    onRestart: () => void;
}

const FinalReport: React.FC<FinalReportProps> = ({ userEmail, scores, levels, onPrint, onRestart }) => {
    const totalObtained = Object.values(scores).reduce((sum, s) => sum + s.obtained, 0);
    const totalPossible = Object.values(scores).reduce((sum, s) => sum + s.possible, 0);
    const percentage = totalPossible > 0 ? Math.round((totalObtained / totalPossible) * 100) : 0;

    return (
        <div className="min-h-screen bg-slate-100 p-8 flex flex-col items-center animate-in fade-in duration-500 print:bg-white print:p-0">
            <div className="bg-white p-8 rounded-xl shadow-xl max-w-4xl w-full print:shadow-none print:p-0">
                <div className="text-center mb-8 border-b pb-6 print:mb-4 print:pb-2">
                    <h1 className="text-3xl font-bold text-slate-800">Résultat Final</h1>
                    <p className="text-slate-600 mt-2">Élève : {userEmail}</p>
                </div>
                <div className="flex justify-center mb-8 print:mb-4">
                    <div className="bg-slate-800 text-white p-6 rounded-lg text-center shadow-lg w-64 print:bg-white print:text-black print:border print:border-black print:shadow-none">
                        <span className="block text-sm uppercase tracking-wider opacity-80">Total Global</span>
                        <span className="block text-4xl font-bold text-yellow-400 print:text-black">{totalObtained} / {totalPossible}</span>
                        <span className="block text-lg mt-1 font-mono">{percentage}%</span>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse border border-gray-200">
                        <thead className="bg-slate-50 print:bg-gray-100">
                            <tr>
                                <th className="border p-3 text-left">Exercice</th>
                                <th className="border p-3 text-center">Points Obtenus</th>
                                <th className="border p-3 text-center">Points Possibles</th>
                                <th className="border p-3 text-center">%</th>
                            </tr>
                        </thead>
                        <tbody>
                            {levels.map((level, i) => {
                                const s = scores[level.id] || { obtained: 0, possible: 0 };
                                const p = s.possible > 0 ? Math.round((s.obtained / s.possible) * 100) : 0;
                                return (
                                    <tr key={level.id} className="border-b hover:bg-slate-50 break-inside-avoid">
                                        <td className="border p-3 font-medium">Ex {i+1}: {level.title}</td>
                                        <td className="border p-3 text-center font-bold text-slate-700">{s.obtained}</td>
                                        <td className="border p-3 text-center text-slate-500">{s.possible}</td>
                                        <td className={`border p-3 text-center font-bold ${p < 50 ? 'text-red-500' : 'text-green-600'}`}>{p}%</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                <div className="mt-8 text-center print:hidden flex justify-center gap-4">
                    <button onClick={onPrint} className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 flex items-center justify-center gap-2 transition-colors shadow-lg"><Printer size={20}/> Imprimer le rapport</button>
                    <button onClick={onRestart} className="bg-slate-700 text-white px-6 py-3 rounded-lg font-bold hover:bg-slate-800 flex items-center justify-center gap-2 transition-colors shadow-lg"><RotateCcw size={20}/> Rejouer</button>
                </div>
            </div>
        </div>
    );
};

// Utils
const shuffleArray = (array: LevelData[]) => {
    const newArr = [...array];
    for (let i = newArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
};

const calculateLineScore = (userLine: JournalRow, solLine: JournalRow) => {
    let points = 0;
    let maxPoints = 2; // Default
    
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

type ActiveModal = 'NONE' | 'PLAN' | 'TVA' | 'CODES';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  
  const [shuffledLevels, setShuffledLevels] = useState<LevelData[]>([]);
  const [currentLevelIdx, setCurrentLevelIdx] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  
  const [activeModal, setActiveModal] = useState<ActiveModal>('NONE');
  const [allUserAnswers, setAllUserAnswers] = useState<Record<number, Record<number, JournalRow[]>>>({});
  const [validatedLevels, setValidatedLevels] = useState<Record<number, boolean>>({});
  const [scores, setScores] = useState<Record<number, { obtained: number, possible: number }>>({});

  useEffect(() => {
      // 1. Trouver l'exercice "Réouverture" (ID 1)
      const levelOne = RAW_LEVELS.find(l => l.id === 1);
      // 2. Prendre tous les autres
      const otherLevels = RAW_LEVELS.filter(l => l.id !== 1);
      // 3. Mélanger les autres
      const shuffledOthers = shuffleArray(otherLevels);
      
      // 4. Combiner: Niveau 1 TOUJOURS en premier, suivi des autres mélangés
      if (levelOne) {
          setShuffledLevels([levelOne, ...shuffledOthers]);
      } else {
          // Fallback au cas où l'ID 1 n'existe pas (ne devrait pas arriver)
          setShuffledLevels(shuffleArray(RAW_LEVELS));
      }
  }, []);

  const currentLevel = shuffledLevels[currentLevelIdx];
  const isLevelValidated = currentLevel ? !!validatedLevels[currentLevel.id] : false;
  const currentScore = currentLevel ? scores[currentLevel.id] : null;

  const handleLogin = (email: string) => {
    setUserEmail(email);
    setIsAuthenticated(true);
  };

  const handlePrint = () => window.print();

  const handleRestart = () => {
      // Reset all state
      setIsCompleted(false);
      setCurrentLevelIdx(0);
      setAllUserAnswers({});
      setValidatedLevels({});
      setScores({});
      
      // Re-shuffle keeping Level 1 first
      const levelOne = RAW_LEVELS.find(l => l.id === 1);
      const otherLevels = RAW_LEVELS.filter(l => l.id !== 1);
      const shuffledOthers = shuffleArray(otherLevels);
      if (levelOne) {
          setShuffledLevels([levelOne, ...shuffledOthers]);
      }
      
      window.scrollTo(0, 0);
  };

  const handleValidateLevel = () => {
      let levelObtained = 0;
      let levelPossible = 0;

      currentLevel.requiredJournals.forEach((journal, jIdx) => {
          const userRows = allUserAnswers[currentLevel.id]?.[jIdx] || [];
          journal.solution.forEach((solRow, rIdx) => {
              const userRow = userRows[rIdx] || {id: 'missing', accountNumber: '', declTva: '', codePopsy: '', label: '', debit: '', credit: ''};
              const { points, maxPoints } = calculateLineScore(userRow, solRow);
              levelObtained += points;
              levelPossible += maxPoints;
          });
      });

      setScores(prev => ({ ...prev, [currentLevel.id]: { obtained: levelObtained, possible: levelPossible } }));
      setValidatedLevels(prev => ({ ...prev, [currentLevel.id]: true }));
  };

  const nextLevel = () => {
    if (currentLevelIdx < shuffledLevels.length - 1) {
      setCurrentLevelIdx(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setIsCompleted(true);
    }
  };

  const updateJournalRows = (levelId: number, journalIndex: number, rows: JournalRow[]) => {
    setAllUserAnswers(prev => ({
      ...prev,
      [levelId]: { ...(prev[levelId] || {}), [journalIndex]: rows }
    }));
  };

  if (!isAuthenticated) return <LoginScreen onLogin={handleLogin} />;
  if (!currentLevel) return <div>Chargement...</div>;
  if (isCompleted) return <FinalReport userEmail={userEmail} scores={scores} levels={shuffledLevels} onPrint={handlePrint} onRestart={handleRestart} />;

  const getCurrentJournalRows = (journalIndex: number) => allUserAnswers[currentLevel.id]?.[journalIndex] || [];

  return (
    <>
      <div className="min-h-screen flex flex-col font-sans print:hidden bg-slate-50">
        <header className="bg-slate-900 text-white p-4 sticky top-0 z-50 shadow-lg">
          <div className="container mx-auto flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="bg-yellow-500 p-2 rounded text-slate-900"><BookOpen size={24} /></div>
              <div>
                <h1 className="text-xl font-bold tracking-tight">Compta POPSY</h1>
                <div className="flex items-center gap-2 text-xs text-slate-400"><span>{userEmail}</span></div>
              </div>
            </div>
            <div className="text-center"><span className="block text-xs text-slate-400 uppercase tracking-widest">Niveau</span><span className="font-bold text-lg">{currentLevelIdx + 1} / {shuffledLevels.length}</span></div>
          </div>
        </header>

        <main className="flex-grow container mx-auto p-4 md:p-8 flex flex-col lg:flex-row gap-8 pb-32">
          <div className="lg:w-1/2 flex flex-col gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
              <h2 className="text-2xl font-bold text-slate-800 mb-2">{currentLevel.title}</h2>
              <p className="text-slate-600 mb-4">{currentLevel.description}</p>
              <div className="h-1 w-20 bg-yellow-500 rounded"></div>
            </div>
            <div className="space-y-6">
              {currentLevel.documents.map((doc, idx) => (
                <DocumentViewer key={idx} document={doc} />
              ))}
            </div>
          </div>

          <div className="lg:w-1/2">
            {isLevelValidated && currentScore && (
                <div className="bg-slate-800 text-white p-4 rounded-lg mb-6 flex justify-between items-center shadow-lg animate-in slide-in-from-top-4">
                    <span className="font-bold text-lg flex items-center gap-2"><Trophy className="text-yellow-400"/> Score Exercice :</span>
                    <span className="text-2xl font-bold text-yellow-400">{currentScore.obtained} / {currentScore.possible} points</span>
                </div>
            )}
            <div className="space-y-8">
              {currentLevel.requiredJournals.map((journalTemplate, idx) => (
                <JournalTable
                  key={`${currentLevel.id}-${idx}`}
                  type={journalTemplate.type}
                  defaultDate={journalTemplate.defaultDate}
                  rows={getCurrentJournalRows(idx)}
                  setRows={(rows) => updateJournalRows(currentLevel.id, idx, rows)}
                  validationState={{ isValidated: isLevelValidated }}
                  solutionRows={journalTemplate.solution}
                />
              ))}
            </div>
          </div>
        </main>

        <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-3 shadow-2xl z-40">
          <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
               <button onClick={() => setActiveModal('PLAN')} className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md text-sm font-semibold transition-colors whitespace-nowrap"><List size={16} /> Plan Comptable</button>
               <button onClick={() => setActiveModal('TVA')} className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md text-sm font-semibold transition-colors whitespace-nowrap"><FileText size={16} /> Déclaration TVA</button>
               <button onClick={() => setActiveModal('CODES')} className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md text-sm font-semibold transition-colors whitespace-nowrap"><Grid size={16} /> Codes Popsy</button>
            </div>
            <div className="flex gap-4">
              {!isLevelValidated ? (
                  <button onClick={handleValidateLevel} className="bg-yellow-500 hover:bg-yellow-400 text-slate-900 px-8 py-3 rounded-lg font-bold shadow-lg transition-transform hover:scale-105 flex items-center gap-2"><CheckCircle size={20}/> Valider l'exercice</button>
              ) : (
                  <button onClick={nextLevel} className="bg-slate-800 hover:bg-slate-700 text-white px-8 py-3 rounded-lg font-bold shadow-lg flex items-center gap-2 animate-pulse">Exercice Suivant <ChevronRight size={20}/></button>
              )}
            </div>
          </div>
        </div>
      </div>

      {activeModal === 'PLAN' && <PlanComptableModal onClose={() => setActiveModal('NONE')} />}
      {activeModal === 'TVA' && <DeclarationTvaModal onClose={() => setActiveModal('NONE')} />}
      {activeModal === 'CODES' && <CodesPopsyModal onClose={() => setActiveModal('NONE')} />}
    </>
  );
};

export default App;
