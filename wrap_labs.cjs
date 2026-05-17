const fs = require('fs');
const path = require('path');

const modulesDir = path.join(__dirname, 'src', 'modules');
const units = ['unit1', 'unit2', 'unit3', 'unit4'];

// Map of topic file -> lab metadata for rich VirtualLabShell wrappers
const labMeta = {
    // UNIT 1
    'Topic1_EarlyRoots': {
        title: 'Puzzle Box Simulator', desc: 'Thorndike-style trial & error learning',
        objective: 'Observe how reward probability shapes learning speed. Adjust reward rate and see how escape times shrink over trials.',
        tips: ['Higher reward probability = faster learning', 'Watch the trend line — it should decrease over trials', 'Try 0% reward to see the agent stuck forever']
    },
    'Topic2_NeedForRL': {
        title: 'Decision Landscape Explorer', desc: 'Sequential decision-making without labels',
        objective: 'Explore why supervised learning fails in sequential, dynamic environments. Navigate the maze yourself vs letting RL do it.',
        tips: ['Note how the agent has no teacher — it discovers the path through reward signals', 'Compare how many steps you need vs a random agent']
    },
    'Topic3_RLvsSLvsUL': {
        title: 'Paradigm Comparator', desc: 'Compare the three ML paradigms live',
        objective: 'Run the same dataset through SL, UL, and RL frameworks. Observe the different outputs each produces.',
        tips: ['Supervised Learning needs labelled data — notice the accuracy increase with more labels', 'RL only uses reward signals, no labels at all']
    },
    'Topic4_ElementsOfRL': {
        title: 'Agent Organ Simulator', desc: 'Toggle agent internal elements',
        objective: 'Disable individual RL components (Policy, Reward, Value, Model) and observe how agent performance degrades.',
        tips: ['Disabling the Policy causes the most damage — it is the core of agent behaviour', 'Try disabling Reward — the agent goes "blind" to goals']
    },
    'Topic5_EnvironmentTypes': {
        title: 'Environment Classifier', desc: 'Experience different environment properties',
        objective: 'Switch between environment types (deterministic/stochastic, partial/full obs) and see how agent performance changes.',
        tips: ['Stochastic environments require the agent to handle randomness explicitly', 'Partially observable environments force belief-state tracking']
    },
    'Topic6_WorkingOfRL': {
        title: 'RL Loop Visualizer', desc: 'Step through the Agent-Environment cycle',
        objective: 'Use Step mode to manually tick through the RL control loop. Observe state, action, reward, and next state at each tick.',
        tips: ['Press Step once and trace the full SARS tuple', 'Use Run to watch continuous learning unfold', 'Increase speed for long-horizon convergence']
    },
    'Topic7_ApproachesToRL': {
        title: 'Value vs Policy Sandbox', desc: 'Compare value-based and policy-based approaches',
        objective: 'Run both approaches on the same gridworld and compare convergence speed, stability, and policy quality.',
        tips: ['Value-based methods (Q-Learning) are more sample-efficient on small discrete spaces', 'Policy-based methods handle continuous actions better']
    },
    'Topic8_TypesOfRL': {
        title: 'Model-Free vs Model-Based', desc: 'Observe the planning advantage',
        objective: 'Compare a model-free agent (trial-and-error) vs a model-based agent (plans ahead) on the same navigation task.',
        tips: ['Model-based agents learn faster but fail when the model is wrong', 'Model-free agents are slower but more robust to environment changes']
    },
    'Topic9_ExplorationExploitation': {
        title: 'Multi-Armed Bandit Sandbox', desc: 'ε-Greedy vs UCB live',
        objective: 'Tune the algorithm parameters and observe how exploration strategy affects cumulative regret.',
        tips: ['Start with ε=0% (Greedy) to see it get stuck', 'UCB is smarter — it targets uncertain arms first', 'Try the presets for quick comparisons']
    },
    'Topic10_AdvantagesOfRL': {
        title: 'RL Advantage Demonstrator', desc: 'Show RL superiority in dynamic tasks',
        objective: 'Run RL vs rule-based agent on a changing environment. Watch RL adapt while the rule-based system fails.',
        tips: ['Change the environment mid-run to see RL adapt', 'Rule-based agents cannot handle environment shifts']
    },
    'Topic11_ApplicationsOfRL': {
        title: 'Application Simulator Hub', desc: 'Simulate real RL applications',
        objective: 'Pick an application domain and simulate an RL agent solving it. Observe domain-specific reward functions in action.',
        tips: ['Try the Traffic Signal domain — see how agents reduce average wait times', 'Each domain has a unique reward function shaping agent behaviour']
    },
    'Topic12_ChallengesWithRL': {
        title: 'Reward Hacking Sandbox', desc: 'See RL fail in surprising ways',
        objective: 'Design a reward function and watch the agent find unexpected loopholes that satisfy the reward without achieving the goal.',
        tips: ['Classic: "Clean the room" → agent hides objects under the rug', 'Try to design a reward that cannot be hacked!']
    },
    'Topic13_RLvsDLvsML': {
        title: 'AI Paradigm Map', desc: 'Position algorithms in the AI landscape',
        objective: 'Place different algorithms (SVM, CNN, DQN, PPO) on the ML/DL/RL taxonomy map and observe their relationships.',
        tips: ['DQN is where Deep Learning meets RL', 'Not all RL uses deep learning — tabular Q-Learning is pure RL']
    },

    // UNIT 2
    'Topic1_MDPComponents': {
        title: 'MDP Component Explorer', desc: 'Build an MDP from scratch interactively',
        objective: 'Define states, actions, and rewards for a custom scenario. Observe how the 5-tuple determines agent behaviour.',
        tips: ['The transition function is the "physics" of your environment', 'Reward shaping changes what the agent considers optimal']
    },
    'Topic2_FormalMDPDefinition': {
        title: 'Transition Matrix Explorer', desc: 'Visualize stochastic state transitions',
        objective: 'Toggle actions and see how the transition probability matrix changes. Verify probabilities sum to 1.',
        tips: ['All rows in the transition matrix must sum to 1.0', 'Stochastic transitions mean the agent cannot predict the exact next state']
    },
    'Topic3_MarkovPropertyChain': {
        title: 'Markov Property Tester', desc: 'Test the memoryless assumption',
        objective: 'Compare predictions using full history vs only current state. Observe when the Markov assumption holds.',
        tips: ['The current state must contain all information needed for future predictions', 'If the Markov property fails, you need a POMDP instead']
    },
    'Topic4_MarkovChainAnalysis': {
        title: 'Chain Convergence Simulator', desc: 'Watch state probabilities reach steady state',
        objective: 'Run the Markov Chain forward and observe the distribution converge to the stationary distribution.',
        tips: ['After ~15 steps the probabilities stop changing — this is the stationary distribution', 'Try starting from different initial states — they all converge to the same distribution']
    },
    'Topic5_MarkovModel': {
        title: 'Markov Model Builder', desc: 'Construct and simulate custom Markov models',
        objective: 'Set transition probabilities between states and observe long-run behaviour patterns.',
        tips: ['Absorbing states (probability 1 self-loop) represent terminal conditions', 'Ergodic chains visit all states — check if yours is ergodic']
    },
    'Topic6_MarkovMatrix': {
        title: 'Matrix Power Calculator', desc: 'Compute n-step transition probabilities',
        objective: 'Raise the transition matrix to the power of n and observe how n-step reachability changes.',
        tips: ['P^n gives you the probability of going from state i to state j in exactly n steps', 'As n→∞, P^n converges to the stationary distribution (for ergodic chains)']
    },
    'Topic7_MarkovMatricesInML': {
        title: 'PageRank Simulator', desc: 'Apply Markov matrices to real ML algorithms',
        objective: 'Build a small web graph and watch PageRank iterate to a stable page importance ranking.',
        tips: ['PageRank is literally a Markov chain — each page is a state', 'The "Random Surfer" model: with probability d, the surfer follows a link; with 1-d, they jump randomly']
    },
    'Topic8_RewardAndReturns': {
        title: 'Return Calculator', desc: 'Compute discounted returns for reward sequences',
        objective: 'Input a sequence of rewards and γ value. See how the discounted return G_t changes with different discount factors.',
        tips: ['γ=0.99 makes the agent very far-sighted — it values future rewards almost as much as immediate ones', 'γ=0.1 makes the agent myopic — it mostly cares about the next step']
    },
    'Topic9_MarkovRewardProcess': {
        title: 'MRP Value Estimator', desc: 'Estimate state values via Monte Carlo simulation',
        objective: 'Run episodes through the MRP and watch the estimated state values converge to the true values.',
        tips: ['More episodes = better value estimates', 'The Law of Large Numbers guarantees convergence']
    },
    'Topic10_StateValueFunction': {
        title: 'Value Function Heatmap', desc: 'Visualize V(s) across a gridworld',
        objective: 'Run policy evaluation and watch the value function propagate backward from goal states.',
        tips: ['High value = good position (close to reward)', 'Value propagates from the goal backward through the grid', 'Try different discount factors and see how the "reach" of value changes']
    },
    'Topic11_ActionValueFunction': {
        title: 'Q-Table Inspector', desc: 'Explore action values for each state',
        objective: 'Observe Q(s,a) values updating in real-time. Click any state to see its action-value breakdown.',
        tips: ['Q(s,a) tells you: "How good is action a from state s?"', 'The optimal policy is: always pick the action with the highest Q value']
    },
    'Topic12_OptimalPolicy': {
        title: 'Policy Optimizer', desc: 'Converge to the optimal policy via iteration',
        objective: 'Run policy iteration and observe the policy stabilize. Compare the initial random policy vs the optimal one.',
        tips: ['Policy Evaluation → Policy Improvement → repeat until stable', 'The algorithm is guaranteed to converge to the optimal policy']
    },
    'Topic13_MDPExamples': {
        title: 'MDP Gallery', desc: 'Simulate pre-built MDP examples',
        objective: 'Pick from classic MDPs (Gridworld, Cliff Walking, Mountain Car) and run Q-Learning to see how each poses unique challenges.',
        tips: ['Cliff Walking has a high penalty cliff — the agent must learn to avoid it', 'Gridworld is the simplest — good for understanding the basics']
    },

    // UNIT 3
    'Topic1_PolicyInMDP': {
        title: 'Policy Visualizer', desc: 'Display and compare stochastic policies',
        objective: 'Visualize the policy as arrows on a gridworld. Switch between random, greedy, and optimal policies.',
        tips: ['A deterministic policy has one arrow per state', 'A stochastic policy shows multiple arrows with different opacities (probabilities)']
    },
    'Topic2_QLearningIntro': {
        title: 'Q-Table Explorer', desc: 'Watch Q-values grow from zero',
        objective: 'Step through Q-Learning updates manually. See how the Q-table fills with meaningful values episode by episode.',
        tips: ['Start with all zeros — the agent knows nothing', 'Use Step mode to trace a single SARS update carefully', 'After ~20 episodes, the table starts showing clear patterns']
    },
    'Topic3_DeterministicStochasticPolicy': {
        title: 'Policy Sampler', desc: 'Sample actions from deterministic and stochastic policies',
        objective: 'Click "Sample Action" 100 times and build a histogram. Verify the frequencies match the defined probabilities.',
        tips: ['Deterministic: same action every time', 'Stochastic: frequency histogram should approximate the defined probabilities after many samples']
    },
    'Topic4_BellmanEquationValue': {
        title: 'Bellman Backup Calculator', desc: 'Compute Bellman updates step by step',
        objective: 'Enter state values and see the Bellman backup equation compute the new value. Observe convergence over iterations.',
        tips: ['The Bellman equation is recursive — it expresses V(s) in terms of V(s\')', 'Iterating the Bellman equation (Value Iteration) converges to V*']
    },
    'Topic5_RecyclingRobotCase': {
        title: 'Robot Command Center', desc: 'Operate the Recycling Robot directly',
        objective: 'Act as the policy! Choose Search, Wait, or Recharge and try to maximize total reward without getting rescued.',
        tips: ['Getting rescued costs -3 reward — avoid it at Low energy', 'Recharge has 0 immediate reward but prevents -3 penalty', 'Can you beat 50 total reward in 20 steps?']
    },
    'Topic6_OptimalPolicyValue': {
        title: 'Bellman Optimality Solver', desc: 'Solve for V* and π* via value iteration',
        objective: 'Run Value Iteration and watch V*(s) converge. Extract the greedy policy and verify it is optimal.',
        tips: ['Value Iteration sweeps all states, updating values using the Bellman Optimality Equation', 'Convergence is guaranteed when max|V_new - V_old| < threshold']
    },
    'Topic7_BackupDiagram': {
        title: 'Backup Tree Explorer', desc: 'Navigate the backup tree interactively',
        objective: 'Click on any node to expand the backup tree. Observe how value backs up from leaf nodes to the root.',
        tips: ['White circles = states, Black squares = state-action pairs', 'MC backup goes all the way to the leaf (episode end)', 'TD backup only goes one step ahead']
    },
    'Topic8_QLearningOverview': {
        title: 'Q-Learning Full Demo', desc: 'Complete Q-Learning on a gridworld',
        objective: 'Run Q-Learning to completion and extract the learned optimal policy. Compare with random policy.',
        tips: ['Watch the Q-table heat up as the agent learns', 'The learned policy should navigate optimally to the goal', 'Try changing α (learning rate) and γ (discount factor)']
    },
    'Topic9_QLearningTerms': {
        title: 'Hyperparameter Tuner', desc: 'Observe the effect of α, γ, ε on learning',
        objective: 'Adjust learning rate (α), discount factor (γ), and exploration rate (ε). Observe convergence speed and final policy quality.',
        tips: ['High α = fast but unstable learning', 'High γ = agent values long-term rewards more', 'Decay ε to transition from exploration to exploitation']
    },
    'Topic10_WorkingOfQLearning': {
        title: 'TD Error Microscope', desc: 'Inspect the Temporal Difference error in real-time',
        objective: 'Watch the TD error (target - current) drive Q-value updates. Observe how errors shrink as learning progresses.',
        tips: ['Large TD error = the agent was very surprised by the outcome', 'Converged Q-learning has TD errors close to 0', 'Positive error = outcome better than expected → increase Q']
    },
    'Topic11_GamblerDungeon': {
        title: "Gambler's Problem Solver", desc: 'Solve the classic gambler staking problem',
        objective: "Set the coin-flip probability (p_h) and run Value Iteration to find the optimal staking policy.",
        tips: ['p_h=0.5: symmetric game — interesting policy emerges', 'p_h>0.5: favourable odds — conservative policy is optimal', 'Watch the value function — it has a distinctive wavy shape']
    },
    'Topic12_QLearningApplications': {
        title: 'Application Playground', desc: 'Q-Learning on real-world inspired tasks',
        objective: 'Choose a domain (Traffic, Inventory, Robot Arm) and train a Q-Learning agent. Compare reward curves across domains.',
        tips: ['Traffic control has sparse rewards — the agent only learns when it improves wait times', 'Inventory management has well-shaped rewards — learning is fast']
    },
    'Topic13_QLearningCaseStudies': {
        title: 'Case Study Runner', desc: 'Reproduce published Q-Learning results',
        objective: 'Run the exact hyperparameters from a published case study and compare your results to the paper\'s figures.',
        tips: ['Reproducibility requires fixing the random seed', 'Small differences in α and γ can dramatically change convergence speed']
    },

    // UNIT 4
    'Topic1_ISEvolution': {
        title: 'AI Evolution Timeline', desc: 'Interact with key milestones in AI history',
        objective: 'Click on timeline events to see the architecture and performance of each milestone system.',
        tips: ['Notice how each breakthrough built on the previous one', 'Deep RL (2013+) combined neural networks with Q-Learning']
    },
    'Topic2_IntelligentBehavior': {
        title: 'Turing Test Simulator', desc: 'Test machine intelligence criteria',
        objective: 'Define your criteria for intelligence and score different AI systems against them.',
        tips: ['Is the Turing Test sufficient for intelligence?', 'Consider: chess AI passes some criteria but fails others']
    },
    'Topic3_TraditionalVsIS': {
        title: 'Rule Engine vs ML Comparator', desc: 'Compare rigid rules vs learned patterns',
        objective: 'Design rules manually vs let ML learn from data. Observe where each approach breaks down.',
        tips: ['Rules are brittle — they fail on edge cases', 'ML systems handle edge cases better but need training data']
    },
    'Topic4_ISApplications': {
        title: 'Smart System Showcase', desc: 'Interactive demos of IS applications',
        objective: 'Interact with mini-demos of NLP, Computer Vision, and Recommender systems. Observe how each uses intelligent behaviour.',
        tips: ['Each system uses a different form of learning', 'Recommender systems are closest to RL — they optimize for user engagement']
    },
    'Topic5_PEASFramework': {
        title: 'PEAS Designer', desc: 'Build a PEAS specification for any agent',
        objective: 'Choose an agent type and fill in its PEAS components. Validate that your specification is complete and consistent.',
        tips: ['Every robotic system can be described with PEAS', 'Missing a sensor in S means the agent is partially observable']
    },
    'Topic6_AgentTypesReflex': {
        title: 'Reflex Agent Sandbox', desc: 'Build and test condition-action rules',
        objective: 'Add IF-THEN rules to a reflex agent and test it in a simple grid environment. See where it fails.',
        tips: ['Reflex agents have no memory — they cannot handle sequences', 'Try a scenario requiring 2 steps to solve — the reflex agent will fail']
    },
    'Topic7_EnvironmentTypes': {
        title: 'Environment Property Lab', desc: 'Classify environments by their properties',
        objective: 'Drag environment examples into the correct classification (Deterministic/Stochastic, Episodic/Sequential, etc.).',
        tips: ['Chess: deterministic, fully observable, sequential, static', 'Poker: stochastic, partially observable, sequential, static']
    },
    'Topic8_AgentTypesDetailed': {
        title: 'Agent Architecture Comparator', desc: 'Compare all 5 agent architectures',
        objective: 'Run Simple Reflex, Model-Based, Goal-Based, Utility-Based, and Learning agents on the same task. Compare performance.',
        tips: ['Each architecture handles different types of complexity', 'Learning agents improve over time — the others do not']
    },
    'Topic9_EnvironmentsDetailed': {
        title: 'Environment Complexity Ladder', desc: 'Scale from simple to complex environments',
        objective: 'Run the same agent in increasingly complex environments. Observe when the agent fails and why.',
        tips: ['Simple agents fail in complex environments', 'POMDP environments require belief-state tracking']
    },
    'Topic10_MCIntro': {
        title: 'MC Sampling Engine', desc: 'Learn from complete episodes',
        objective: 'Generate episodes and observe how value estimates improve with more samples. Compare to the true values.',
        tips: ['MC requires complete episodes — no updates until episode end', 'High variance early on — estimates stabilize after ~50 episodes', 'Compare First-Visit vs Every-Visit update rules']
    },
    'Topic11_MCBackupDiagrams': {
        title: 'Backup Depth Comparator', desc: 'Compare TD vs MC backup depth',
        objective: 'Visualize and compare 1-step TD backup vs full Monte Carlo backup on the same trajectory.',
        tips: ['TD updates immediately after each step — MC waits until episode end', 'TD has lower variance but higher bias than MC']
    },
    'Topic12_MCAlgorithms': {
        title: 'First-Visit vs Every-Visit Lab', desc: 'Compare MC estimation methods',
        objective: 'Run both First-Visit and Every-Visit MC on the same MRP. Compare the resulting value estimates.',
        tips: ['Both converge to V(s) asymptotically', 'Every-Visit uses more data but has correlated samples']
    },
    'Topic13_MCPrediction': {
        title: 'Value Convergence Tracker', desc: 'Watch V(s) converge episode by episode',
        objective: 'Track the estimate of V(s) for a specific state across episodes. Observe the Law of Large Numbers in action.',
        tips: ['Convergence is noisy but guaranteed', 'Increase the number of episodes to reduce variance', 'Compare estimates with the true value computed by Dynamic Programming']
    },
    'Topic14_MCControl': {
        title: 'GLIE Control Simulator', desc: 'On-policy MC Control with exploring starts',
        objective: 'Run MC Control and watch the policy improve episode by episode. Observe Q-values and policy arrows update together.',
        tips: ['GLIE = Greedy in the Limit with Infinite Exploration', 'Policy improvement step: make policy greedy with respect to current Q', 'Run for many episodes to reach near-optimal policy']
    },
    'Topic15_EpsilonGreedy': {
        title: 'Probability Balancer', desc: 'Visualize ε-greedy probability distribution',
        objective: 'Adjust ε and the number of actions. See how probability mass is distributed between exploitation and exploration.',
        tips: ['Every action always has probability ≥ ε/|A|', 'At ε=0, all probability goes to the best action', 'At ε=1, all actions are equally likely']
    }
};

