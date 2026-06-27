import katex from 'katex';

function test(label, tex, displayMode) {
  // Capture stderr output by intercepting console.warn
  const warns = [];
  const origWarn = console.warn;
  console.warn = (...args) => {
    const msg = args.join(' ');
    if (msg.includes('newLineInDisplayMode')) {
      warns.push(msg);
    }
    origWarn(...args);
  };
  
  try {
    katex.renderToString(tex, { displayMode, throwOnError: false });
    if (warns.length > 0) {
      console.log(`WARN [${label}]: ${warns.length} warning(s)`);
    } else {
      console.log(`OK   [${label}]`);
    }
  } catch (e) {
    console.log(`ERR  [${label}]: ${e.message}`);
  }
  console.warn = origWarn;
}

// Test 1: \\\\ at top-level in display mode (SHOULD warn)
test('Top-level \\\\ in display', 'a \\\\ b', true);

// Test 2: \\\\ inside \\begin{cases} (SHOULD NOT warn)
test('\\\\ inside cases', '\\begin{cases} a & b \\\\ c & d \\end{cases}', true);

// Test 3: \\\\ inside \\begin{pmatrix} (SHOULD NOT warn)
test('\\\\ inside pmatrix', '\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}', true);

// Test 4: \\\\[6pt] inside \\begin{cases} (SHOULD NOT warn)
test('\\\\[6pt] inside cases', '\\begin{cases} a & b \\\\[6pt] c & d \\end{cases}', true);

// Test 5: Topic15_EpsilonGreedy exact formula
test('Topic15_EpsilonGreedy', 
  '\\pi(a|s) = \\begin{cases} 1 - \\epsilon + \\frac{\\epsilon}{|\\mathcal{A}(s)|} & \\text{if } a = a^* \\\\ \\frac{\\epsilon}{|\\mathcal{A}(s)|} & \\text{if } a \\neq a^* \\end{cases}',
  true);

// Test 6: Topic6_MarkovMatrix exact formula
test('Topic6_MarkovMatrix',
  '\\mathbf{P} = \\begin{pmatrix} P_{11} & P_{12} & \\cdots & P_{1n} \\\\ P_{21} & P_{22} & \\cdots & P_{2n} \\\\ \\vdots & \\vdots & \\ddots & \\vdots \\\\ P_{n1} & P_{n2} & \\cdots & P_{nn} \\end{pmatrix}, \\quad P_{ij} \\geq 0,\\quad \\sum_{j=1}^{n} P_{ij} = 1\\;\\forall i',
  true);

// Test 7: Topic9_ExplorationExploitation exact formula
test('Topic9_ExplorationExploitation',
  'A_t = \\begin{cases} \\displaystyle\\arg\\max_{a}\\, Q_t(a) & \\text{with probability } 1-\\varepsilon \\\\[6pt] \\text{Uniform random action} & \\text{with probability } \\varepsilon \\end{cases}',
  true);

// Test 8: Topic13_MDPExamples exact formula
test('Topic13_MDPExamples',
  '\\text{Gridworld MDP}: \\mathcal{S}=\\{(r,c)\\},\\;\\mathcal{A}=\\{\\uparrow,\\downarrow,\\leftarrow,\\rightarrow\\},\\;\\mathcal{R}(s)=\\begin{cases}+10 & s=\\text{goal} \\\\ -1 & \\text{otherwise}\\end{cases}',
  true);

// Test 9: TransitionMatrixVis exact formula
test('TransitionMatrixVis',
  '\\mathbf{P} = \\begin{pmatrix} P_{11} & \\cdots & P_{1n} \\\\ \\vdots & \\ddots & \\vdots \\\\ P_{n1} & \\cdots & P_{nn} \\end{pmatrix}',
  true);

// Test 10: EpsilonGreedyVis exact formula
test('EpsilonGreedyVis',
  'A_t = \\begin{cases} \\arg\\max_a Q_t(a) & \\text{w.p. } 1-\\varepsilon \\\\ \\text{random} & \\text{w.p. } \\varepsilon \\end{cases}',
  true);

// Test 11: Term with \\\\mathcal{S} - this goes through formatMathText -> SafeInline (inline mode, should not warn)
test('Term \\\\mathcal{S} inline', '\\mathcal{S}', false);

// Test 12: What about \\\\ at top-level with inline mode? (should not warn about newLineInDisplayMode)
test('Top-level \\\\ inline', 'a \\\\ b', false);
