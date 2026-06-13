import { TopicData } from './index';

export const unit3TopicData: Record<string, TopicData> = {
    Topic1_PolicyInMDP: {
        prerequisites: [
            'Markov Decision Process fundamentals',
            'State and action spaces',
            'Reward function concept',
            'Transition probabilities',
            'Agent-environment interaction loop'
        ],
        mcqs: [
            {
                id: 't1-1',
                question: 'What is a policy in the context of an MDP?',
                options: [
                    { id: 'a', text: 'A mapping from states to actions (or probabilities over actions)' },
                    { id: 'b', text: 'A fixed sequence of actions from start to goal' },
                    { id: 'c', text: 'The reward function of the environment' },
                    { id: 'd', text: 'The transition probability matrix' }
                ],
                correctAnswer: 'a',
                justification: 'A policy π defines the agent\'s behavior by mapping each state to an action (deterministic) or a probability distribution over actions (stochastic).',
                wrongJustifications: {
                    b: 'A policy is not a fixed sequence; it is a state-conditioned decision rule.',
                    c: 'The reward function is part of the environment definition, not the agent\'s behavior strategy.',
                    d: 'Transition probabilities belong to the environment dynamics, not the agent\'s decision-making rule.'
                }
            },
            {
                id: 't1-2',
                question: 'In policy notation π(a|s), what does the vertical bar signify?',
                options: [
                    { id: 'a', text: 'The probability of action a given state s' },
                    { id: 'b', text: 'The conditional dependence of state s on action a' },
                    { id: 'c', text: 'The reward received after taking a in s' },
                    { id: 'd', text: 'The next state transition from s under a' }
                ],
                correctAnswer: 'a',
                justification: 'π(a|s) denotes the conditional probability of selecting action a when the agent is in state s.',
                wrongJustifications: {
                    b: 'The notation π(a|s) conditions on state s, not the other way around.',
                    c: 'Rewards are denoted by R(s, a) or similar, not by π notation.',
                    d: 'State transitions are given by the dynamics function P(s\' | s, a), not the policy.'
                }
            },
            {
                id: 't1-3',
                question: 'Which of the following best describes a deterministic policy?',
                options: [
                    { id: 'a', text: 'It assigns probability 1 to one action per state and 0 to all others' },
                    { id: 'b', text: 'It assigns equal probability to all actions in every state' },
                    { id: 'c', text: 'It randomly selects actions without using state information' },
                    { id: 'd', text: 'It only exists in model-free RL algorithms' }
                ],
                correctAnswer: 'a',
                justification: 'A deterministic policy π(s) outputs a single action with certainty for each state.',
                wrongJustifications: {
                    b: 'A uniform random policy is a type of stochastic policy, not a deterministic one.',
                    c: 'All policies in MDPs condition on the state; ignoring state violates the Markov property.',
                    d: 'Deterministic policies exist in both model-based and model-free RL settings.'
                }
            },
            {
                id: 't1-4',
                question: 'How does the policy affect the state-value function V^π(s)?',
                options: [
                    { id: 'a', text: 'V^π(s) is the expected return starting from s and following policy π thereafter' },
                    { id: 'b', text: 'V^π(s) is independent of π and depends only on the environment dynamics' },
                    { id: 'c', text: 'V^π(s) measures only the immediate reward from s' },
                    { id: 'd', text: 'V^π(s) is the probability of reaching a terminal state under π' }
                ],
                correctAnswer: 'a',
                justification: 'V^π(s) = E[G_t | S_t = s] under policy π, where G_t is the cumulative discounted return.',
                wrongJustifications: {
                    b: 'V^π(s) explicitly depends on π because the actions chosen affect rewards and future states.',
                    c: 'V^π(s) captures the expected cumulative future reward, not just the immediate reward.',
                    d: 'V^π(s) is an expected sum of rewards, not a probability.'
                }
            },
            {
                id: 't1-5',
                question: 'What is the relationship between a policy and the action-value function Q^π(s, a)?',
                options: [
                    { id: 'a', text: 'Q^π(s, a) is the expected return after taking action a in state s, then following π' },
                    { id: 'b', text: 'Q^π(s, a) equals V^π(s) for all actions' },
                    { id: 'c', text: 'Q^π(s, a) depends only on a and not on the policy' },
                    { id: 'd', text: 'Q^π(s, a) is the same as the transition probability' }
                ],
                correctAnswer: 'a',
                justification: 'Q^π(s, a) evaluates the quality of taking a specific action in state s then following policy π.',
                wrongJustifications: {
                    b: 'Q^π(s, a) varies across actions and differs from V^π(s) which averages over actions.',
                    c: 'Q^π(s, a) depends on π because future actions after the first step follow π.',
                    d: 'Q^π(s, a) is an expected return, not a probability.'
                }
            },
            {
                id: 't1-6',
                question: 'In policy improvement, what does the greedy policy with respect to Q^π(s, a) do?',
                options: [
                    { id: 'a', text: 'Selects the action with the highest Q^π(s, a) in each state' },
                    { id: 'b', text: 'Selects actions uniformly at random' },
                    { id: 'c', text: 'Always repeats the most recent action' },
                    { id: 'd', text: 'Selects the action with the lowest expected return' }
                ],
                correctAnswer: 'a',
                justification: 'A greedy policy chooses argmax_a Q^π(s, a), guaranteeing improvement by the policy improvement theorem.',
                wrongJustifications: {
                    b: 'Uniform random selection does not exploit learned Q-values.',
                    c: 'Repeating the last action ignores Q-value information.',
                    d: 'Selecting the lowest Q-value minimizes return, opposite of greedy improvement.'
                }
            },
            {
                id: 't1-7',
                question: 'What is the policy evaluation step in policy iteration?',
                options: [
                    { id: 'a', text: 'Computing the value function for a given policy' },
                    { id: 'b', text: 'Randomly selecting a new policy' },
                    { id: 'c', text: 'Updating the environment dynamics' },
                    { id: 'd', text: 'Generating random episodes for exploration' }
                ],
                correctAnswer: 'a',
                justification: 'Policy evaluation computes V^π or Q^π for the current policy π via the Bellman expectation equation.',
                wrongJustifications: {
                    b: 'Policy selection is part of policy improvement, not evaluation.',
                    c: 'Environment dynamics are assumed fixed in the standard MDP framework.',
                    d: 'Episode generation is a method for evaluation, not the definition.'
                }
            },
            {
                id: 't1-8',
                question: 'In policy iteration, what signals that the optimal policy has been found?',
                options: [
                    { id: 'a', text: 'When the greedy policy derived from V^π is identical to π' },
                    { id: 'b', text: 'When all state values become zero' },
                    { id: 'c', text: 'When the policy has converged to a uniform random policy' },
                    { id: 'd', text: 'When every action has equal Q-value in every state' }
                ],
                correctAnswer: 'a',
                justification: 'When the greedy policy matches the current policy π, then π is optimal by the policy improvement theorem.',
                wrongJustifications: {
                    b: 'Zero values do not indicate optimality; they depend on reward structure.',
                    c: 'Uniform random policy would be suboptimal unless all policies are equally good.',
                    d: 'Equal Q-values do not imply convergence to optimal policy.'
                }
            },
            {
                id: 't1-9',
                question: 'What is the key difference between behavior policy and target policy in off-policy learning?',
                options: [
                    { id: 'a', text: 'Behavior policy generates data; target policy is the one being learned' },
                    { id: 'b', text: 'Target policy generates data; behavior policy is the one being learned' },
                    { id: 'c', text: 'Both policies are always identical' },
                    { id: 'd', text: 'Behavior policy is only used in model-based RL' }
                ],
                correctAnswer: 'a',
                justification: 'The behavior policy (exploratory) interacts with the environment while the target policy (greedy) is learned.',
                wrongJustifications: {
                    b: 'This is reversed: the behavior policy generates experience.',
                    c: 'In off-policy methods they differ; in on-policy they are the same.',
                    d: 'Off-policy learning is used in both model-free and model-based settings.'
                }
            },
            {
                id: 't1-10',
                question: 'Which is true about a stationary policy in an MDP?',
                options: [
                    { id: 'a', text: 'It does not change with time; same state maps to same action distribution' },
                    { id: 'b', text: 'It changes every time step based on the agent\'s history' },
                    { id: 'c', text: 'It only exists in finite-horizon MDPs' },
                    { id: 'd', text: 'It depends on the entire trajectory, not just the current state' }
                ],
                correctAnswer: 'a',
                justification: 'A stationary policy is time-independent and depends only on the current state.',
                wrongJustifications: {
                    b: 'A time-dependent policy is non-stationary by definition.',
                    c: 'Stationary policies are most common in infinite-horizon discounted MDPs.',
                    d: 'Stationary policies depend only on the current state (Markov property).'
                }
            }
        ],
        recap: [
            'A policy π maps states to actions (deterministic) or to distributions over actions (stochastic).',
            'V^π(s) measures expected return starting from state s following π.',
            'Q^π(s, a) measures expected return after taking action a in state s then following π.',
            'Policy iteration alternates between evaluation and greedy improvement.',
            'The policy improvement theorem guarantees greedy policies are at least as good as the original.',
            'Stationary policies depend only on the current state and are time-invariant.',
            'Off-policy learning uses separate behavior and target policies.'
        ],
        skillMapping: [
            { skill: 'Defining and representing policies in MDPs', level: 'remember' },
            { skill: 'Distinguishing deterministic and stochastic policies', level: 'understand' },
            { skill: 'Applying policy evaluation and improvement', level: 'apply' },
            { skill: 'Analyzing convergence of policy iteration', level: 'analyze' }
        ]
    },
    Topic2_QLearningIntro: {
        prerequisites: [
            'Policy concept in MDP',
            'Value functions and Bellman equations',
            'Temporal difference learning basics',
            'Exploration vs. exploitation trade-off',
            'Model-free RL fundamentals'
        ],
        mcqs: [
            {
                id: 't2-1',
                question: 'What makes Q-learning a model-free reinforcement learning algorithm?',
                options: [
                    { id: 'a', text: 'It learns action values directly without requiring the transition probability model' },
                    { id: 'b', text: 'It builds an explicit model of the environment before learning' },
                    { id: 'c', text: 'It only works with deterministic environments' },
                    { id: 'd', text: 'It requires the reward function to be known in advance' }
                ],
                correctAnswer: 'a',
                justification: 'Q-learning learns Q-values directly from experience using TD updates.',
                wrongJustifications: {
                    b: 'Model-free methods like Q-learning do not build an explicit environment model.',
                    c: 'Q-learning works in both deterministic and stochastic environments.',
                    d: 'Q-learning learns from observed rewards and does not require pre-specified reward functions.'
                }
            },
            {
                id: 't2-2',
                question: 'Which best describes the Q-learning update rule?',
                options: [
                    { id: 'a', text: 'Q(s,a) ← Q(s,a) + α[R + γ max_a\' Q(s\', a\') − Q(s,a)]' },
                    { id: 'b', text: 'Q(s,a) ← max_a Q(s,a)' },
                    { id: 'c', text: 'Q(s,a) ← R + γ Q(s,a)' },
                    { id: 'd', text: 'Q(s,a) ← Q(s,a) + α[R − Q(s,a)]' }
                ],
                correctAnswer: 'a',
                justification: 'The Q-learning update uses the Bellman optimality equation with TD error.',
                wrongJustifications: {
                    b: 'Taking max without learning rate and TD error is not the correct update.',
                    c: 'This omits the bootstrap term and learning rate.',
                    d: 'This ignores the future Q-value bootstrap from the next state.'
                }
            },
            {
                id: 't2-3',
                question: 'Why is Q-learning considered an off-policy algorithm?',
                options: [
                    { id: 'a', text: 'It learns optimal Q-values independently of the exploration policy' },
                    { id: 'b', text: 'It requires the behavior policy to match the target policy' },
                    { id: 'c', text: 'It cannot use epsilon-greedy exploration' },
                    { id: 'd', text: 'It only works with deterministic target policies' }
                ],
                correctAnswer: 'a',
                justification: 'Q-learning uses max_a\' Q(s\', a\'), which is independent of the behavior policy.',
                wrongJustifications: {
                    b: 'Off-policy methods specifically allow behavior and target policies to differ.',
                    c: 'Q-learning commonly uses epsilon-greedy while learning a greedy target.',
                    d: 'Q-learning does not require determinism in the target policy.'
                }
            },
            {
                id: 't2-4',
                question: 'What role does the learning rate α play in Q-learning?',
                options: [
                    { id: 'a', text: 'It controls how much new information overrides old Q-value estimates' },
                    { id: 'b', text: 'It determines the discount factor for future rewards' },
                    { id: 'c', text: 'It sets the exploration probability in epsilon-greedy' },
                    { id: 'd', text: 'It scales the reward signal before learning' }
                ],
                correctAnswer: 'a',
                justification: 'α ∈ (0,1] determines the step size, balancing new TD target vs. existing estimate.',
                wrongJustifications: {
                    b: 'The discount factor γ controls future reward weighting.',
                    c: 'Epsilon controls exploration probability, not α.',
                    d: 'α controls TD error adjustment, not direct reward scaling.'
                }
            },
            {
                id: 't2-5',
                question: 'What does Q-learning converge to under appropriate conditions?',
                options: [
                    { id: 'a', text: 'The optimal action-value function Q* regardless of the exploration policy' },
                    { id: 'b', text: 'The value function of the behavior policy' },
                    { id: 'c', text: 'A random value function determined by exploration noise' },
                    { id: 'd', text: 'The transition probability matrix' }
                ],
                correctAnswer: 'a',
                justification: 'Q-learning converges to Q* with probability 1 given infinite visitation and Robbins-Monro conditions.',
                wrongJustifications: {
                    b: 'Q-learning converges to Q*, not the behavior policy\'s value function.',
                    c: 'Convergence is deterministic to Q* under standard assumptions.',
                    d: 'Q-learning is value-based and does not estimate transition probabilities.'
                }
            },
            {
                id: 't2-6',
                question: 'How does Q-learning handle the exploration-exploitation trade-off?',
                options: [
                    { id: 'a', text: 'By using an exploration policy while updating the greedy target Q*' },
                    { id: 'b', text: 'By randomly resetting Q-values periodically' },
                    { id: 'c', text: 'By only learning from exploitative actions' },
                    { id: 'd', text: 'By using multiple independent Q-tables' }
                ],
                correctAnswer: 'a',
                justification: 'Q-learning decouples exploration (via ε-greedy) from the target (greedy max).',
                wrongJustifications: {
                    b: 'Resetting Q-values would destroy learned information.',
                    c: 'Only exploiting risks missing better alternatives.',
                    d: 'Multiple Q-tables are not standard Q-learning.'
                }
            },
            {
                id: 't2-7',
                question: 'In Q-learning, what does the max operator in the target computation represent?',
                options: [
                    { id: 'a', text: 'The bootstrap estimate of the optimal future value from the next state' },
                    { id: 'b', text: 'The maximum possible reward in the environment' },
                    { id: 'c', text: 'The average Q-value across all actions' },
                    { id: 'd', text: 'The minimum Q-value for safety guarantees' }
                ],
                correctAnswer: 'a',
                justification: 'max_a\' Q(s\', a\') bootstraps the optimal future return from the next state.',
                wrongJustifications: {
                    b: 'The max is over next-state Q-values, not over possible rewards.',
                    c: 'The max selects the best action, not an average.',
                    d: 'Q-learning uses max for optimality, not min for safety.'
                }
            },
            {
                id: 't2-8',
                question: 'What happens if the learning rate α is set too high in Q-learning?',
                options: [
                    { id: 'a', text: 'Q-values may oscillate or fail to converge due to high variance updates' },
                    { id: 'b', text: 'The algorithm becomes completely deterministic' },
                    { id: 'c', text: 'The discount factor is effectively reduced to zero' },
                    { id: 'd', text: 'The exploration rate automatically increases' }
                ],
                correctAnswer: 'a',
                justification: 'A high α gives too much weight to each TD target, causing instability.',
                wrongJustifications: {
                    b: 'Learning rate does not affect determinism.',
                    c: 'α and γ are independent parameters.',
                    d: 'α does not automatically adjust exploration rate.'
                }
            },
            {
                id: 't2-9',
                question: 'Which condition must be satisfied for Q-learning to converge to Q*?',
                options: [
                    { id: 'a', text: 'Every state-action pair must be visited infinitely often' },
                    { id: 'b', text: 'The policy must be purely greedy throughout training' },
                    { id: 'c', text: 'The environment must be deterministic' },
                    { id: 'd', text: 'The learning rate must be constant and non-decaying' }
                ],
                correctAnswer: 'a',
                justification: 'Infinite visitation of all (s,a) pairs ensures Q-learning can accurately estimate Q*.',
                wrongJustifications: {
                    b: 'A purely greedy policy would not explore sufficiently.',
                    c: 'Q-learning converges in stochastic environments.',
                    d: 'Convergence typically requires decaying learning rates (Robbins-Monro).'
                }
            },
            {
                id: 't2-10',
                question: 'How does the Q-learning update use the Bellman optimality equation?',
                options: [
                    { id: 'a', text: 'It approximates the optimality backup using max over next-state actions' },
                    { id: 'b', text: 'It solves the Bellman expectation equation for the current policy' },
                    { id: 'c', text: 'It ignores the Bellman equation entirely' },
                    { id: 'd', text: 'It uses the Bellman equation to update the policy directly' }
                ],
                correctAnswer: 'a',
                justification: 'The target R + γ max_a\' Q(s\', a\') approximates the Bellman optimality equation.',
                wrongJustifications: {
                    b: 'The expectation equation uses the policy distribution; Q-learning uses max.',
                    c: 'Q-learning is fundamentally derived from the Bellman optimality equation.',
                    d: 'Q-learning updates Q-values, not the policy directly.'
                }
            }
        ],
        recap: [
            'Q-learning is a model-free, off-policy algorithm learning Q* directly from experience.',
            'Update: Q(s,a) ← Q(s,a) + α[R + γ max_a\' Q(s\',a\') − Q(s,a)].',
            'Off-policy means learning optimal policy independently of the exploration behavior policy.',
            'Convergence requires infinite visitation and decaying learning rates.',
            'The max operator enforces the Bellman optimality principle.',
            'Exploration is managed through behavior policy while target remains greedy.',
            'Q-learning is simple, provably convergent, and applicable to stochastic environments.'
        ],
        skillMapping: [
            { skill: 'Recalling the Q-learning update rule and components', level: 'remember' },
            { skill: 'Explaining off-policy learning in Q-learning', level: 'understand' },
            { skill: 'Applying Q-learning to simple grid-world problems', level: 'apply' },
            { skill: 'Analyzing convergence conditions for Q-learning', level: 'analyze' }
        ]
    },
    Topic3_DeterministicStochasticPolicy: {
        prerequisites: [
            'Definition of policy in MDP',
            'Probability distributions over actions',
            'Expected return and value functions',
            'Exploration vs. exploitation',
            'Policy gradient concepts'
        ],
        mcqs: [
            {
                id: 't3-1',
                question: 'What is the defining characteristic of a deterministic policy?',
                options: [
                    { id: 'a', text: 'It selects a single action with probability 1 for each state' },
                    { id: 'b', text: 'It selects actions based on a probability distribution' },
                    { id: 'c', text: 'It changes randomly at each time step' },
                    { id: 'd', text: 'It requires prior knowledge of the environment model' }
                ],
                correctAnswer: 'a',
                justification: 'A deterministic policy π: S → A maps each state to exactly one action.',
                wrongJustifications: {
                    b: 'Selecting from a distribution defines a stochastic policy.',
                    c: 'Random changes describe non-stationary policies.',
                    d: 'Both policy types can be used in model-free or model-based settings.'
                }
            },
            {
                id: 't3-2',
                question: 'When would a stochastic policy be preferable to a deterministic policy?',
                options: [
                    { id: 'a', text: 'In partially observable or adversarial environments where randomness improves robustness' },
                    { id: 'b', text: 'When the environment is fully observable and deterministic' },
                    { id: 'c', text: 'Only when the action space is continuous' },
                    { id: 'd', text: 'When computational resources are extremely limited' }
                ],
                correctAnswer: 'a',
                justification: 'Stochastic policies prevent exploitation by adversaries and handle perceptual aliasing.',
                wrongJustifications: {
                    b: 'Deterministic policies are sufficient for fully observable deterministic environments.',
                    c: 'Stochastic policies are useful in both discrete and continuous spaces.',
                    d: 'Stochastic policies generally require more computation.'
                }
            },
            {
                id: 't3-3',
                question: 'How is a stochastic policy mathematically represented?',
                options: [
                    { id: 'a', text: 'As a probability distribution π(a|s) over actions conditioned on the state' },
                    { id: 'b', text: 'As a deterministic function π: S → A' },
                    { id: 'c', text: 'As a single probability value for each state' },
                    { id: 'd', text: 'As a reward function R(s, a)' }
                ],
                correctAnswer: 'a',
                justification: 'π(a|s) = P[A_t = a | S_t = s] specifies probabilities for each action given state s.',
                wrongJustifications: {
                    b: 'A deterministic function defines a deterministic, not stochastic, policy.',
                    c: 'A single probability is insufficient; the policy defines probabilities for all actions.',
                    d: 'The reward function is part of the environment, not the policy.'
                }
            },
            {
                id: 't3-4',
                question: 'In policy gradient methods, why are stochastic policies often preferred?',
                options: [
                    { id: 'a', text: 'They allow gradient-based optimization via score function tricks' },
                    { id: 'b', text: 'They eliminate the need for value function approximation' },
                    { id: 'c', text: 'They guarantee convergence to global optima' },
                    { id: 'd', text: 'They always produce higher rewards than deterministic policies' }
                ],
                correctAnswer: 'a',
                justification: 'Stochastic policies enable gradient estimation via the policy gradient theorem using the score function.',
                wrongJustifications: {
                    b: 'Most policy gradient methods still use value functions (actor-critic).',
                    c: 'No RL algorithm guarantees global optima in non-convex settings.',
                    d: 'Stochastic policies are not inherently higher-reward.'
                }
            },
            {
                id: 't3-5',
                question: 'What is the effect of reducing the temperature τ in a softmax policy π(a|s) ∝ exp(Q(s,a)/τ)?',
                options: [
                    { id: 'a', text: 'The policy becomes more greedy, concentrating on high-value actions' },
                    { id: 'b', text: 'The policy becomes more uniform across all actions' },
                    { id: 'c', text: 'The policy becomes independent of Q-values' },
                    { id: 'd', text: 'The policy only selects random actions' }
                ],
                correctAnswer: 'a',
                justification: 'As τ → 0, softmax approaches greedy selection; as τ → ∞, it approaches uniform random.',
                wrongJustifications: {
                    b: 'Lower τ concentrates probability, making the policy less uniform.',
                    c: 'Softmax always depends on Q-values through exponentiation.',
                    d: 'As τ → 0, it selects the highest-value action with near-certainty.'
                }
            },
            {
                id: 't3-6',
                question: 'What is a key disadvantage of stochastic policies compared to deterministic policies?',
                options: [
                    { id: 'a', text: 'Higher variance in returns due to random action selection' },
                    { id: 'b', text: 'Inability to explore the state space' },
                    { id: 'c', text: 'Lack of convergence guarantees in tabular settings' },
                    { id: 'd', text: 'Requirement for continuous action spaces' }
                ],
                correctAnswer: 'a',
                justification: 'Stochastic policies inject randomness, increasing return variance and potentially slowing learning.',
                wrongJustifications: {
                    b: 'Stochastic policies naturally encourage exploration.',
                    c: 'Stochastic policies converge under standard RL conditions.',
                    d: 'Stochastic policies work in both discrete and continuous spaces.'
                }
            },
            {
                id: 't3-7',
                question: 'In the epsilon-greedy policy, how is stochasticity introduced?',
                options: [
                    { id: 'a', text: 'With probability ε a random action is chosen; otherwise the greedy action is selected' },
                    { id: 'b', text: 'All actions are always selected with equal probability' },
                    { id: 'c', text: 'The greedy action is always selected but with added noise' },
                    { id: 'd', text: 'Actions are selected based on a Poisson distribution' }
                ],
                correctAnswer: 'a',
                justification: 'Epsilon-greedy mixes greedy (1−ε) with uniform random exploration (ε).',
                wrongJustifications: {
                    b: 'Uniform random is ε=1, not the general epsilon-greedy formulation.',
                    c: 'Gaussian noise applies to continuous action spaces, not epsilon-greedy.',
                    d: 'Epsilon-greedy uses uniform distribution for exploration, not Poisson.'
                }
            },
            {
                id: 't3-8',
                question: 'How does a deterministic policy relate to the optimal policy in a fully observable MDP?',
                options: [
                    { id: 'a', text: 'There always exists a deterministic optimal policy for any finite MDP' },
                    { id: 'b', text: 'The optimal policy is always stochastic' },
                    { id: 'c', text: 'Deterministic policies cannot be optimal in stochastic environments' },
                    { id: 'd', text: 'The optimal policy must be stochastic if there are ties in Q-values' }
                ],
                correctAnswer: 'a',
                justification: 'For any finite MDP, at least one deterministic optimal policy exists.',
                wrongJustifications: {
                    b: 'Deterministic optimal policies exist for all MDPs.',
                    c: 'Deterministic policies can be optimal even in stochastic environments.',
                    d: 'When Q-values are tied, any selection among tied actions yields the same value.'
                }
            },
            {
                id: 't3-9',
                question: 'What is deterministic policy gradient in continuous action spaces?',
                options: [
                    { id: 'a', text: 'The gradient of expected return with respect to a deterministic policy\'s parameters' },
                    { id: 'b', text: 'The gradient of a stochastic policy with respect to its temperature' },
                    { id: 'c', text: 'A method for converting stochastic policies to deterministic ones' },
                    { id: 'd', text: 'The gradient of the value function with respect to state' }
                ],
                correctAnswer: 'a',
                justification: 'DPG directly computes ∇_θ J(μ_θ) where μ_θ is a deterministic policy.',
                wrongJustifications: {
                    b: 'Temperature gradient adjusts exploration, not the deterministic policy gradient.',
                    c: 'DPG learns a deterministic policy directly.',
                    d: 'The gradient of value with respect to state is not policy gradient.'
                }
            },
            {
                id: 't3-10',
                question: 'When might a deterministic policy outperform a stochastic one in practice?',
                options: [
                    { id: 'a', text: 'When the optimal action is clear and exploration can be handled separately' },
                    { id: 'b', text: 'In partially observable environments with aliased states' },
                    { id: 'c', text: 'When the agent faces adversarial opponents' },
                    { id: 'd', text: 'When the environment has multiple equivalent optimal actions' }
                ],
                correctAnswer: 'a',
                justification: 'Deterministic policies have lower variance and are simpler when the best action is unambiguous.',
                wrongJustifications: {
                    b: 'Partial observability favors stochastic policies for robustness.',
                    c: 'Adversarial settings benefit from stochasticity.',
                    d: 'Multiple optimal actions do not inherently favor deterministic policies.'
                }
            }
        ],
        recap: [
            'Deterministic policies map each state to a single action; stochastic policies define a distribution.',
            'For any finite MDP, there exists at least one deterministic optimal policy.',
            'Stochastic policies provide built-in exploration and robustness.',
            'The softmax policy uses temperature τ to control stochasticity.',
            'Epsilon-greedy combines greedy selection with uniform random exploration.',
            'DPG enables model-free RL in continuous action spaces using deterministic policies.',
            'The choice involves a trade-off between variance, exploration, and robustness.'
        ],
        skillMapping: [
            { skill: 'Defining deterministic and stochastic policies', level: 'remember' },
            { skill: 'Comparing trade-offs between policy types', level: 'understand' },
            { skill: 'Implementing epsilon-greedy and softmax policies', level: 'apply' },
            { skill: 'Evaluating suitability of policy types for different environments', level: 'evaluate' }
        ]
    },
    Topic4_BellmanEquationValue: {
        prerequisites: [
            'Markov Decision Process definition',
            'Policy concept in MDP',
            'Expected return and discounting',
            'Recursive reasoning in sequential decisions',
            'State-value and action-value functions'
        ],
        mcqs: [
            {
                id: 't4-1',
                question: 'What does the Bellman expectation equation express?',
                options: [
                    { id: 'a', text: 'The relationship between the value of a state and the values of its successor states under a given policy' },
                    { id: 'b', text: 'The maximum possible reward in an MDP' },
                    { id: 'c', text: 'The probability of transitioning between states' },
                    { id: 'd', text: 'The gradient of the value function with respect to policy parameters' }
                ],
                correctAnswer: 'a',
                justification: 'The Bellman expectation equation decomposes V^π(s) into immediate reward plus discounted expected future value.',
                wrongJustifications: {
                    b: 'The Bellman equation relates values across states, not a maximum reward bound.',
                    c: 'Transition probabilities are inputs to the Bellman equation, not its output.',
                    d: 'The Bellman equation is a value decomposition, not a gradient expression.'
                }
            },
            {
                id: 't4-2',
                question: 'What is the mathematical form of the Bellman expectation equation for V^π(s)?',
                options: [
                    { id: 'a', text: 'V^π(s) = Σ_a π(a|s)[R(s,a) + γ Σ_{s\'} P(s\'|s,a) V^π(s\')]' },
                    { id: 'b', text: 'V^π(s) = max_a R(s,a) + γ Σ_{s\'} P(s\'|s,a) V^π(s\')' },
                    { id: 'c', text: 'V^π(s) = Σ_a π(a|s) Q^π(s,a)' },
                    { id: 'd', text: 'V^π(s) = R(s, π(s)) + γ V^π(s\')' }
                ],
                correctAnswer: 'a',
                justification: 'This is the full expectation: immediate reward plus discounted future value, averaged over policy and dynamics.',
                wrongJustifications: {
                    b: 'Using max instead of expectation makes this the optimality equation.',
                    c: 'This relates V and Q but is not the full Bellman expectation recursion.',
                    d: 'This assumes deterministic policy and environment.'
                }
            },
            {
                id: 't4-3',
                question: 'What does the Bellman optimality equation for V*(s) include?',
                options: [
                    { id: 'a', text: 'A max over actions instead of an average under the policy' },
                    { id: 'b', text: 'A min over actions to ensure safety' },
                    { id: 'c', text: 'The same expectation over actions as the expectation equation' },
                    { id: 'd', text: 'An integral over all possible policies' }
                ],
                correctAnswer: 'a',
                justification: 'The optimality equation replaces Σ_a π(a|s) with max_a, representing the optimal choice.',
                wrongJustifications: {
                    b: 'The optimality equation maximizes, not minimizes, value.',
                    c: 'It uses max instead of the policy-weighted average.',
                    d: 'It does not integrate over policies; it defines V* directly.'
                }
            },
            {
                id: 't4-4',
                question: 'How does the discount factor γ affect the Bellman equation?',
                options: [
                    { id: 'a', text: 'It determines how much future rewards contribute to the current state value' },
                    { id: 'b', text: 'It controls the learning rate for value updates' },
                    { id: 'c', text: 'It specifies the probability of episode termination' },
                    { id: 'd', text: 'It has no effect when γ = 0' }
                ],
                correctAnswer: 'a',
                justification: 'γ ∈ [0,1] weights future rewards: γ=0 is myopic, γ→1 is far-sighted.',
                wrongJustifications: {
                    b: 'The discount factor is distinct from the learning rate α.',
                    c: 'γ is a discount factor, not a termination probability.',
                    d: 'γ=0 completely ignores future rewards, which is a significant effect.'
                }
            },
            {
                id: 't4-5',
                question: 'What is the relationship between the Bellman equation and dynamic programming?',
                options: [
                    { id: 'a', text: 'DP uses the Bellman equation as a recurrence to iteratively compute value functions' },
                    { id: 'b', text: 'The Bellman equation is unrelated to dynamic programming' },
                    { id: 'c', text: 'DP replaces the Bellman equation with Monte Carlo sampling' },
                    { id: 'd', text: 'The Bellman equation is only used in model-free RL' }
                ],
                correctAnswer: 'a',
                justification: 'DP methods like policy evaluation and value iteration directly apply the Bellman equation as an update rule.',
                wrongJustifications: {
                    b: 'The Bellman equation is the foundation of DP for MDPs.',
                    c: 'DP uses the Bellman equation with known models; Monte Carlo is separate.',
                    d: 'The Bellman equation is fundamental to both DP and TD methods.'
                }
            },
            {
                id: 't4-6',
                question: 'In the Bellman equation, what does expected in expected return refer to?',
                options: [
                    { id: 'a', text: 'The expectation over stochastic transitions, rewards, and policy choices' },
                    { id: 'b', text: 'The maximum possible return over all trajectories' },
                    { id: 'c', text: 'The minimum return guaranteed by the policy' },
                    { id: 'd', text: 'The sum of all rewards without discounting' }
                ],
                correctAnswer: 'a',
                justification: 'The Bellman equation takes expectations over all randomness: policy, transitions, and rewards.',
                wrongJustifications: {
                    b: 'It computes the mean, not the maximum.',
                    c: 'It gives the expected value, not a lower bound.',
                    d: 'The Bellman equation uses discounted return.'
                }
            },
            {
                id: 't4-7',
                question: 'How are the Bellman equations for V^π(s) and Q^π(s,a) related?',
                options: [
                    { id: 'a', text: 'Q^π(s,a) = R(s,a) + γ Σ P(s\'|s,a) V^π(s\') and V^π(s) = Σ_a π(a|s) Q^π(s,a)' },
                    { id: 'b', text: 'They are independent and unrelated equations' },
                    { id: 'c', text: 'V^π(s) = max_a Q^π(s,a) and Q^π(s,a) = V^π(s\')' },
                    { id: 'd', text: 'Both equations are identical for deterministic policies' }
                ],
                correctAnswer: 'a',
                justification: 'The two equations are mutually recursive: Q^π uses V^π of next state; V^π averages Q^π.',
                wrongJustifications: {
                    b: 'V^π and Q^π are deeply interconnected through dynamics and policy.',
                    c: 'V^π(s) = max_a Q^π(s,a) holds only for V*, not V^π.',
                    d: 'Even with deterministic policies, the equations remain distinct.'
                }
            },
            {
                id: 't4-8',
                question: 'What does the Bellman equation imply about the Markov property?',
                options: [
                    { id: 'a', text: 'The value of a state depends only on the current state, not the full history' },
                    { id: 'b', text: 'The value depends on all past states visited' },
                    { id: 'c', text: 'The Bellman equation only applies to non-Markovian environments' },
                    { id: 'd', text: 'The Markov property is irrelevant to the Bellman equation' }
                ],
                correctAnswer: 'a',
                justification: 'The Bellman decomposition uses only the current state, valid because of the Markov property.',
                wrongJustifications: {
                    b: 'The Bellman equation depends only on the current state.',
                    c: 'The Bellman equation is defined for MDPs that satisfy the Markov property.',
                    d: 'The Markov property is essential for the recursive decomposition.'
                }
            },
            {
                id: 't4-9',
                question: 'What is value iteration and how does it use the Bellman equation?',
                options: [
                    { id: 'a', text: 'It iteratively applies the Bellman optimality equation to converge to V*' },
                    { id: 'b', text: 'It uses Monte Carlo sampling to estimate the Bellman equation' },
                    { id: 'c', text: 'It solves the Bellman equation by matrix inversion in one step' },
                    { id: 'd', text: 'It applies the Bellman expectation equation for a fixed policy' }
                ],
                correctAnswer: 'a',
                justification: 'Value iteration applies V_{k+1}(s) = max_a [R(s,a) + γ Σ P(s\'|s,a) V_k(s\')] until convergence.',
                wrongJustifications: {
                    b: 'Value iteration uses known dynamics, not Monte Carlo sampling.',
                    c: 'Matrix inversion is used in MRPs, not value iteration.',
                    d: 'Applying the expectation equation for a fixed policy is policy evaluation.'
                }
            },
            {
                id: 't4-10',
                question: 'Why is the Bellman equation called a contraction mapping?',
                options: [
                    { id: 'a', text: 'Applying the Bellman operator brings value functions closer, guaranteeing convergence' },
                    { id: 'b', text: 'It reduces the dimensionality of the state space' },
                    { id: 'c', text: 'It contracts the number of actions in each state' },
                    { id: 'd', text: 'It physically compresses the state representation' }
                ],
                correctAnswer: 'a',
                justification: 'The Bellman operator is a contraction in the supremum norm with modulus γ, guaranteeing convergence to V*.',
                wrongJustifications: {
                    b: 'It does not change the dimensionality of the state space.',
                    c: 'All actions remain; contraction is about value function convergence.',
                    d: 'Contraction is a mathematical property of the operator.'
                }
            }
        ],
        recap: [
            'The Bellman expectation equation decomposes V^π(s) as immediate reward plus discounted future value.',
            'The Bellman optimality equation uses max_a instead of the policy expectation.',
            'The equations are recursive, leveraging the Markov property.',
            'DP methods like policy evaluation and value iteration are founded on Bellman equations.',
            'γ controls how much future rewards influence current state values.',
            'The Bellman operator is a contraction mapping, guaranteeing convergence.',
            'V^π and Q^π are related through mutual Bellman recursions.'
        ],
        skillMapping: [
            { skill: 'Stating the Bellman expectation and optimality equations', level: 'remember' },
            { skill: 'Explaining the recursive decomposition of value functions', level: 'understand' },
            { skill: 'Applying the Bellman equation to compute value functions', level: 'apply' },
            { skill: 'Analyzing convergence through the contraction mapping property', level: 'analyze' }
        ]
    },
    Topic5_RecyclingRobotCase: {
        prerequisites: [
            'MDP formulation with states and actions',
            'Bellman expectation equation',
            'Value iteration concept',
            'Reward function design',
            'Policy evaluation basics'
        ],
        mcqs: [
            {
                id: 't5-1',
                question: 'In the recycling robot MDP, what typically defines the state space?',
                options: [
                    { id: 'a', text: 'The battery charge level (e.g., High and Low)' },
                    { id: 'b', text: 'The robot\'s physical location in the building' },
                    { id: 'c', text: 'The amount of recyclable material collected' },
                    { id: 'd', text: 'The time of day' }
                ],
                correctAnswer: 'a',
                justification: 'The classic example uses battery level (High/Low) as state since energy determines action availability.',
                wrongJustifications: {
                    b: 'Location is not the state variable in the canonical recycling robot MDP.',
                    c: 'Collected material is an outcome, not the state variable.',
                    d: 'Time of day is not part of the standard state representation.'
                }
            },
            {
                id: 't5-2',
                question: 'What are the typical actions available to the recycling robot?',
                options: [
                    { id: 'a', text: 'Search (for cans), Wait (conserve battery), Recharge (return to base)' },
                    { id: 'b', text: 'Forward, Backward, Left, Right' },
                    { id: 'c', text: 'Pick up, Drop off, Sort, Compress' },
                    { id: 'd', text: 'On, Off, Sleep, Hibernate' }
                ],
                correctAnswer: 'a',
                justification: 'The standard actions are Search (costs battery, finds cans), Wait (conserves energy), Recharge (restores battery).',
                wrongJustifications: {
                    b: 'Navigation actions are from grid-world problems.',
                    c: 'Sorting and compressing are not in the canonical model.',
                    d: 'Power management actions are Search/Wait/Recharge specifically.'
                }
            },
            {
                id: 't5-3',
                question: 'What is the key trade-off in the recycling robot problem?',
                options: [
                    { id: 'a', text: 'Searching yields higher reward but depletes battery; waiting conserves battery but earns less' },
                    { id: 'b', text: 'Recharging is faster than searching' },
                    { id: 'c', text: 'The robot must choose between recycling different materials' },
                    { id: 'd', text: 'The robot decides which locations to visit' }
                ],
                correctAnswer: 'a',
                justification: 'The core dilemma is energy vs. reward: Search risks depletion, Wait preserves energy for future searching.',
                wrongJustifications: {
                    b: 'Recharging typically takes multiple time steps.',
                    c: 'Material type is not differentiated in the basic model.',
                    d: 'Location choice is not modeled in the simplified state representation.'
                }
            },
            {
                id: 't5-4',
                question: 'What happens to the robot\'s battery when it chooses Search in the Low state?',
                options: [
                    { id: 'a', text: 'The battery may deplete completely, forcing a costly recharge' },
                    { id: 'b', text: 'The battery fully recharges' },
                    { id: 'c', text: 'Nothing changes; Search has no effect on battery' },
                    { id: 'd', text: 'The robot can continue indefinitely without issue' }
                ],
                correctAnswer: 'a',
                justification: 'In the Low state, searching has a high probability of complete depletion, requiring a rescue/costly recharge.',
                wrongJustifications: {
                    b: 'Recharge, not Search, restores the battery.',
                    c: 'Search always costs battery; in Low it risks complete depletion.',
                    d: 'Continuing to search in Low state risks shutdown.'
                }
            },
            {
                id: 't5-5',
                question: 'How does the recycling robot illustrate the value of waiting?',
                options: [
                    { id: 'a', text: 'Waiting preserves battery so the robot can search more effectively later' },
                    { id: 'b', text: 'Waiting always earns more reward than searching' },
                    { id: 'c', text: 'Waiting reduces the state space to a single state' },
                    { id: 'd', text: 'Waiting eliminates the need for a policy' }
                ],
                correctAnswer: 'a',
                justification: 'Waiting in Low state avoids depletion and enables future high-reward searches from a High battery state.',
                wrongJustifications: {
                    b: 'Waiting earns a small reward, typically less than successful searching.',
                    c: 'Waiting does not change the state space.',
                    d: 'A policy is still needed to decide when to wait.'
                }
            },
            {
                id: 't5-6',
                question: 'What does P(Low | High, Search) represent in the recycling robot?',
                options: [
                    { id: 'a', text: 'The probability the battery drops from High to Low after searching' },
                    { id: 'b', text: 'The probability of finding recyclable material' },
                    { id: 'c', text: 'The probability the robot recharges successfully' },
                    { id: 'd', text: 'The probability that Low transitions to High' }
                ],
                correctAnswer: 'a',
                justification: 'This transition captures battery degradation from High to Low after the energy-intensive Search action.',
                wrongJustifications: {
                    b: 'Finding material relates to reward, not state transitions.',
                    c: 'Recharge success is a different transition (Low to High when Recharge is chosen).',
                    d: 'Transitions from Low to High occur when recharging.'
                }
            },
            {
                id: 't5-7',
                question: 'How can the optimal policy for the recycling robot be found?',
                options: [
                    { id: 'a', text: 'By solving the Bellman equations for the two-state MDP via value iteration' },
                    { id: 'b', text: 'By randomly trying all possible action sequences' },
                    { id: 'c', text: 'By manually programming all possible scenarios' },
                    { id: 'd', text: 'By using supervised learning on collected trajectories' }
                ],
                correctAnswer: 'a',
                justification: 'This small MDP (2 states, 3 actions) can be solved exactly using value iteration on the Bellman optimality equation.',
                wrongJustifications: {
                    b: 'Random search is inefficient and not guaranteed optimal.',
                    c: 'Manual programming would not adapt to stochastic dynamics.',
                    d: 'Supervised learning requires labeled optimal actions, which are what is sought.'
                }
            },
            {
                id: 't5-8',
                question: 'What reward structure is typical for the recycling robot?',
                options: [
                    { id: 'a', text: 'Positive reward for collecting material when searching, none for waiting, negative for depletion' },
                    { id: 'b', text: 'Zero reward for all actions' },
                    { id: 'c', text: 'Negative reward for every action' },
                    { id: 'd', text: 'Positive reward only for the Recharge action' }
                ],
                correctAnswer: 'a',
                justification: 'Search yields positive reward on success, Wait yields small/zero reward, depletion carries negative reward.',
                wrongJustifications: {
                    b: 'Zero rewards would provide no incentive.',
                    c: 'All-negative rewards would discourage activity.',
                    d: 'Recharge typically yields zero reward during the process.'
                }
            },
            {
                id: 't5-9',
                question: 'What does the optimal policy typically prescribe when the battery is High?',
                options: [
                    { id: 'a', text: 'Always Search, because depletion risk is low and reward is high' },
                    { id: 'b', text: 'Always Recharge, to ensure the battery stays full' },
                    { id: 'c', text: 'Always Wait, to maximize battery conservation' },
                    { id: 'd', text: 'A random mix of all three actions' }
                ],
                correctAnswer: 'a',
                justification: 'When High, depletion probability is low, so the optimal policy is to Search for maximum expected reward.',
                wrongJustifications: {
                    b: 'Recharging when High wastes potential collection time.',
                    c: 'Waiting when High is overly conservative.',
                    d: 'The optimal policy is deterministic (always Search) in the standard formulation.'
                }
            },
            {
                id: 't5-10',
                question: 'What does the recycling robot case study teach about MDP modeling?',
                options: [
                    { id: 'a', text: 'How a simple two-state MDP captures essential real-world risk-reward trade-offs' },
                    { id: 'b', text: 'That MDPs cannot model energy constraints' },
                    { id: 'c', text: 'That only continuous state spaces are useful for robotics' },
                    { id: 'd', text: 'That discount factors are irrelevant in robotics' }
                ],
                correctAnswer: 'a',
                justification: 'The recycling robot demonstrates how a minimal MDP captures exploration, risk, energy management, and delayed reward.',
                wrongJustifications: {
                    b: 'It explicitly models energy constraints through battery state transitions.',
                    c: 'Discrete state MDPs are very useful for robotics.',
                    d: 'The discount factor is critical for weighing immediate vs. future consequences.'
                }
            }
        ],
        recap: [
            'The recycling robot has two states (High/Low battery) and three actions (Search/Wait/Recharge).',
            'Search yields high reward but risks depletion; Wait conserves battery.',
            'The core trade-off is between immediate collection and long-term energy sustainability.',
            'The optimal policy in High is typically Search; in Low it is Recharge or Wait.',
            'Transition probabilities capture battery degradation and recharge success.',
            'The problem can be solved exactly via value iteration.',
            'This case illustrates how small MDPs model meaningful real-world dilemmas.'
        ],
        skillMapping: [
            { skill: 'Describing the recycling robot MDP components', level: 'remember' },
            { skill: 'Explaining the energy-reward trade-off', level: 'understand' },
            { skill: 'Computing the optimal policy via value iteration', level: 'apply' },
            { skill: 'Analyzing how small MDPs capture real-world trade-offs', level: 'analyze' }
        ]
    },
    Topic6_OptimalPolicyValue: {
        prerequisites: [
            'Policy definition in MDP',
            'Bellman optimality equation',
            'Value iteration and policy iteration',
            'Value functions and Q-functions',
            'Convergence of iterative methods'
        ],
        mcqs: [
            {
                id: 't6-1',
                question: 'What is an optimal policy π*?',
                options: [
                    { id: 'a', text: 'A policy whose expected return is ≥ all other policies in every state' },
                    { id: 'b', text: 'A policy that maximizes immediate reward in every state' },
                    { id: 'c', text: 'A policy that is purely random' },
                    { id: 'd', text: 'A policy that minimizes computation time' }
                ],
                correctAnswer: 'a',
                justification: 'π* is optimal if V^π*(s) ≥ V^π(s) for all states s and all policies π.',
                wrongJustifications: {
                    b: 'Maximizing immediate reward ignores future consequences.',
                    c: 'A random policy is typically suboptimal.',
                    d: 'Computational efficiency is separate from optimality.'
                }
            },
            {
                id: 't6-2',
                question: 'How is the optimal state-value function V*(s) characterized?',
                options: [
                    { id: 'a', text: 'V*(s) = max_a [R(s,a) + γ Σ P(s\'|s,a) V*(s\')]' },
                    { id: 'b', text: 'V*(s) = Σ_a π(a|s) [R(s,a) + γ Σ P(s\'|s,a) V*(s\')]' },
                    { id: 'c', text: 'V*(s) = min_a [R(s,a) + γ Σ P(s\'|s,a) V*(s\')]' },
                    { id: 'd', text: 'V*(s) = R(s) + γ V*(s\')' }
                ],
                correctAnswer: 'a',
                justification: 'V* satisfies the Bellman optimality equation using max_a over actions.',
                wrongJustifications: {
                    b: 'Using policy expectation gives the Bellman expectation equation for a specific policy.',
                    c: 'The optimal value maximizes, not minimizes, expected return.',
                    d: 'This simplified form assumes deterministic dynamics.'
                }
            },
            {
                id: 't6-3',
                question: 'What is the relationship between V*(s) and Q*(s, a)?',
                options: [
                    { id: 'a', text: 'V*(s) = max_a Q*(s, a) and Q*(s,a) = R(s,a) + γ Σ P(s\'|s,a) V*(s\')' },
                    { id: 'b', text: 'V*(s) = Q*(s, a) for all actions a' },
                    { id: 'c', text: 'Q*(s, a) = max_s V*(s) for each action' },
                    { id: 'd', text: 'V*(s) and Q*(s, a) are unrelated' }
                ],
                correctAnswer: 'a',
                justification: 'V*(s) is the maximum Q*(s,a); Q*(s,a) is expressed in terms of V* of the next state.',
                wrongJustifications: {
                    b: 'Q*(s,a) varies across actions; only the maximum equals V*(s).',
                    c: 'Q* is defined per state-action pair, not as a function of all states.',
                    d: 'V* and Q* are deeply related through Bellman optimality equations.'
                }
            },
            {
                id: 't6-4',
                question: 'In policy iteration, how is the optimal policy guaranteed to be found?',
                options: [
                    { id: 'a', text: 'By alternating between evaluating the current policy and making it greedy' },
                    { id: 'b', text: 'By randomly sampling policies until one works' },
                    { id: 'c', text: 'By fixing the policy and never changing it' },
                    { id: 'd', text: 'By using gradient descent on the policy parameters' }
                ],
                correctAnswer: 'a',
                justification: 'Policy iteration alternates between evaluation and greedy improvement, monotonically improving to π*.',
                wrongJustifications: {
                    b: 'Random sampling is inefficient and not guaranteed.',
                    c: 'A fixed policy will not improve unless already optimal.',
                    d: 'Gradient methods are used in policy gradient RL, not classical policy iteration.'
                }
            },
            {
                id: 't6-5',
                question: 'What does the principle of optimality state in MDPs?',
                options: [
                    { id: 'a', text: 'An optimal policy\'s remaining decisions are optimal for the resulting state' },
                    { id: 'b', text: 'The optimal policy is unique for every MDP' },
                    { id: 'c', text: 'The optimal policy can always be found by greedy action selection' },
                    { id: 'd', text: 'The optimal value function is always zero' }
                ],
                correctAnswer: 'a',
                justification: 'Bellman\'s principle: sub-policies of an optimal policy are optimal for their subproblems.',
                wrongJustifications: {
                    b: 'Multiple policies can be optimal with the same maximal value.',
                    c: 'Greedy selection requires the correct value function.',
                    d: 'Optimal value functions depend on rewards and dynamics.'
                }
            },
            {
                id: 't6-6',
                question: 'What is the uniqueness property of V*?',
                options: [
                    { id: 'a', text: 'V* is unique, though multiple optimal policies may exist' },
                    { id: 'b', text: 'V* is non-unique and depends on the algorithm used' },
                    { id: 'c', text: 'V* does not exist for infinite MDPs' },
                    { id: 'd', text: 'V* is the same for all possible discount factors' }
                ],
                correctAnswer: 'a',
                justification: 'The Bellman optimality equation has a unique fixed point V* due to the contraction property.',
                wrongJustifications: {
                    b: 'V* is mathematically unique; any correct algorithm converges to the same V*.',
                    c: 'V* exists for infinite-horizon discounted MDPs under standard conditions.',
                    d: 'V* depends on γ; changing γ changes the optimal value function.'
                }
            },
            {
                id: 't6-7',
                question: 'How does the optimal policy relate to Q*(s, a)?',
                options: [
                    { id: 'a', text: 'Any policy maximizing Q*(s,a) in each state is optimal' },
                    { id: 'b', text: 'The optimal policy minimizes Q*(s,a)' },
                    { id: 'c', text: 'Q*(s,a) is independent of the policy' },
                    { id: 'd', text: 'The optimal policy ignores Q* and uses V* directly' }
                ],
                correctAnswer: 'a',
                justification: 'Given Q*, π*(s) = argmax_a Q*(s,a), and any tie-breaking yields an equally optimal policy.',
                wrongJustifications: {
                    b: 'The optimal policy maximizes, not minimizes, Q*(s,a).',
                    c: 'Q* characterizes the optimal policy inherently.',
                    d: 'Using V* requires a model; Q* directly gives actions without a model.'
                }
            },
            {
                id: 't6-8',
                question: 'What is the advantage of policy iteration over value iteration?',
                options: [
                    { id: 'a', text: 'It often converges in fewer iterations, though each iteration is more expensive' },
                    { id: 'b', text: 'It is always faster in total runtime' },
                    { id: 'c', text: 'Value iteration does not require a model' },
                    { id: 'd', text: 'Policy iteration requires no matrix operations' }
                ],
                correctAnswer: 'a',
                justification: 'Policy iteration needs fewer iterations as the policy space is smaller, but each involves full evaluation.',
                wrongJustifications: {
                    b: 'Total runtime depends on the problem.',
                    c: 'Both methods are model-based DP.',
                    d: 'Policy evaluation may involve matrix operations.'
                }
            },
            {
                id: 't6-9',
                question: 'How does the discount factor γ affect the optimal policy?',
                options: [
                    { id: 'a', text: 'Smaller γ makes the optimal policy more myopic, favoring immediate rewards' },
                    { id: 'b', text: 'γ has no effect on the optimal policy' },
                    { id: 'c', text: 'Larger γ makes the policy ignore immediate rewards entirely' },
                    { id: 'd', text: 'γ only affects convergence rate, not the policy' }
                ],
                correctAnswer: 'a',
                justification: 'Small γ heavily discounts future, so the optimal policy prioritizes immediate reward.',
                wrongJustifications: {
                    b: 'γ directly shapes the immediate vs. future trade-off.',
                    c: 'Even with γ close to 1, immediate rewards still matter.',
                    d: 'γ affects both the optimal policy and convergence rate.'
                }
            },
            {
                id: 't6-10',
                question: 'What is the curse of dimensionality in finding optimal policies?',
                options: [
                    { id: 'a', text: 'State count grows exponentially with state variables, making exact DP intractable' },
                    { id: 'b', text: 'The discount factor increases dimensionality' },
                    { id: 'c', text: 'Optimal policies require higher-dimensional action spaces' },
                    { id: 'd', text: 'The Bellman equation cannot be written in high dimensions' }
                ],
                correctAnswer: 'a',
                justification: 'As state variables increase, |S| grows exponentially, making DP (which scales with |S|) infeasible.',
                wrongJustifications: {
                    b: 'γ is a scalar and does not affect state dimensionality.',
                    c: 'This is a separate issue from the curse of dimensionality.',
                    d: 'The Bellman equation can be written in any dimension; the issue is tractability.'
                }
            }
        ],
        recap: [
            'π* achieves the highest expected return from every state.',
            'V* satisfies the Bellman optimality equation with max_a.',
            'V*(s) = max_a Q*(s,a); Q*(s,a) = R(s,a) + γ Σ P(s\'|s,a) V*(s\').',
            'Policy iteration alternates between evaluation and greedy improvement.',
            'Bellman\'s principle of optimality enables recursive decomposition.',
            'V* is unique, but multiple optimal policies may exist.',
            'γ controls the myopia of the optimal policy.',
            'The curse of dimensionality limits exact DP to small state spaces.'
        ],
        skillMapping: [
            { skill: 'Defining optimal policy and optimal value functions', level: 'remember' },
            { skill: 'Explaining the Bellman principle of optimality', level: 'understand' },
            { skill: 'Applying policy iteration to find optimal policies', level: 'apply' },
            { skill: 'Analyzing the effect of γ on policy optimality', level: 'analyze' }
        ]
    },
    Topic7_BackupDiagram: {
        prerequisites: [
            'Value functions and Bellman equations',
            'State-action-reward-next state transitions',
            'Expectations in MDPs',
            'Policy evaluation',
            'Dynamic programming concepts'
        ],
        mcqs: [
            {
                id: 't7-1',
                question: 'What does a backup diagram represent in RL?',
                options: [
                    { id: 'a', text: 'A graphical representation of the update from successor states to a parent node' },
                    { id: 'b', text: 'A diagram showing the physical robot trajectory' },
                    { id: 'c', text: 'A hardware schematic of the computing system' },
                    { id: 'd', text: 'A plot of reward values over time' }
                ],
                correctAnswer: 'a',
                justification: 'Backup diagrams show how value information is backed up from successor states to the current state.',
                wrongJustifications: {
                    b: 'Backup diagrams abstract transition relationships, not physical trajectories.',
                    c: 'They are algorithmic diagrams, not hardware schematics.',
                    d: 'Reward plots are learning curves, not backup diagrams.'
                }
            },
            {
                id: 't7-2',
                question: 'In a V^π backup diagram, what do solid and open circles represent?',
                options: [
                    { id: 'a', text: 'Solid circles represent states; open circles represent state-action pairs' },
                    { id: 'b', text: 'Solid circles represent rewards; open circles represent states' },
                    { id: 'c', text: 'Solid circles represent actions; open circles represent states' },
                    { id: 'd', text: 'Solid circles represent episodes; open circles represent steps' }
                ],
                correctAnswer: 'a',
                justification: 'Solid circles = states; open circles = state-action pairs in standard backup diagram notation.',
                wrongJustifications: {
                    b: 'Rewards are typically shown as small diamonds.',
                    c: 'This reverses the convention: states are solid, actions are open.',
                    d: 'Episodes and steps are not represented as solid/open circles.'
                }
            },
            {
                id: 't7-3',
                question: 'What does the full backup diagram for V^π look like?',
                options: [
                    { id: 'a', text: 'A root state branching to action nodes, each branching to next states, weighted by π and P' },
                    { id: 'b', text: 'A single state connected directly to a single next state' },
                    { id: 'c', text: 'A root action branching to states without considering the policy' },
                    { id: 'd', text: 'A chain of states without action nodes' }
                ],
                correctAnswer: 'a',
                justification: 'The full backup shows root state, action choices (weighted by π), transitions to next states (weighted by P).',
                wrongJustifications: {
                    b: 'Omitting action nodes hides how policy affects value updates.',
                    c: 'Without policy weighting, it would not represent V^π.',
                    d: 'A state chain without actions represents an MRP, not an MDP backup.'
                }
            },
            {
                id: 't7-4',
                question: 'How does the Q-learning backup diagram differ from SARSA?',
                options: [
                    { id: 'a', text: 'Q-learning branches to all next actions via max; SARSA follows the specific next action' },
                    { id: 'b', text: 'They are identical in all respects' },
                    { id: 'c', text: 'Q-learning uses solid circles for actions; SARSA uses open circles' },
                    { id: 'd', text: 'SARSA branches to all actions; Q-learning follows one action' }
                ],
                correctAnswer: 'a',
                justification: 'Q-learning shows (s,a) → s\' → all a\' with max; SARSA shows (s,a) → s\' → a\' (the chosen action).',
                wrongJustifications: {
                    b: 'They differ in how the next action is handled (max vs on-policy).',
                    c: 'Node conventions are the same across both algorithms.',
                    d: 'This is reversed: SARSA follows one action; Q-learning considers all via max.'
                }
            },
            {
                id: 't7-5',
                question: 'What does the depth of a backup diagram represent?',
                options: [
                    { id: 'a', text: 'How many steps ahead the backup considers (1-step, n-step, or full return)' },
                    { id: 'b', text: 'The number of states in the MDP' },
                    { id: 'c', text: 'The dimensionality of the action space' },
                    { id: 'd', text: 'The number of episodes run during training' }
                ],
                correctAnswer: 'a',
                justification: 'Depth indicates backup horizon: 1-step shows one transition; n-step shows n; MC extends to terminal.',
                wrongJustifications: {
                    b: 'State count is a property of the MDP, not backup depth.',
                    c: 'Action space dimensionality is unrelated.',
                    d: 'Training episodes are not directly represented.'
                }
            },
            {
                id: 't7-6',
                question: 'In the backup for the Bellman optimality equation for Q*, what differs from the expectation backup?',
                options: [
                    { id: 'a', text: 'The next-state action selection uses max instead of policy averaging' },
                    { id: 'b', text: 'The backup starts from an action node instead of a state node' },
                    { id: 'c', text: 'There are no state nodes in the optimality backup' },
                    { id: 'd', text: 'The reward appears at the end instead of the beginning' }
                ],
                correctAnswer: 'a',
                justification: 'The optimality backup uses max at the next state; the expectation backup averages according to π.',
                wrongJustifications: {
                    b: 'Both start from a state-action pair (open circle then solid state).',
                    c: 'State nodes appear in both diagrams.',
                    d: 'Reward placement is the same in both.'
                }
            },
            {
                id: 't7-7',
                question: 'What is the purpose of backup diagrams in RL pedagogy?',
                options: [
                    { id: 'a', text: 'To visually clarify update relationships between states, actions, and rewards' },
                    { id: 'b', text: 'To replace mathematical equations entirely' },
                    { id: 'c', text: 'To measure computational complexity of algorithms' },
                    { id: 'd', text: 'To design the user interface of RL systems' }
                ],
                correctAnswer: 'a',
                justification: 'Backup diagrams provide an intuitive visual representation of how different algorithms propagate value information.',
                wrongJustifications: {
                    b: 'Diagrams complement, not replace, equations.',
                    c: 'Complexity analysis requires different tools.',
                    d: 'Backup diagrams are for algorithm understanding, not UI design.'
                }
            },
            {
                id: 't7-8',
                question: 'How does a Monte Carlo backup diagram differ from a 1-step TD backup?',
                options: [
                    { id: 'a', text: 'MC extends to the terminal state; 1-step TD shows only one transition' },
                    { id: 'b', text: 'MC uses open circles; TD uses solid circles' },
                    { id: 'c', text: 'They are structurally identical' },
                    { id: 'd', text: 'TD includes only actions; MC includes only states' }
                ],
                correctAnswer: 'a',
                justification: 'MC diagrams include the full trajectory until termination; TD(0) shows a single step and bootstraps.',
                wrongJustifications: {
                    b: 'Both use the same node conventions.',
                    c: 'They differ in backup depth (full vs 1-step).',
                    d: 'Both can include states and actions.'
                }
            },
            {
                id: 't7-9',
                question: 'In the expected SARSA backup, how is the next action handled?',
                options: [
                    { id: 'a', text: 'It takes expectation over all next actions weighted by the policy' },
                    { id: 'b', text: 'It uses max over all actions like Q-learning' },
                    { id: 'c', text: 'It ignores the next action entirely' },
                    { id: 'd', text: 'It samples a random action without policy weighting' }
                ],
                correctAnswer: 'a',
                justification: 'Expected SARSA averages over all next actions according to π(a\'|s\'), reducing variance.',
                wrongJustifications: {
                    b: 'Using max would be Q-learning.',
                    c: 'The next action is central to the backup.',
                    d: 'It weights by policy, not uniform sampling.'
                }
            },
            {
                id: 't7-10',
                question: 'What does the backup operation refer to?',
                options: [
                    { id: 'a', text: 'Updating a value estimate using information from successor states' },
                    { id: 'b', text: 'Creating a backup copy of the current policy' },
                    { id: 'c', text: 'Saving the learning algorithm state to disk' },
                    { id: 'd', text: 'Reverting to a previous policy when performance drops' }
                ],
                correctAnswer: 'a',
                justification: 'Backup transfers return information from future states to update the current value estimate.',
                wrongJustifications: {
                    b: 'Policy backup is a different concept.',
                    c: 'Saving to disk is checkpointing.',
                    d: 'Reverting is rollback, not value backup.'
                }
            }
        ],
        recap: [
            'Backup diagrams show how value propagates from future states to current states.',
            'Solid circles = states; open circles = state-action pairs.',
            'Full backups show all transitions weighted by probabilities.',
            'Sample backups use a single trajectory instead of full expectation.',
            'Q-learning backup uses max; SARSA uses the on-policy sampled action.',
            'n-step and MC backups extend diagram depth.',
            'Expected SARSA reduces variance via expectation over next actions.'
        ],
        skillMapping: [
            { skill: 'Identifying node types in backup diagrams', level: 'remember' },
            { skill: 'Interpreting backup diagrams for different algorithms', level: 'understand' },
            { skill: 'Constructing backup diagrams for Q-learning, SARSA, and DP', level: 'apply' },
            { skill: 'Comparing backup structures across RL methods', level: 'analyze' }
        ]
    },
    Topic8_QLearningOverview: {
        prerequisites: [
            'Temporal difference learning concept',
            'Off-policy vs on-policy distinction',
            'Q-function and its interpretation',
            'Bellman optimality equation',
            'Exploration strategies'
        ],
        mcqs: [
            {
                id: 't8-1',
                question: 'What is the primary goal of Q-learning?',
                options: [
                    { id: 'a', text: 'To learn the optimal action-value function Q* directly from experience' },
                    { id: 'b', text: 'To model the transition probabilities of the environment' },
                    { id: 'c', text: 'To cluster states into groups' },
                    { id: 'd', text: 'To generate synthetic trajectories' }
                ],
                correctAnswer: 'a',
                justification: 'Q-learning directly approximates Q*(s,a) using TD updates without requiring an environment model.',
                wrongJustifications: {
                    b: 'Q-learning is model-free; it does not estimate transition probabilities.',
                    c: 'State clustering is not the goal of Q-learning.',
                    d: 'Generating synthetic data is not its objective.'
                }
            },
            {
                id: 't8-2',
                question: 'How is the Q-learning algorithm initialized?',
                options: [
                    { id: 'a', text: 'Q-values are initialized arbitrarily (e.g., to zero) for all state-action pairs' },
                    { id: 'b', text: 'Q-values are set to infinity to encourage exploration' },
                    { id: 'c', text: 'Q-values are computed from the known model' },
                    { id: 'd', text: 'Q-values are initialized to the true optimal values' }
                ],
                correctAnswer: 'a',
                justification: 'Q-learning starts with arbitrary estimates (often zeros) and refines them through experience.',
                wrongJustifications: {
                    b: 'Infinite Q-values would cause numerical issues.',
                    c: 'If the model were known, DP would be used.',
                    d: 'True optimal values are unknown; that is what is being learned.'
                }
            },
            {
                id: 't8-3',
                question: 'What is the role of the Q-table in tabular Q-learning?',
                options: [
                    { id: 'a', text: 'It stores the estimated Q-value for every state-action pair' },
                    { id: 'b', text: 'It records the reward for each action' },
                    { id: 'c', text: 'It stores the policy as a list of action sequences' },
                    { id: 'd', text: 'It keeps a history of all past episodes' }
                ],
                correctAnswer: 'a',
                justification: 'The Q-table is a |S| × |A| lookup table storing current Q(s,a) estimates.',
                wrongJustifications: {
                    b: 'Rewards are observed from the environment, not stored in the Q-table.',
                    c: 'The policy is derived from Q-values, but the table stores values, not policies.',
                    d: 'Episodic history is not stored; only current estimates are kept.'
                }
            },
            {
                id: 't8-4',
                question: 'In Q-learning, when is the Q-table updated?',
                options: [
                    { id: 'a', text: 'After each transition (s, a, R, s\') using the TD update rule' },
                    { id: 'b', text: 'Only at the end of each episode' },
                    { id: 'c', text: 'Before any action is taken' },
                    { id: 'd', text: 'Only when the agent reaches a terminal state' }
                ],
                correctAnswer: 'a',
                justification: 'Q-learning performs an online update after every transition using the TD error.',
                wrongJustifications: {
                    b: 'Episode-end updates would be Monte Carlo, not TD.',
                    c: 'An update requires observing the consequence (R and s\').',
                    d: 'Q-learning updates at every step, not just terminal states.'
                }
            },
            {
                id: 't8-5',
                question: 'What is the significance of the TD error δ = R + γ max_a\' Q(s\', a\') − Q(s,a)?',
                options: [
                    { id: 'a', text: 'It measures the difference between current estimate and target, driving learning' },
                    { id: 'b', text: 'It represents the total expected return from the current state' },
                    { id: 'c', text: 'It is the reward received for taking action a' },
                    { id: 'd', text: 'It measures the entropy of the policy' }
                ],
                correctAnswer: 'a',
                justification: 'The TD error quantifies surprise relative to current estimates; Q-values adjust to reduce this error.',
                wrongJustifications: {
                    b: 'TD error is a correction term, not total return.',
                    c: 'R is the reward; TD error differs from R by including bootstrap terms.',
                    d: 'Policy entropy is a separate concept.'
                }
            },
            {
                id: 't8-6',
                question: 'How does Q-learning ensure all state-action pairs are explored?',
                options: [
                    { id: 'a', text: 'By using an exploration policy like epsilon-greedy' },
                    { id: 'b', text: 'By initializing all Q-values to zero' },
                    { id: 'c', text: 'By only visiting states in a fixed order' },
                    { id: 'd', text: 'By avoiding actions with low Q-values' }
                ],
                correctAnswer: 'a',
                justification: 'Exploration policies like ε-greedy occasionally select random actions, satisfying the infinite-visitation requirement.',
                wrongJustifications: {
                    b: 'Zero initialization does not ensure exploration of specific actions.',
                    c: 'Fixed-order visitation does not explore all actions in each state.',
                    d: 'Avoiding low Q-values prevents exploration.'
                }
            },
            {
                id: 't8-7',
                question: 'What is the memory complexity of tabular Q-learning?',
                options: [
                    { id: 'a', text: 'O(|S| × |A|) — one Q-value per state-action pair' },
                    { id: 'b', text: 'O(|S|²) — storing transition probabilities' },
                    { id: 'c', text: 'O(|A|) — values only for actions' },
                    { id: 'd', text: 'O(1) — using function approximation' }
                ],
                correctAnswer: 'a',
                justification: 'Tabular Q-learning stores one value per (s,a), so memory is |S| × |A|.',
                wrongJustifications: {
                    b: 'Transition probabilities are not stored (model-free).',
                    c: 'Values are per state-action pair, not just per action.',
                    d: 'O(1) would hold for fixed-parameter function approximation, not tabular.'
                }
            },
            {
                id: 't8-8',
                question: 'What happens to Q-values in states that are never visited?',
                options: [
                    { id: 'a', text: 'They retain their initial values and never influence the policy' },
                    { id: 'b', text: 'They automatically converge to optimal values' },
                    { id: 'c', text: 'They are interpolated from neighboring states' },
                    { id: 'd', text: 'They are set to zero after each episode' }
                ],
                correctAnswer: 'a',
                justification: 'Unvisited state-action pairs stay at initialized values and do not affect behavior until visited.',
                wrongJustifications: {
                    b: 'Without visitation, no updates occur.',
                    c: 'Tabular Q-learning does not interpolate.',
                    d: 'Unvisited state Q-values persist unchanged.'
                }
            },
            {
                id: 't8-9',
                question: 'How does Q-learning perform in large or continuous state spaces?',
                options: [
                    { id: 'a', text: 'Tabular becomes infeasible; function approximation like DQN is used' },
                    { id: 'b', text: 'It works identically to small discrete spaces' },
                    { id: 'c', text: 'It cannot be extended to continuous spaces at all' },
                    { id: 'd', text: 'It requires discretizing states into fewer buckets' }
                ],
                correctAnswer: 'a',
                justification: 'Tabular Q-learning scales with |S|, making it impractical for large spaces. DQN uses neural nets for approximation.',
                wrongJustifications: {
                    b: 'Tabular Q-learning fails due to memory and visitation issues in large spaces.',
                    c: 'Deep Q-learning (DQN) successfully extends to continuous state spaces.',
                    d: 'Discretization is possible but often loses precision.'
                }
            },
            {
                id: 't8-10',
                question: 'What is a key limitation of the max operator in Q-learning?',
                options: [
                    { id: 'a', text: 'It can cause overestimation bias since max of noisy estimates is upwardly biased' },
                    { id: 'b', text: 'It causes Q-values to always decrease' },
                    { id: 'c', text: 'It makes the algorithm on-policy' },
                    { id: 'd', text: 'It prevents convergence in any environment' }
                ],
                correctAnswer: 'a',
                justification: 'The max over estimated Q-values inherits positive bias (maximization bias). Double Q-learning addresses this.',
                wrongJustifications: {
                    b: 'The max typically increases Q-values.',
                    c: 'Using max is what makes Q-learning off-policy.',
                    d: 'Q-learning converges under standard conditions despite the bias.'
                }
            }
        ],
        recap: [
            'Q-learning is a model-free, off-policy TD algorithm for learning Q*.',
            'Update: Q(s,a) ← Q(s,a) + α[R + γ max_a\' Q(s\',a\') − Q(s,a)].',
            'Exploration policies like ε-greedy ensure visitation of all (s,a) pairs.',
            'Tabular Q-learning stores values in a |S| × |A| table.',
            'The TD error δ drives learning.',
            'The max operator introduces overestimation bias.',
            'DQN extends Q-learning to large state spaces using neural networks.',
            'Convergence requires infinite visitation and decaying learning rates.'
        ],
        skillMapping: [
            { skill: 'Describing the Q-learning algorithm and update rule', level: 'remember' },
            { skill: 'Explaining off-policy learning in Q-learning', level: 'understand' },
            { skill: 'Implementing tabular Q-learning for small environments', level: 'apply' },
            { skill: 'Analyzing the overestimation bias in Q-learning', level: 'analyze' }
        ]
    },
    Topic9_QLearningTerms: {
        prerequisites: [
            'Basic Q-learning algorithm',
            'Q-table structure',
            'Learning rate and discount factor',
            'TD error concept',
            'Off-policy learning'
        ],
        mcqs: [
            {
                id: 't9-1',
                question: 'What does Q stand for in Q-learning?',
                options: [
                    { id: 'a', text: 'Quality of taking an action in a given state' },
                    { id: 'b', text: 'Quantity of reward expected' },
                    { id: 'c', text: 'Query — the process of querying the environment' },
                    { id: 'd', text: 'Queue — the data structure used for updates' }
                ],
                correctAnswer: 'a',
                justification: 'Q stands for quality — Q(s,a) represents the quality (expected return) of action a in state s.',
                wrongJustifications: {
                    b: 'While Q relates to reward, Q specifically denotes quality.',
                    c: 'Querying is not what Q stands for.',
                    d: 'Q-learning does not use a queue data structure.'
                }
            },
            {
                id: 't9-2',
                question: 'What is the target in the Q-learning update Q(s,a) ← Q(s,a) + α[target − Q(s,a)]?',
                options: [
                    { id: 'a', text: 'target = R + γ max_a\' Q(s\', a\')' },
                    { id: 'b', text: 'target = R + γ Q(s\', a\') (for the chosen next action)' },
                    { id: 'c', text: 'target = max_a Q(s, a)' },
                    { id: 'd', text: 'target = R (immediate reward only)' }
                ],
                correctAnswer: 'a',
                justification: 'R + γ max_a\' Q(s\', a\') bootstraps from the optimal future Q-value.',
                wrongJustifications: {
                    b: 'Using the chosen action without max is the SARSA target.',
                    c: 'The target uses next state s\', not current state s.',
                    d: 'Using only R ignores future returns.'
                }
            },
            {
                id: 't9-3',
                question: 'What distinguishes learning rate α from discount factor γ?',
                options: [
                    { id: 'a', text: 'α controls update step size; γ controls future reward weighting' },
                    { id: 'b', text: 'α controls discounting; γ controls learning speed' },
                    { id: 'c', text: 'Both serve the same purpose' },
                    { id: 'd', text: 'α is for exploitation; γ is for exploration' }
                ],
                correctAnswer: 'a',
                justification: 'α ∈ (0,1] determines step size; γ ∈ [0,1] determines present value of future rewards.',
                wrongJustifications: {
                    b: 'This reverses the definitions.',
                    c: 'α and γ have distinct, independent roles.',
                    d: 'Neither controls exploration; ε controls exploration.'
                }
            },
            {
                id: 't9-4',
                question: 'What is a step in the context of Q-learning?',
                options: [
                    { id: 'a', text: 'A single transition: (s, a, R, s\')' },
                    { id: 'b', text: 'A complete episode from start to terminal state' },
                    { id: 'c', text: 'One full pass through the Q-table' },
                    { id: 'd', text: 'Initializing the Q-values' }
                ],
                correctAnswer: 'a',
                justification: 'A step is one interaction cycle: observe s, select a, receive R, transition to s\', update.',
                wrongJustifications: {
                    b: 'An episode consists of many steps.',
                    c: 'A full Q-table pass is not a standard term in online Q-learning.',
                    d: 'Initialization is a one-time operation.'
                }
            },
            {
                id: 't9-5',
                question: 'What is an episode in the Q-learning framework?',
                options: [
                    { id: 'a', text: 'A sequence of steps from initial state to terminal state' },
                    { id: 'b', text: 'A single Q-table update' },
                    { id: 'c', text: 'The entire training run' },
                    { id: 'd', text: 'A fixed number of random actions' }
                ],
                correctAnswer: 'a',
                justification: 'An episode is one complete trajectory from start to termination (or horizon).',
                wrongJustifications: {
                    b: 'A single update is a step within an episode.',
                    c: 'Multiple episodes constitute the training run.',
                    d: 'Episodes follow the current policy, not necessarily random actions.'
                }
            },
            {
                id: 't9-6',
                question: 'What does bootstrapping mean in Q-learning?',
                options: [
                    { id: 'a', text: 'Updating a Q-value based partly on other Q-value estimates' },
                    { id: 'b', text: 'Starting the learning process from scratch' },
                    { id: 'c', text: 'Using a pre-trained model to initialize Q-values' },
                    { id: 'd', text: 'Increasing the learning rate over time' }
                ],
                correctAnswer: 'a',
                justification: 'Q-learning bootstraps because the target uses Q(s\',a\') — another current estimate.',
                wrongJustifications: {
                    b: 'Starting from scratch is initialization, not bootstrapping.',
                    c: 'Pre-training is transfer learning.',
                    d: 'Increasing α is a schedule, not bootstrapping.'
                }
            },
            {
                id: 't9-7',
                question: 'Why is state-action pair visitation count important?',
                options: [
                    { id: 'a', text: 'Sufficient visits to each (s,a) are required for convergence to Q*' },
                    { id: 'b', text: 'It measures the total reward from each action' },
                    { id: 'c', text: 'It determines the order of actions in an episode' },
                    { id: 'd', text: 'It is used to compute the discount factor' }
                ],
                correctAnswer: 'a',
                justification: 'Theoretic convergence requires each (s,a) visited infinitely often; visitation counts monitor this.',
                wrongJustifications: {
                    b: 'Visitation counts measure frequency, not accumulated reward.',
                    c: 'Action order is determined by the policy.',
                    d: 'γ is a fixed parameter, not derived from counts.'
                }
            },
            {
                id: 't9-8',
                question: 'What is meant by convergence of Q-learning?',
                options: [
                    { id: 'a', text: 'Q(s,a) → Q*(s,a) for all (s,a) as steps → ∞' },
                    { id: 'b', text: 'Q(s,a) → 0 for all (s,a)' },
                    { id: 'c', text: 'The agent stops exploring' },
                    { id: 'd', text: 'The Q-table size stops growing' }
                ],
                correctAnswer: 'a',
                justification: 'Convergence means Q-values approach Q* asymptotically, learning the optimal action-value function.',
                wrongJustifications: {
                    b: 'Q-values converge to Q*, generally non-zero.',
                    c: 'Exploration may continue; convergence refers to values.',
                    d: 'Q-table size is fixed; convergence is about value accuracy.'
                }
            },
            {
                id: 't9-9',
                question: 'What does exploitation mean in Q-learning?',
                options: [
                    { id: 'a', text: 'Selecting the action with the highest current Q-value' },
                    { id: 'b', text: 'Randomly selecting actions to discover new information' },
                    { id: 'c', text: 'Updating the Q-table with the latest experience' },
                    { id: 'd', text: 'Decaying the learning rate over time' }
                ],
                correctAnswer: 'a',
                justification: 'Exploitation uses current Q-values to choose the action expected to yield the highest return.',
                wrongJustifications: {
                    b: 'Random selection is exploration.',
                    c: 'Table updates occur regardless of step type.',
                    d: 'Learning rate decay is a schedule, not exploitation.'
                }
            },
            {
                id: 't9-10',
                question: 'What is the behavior policy in Q-learning?',
                options: [
                    { id: 'a', text: 'The policy used to generate experience (e.g., epsilon-greedy)' },
                    { id: 'b', text: 'The greedy policy derived from the Q-table' },
                    { id: 'c', text: 'The optimal policy being learned' },
                    { id: 'd', text: 'A fixed random policy throughout training' }
                ],
                correctAnswer: 'a',
                justification: 'In off-policy Q-learning, the behavior policy (exploratory) generates experience while the target is greedy.',
                wrongJustifications: {
                    b: 'The greedy policy is the target policy.',
                    c: 'The target approximates optimality; behavior generates data.',
                    d: 'The behavior policy can change (e.g., decaying epsilon).'
                }
            }
        ],
        recap: [
            'Q stands for Quality — Q(s,a) measures expected return of action a in state s.',
            'Q-learning target: R + γ max_a\' Q(s\', a\').',
            'α controls update step size; γ controls future reward weighting.',
            'A step is one (s, a, R, s\') transition; an episode is a complete trajectory.',
            'Bootstrapping means updating using other current estimates as targets.',
            'Visitation counts track exploration; infinite visits needed for convergence.',
            'Convergence means Q(s,a) → Q*(s,a) as steps → ∞.',
            'Exploitation selects best action; exploration tries other actions.',
            'Behavior policy generates experience; target policy is learned (off-policy).'
        ],
        skillMapping: [
            { skill: 'Defining key Q-learning terminology', level: 'remember' },
            { skill: 'Explaining the roles of α, γ, and bootstrapping', level: 'understand' },
            { skill: 'Applying Q-learning terms to describe algorithm behavior', level: 'apply' },
            { skill: 'Distinguishing behavior and target policies in off-policy learning', level: 'analyze' }
        ]
    },
    Topic10_WorkingOfQLearning: {
        prerequisites: [
            'Q-learning update rule',
            'Q-table representation',
            'Off-policy vs on-policy distinction',
            'Bellman optimality equation',
            'Exploration strategies'
        ],
        mcqs: [
            {
                id: 't10-1',
                question: 'What is the first step in a single Q-learning iteration?',
                options: [
                    { id: 'a', text: 'Observe the current state s from the environment' },
                    { id: 'b', text: 'Update the Q-value for the previous transition' },
                    { id: 'c', text: 'Randomly initialize the Q-table' },
                    { id: 'd', text: 'Check convergence by comparing Q-values' }
                ],
                correctAnswer: 'a',
                justification: 'Each iteration begins by observing the current state s before selecting and updating.',
                wrongJustifications: {
                    b: 'The update occurs after receiving reward and next state.',
                    c: 'Initialization is done once before the first iteration.',
                    d: 'Convergence checking is periodic, not the first step.'
                }
            },
            {
                id: 't10-2',
                question: 'How does Q-learning select actions during training?',
                options: [
                    { id: 'a', text: 'Using a behavior policy (e.g., ε-greedy) based on current Q-values' },
                    { id: 'b', text: 'By randomly choosing actions without reference to Q-values' },
                    { id: 'c', text: 'By following the optimal policy from the first episode' },
                    { id: 'd', text: 'By querying a human expert at each step' }
                ],
                correctAnswer: 'a',
                justification: 'Action selection uses ε-greedy with respect to current Q-values: (1−ε) greedy + ε random.',
                wrongJustifications: {
                    b: 'Pure random selection ignores learned Q-values.',
                    c: 'The optimal policy is unknown initially.',
                    d: 'Q-learning is autonomous.'
                }
            },
            {
                id: 't10-3',
                question: 'After taking action a in state s and receiving R and s\', what does Q-learning do?',
                options: [
                    { id: 'a', text: 'Computes R + γ max_a\' Q(s\', a\') and updates Q(s,a)' },
                    { id: 'b', text: 'Discards the experience' },
                    { id: 'c', text: 'Updates all Q-values in the table' },
                    { id: 'd', text: 'Switches to a random policy' }
                ],
                correctAnswer: 'a',
                justification: 'Q-learning computes the TD target and adjusts Q(s,a) toward it using the learning rate.',
                wrongJustifications: {
                    b: 'Experience is used for the update.',
                    c: 'Only Q(s,a) for the current pair is updated.',
                    d: 'The policy changes gradually through Q-value updates.'
                }
            },
            {
                id: 't10-4',
                question: 'Why does Q-learning use max over next-state actions rather than the action actually taken?',
                options: [
                    { id: 'a', text: 'To learn the optimal value function independently of the exploration policy' },
                    { id: 'b', text: 'To reduce computational complexity' },
                    { id: 'c', text: 'To avoid storing the next action' },
                    { id: 'd', text: 'To satisfy neural network training constraints' }
                ],
                correctAnswer: 'a',
                justification: 'Using max decouples learning from the behavior policy, enabling off-policy learning of Q*.',
                wrongJustifications: {
                    b: 'Computing max is more expensive than using a single action.',
                    c: 'Memory for next action is negligible.',
                    d: 'The max operator predates neural network extensions.'
                }
            },
            {
                id: 't10-5',
                question: 'In Q-learning, when does the agent bootstrap?',
                options: [
                    { id: 'a', text: 'When it uses Q(s\', a\') to update Q(s,a), basing the update on another estimate' },
                    { id: 'b', text: 'When it initializes the Q-table to zero' },
                    { id: 'c', text: 'When it completes a full episode' },
                    { id: 'd', text: 'When it decreases the exploration rate' }
                ],
                correctAnswer: 'a',
                justification: 'Bootstrapping occurs because the target uses the current estimate Q(s\',a\') of the next state.',
                wrongJustifications: {
                    b: 'Initialization is not bootstrapping.',
                    c: 'Episode completion is not bootstrapping.',
                    d: 'Decreasing epsilon is a schedule change.'
                }
            },
            {
                id: 't10-6',
                question: 'How does Q-learning handle terminal states?',
                options: [
                    { id: 'a', text: 'Q-values for terminal states are 0; no further transitions occur' },
                    { id: 'b', text: 'Terminal states have infinite Q-values' },
                    { id: 'c', text: 'Q-values for terminal states increase without bound' },
                    { id: 'd', text: 'Terminal states are ignored' }
                ],
                correctAnswer: 'a',
                justification: 'Terminal states have no future reward, so their Q-values are defined as 0 and the episode ends.',
                wrongJustifications: {
                    b: 'Infinite values would cause numerical instability.',
                    c: 'Terminal states have no future return.',
                    d: 'Terminal states trigger episode reset.'
                }
            },
            {
                id: 't10-7',
                question: 'What is the effect of a greedy behavior policy (ε = 0) during Q-learning training?',
                options: [
                    { id: 'a', text: 'The agent may converge to a suboptimal policy because it never explores' },
                    { id: 'b', text: 'Convergence to Q* is guaranteed and faster' },
                    { id: 'c', text: 'The Q-table never changes' },
                    { id: 'd', text: 'The agent follows the optimal policy from the start' }
                ],
                correctAnswer: 'a',
                justification: 'Without exploration (ε=0), the agent never discovers potentially better actions.',
                wrongJustifications: {
                    b: 'Q* requires exploration of all state-action pairs.',
                    c: 'Q-values can still change based on observed transitions.',
                    d: 'Without exploration, the agent cannot discover untried actions.'
                }
            },
            {
                id: 't10-8',
                question: 'What is a common stopping criterion for Q-learning?',
                options: [
                    { id: 'a', text: 'When the maximum Q-value change across an episode falls below a threshold' },
                    { id: 'b', text: 'When the agent has taken exactly 1000 steps' },
                    { id: 'c', text: 'When the Q-table is completely full' },
                    { id: 'd', text: 'When epsilon reaches exactly 0' }
                ],
                correctAnswer: 'a',
                justification: 'A typical convergence check measures the largest Q-value change (Δ_max) over a window.',
                wrongJustifications: {
                    b: 'A fixed step count does not guarantee convergence.',
                    c: 'The Q-table is always full from initialization.',
                    d: 'ε=0 does not mean Q-values have converged to Q*.'
                }
            },
            {
                id: 't10-9',
                question: 'How does Q-learning extract the learned policy after training?',
                options: [
                    { id: 'a', text: 'By taking the greedy action π(s) = argmax_a Q(s,a) for each state' },
                    { id: 'b', text: 'By averaging all Q-values in each state' },
                    { id: 'c', text: 'By selecting actions proportional to Q-values' },
                    { id: 'd', text: 'By following the last exploratory trajectory' }
                ],
                correctAnswer: 'a',
                justification: 'After convergence, the optimal policy is to select the action with the highest Q-value in each state.',
                wrongJustifications: {
                    b: 'Averaging Q-values does not produce a meaningful policy.',
                    c: 'Proportional selection may be used during training but final policy is greedy.',
                    d: 'The last trajectory may include exploratory actions.'
                }
            },
            {
                id: 't10-10',
                question: 'What happens if the learning rate α is set to 0 throughout Q-learning?',
                options: [
                    { id: 'a', text: 'No learning occurs; Q-values never change from initial values' },
                    { id: 'b', text: 'Q-values converge instantly to Q*' },
                    { id: 'c', text: 'Only exploration occurs without any updates' },
                    { id: 'd', text: 'The algorithm behaves like Monte Carlo RL' }
                ],
                correctAnswer: 'a',
                justification: 'With α=0, the update term is always 0, so Q-values remain fixed at their initial values.',
                wrongJustifications: {
                    b: 'α=0 prevents any adjustment of Q-values.',
                    c: 'Exploration without updates is meaningless.',
                    d: 'Monte Carlo uses complete returns, not TD with α=0.'
                }
            }
        ],
        recap: [
            'Each iteration: observe s, select action a (ε-greedy), receive R and s\', update Q(s,a).',
            'Target: R + γ max_a\' Q(s\', a\') — bootstraps from next state\'s best Q-value.',
            'Off-policy: behavior policy (ε-greedy) generates data; target (greedy) is learned.',
            'Terminal states have Q=0; update target becomes just R.',
            'Without exploration (ε=0), Q-learning may converge suboptimally.',
            'Convergence monitored by max Q-value change across episodes.',
            'Final policy: greedy π(s) = argmax_a Q(s,a).',
            'α=0 prevents learning; α too high causes instability.'
        ],
        skillMapping: [
            { skill: 'Recalling the step-by-step Q-learning procedure', level: 'remember' },
            { skill: 'Explaining the off-policy mechanism in Q-learning updates', level: 'understand' },
            { skill: 'Implementing the Q-learning loop in code', level: 'apply' },
            { skill: 'Debugging common Q-learning issues (exploration, learning rate)', level: 'analyze' }
        ]
    },
    Topic11_GamblerDungeon: {
        prerequisites: [
            'Value iteration algorithm',
            'Bellman optimality equation',
            'Gambler\'s problem formulation',
            'Probabilistic transitions',
            'Risk and reward trade-offs'
        ],
        mcqs: [
            {
                id: 't11-1',
                question: 'In the gambler\'s problem, what is the state space?',
                options: [
                    { id: 'a', text: 'The gambler\'s current capital (discrete amounts from 0 to the goal)' },
                    { id: 'b', text: 'The outcome of the last coin flip (heads or tails)' },
                    { id: 'c', text: 'The number of bets placed so far' },
                    { id: 'd', text: 'The gambler\'s emotional state (winning or losing streak)' }
                ],
                correctAnswer: 'a',
                justification: 'The state is the current capital, an integer from 0 (broke) to the goal amount (win).',
                wrongJustifications: {
                    b: 'Coin flip outcomes are part of transition dynamics, not the state.',
                    c: 'Number of bets is not part of the state.',
                    d: 'Emotional state is not modeled in the standard gambler\'s problem.'
                }
            },
            {
                id: 't11-2',
                question: 'What are the actions in the gambler\'s problem?',
                options: [
                    { id: 'a', text: 'How much of the current capital to stake on the next bet' },
                    { id: 'b', text: 'Whether to bet on heads or tails' },
                    { id: 'c', text: 'Whether to continue gambling or quit' },
                    { id: 'd', text: 'Which casino to visit' }
                ],
                correctAnswer: 'a',
                justification: 'The gambler chooses a stake amount (integer from 0 to current capital).',
                wrongJustifications: {
                    b: 'The coin side is typically irrelevant (fair coin).',
                    c: 'Quitting is usually not an action; the goal is to reach the target.',
                    d: 'Casino choice is not part of the simplified model.'
                }
            },
            {
                id: 't11-3',
                question: 'What is the reward structure in the classic gambler\'s problem?',
                options: [
                    { id: 'a', text: '+1 when reaching the goal; 0 otherwise (terminal reward only)' },
                    { id: 'b', text: 'Reward proportional to each bet\'s profit' },
                    { id: 'c', text: 'Negative reward for every bet placed' },
                    { id: 'd', text: 'Positive reward for every bet regardless of outcome' }
                ],
                correctAnswer: 'a',
                justification: 'Reward is +1 only upon reaching the goal; no intermediate rewards for individual bets.',
                wrongJustifications: {
                    b: 'Reward is not given per bet; only terminal.',
                    c: 'There is no per-bet cost.',
                    d: 'No intermediate rewards are given.'
                }
            },
            {
                id: 't11-4',
                question: 'What makes the gambler\'s problem a useful RL case study?',
                options: [
                    { id: 'a', text: 'It shows how value iteration produces a surprisingly non-linear optimal policy' },
                    { id: 'b', text: 'It proves that optimal gambling always means betting everything' },
                    { id: 'c', text: 'It shows all MDPs have linear optimal policies' },
                    { id: 'd', text: 'It demonstrates Monte Carlo methods fail for gambling' }
                ],
                correctAnswer: 'a',
                justification: 'The optimal policy has a complex, oscillatory pattern that is non-intuitive.',
                wrongJustifications: {
                    b: 'The optimal policy varies with state and goal.',
                    c: 'The optimal policy is notably non-linear.',
                    d: 'Monte Carlo methods can be applied.'
                }
            },
            {
                id: 't11-5',
                question: 'What is the win probability in an unbiased gambler\'s problem?',
                options: [
                    { id: 'a', text: 'p = 0.5 (fair coin)' },
                    { id: 'b', text: 'p depends on the stake amount' },
                    { id: 'c', text: 'p = 0 always (house always wins)' },
                    { id: 'd', text: 'p = 0.75 (gambler has advantage)' }
                ],
                correctAnswer: 'a',
                justification: 'The classic problem assumes a fair coin with p = 0.5.',
                wrongJustifications: {
                    b: 'Win probability is independent of the stake.',
                    c: 'p=0 would make the problem trivial.',
                    d: 'p=0.75 is not the standard formulation.'
                }
            },
            {
                id: 't11-6',
                question: 'In the gambler\'s problem, what happens when the gambler stakes s and loses?',
                options: [
                    { id: 'a', text: 'Capital decreases by s (new state = capital − s)' },
                    { id: 'b', text: 'Capital resets to zero' },
                    { id: 'c', text: 'Capital stays the same' },
                    { id: 'd', text: 'Gambler loses double the stake' }
                ],
                correctAnswer: 'a',
                justification: 'Loss reduces capital by exactly the stake amount. Reaching 0 means bankruptcy.',
                wrongJustifications: {
                    b: 'Only total loss of entire capital leads to 0.',
                    c: 'The bet outcome always changes capital.',
                    d: 'Loss is exactly the stake, not double.'
                }
            },
            {
                id: 't11-7',
                question: 'What is the go-for-broke strategy in the gambler\'s problem?',
                options: [
                    { id: 'a', text: 'Betting the entire capital when far from the goal' },
                    { id: 'b', text: 'Betting the minimum amount each time' },
                    { id: 'c', text: 'Alternating between high and low bets' },
                    { id: 'd', text: 'Never betting more than half the capital' }
                ],
                correctAnswer: 'a',
                justification: 'When far from the goal, betting everything is often optimal because smaller bets require many wins.',
                wrongJustifications: {
                    b: 'Minimum bets may not reach the goal with high probability.',
                    c: 'Alternating is not a prescribed optimal strategy.',
                    d: 'Betting at most half is conservative.'
                }
            },
            {
                id: 't11-8',
                question: 'How does the optimal value function for the gambler\'s problem typically look?',
                options: [
                    { id: 'a', text: 'It increases monotonically from 0 to 1 with an oscillatory/bumpy shape' },
                    { id: 'b', text: 'It is a straight line from 0 to the goal' },
                    { id: 'c', text: 'It decreases from 1 to 0 as capital increases' },
                    { id: 'd', text: 'It is constant for all non-terminal states' }
                ],
                correctAnswer: 'a',
                justification: 'V*(capital) increases from 0 to 1 but with bumps reflecting the optimal risk-taking pattern.',
                wrongJustifications: {
                    b: 'A straight line would imply linearity, but the optimal value is non-linear.',
                    c: 'Higher capital should have higher win probability.',
                    d: 'Value varies with capital.'
                }
            },
            {
                id: 't11-9',
                question: 'What does the gambler\'s problem teach about optimal policies in stochastic environments?',
                options: [
                    { id: 'a', text: 'Optimal policies can be counter-intuitive with complex risk-taking patterns' },
                    { id: 'b', text: 'The safest strategy (minimum bets) is always optimal' },
                    { id: 'c', text: 'Stochastic environments always yield simple linear policies' },
                    { id: 'd', text: 'Value iteration cannot solve probabilistic problems' }
                ],
                correctAnswer: 'a',
                justification: 'The problem reveals that optimal policies can be non-intuitive, with varying risk levels.',
                wrongJustifications: {
                    b: 'Minimum bets are conservative but not always optimal.',
                    c: 'Stochastic environments often produce non-linear policies.',
                    d: 'Value iteration handles probabilistic outcomes naturally.'
                }
            },
            {
                id: 't11-10',
                question: 'How does changing the coin bias p affect the optimal policy?',
                options: [
                    { id: 'a', text: 'When p < 0.5, the optimal policy becomes more aggressive (bet more)' },
                    { id: 'b', text: 'When p < 0.5, the optimal policy bets the minimum' },
                    { id: 'c', text: 'Changing p has no effect on the optimal policy' },
                    { id: 'd', text: 'When p > 0.5, bet everything every time' }
                ],
                correctAnswer: 'a',
                justification: 'With p < 0.5, larger risks are needed to overcome the negative expected value per bet.',
                wrongJustifications: {
                    b: 'Minimum bets in an unfavorable game guarantee loss.',
                    c: 'p fundamentally changes the risk-reward calculation.',
                    d: 'Even with p > 0.5, nuanced strategies exist.'
                }
            }
        ],
        recap: [
            'The gambler\'s problem MDP: state = current capital, action = stake amount.',
            'Reward is +1 only upon reaching the goal; terminal states are 0 and goal.',
            'The coin is typically fair (p = 0.5), but biased variants illustrate risk sensitivity.',
            'Value iteration reveals a surprisingly non-linear optimal value function.',
            'The optimal policy oscillates between aggressive and conservative betting.',
            'With an unfair coin (p < 0.5), the optimal policy becomes more aggressive.',
            'This study shows optimal policies can defy simple intuition.',
            'Value iteration computes exact solutions for low-dimensional MDPs.'
        ],
        skillMapping: [
            { skill: 'Describing the gambler\'s problem MDP formulation', level: 'remember' },
            { skill: 'Explaining the non-linear optimal value function shape', level: 'understand' },
            { skill: 'Applying value iteration to solve the gambler\'s problem', level: 'apply' },
            { skill: 'Analyzing how coin bias changes optimal risk-taking', level: 'analyze' }
        ]
    },
    Topic12_QLearningApplications: {
        prerequisites: [
            'Q-learning algorithm fundamentals',
            'Tabular vs function approximation Q-learning',
            'Discrete vs continuous state spaces',
            'Exploration strategies',
            'Reward function design'
        ],
        mcqs: [
            {
                id: 't12-1',
                question: 'Which is a classic application domain for Q-learning?',
                options: [
                    { id: 'a', text: 'Robot navigation in grid-world environments' },
                    { id: 'b', text: 'Text generation for natural language' },
                    { id: 'c', text: 'Image classification with labeled datasets' },
                    { id: 'd', text: 'Database indexing optimization' }
                ],
                correctAnswer: 'a',
                justification: 'Robot navigation is a classic Q-learning application where agents learn through trial and error.',
                wrongJustifications: {
                    b: 'Text generation is more commonly addressed by supervised learning and language models.',
                    c: 'Image classification is supervised learning, not RL.',
                    d: 'Database indexing uses heuristic or supervised approaches.'
                }
            },
            {
                id: 't12-2',
                question: 'How is Q-learning applied to Atari game playing?',
                options: [
                    { id: 'a', text: 'With Deep Q-Networks using CNNs to process raw pixel input' },
                    { id: 'b', text: 'By encoding game rules directly into the Q-table' },
                    { id: 'c', text: 'By using supervised learning on human gameplay' },
                    { id: 'd', text: 'By pre-programming optimal strategies for each level' }
                ],
                correctAnswer: 'a',
                justification: 'DQN uses convolutional neural networks to approximate Q-values from raw pixel input.',
                wrongJustifications: {
                    b: 'Q-learning learns from experience, not encoded rules.',
                    c: 'Human data would be imitation learning.',
                    d: 'Pre-programming is not learning.'
                }
            },
            {
                id: 't12-3',
                question: 'In applying Q-learning to robotics, what is a common challenge?',
                options: [
                    { id: 'a', text: 'Continuous state/action spaces require function approximation and reward shaping' },
                    { id: 'b', text: 'Robots cannot explore enough states for tabular Q-learning' },
                    { id: 'c', text: 'Q-learning cannot handle stochastic environments' },
                    { id: 'd', text: 'Robots cannot receive rewards' }
                ],
                correctAnswer: 'a',
                justification: 'Robotics involves continuous sensor readings requiring neural networks and careful reward design.',
                wrongJustifications: {
                    b: 'Function approximation addresses this.',
                    c: 'Q-learning handles stochastic environments naturally.',
                    d: 'Rewards can be provided through sensor-based detection.'
                }
            },
            {
                id: 't12-4',
                question: 'What is a key consideration when applying Q-learning to real-world systems?',
                options: [
                    { id: 'a', text: 'Sample efficiency — Q-learning needs many interactions, costly in real world' },
                    { id: 'b', text: 'Q-learning cannot be used in real-world systems' },
                    { id: 'c', text: 'Real-world systems require tabular Q-learning exclusively' },
                    { id: 'd', text: 'Sample efficiency is not a concern' }
                ],
                correctAnswer: 'a',
                justification: 'Q-learning is sample-inefficient; real-world deployment may require simulators or offline RL.',
                wrongJustifications: {
                    b: 'Q-learning has been successfully applied with sim-to-real transfer.',
                    c: 'Function approximation is typically needed.',
                    d: 'Sample efficiency is a major practical concern.'
                }
            },
            {
                id: 't12-5',
                question: 'How is Q-learning used in resource management?',
                options: [
                    { id: 'a', text: 'Learning a policy to allocate resources based on system state' },
                    { id: 'b', text: 'Pre-computing fixed resource allocation tables' },
                    { id: 'c', text: 'Using supervised learning on historical usage' },
                    { id: 'd', text: 'Randomly assigning resources until performance improves' }
                ],
                correctAnswer: 'a',
                justification: 'Q-learning can learn dynamic resource allocation policies that adapt to changing conditions.',
                wrongJustifications: {
                    b: 'Fixed tables do not adapt.',
                    c: 'Supervised learning may not generalize.',
                    d: 'Random assignment is a poor baseline.'
                }
            },
            {
                id: 't12-6',
                question: 'What is a limitation of Q-learning in multi-agent environments?',
                options: [
                    { id: 'a', text: 'Non-stationarity: other agents learning breaks the MDP assumption' },
                    { id: 'b', text: 'Multi-agent Q-learning guarantees convergence to Nash equilibrium' },
                    { id: 'c', text: 'Q-learning cannot be extended to multi-agent settings' },
                    { id: 'd', text: 'Multi-agent settings always require tabular Q-learning' }
                ],
                correctAnswer: 'a',
                justification: 'Other agents changing their policies makes the environment non-stationary.',
                wrongJustifications: {
                    b: 'Convergence to Nash is not guaranteed.',
                    c: 'Q-learning has been extended to multi-agent settings.',
                    d: 'Function approximation is commonly used.'
                }
            },
            {
                id: 't12-7',
                question: 'What role does experience replay play in DQN?',
                options: [
                    { id: 'a', text: 'Stores past transitions and samples randomly to break temporal correlations' },
                    { id: 'b', text: 'Replays the same episode to memorize it' },
                    { id: 'c', text: 'Generates synthetic transitions from a model' },
                    { id: 'd', text: 'Replaces the Q-learning update with a supervised loss' }
                ],
                correctAnswer: 'a',
                justification: 'Experience replay stores (s,a,R,s\') tuples and samples uniformly to reduce correlations.',
                wrongJustifications: {
                    b: 'It samples randomly, not replaying the same episode.',
                    c: 'It stores real experience, not synthetic transitions.',
                    d: 'It still uses TD updates, not supervised loss.'
                }
            },
            {
                id: 't12-8',
                question: 'Why is function approximation needed for large state spaces in Q-learning?',
                options: [
                    { id: 'a', text: 'The Q-table would be too large to store and too sparse to visit all states' },
                    { id: 'b', text: 'Function approximation guarantees convergence to Q*' },
                    { id: 'c', text: 'Tabular methods are always preferred' },
                    { id: 'd', text: 'Function approximation requires no exploration' }
                ],
                correctAnswer: 'a',
                justification: 'Large state spaces make tabular storage infeasible and visitation too sparse for convergence.',
                wrongJustifications: {
                    b: 'Function approximation can diverge and does not guarantee convergence.',
                    c: 'Tabular methods become infeasible in large spaces.',
                    d: 'Exploration is still required.'
                }
            },
            {
                id: 't12-9',
                question: 'In which scenario would tabular Q-learning be feasible?',
                options: [
                    { id: 'a', text: 'A small grid-world with discrete states and actions' },
                    { id: 'b', text: 'Robotic arm control with continuous joint angles' },
                    { id: 'c', text: 'Atari game playing from raw pixels' },
                    { id: 'd', text: 'Autonomous driving with camera input' }
                ],
                correctAnswer: 'a',
                justification: 'Tabular Q-learning works when |S| and |A| are small enough to store and visit all pairs.',
                wrongJustifications: {
                    b: 'Continuous spaces require function approximation.',
                    c: 'Raw pixel input creates a massive state space.',
                    d: 'Camera input creates a large state space.'
                }
            },
            {
                id: 't12-10',
                question: 'What is the target network in DQN and why is it used?',
                options: [
                    { id: 'a', text: 'A separate network for computing targets, providing stable learning' },
                    { id: 'b', text: 'The same network as the online network, updated every step' },
                    { id: 'c', text: 'A network that predicts the next state' },
                    { id: 'd', text: 'A network that controls exploration' }
                ],
                correctAnswer: 'a',
                justification: 'The target network is frozen for periods to stabilize training by reducing moving target issues.',
                wrongJustifications: {
                    b: 'Using the same network causes target instability.',
                    c: 'Target network computes Q-values, not next state.',
                    d: 'Exploration is controlled by ε, not the target network.'
                }
            }
        ],
        recap: [
            'Q-learning is applied in robotics, games, resource management, and more.',
            'DQN extends Q-learning to high-dimensional spaces using deep neural networks.',
            'Continuous spaces require function approximation like DQN.',
            'Sample efficiency is a major challenge for real-world applications.',
            'Experience replay breaks temporal correlations in DQN.',
            'Multi-agent Q-learning faces non-stationarity challenges.',
            'Tabular Q-learning is feasible only for small discrete state spaces.',
            'Target networks stabilize DQN training by fixing the bootstrap target.'
        ],
        skillMapping: [
            { skill: 'Identifying applications of Q-learning', level: 'remember' },
            { skill: 'Explaining the role of experience replay and target networks', level: 'understand' },
            { skill: 'Applying Q-learning to small-scale problems', level: 'apply' },
            { skill: 'Evaluating the suitability of Q-learning for different domains', level: 'evaluate' }
        ]
    },
    Topic13_QLearningCaseStudies: {
        prerequisites: [
            'Q-learning algorithm and applications',
            'Reward function design',
            'Exploration strategies',
            'Deep Q-Networks concept',
            'Real-world RL deployment challenges'
        ],
        mcqs: [
            {
                id: 't13-1',
                question: 'Which case study famously demonstrated Q-learning playing Atari games from raw pixels?',
                options: [
                    { id: 'a', text: 'Deep Q-Network (DQN) by Mnih et al. (2015)' },
                    { id: 'b', text: 'AlphaGo by DeepMind (2016)' },
                    { id: 'c', text: 'GPT-3 by OpenAI (2020)' },
                    { id: 'd', text: 'ResNet by He et al. (2016)' }
                ],
                correctAnswer: 'a',
                justification: 'The DQN paper showed Q-learning with CNNs playing 49 Atari games directly from pixel input.',
                wrongJustifications: {
                    b: 'AlphaGo used Monte Carlo tree search with policy networks.',
                    c: 'GPT-3 is a language model, not an RL case study.',
                    d: 'ResNet is a supervised learning architecture for image recognition.'
                }
            },
            {
                id: 't13-2',
                question: 'What key innovation in DQN addressed the instability of neural networks in Q-learning?',
                options: [
                    { id: 'a', text: 'Experience replay and a separate target network' },
                    { id: 'b', text: 'Increasing the learning rate' },
                    { id: 'c', text: 'Using purely greedy exploration' },
                    { id: 'd', text: 'Removing the discount factor' }
                ],
                correctAnswer: 'a',
                justification: 'Experience replay decorrelates data; target networks stabilize targets, enabling DQN convergence.',
                wrongJustifications: {
                    b: 'High learning rates increase instability.',
                    c: 'Pure greed prevents exploration.',
                    d: 'Discounting is essential for convergence.'
                }
            },
            {
                id: 't13-3',
                question: 'In the DQN Atari case study, how was the state represented?',
                options: [
                    { id: 'a', text: 'A stack of recent preprocessed grayscale frames (84×84)' },
                    { id: 'b', text: 'A single raw RGB frame' },
                    { id: 'c', text: 'Hand-engineered features like object positions' },
                    { id: 'd', text: 'Game score and lives remaining' }
                ],
                correctAnswer: 'a',
                justification: 'DQN used the last 4 grayscale 84×84 frames stacked as input to capture motion and temporal context.',
                wrongJustifications: {
                    b: 'A single frame lacks temporal information about motion.',
                    c: 'DQN learned from raw pixels, not hand-engineered features.',
                    d: 'Score alone is insufficient state information.'
                }
            },
            {
                id: 't13-4',
                question: 'What was the reward structure used in DQN for Atari games?',
                options: [
                    { id: 'a', text: 'Raw game score, typically clipped to [-1, 0, +1] per step' },
                    { id: 'b', text: 'Only positive rewards for winning' },
                    { id: 'c', text: 'No rewards; unsupervised learning' },
                    { id: 'd', text: 'Negative rewards for every action' }
                ],
                correctAnswer: 'a',
                justification: 'Scores were clipped to [-1,0,+1] per step to stabilize training across games with different score scales.',
                wrongJustifications: {
                    b: 'Intermediate rewards from score changes were used.',
                    c: 'Rewards were essential for RL learning.',
                    d: 'Rewards could be positive, negative, or zero.'
                }
            },
            {
                id: 't13-5',
                question: 'What is a key lesson from Q-learning case studies in robotics?',
                options: [
                    { id: 'a', text: 'Sim-to-real transfer and careful reward shaping are critical for success' },
                    { id: 'b', text: 'Tabular Q-learning works well for complex robotic tasks' },
                    { id: 'c', text: 'Robots can learn millions of steps in the real world safely' },
                    { id: 'd', text: 'Reward functions are unnecessary in robotic Q-learning' }
                ],
                correctAnswer: 'a',
                justification: 'Robotics case studies highlight the need for simulators and well-designed reward functions due to sample inefficiency.',
                wrongJustifications: {
                    b: 'Tabular Q-learning does not scale to complex robotics.',
                    c: 'Real-world exploration is costly and potentially unsafe.',
                    d: 'Reward functions are essential for goal specification.'
                }
            },
            {
                id: 't13-6',
                question: 'What was demonstrated by the Q-learning case study in the game of Backgammon (Tesauro, 1995)?',
                options: [
                    { id: 'a', text: 'TD-Gammon achieved superhuman play using TD learning with neural networks' },
                    { id: 'b', text: 'Tabular Q-learning beat world champions' },
                    { id: 'c', text: 'The agent required no exploration' },
                    { id: 'd', text: 'The agent used supervised learning from expert games' }
                ],
                correctAnswer: 'a',
                justification: 'TD-Gammon used TD(λ) with a neural network to learn from self-play, achieving master-level play.',
                wrongJustifications: {
                    b: 'Tabular methods cannot handle the state space of Backgammon.',
                    c: 'Exploration through self-play was essential.',
                    d: 'It learned through self-play, not supervised learning.'
                }
            },
            {
                id: 't13-7',
                question: 'What is a common failure mode revealed by Q-learning case studies?',
                options: [
                    { id: 'a', text: 'Overestimation bias leading to suboptimal policies in noisy environments' },
                    { id: 'b', text: 'Q-values always converge to zero' },
                    { id: 'c', text: 'Exploration is never needed' },
                    { id: 'd', text: 'The learning rate has no effect on performance' }
                ],
                correctAnswer: 'a',
                justification: 'Case studies show the max operator causes overestimation bias, addressed by Double Q-learning and Dueling DQN.',
                wrongJustifications: {
                    b: 'Q-values converge to Q*, not necessarily zero.',
                    c: 'Exploration is critical for convergence.',
                    d: 'Learning rate significantly affects stability and speed.'
                }
            },
            {
                id: 't13-8',
                question: 'What did the Double DQN case study demonstrate?',
                options: [
                    { id: 'a', text: 'Using two separate networks for action selection and evaluation reduces overestimation' },
                    { id: 'b', text: 'Doubling the network size always improves performance' },
                    { id: 'c', text: 'Two target networks are needed for convergence' },
                    { id: 'd', text: 'Double Q-learning requires no exploration' }
                ],
                correctAnswer: 'a',
                justification: 'Double DQN decouples action selection (online network) from evaluation (target network) to reduce bias.',
                wrongJustifications: {
                    b: 'Network size is not the key factor.',
                    c: 'One target network suffices.',
                    d: 'Exploration is still required.'
                }
            },
            {
                id: 't13-9',
                question: 'What does the Dueling DQN architecture case study introduce?',
                options: [
                    { id: 'a', text: 'Separate advantage and value streams that combine to produce Q-values' },
                    { id: 'b', text: 'Two separate Q-tables for different actions' },
                    { id: 'c', text: 'A dueling mechanism between two agents' },
                    { id: 'd', text: 'Adversarial training for robustness' }
                ],
                correctAnswer: 'a',
                justification: 'Dueling DQN splits into V(s) and A(s,a) streams, helping learn state values without action effects.',
                wrongJustifications: {
                    b: 'It is not about multiple Q-tables.',
                    c: 'Dueling refers to value/advantage streams, not agent competition.',
                    d: 'It is not adversarial training.'
                }
            },
            {
                id: 't13-10',
                question: 'What is a key takeaway from Q-learning case studies in healthcare?',
                options: [
                    { id: 'a', text: 'Offline/batch Q-learning is necessary because online exploration is unethical' },
                    { id: 'b', text: 'Tabular Q-learning is preferred for patient data' },
                    { id: 'c', text: 'Healthcare requires no reward function' },
                    { id: 'd', text: 'Exploration is safe in clinical settings' }
                ],
                correctAnswer: 'a',
                justification: 'Online exploration in healthcare could harm patients, so offline RL methods using historical data are essential.',
                wrongJustifications: {
                    b: 'Healthcare data has large state spaces requiring function approximation.',
                    c: 'Reward functions (e.g., patient outcomes) are essential.',
                    d: 'Exploration in clinical settings is risky.'
                }
            }
        ],
        recap: [
            'DQN achieved breakthrough results on Atari games using CNNs, experience replay, and target networks.',
            'Experience replay and target networks stabilize neural network Q-learning.',
            'Reward clipping to [-1,0,+1] stabilized training across diverse games.',
            'TD-Gammon demonstrated self-play learning to superhuman level.',
            'Overestimation bias from the max operator is a known failure mode.',
            'Double DQN and Dueling DQN improved upon the original DQN architecture.',
            'Robotics case studies highlight the need for sim-to-real transfer.',
            'Healthcare Q-learning requires offline/batch methods due to ethical constraints.'
        ],
        skillMapping: [
            { skill: 'Recalling key Q-learning case studies (DQN, TD-Gammon)', level: 'remember' },
            { skill: 'Explaining innovations in DQN (replay, target networks)', level: 'understand' },
            { skill: 'Analyzing overestimation bias and its remedies', level: 'analyze' },
            { skill: 'Evaluating ethical considerations for real-world Q-learning', level: 'evaluate' }
        ]
    }
};