units.forEach(unit => {
    const unitDir = path.join(modulesDir, unit);
    if (!fs.existsSync(unitDir)) return;
    const files = fs.readdirSync(unitDir).filter(f => f.endsWith('.tsx'));

    files.forEach(file => {
        const filePath = path.join(unitDir, file);
        let content = fs.readFileSync(filePath, 'utf8');
        const topicKey = file.replace('.tsx', '');
        const meta = labMeta[topicKey];

        if (!meta) { console.log(`No meta for ${file}`); return; }
        if (content.includes('VirtualLabShell') && !content.includes('<VirtualLabShell')) {
            // has import but not used yet
        }

        // 1. Add VirtualLabShell import if missing
        if (!content.includes('VirtualLabShell')) {
            content = content.replace(
                /^(import React.*?;\n)/,
                `$1import VirtualLabShell from '../../components/topic/VirtualLabShell';\n`
            );
            if (!content.includes('VirtualLabShell')) {
                content = `import VirtualLabShell from '../../components/topic/VirtualLabShell';\n` + content;
            }
        }

        // 2. Wrap existing lab section content with VirtualLabShell if not already wrapped
        // Find the lab SectionWrapper content and wrap the component call
        if (!content.includes('<VirtualLabShell')) {
            const tips = meta.tips.map(t => `'${t.replace(/'/g, "\\'")}'`).join(',\n                ');
            const tipsStr = `[${tips}]`;

            // Replace the lab section's inner div to use VirtualLabShell
            // Pattern: find <div className="space-y-6">...<ComponentName />...</div> inside lab SectionWrapper
            content = content.replace(
                /(id="lab"[\s\S]*?<div className="space-y-6">)\s*([\s\S]*?)(\s*<\/div>\s*<\/SectionWrapper>)/,
                (match, before, inner, after) => {
                    // Check if inner has a component (single tag pattern)
                    const hasComponent = /<[A-Z][A-Za-z]+\s*\/>/.test(inner);
                    if (!hasComponent) return match;

                    return `${before}
                <VirtualLabShell
                    title="${meta.title}"
                    description="${meta.desc}"
                    objective="${meta.objective}"
                    badge="Interactive Lab"
                    tips={${tipsStr}}
                >
                    ${inner.trim()}
                </VirtualLabShell>
            ${after}`;
                }
            );

            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Wrapped lab in ${file}`);
        } else {
            console.log(`Skipped ${file} (already uses VirtualLabShell)`);
        }
    });
});

console.log('Done wrapping Virtual Labs!');
