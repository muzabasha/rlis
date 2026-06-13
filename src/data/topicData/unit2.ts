import { TopicData } from './index';

export const unit2TopicData: Record<string, TopicData> = {
    "Topic1_MDPComponents": {
        prerequisites: [
            "Basic probability and statistics",
            "Understanding of sequential decision-making",
            "Concept of states, actions, and rewards",
            "Agent-environment interaction loop basics",
            "Markov property intuition"
        ],
        mcqs: [
            {
                id: "t1-1",
                question: "What is the standard tuple that defines a Markov Decision Process?",
                options: [
                    { id: "a", text: "(S, A, P, R, \u03b3)" },
                    { id: "b", text: "(S, A, V, Q, \u03c0)" },
                    { id: "c", text: "(State, Action, Reward, Policy, Value)" },
                    { id: "d", text: "(X, Y, Z, W, \u03b8)" }
                ],
                correctAnswer: "a",
                justification: "An MDP is formally defined by the 5-tuple (S, A, P, R, \u03b3) representing States, Actions, Transition Probabilities, Reward Function, and Discount Factor.",
                wrongJustifications: {
                    b: "V, Q, and \u03c0 are derived from MDPs but are not part of the defining tuple.",
                    c: "These are conceptual elements but not the formal mathematical tuple notation.",
                    d: "This uses non-standard notation unrelated to the MDP definition."
                }
            },
            {
                id: "t1-2",
                question: "In an MDP, what does the state space S represent?",
                options: [
                    { id: "a", text: "The set of all possible actions the agent can take" },
                    { id: "b", text: "The complete set of all possible situations the environment can be in" },
                    { id: "c", text: "The transition probabilities between states" },
                    { id: "d", text: "The reward values for each action" }
                ],
                correctAnswer: "b",
                justification: "The state space S is the set of all configurations the environment can assume.",
                wrongJustifications: {
                    a: "Actions belong to the action space A, not the state space S.",
                    c: "Transition probabilities are represented by P in the tuple.",
                    d: "Reward values are defined by the reward function R."
                }
            },
            {
                id: "t1-3",
                question: "What does the transition probability P(s\u2032 | s, a) represent?",
                options: [
                    { id: "a", text: "The probability of taking action a in state s" },
                    { id: "b", text: "The probability of receiving a reward" },
                    { id: "c", text: "The probability of transitioning to state s\u2032 after taking action a in state s" },
                    { id: "d", text: "The probability of the policy selecting action a" }
                ],
                correctAnswer: "c",
                justification: "P(s\u2032|s,a) defines the environment dynamics \u2014 the probability of landing in state s\u2032 when the agent executes action a from state s.",
                wrongJustifications: {
                    a: "Action selection probability is given by the policy \u03c0(a|s).",
                    b: "Rewards are defined by the reward function R.",
                    d: "The policy \u03c0 defines action selection probabilities."
                }
            },
            {
                id: "t1-4",
                question: "Which component of the MDP tuple determines the agent\u2019s planning horizon?",
                options: [
                    { id: "a", text: "State space S" },
                    { id: "b", text: "Action space A" },
                    { id: "c", text: "Discount factor \u03b3" },
                    { id: "d", text: "Transition probability P" }
                ],
                correctAnswer: "c",
                justification: "The discount factor \u03b3 \u2208 [0,1) controls how much the agent values future rewards. A \u03b3 close to 1 encourages long-term planning.",
                wrongJustifications: {
                    a: "The state space defines configurations, not the planning horizon.",
                    b: "The action space defines decisions, not the planning horizon.",
                    d: "Transition probabilities define dynamics, not the planning horizon."
                }
            },
            {
                id: "t1-5",
                question: "In a gridworld MDP, what would be a valid action space?",
                options: [
                    { id: "a", text: "The set of all grid cell coordinates" },
                    { id: "b", text: "The set {up, down, left, right}" },
                    { id: "c", text: "The rewards assigned to each cell" },
                    { id: "d", text: "The probability of moving to each neighbor" }
                ],
                correctAnswer: "b",
                justification: "The action space A defines the set of decisions available to the agent. In a gridworld, this is typically the four cardinal movement directions.",
                wrongJustifications: {
                    a: "Grid cell coordinates form the state space S.",
                    c: "Rewards are part of the reward function R.",
                    d: "Transition probabilities are part of P."
                }
            },
            {
                id: "t1-6",
                question: "What is the sum of P(s\u2032 | s, a) over all possible next states s\u2032?",
                options: [
                    { id: "a", text: "It must equal 0" },
                    { id: "b", text: "It must equal 1" },
                    { id: "c", text: "It must equal the discount factor \u03b3" },
                    { id: "d", text: "It can be any value between 0 and 1" }
                ],
                correctAnswer: "b",
                justification: "The transition probabilities from any state-action pair must sum to 1, satisfying the probability axiom.",
                wrongJustifications: {
                    a: "A sum of 0 would mean no possible next state.",
                    c: "The discount factor \u03b3 is unrelated to transition probabilities.",
                    d: "The probabilities must sum to exactly 1."
                }
            },
            {
                id: "t1-7",
                question: "What is the role of the reward function R in an MDP?",
                options: [
                    { id: "a", text: "To control which actions the agent can take" },
                    { id: "b", text: "To provide immediate scalar feedback for each transition" },
                    { id: "c", text: "To determine transition probabilities" },
                    { id: "d", text: "To store the agent\u2019s past experiences" }
                ],
                correctAnswer: "b",
                justification: "The reward function provides immediate evaluative feedback. It defines what the agent should strive for.",
                wrongJustifications: {
                    a: "Action availability is defined by the action space.",
                    c: "Transition probabilities are defined by P.",
                    d: "Experience storage is a function of the agent\u2019s memory."
                }
            },
            {
                id: "t1-8",
                question: "If the discount factor \u03b3 is set to 0, what behavior results?",
                options: [
                    { id: "a", text: "The agent plans infinitely far into the future" },
                    { id: "b", text: "The agent only cares about immediate reward" },
                    { id: "c", text: "The agent explores all states equally" },
                    { id: "d", text: "The agent never learns" }
                ],
                correctAnswer: "b",
                justification: "With \u03b3 = 0, the agent maximizes only the immediate reward and ignores all future rewards.",
                wrongJustifications: {
                    a: "\u03b3 = 1 would make the agent consider infinite future.",
                    c: "Exploration is controlled by the learning algorithm.",
                    d: "The agent still learns but only maximizes immediate rewards."
                }
            },
            {
                id: "t1-9",
                question: "Which real-world system is best modeled as an MDP?",
                options: [
                    { id: "a", text: "A static image classification task" },
                    { id: "b", text: "A robot navigating a warehouse" },
                    { id: "c", text: "A linear regression model" },
                    { id: "d", text: "A database indexing system" }
                ],
                correctAnswer: "b",
                justification: "Robot navigation involves sequential decision-making with states, actions, transition probabilities, and rewards.",
                wrongJustifications: {
                    a: "Image classification is supervised learning.",
                    c: "Linear regression is a supervised learning method.",
                    d: "Database indexing is not sequential decision-making."
                }
            },
            {
                id: "t1-10",
                question: "What does \u2018Markov\u2019 in Markov Decision Process refer to?",
                options: [
                    { id: "a", text: "The mathematician who invented it" },
                    { id: "b", text: "The property that the future depends only on the present" },
                    { id: "c", text: "The type of probability distribution used" },
                    { id: "d", text: "The algorithm used to solve it" }
                ],
                correctAnswer: "b",
                justification: "The Markov property states the future is conditionally independent of the past given the present.",
                wrongJustifications: {
                    a: "While named after Markov, the term refers to the property.",
                    c: "No specific distribution is implied.",
                    d: "The Markov property is about process structure, not algorithms."
                }
            }
        ],
        recap: [
            "An MDP is defined by the 5-tuple (S, A, P, R, \u03b3)",
            "S represents all possible environment configurations",
            "A represents all actions available to the agent",
            "P(s\u2032|s,a) defines environment transition dynamics",
            "R provides immediate scalar reward feedback",
            "\u03b3 controls the trade-off between immediate and future rewards",
            "Transition probabilities must sum to 1",
            "MDPs model sequential decision-making problems"
        ],
        skillMapping: [
            { skill: "MDP tuple identification", level: "Understanding" },
            { skill: "Distinguishing S, A, P, R, \u03b3 components", level: "Applying" },
            { skill: "Analyzing transition probabilities", level: "Analyzing" },
            { skill: "Evaluating real-world problems as MDPs", level: "Evaluating" }
        ]
    },
    "Topic2_FormalMDPDefinition": {
        prerequisites: [
            "MDP components (S, A, P, R, \u03b3)",
            "Basic probability theory",
            "Concept of expectation",
            "Agent-environment interaction loop",
            "Markov property"
        ],
        mcqs: [
            {
                id: "t2-1",
                question: "What is the formal notation for transition dynamics in an MDP?",
                options: [
                    { id: "a", text: "V(s) = E[G_t | S_t = s]" },
                    { id: "b", text: "P(s\u2032 | s, a) = Pr(S_{t+1}=s\u2032 | S_t=s, A_t=a)" },
                    { id: "c", text: "\u03c0(a|s) = Pr(A_t=a | S_t=s)" },
                    { id: "d", text: "Q(s,a) = E[G_t | S_t=s, A_t=a]" }
                ],
                correctAnswer: "b",
                justification: "P(s\u2032|s,a) formally defines the probability of transitioning to the next state given the current state and action.",
                wrongJustifications: {
                    a: "V(s) is the state-value function, not transition dynamics.",
                    c: "\u03c0(a|s) is the policy, not environment dynamics.",
                    d: "Q(s,a) is the action-value function."
                }
            },
            {
                id: "t2-2",
                question: "What is the formal range of the discount factor \u03b3?",
                options: [
                    { id: "a", text: "[-1, 1]" },
                    { id: "b", text: "[0, 1]" },
                    { id: "c", text: "[0, 1)" },
                    { id: "d", text: "(0, \u221e)" }
                ],
                correctAnswer: "c",
                justification: "\u03b3 \u2208 [0,1) ensures the infinite-horizon return converges to a finite value. \u03b3 must be strictly less than 1 for continuing tasks.",
                wrongJustifications: {
                    a: "Negative discount factors are not standard.",
                    b: "\u03b3 = 1 can cause infinite returns in continuing tasks.",
                    d: "Values > 1 cause returns to diverge."
                }
            },
            {
                id: "t2-3",
                question: "What distinguishes a formal MDP from a Markov Chain?",
                options: [
                    { id: "a", text: "MDPs have rewards and an agent that makes decisions" },
                    { id: "b", text: "Markov Chains are always deterministic" },
                    { id: "c", text: "MDPs do not require the Markov property" },
                    { id: "d", text: "There is no difference" }
                ],
                correctAnswer: "a",
                justification: "An MDP extends a Markov Chain by adding actions (agent decisions) and rewards. A Markov Chain has only passive state transitions.",
                wrongJustifications: {
                    b: "Markov Chains can be stochastic.",
                    c: "MDPs require the Markov property.",
                    d: "MDPs and MCs are distinct but related."
                }
            },
            {
                id: "t2-4",
                question: "What does the reward function R(s,a) output?",
                options: [
                    { id: "a", text: "A probability distribution over next states" },
                    { id: "b", text: "A scalar value for taking action a in state s" },
                    { id: "c", text: "The optimal action in state s" },
                    { id: "d", text: "The value of state s under the current policy" }
                ],
                correctAnswer: "b",
                justification: "R(s,a) returns a scalar \u2014 the immediate numerical feedback for a particular state-action pair.",
                wrongJustifications: {
                    a: "Probabilities over next states are given by P(s\u2032|s,a).",
                    c: "The optimal action is determined by the optimal policy.",
                    d: "The value of a state is V(s)."
                }
            },
            {
                id: "t2-5",
                question: "What is the mathematical constraint on the transition function P?",
                options: [
                    { id: "a", text: "\u03a3_{s\u2032\u2208S} P(s\u2032|s,a) = 1 for all s,a" },
                    { id: "b", text: "P(s\u2032|s,a) \u2264 R(s,a)" },
                    { id: "c", text: "P(s\u2032|s,a) = 0 for terminal states" },
                    { id: "d", text: "P must be symmetric" }
                ],
                correctAnswer: "a",
                justification: "For each state-action pair, probabilities over all next states must sum to 1, forming a valid probability distribution.",
                wrongJustifications: {
                    b: "Transition probabilities are independent of rewards.",
                    c: "Terminal states may have self-loop probabilities.",
                    d: "Transition matrices need not be symmetric."
                }
            },
            {
                id: "t2-6",
                question: "Which element defines the agent\u2019s behavior in an MDP?",
                options: [
                    { id: "a", text: "The state space S" },
                    { id: "b", text: "The policy \u03c0(a|s)" },
                    { id: "c", text: "The transition function P" },
                    { id: "d", text: "The discount factor \u03b3" }
                ],
                correctAnswer: "b",
                justification: "The policy \u03c0(a|s) formally defines the agent\u2019s behavior by mapping states to actions or action probabilities.",
                wrongJustifications: {
                    a: "The state space is part of the environment definition.",
                    c: "Transition functions define environment dynamics.",
                    d: "The discount factor is a problem parameter."
                }
            },
            {
                id: "t2-7",
                question: "What does an episodic MDP assume about agent-environment interaction?",
                options: [
                    { id: "a", text: "Interaction continues indefinitely" },
                    { id: "b", text: "Interaction divides into finite-length episodes that terminate" },
                    { id: "c", text: "There is no terminal state" },
                    { id: "d", text: "Episodes have infinite length" }
                ],
                correctAnswer: "b",
                justification: "Episodic MDPs have natural termination points. Each episode ends at a terminal state, after which the process resets.",
                wrongJustifications: {
                    a: "That describes continuing tasks.",
                    c: "Episodic MDPs have terminal states.",
                    d: "Episodes are finite by definition."
                }
            },
            {
                id: "t2-8",
                question: "In a formal MDP, the state space S can be:",
                options: [
                    { id: "a", text: "Only finite sets" },
                    { id: "b", text: "Finite, countable infinite, or continuous" },
                    { id: "c", text: "Only sets with fewer than 100 elements" },
                    { id: "d", text: "Only binary values" }
                ],
                correctAnswer: "b",
                justification: "MDPs can have finite, countably infinite, or continuous state spaces. Solution methods depend on the type.",
                wrongJustifications: {
                    a: "Infinite and continuous spaces are supported.",
                    c: "No arbitrary size limit exists.",
                    d: "State spaces are not limited to binary values."
                }
            },
            {
                id: "t2-9",
                question: "What is the purpose of \u03b3 in the formal return definition?",
                options: [
                    { id: "a", text: "To make rewards larger over time" },
                    { id: "b", text: "To ensure the infinite sum of rewards converges" },
                    { id: "c", text: "To penalize the agent for taking actions" },
                    { id: "d", text: "To control the exploration rate" }
                ],
                correctAnswer: "b",
                justification: "\u03b3 < 1 ensures G_t = \u03a3 \u03b3^k R_{t+k+1} converges to a finite value in infinite-horizon settings.",
                wrongJustifications: {
                    a: "\u03b3 reduces future reward contributions.",
                    c: "The discount factor is not a penalty.",
                    d: "Exploration rate is controlled by the algorithm."
                }
            },
            {
                id: "t2-10",
                question: "Which of the following is NOT part of the formal MDP definition?",
                options: [
                    { id: "a", text: "State space S" },
                    { id: "b", text: "Policy \u03c0" },
                    { id: "c", text: "Action space A" },
                    { id: "d", text: "Transition function P" }
                ],
                correctAnswer: "b",
                justification: "The policy \u03c0 is not part of the MDP definition. The MDP is (S, A, P, R, \u03b3); the policy is chosen by the agent.",
                wrongJustifications: {
                    a: "S is a fundamental MDP component.",
                    c: "A is a fundamental MDP component.",
                    d: "P is a fundamental MDP component."
                }
            }
        ],
        recap: [
            "An MDP is formally (S, A, P, R, \u03b3)",
            "P(s\u2032|s,a) defines transition dynamics",
            "R outputs a scalar reward per state-action transition",
            "\u03b3 \u2208 [0,1) ensures convergence",
            "The policy \u03c0 is the agent\u2019s behavior, not part of the MDP",
            "State spaces can be finite, infinite, or continuous",
            "Episodic MDPs have terminal states",
            "Transition probabilities must sum to 1"
        ],
        skillMapping: [
            { skill: "Formal MDP tuple notation", level: "Understanding" },
            { skill: "Differentiating agent vs environment components", level: "Applying" },
            { skill: "Analyzing constraints on transition functions", level: "Analyzing" },
            { skill: "Evaluating MDP formalisms", level: "Evaluating" }
        ]
    },
    "Topic3_MarkovPropertyChain": {
        prerequisites: [
            "Basic probability and conditional probability",
            "Concept of state transitions",
            "MDP fundamentals",
            "Intuition about memoryless processes",
            "Sequence modeling basics"
        ],
        mcqs: [
            {
                id: "t3-1",
                question: "The Markov property states that:",
                options: [
                    { id: "a", text: "All states are independent of each other" },
                    { id: "b", text: "The future is conditionally independent of the past given the present" },
                    { id: "c", text: "Rewards depend only on actions" },
                    { id: "d", text: "The environment must be deterministic" }
                ],
                correctAnswer: "b",
                justification: "P(S_{t+1}|S_t) = P(S_{t+1}|S_1, ..., S_t). The next state depends only on the current state.",
                wrongJustifications: {
                    a: "States are not independent; transitions follow probabilities.",
                    c: "Rewards depend on state-action pairs.",
                    d: "The Markov property allows stochastic transitions."
                }
            },
            {
                id: "t3-2",
                question: "What is a Markov Chain?",
                options: [
                    { id: "a", text: "A sequence of independent random variables" },
                    { id: "b", text: "A stochastic process where transitions depend only on the current state" },
                    { id: "c", text: "A neural network for sequence prediction" },
                    { id: "d", text: "A supervised learning algorithm" }
                ],
                correctAnswer: "b",
                justification: "A Markov Chain is a sequence where the probability of the next state depends only on the current state.",
                wrongJustifications: {
                    a: "Markov Chain variables are not independent.",
                    c: "Markov Chains are mathematical models.",
                    d: "Markov Chains are stochastic process models."
                }
            },
            {
                id: "t3-3",
                question: "Why is the Markov property important for RL?",
                options: [
                    { id: "a", text: "It makes all problems solvable in one step" },
                    { id: "b", text: "It allows decisions based only on the current state without storing full history" },
                    { id: "c", text: "It eliminates the need for rewards" },
                    { id: "d", text: "It guarantees optimality" }
                ],
                correctAnswer: "b",
                justification: "The Markov property ensures the current state is a sufficient statistic for the future, making RL tractable.",
                wrongJustifications: {
                    a: "Iterative methods are still needed.",
                    c: "Rewards are still essential.",
                    d: "The property does not guarantee optimality."
                }
            },
            {
                id: "t3-4",
                question: "In a Markov Chain, the transition matrix P must satisfy:",
                options: [
                    { id: "a", text: "All entries must be zero" },
                    { id: "b", text: "Each row must sum to 1" },
                    { id: "c", text: "Each column must sum to 1" },
                    { id: "d", text: "All entries must be equal" }
                ],
                correctAnswer: "b",
                justification: "Each row represents a probability distribution over next states, so each row must sum to exactly 1.",
                wrongJustifications: {
                    a: "Entries are probabilities and can be non-zero.",
                    c: "The constraint is on rows, not columns.",
                    d: "Entries vary between state pairs."
                }
            },
            {
                id: "t3-5",
                question: "If P(Rainy|Sunny) = 0.2 in a Markov Chain, what is P(Rainy tomorrow) if today is Sunny?",
                options: [
                    { id: "a", text: "0.2 regardless of yesterday\u2019s weather" },
                    { id: "b", text: "Depends on yesterday\u2019s weather" },
                    { id: "c", text: "0.8" },
                    { id: "d", text: "Cannot be determined" }
                ],
                correctAnswer: "a",
                justification: "Under the Markov property, only today\u2019s state matters. The probability is exactly 0.2 regardless of history.",
                wrongJustifications: {
                    b: "Past states do not affect future probabilities given the present.",
                    c: "0.8 is P(Sunny|Sunny), not P(Rainy|Sunny).",
                    d: "The probability is directly given by the transition matrix."
                }
            },
            {
                id: "t3-6",
                question: "What happens when the Markov property is violated?",
                options: [
                    { id: "a", text: "The system becomes a POMDP" },
                    { id: "b", text: "The problem becomes unsolvable" },
                    { id: "c", text: "RL algorithms work better" },
                    { id: "d", text: "Nothing changes" }
                ],
                correctAnswer: "a",
                justification: "When the Markov property does not hold, the system becomes a Partially Observable MDP (POMDP).",
                wrongJustifications: {
                    b: "POMDPs are solvable with specialized methods.",
                    c: "Violating the Markov property makes RL harder.",
                    d: "The violation has significant implications."
                }
            },
            {
                id: "t3-7",
                question: "What is the stationary distribution of a Markov Chain?",
                options: [
                    { id: "a", text: "The initial distribution over states" },
                    { id: "b", text: "A distribution \u03c0 such that \u03c0P = \u03c0" },
                    { id: "c", text: "The transition matrix itself" },
                    { id: "d", text: "The reward distribution" }
                ],
                correctAnswer: "b",
                justification: "The stationary distribution \u03c0 satisfies \u03c0P = \u03c0, representing long-run state probabilities.",
                wrongJustifications: {
                    a: "The initial distribution is the starting point.",
                    c: "P defines dynamics, not the stationary distribution.",
                    d: "Markov Chains do not have rewards."
                }
            },
            {
                id: "t3-8",
                question: "What does P\u00b2 represent in a Markov Chain?",
                options: [
                    { id: "a", text: "The 2-step transition probabilities" },
                    { id: "b", text: "The probability of the second state" },
                    { id: "c", text: "The transpose of P" },
                    { id: "d", text: "The stationary distribution squared" }
                ],
                correctAnswer: "a",
                justification: "P\u00b2 is the matrix product P\u00d7P, where entry (i,j) gives the probability of transitioning from i to j in exactly 2 steps.",
                wrongJustifications: {
                    b: "P\u00b2 is a matrix, not a single probability.",
                    c: "The transpose is P^T.",
                    d: "The stationary distribution is not obtained by squaring P."
                }
            },
            {
                id: "t3-9",
                question: "Which is NOT an example of a Markov Chain?",
                options: [
                    { id: "a", text: "A bigram language model" },
                    { id: "b", text: "Weather prediction from today\u2019s weather" },
                    { id: "c", text: "A random walk on a graph" },
                    { id: "d", text: "Stock prediction using all historical prices" }
                ],
                correctAnswer: "d",
                justification: "If prediction requires all historical data, it violates the Markov property and is not first-order Markov.",
                wrongJustifications: {
                    a: "Bigram models are classic Markov Chains.",
                    b: "Weather with 1-day memory is a standard MC.",
                    c: "Random walks are fundamental MC examples."
                }
            },
            {
                id: "t3-10",
                question: "What does an absorbing state mean in a Markov Chain?",
                options: [
                    { id: "a", text: "The state has no incoming transitions" },
                    { id: "b", text: "Once entered, the agent stays there with probability 1" },
                    { id: "c", text: "The state has the highest reward" },
                    { id: "d", text: "The state can only be reached from one state" }
                ],
                correctAnswer: "b",
                justification: "An absorbing state has P(s|s) = 1, meaning once entered, the agent never leaves.",
                wrongJustifications: {
                    a: "States with no incoming transitions are transient sources.",
                    c: "Rewards are not part of Markov Chain definition.",
                    d: "Reachability constraints do not define absorbing states."
                }
            }
        ],
        recap: [
            "The Markov property: future depends only on the present",
            "P(S_{t+1}|S_t) = P(S_{t+1}|S_1, ..., S_t)",
            "Markov Chains depend only on the current state",
            "The transition matrix P is row-stochastic",
            "Stationary distribution \u03c0 satisfies \u03c0P = \u03c0",
            "P\u00b2 gives 2-step transition probabilities",
            "Violations of the Markov property lead to POMDPs",
            "Absorbing states have self-loop probability 1"
        ],
        skillMapping: [
            { skill: "Understanding the Markov property", level: "Understanding" },
            { skill: "Applying Markov Chain transition matrices", level: "Applying" },
            { skill: "Analyzing stationary distributions", level: "Analyzing" },
            { skill: "Evaluating when the Markov property holds", level: "Evaluating" }
        ]
    },
    "Topic4_MarkovChainAnalysis": {
        prerequisites: [
            "Markov property and Markov Chain concept",
            "Transition matrix fundamentals",
            "Basic linear algebra (matrix multiplication)",
            "Probability distributions",
            "Matrix powers"
        ],
        mcqs: [
            {
                id: "t4-1",
                question: "What does the n-step transition matrix P^n represent?",
                options: [
                    { id: "a", text: "Transitions in exactly n steps" },
                    { id: "b", text: "The transpose of P" },
                    { id: "c", text: "The stationary distribution" },
                    { id: "d", text: "Self-transition probabilities" }
                ],
                correctAnswer: "a",
                justification: "P^n gives entry (i,j) as the probability of moving from state i to j in exactly n steps.",
                wrongJustifications: {
                    b: "The transpose is P^T.",
                    c: "Stationary distribution is the limit as n\u2192\u221e.",
                    d: "P^n covers all possible n-step paths."
                }
            },
            {
                id: "t4-2",
                question: "As n\u2192\u221e in an ergodic Markov Chain, what happens?",
                options: [
                    { id: "a", text: "It oscillates between states" },
                    { id: "b", text: "It converges to the stationary distribution from any start" },
                    { id: "c", text: "It becomes zero for all states" },
                    { id: "d", text: "It depends entirely on initial distribution" }
                ],
                correctAnswer: "b",
                justification: "Ergodic chains converge to the unique stationary distribution \u03c0 from any starting distribution.",
                wrongJustifications: {
                    a: "Ergodic chains converge, not oscillate.",
                    c: "Distribution converges to positive probabilities.",
                    d: "Stationary distribution is independent of initial distribution."
                }
            },
            {
                id: "t4-3",
                question: "What does irreducible mean for a Markov Chain?",
                options: [
                    { id: "a", text: "The chain has only one state" },
                    { id: "b", text: "Every state is reachable from every other state" },
                    { id: "c", text: "No terminal states exist" },
                    { id: "d", text: "The matrix has no zero entries" }
                ],
                correctAnswer: "b",
                justification: "Irreducibility means there is a path of non-zero probability between any two states.",
                wrongJustifications: {
                    a: "Irreducible chains can have many states.",
                    c: "Reducible chains can have terminal states.",
                    d: "Irreducibility requires reachability, not non-zero direct transitions."
                }
            },
            {
                id: "t4-4",
                question: "What is the mean first passage time?",
                options: [
                    { id: "a", text: "Average steps to reach state j from state i for the first time" },
                    { id: "b", text: "Average time in each state in stationarity" },
                    { id: "c", text: "Time to reach stationarity" },
                    { id: "d", text: "Number of zero entries in P" }
                ],
                correctAnswer: "a",
                justification: "Mean first passage time is the expected number of steps to first reach state j from state i.",
                wrongJustifications: {
                    b: "That describes stationary occupancy time.",
                    c: "Mixing time describes convergence to stationarity.",
                    d: "First passage time is unrelated to zero entries."
                }
            },
            {
                id: "t4-5",
                question: "What is a transient state?",
                options: [
                    { id: "a", text: "A state visited infinitely often" },
                    { id: "b", text: "A state with non-zero probability of never returning" },
                    { id: "c", text: "The initial state" },
                    { id: "d", text: "A state appearing only once" }
                ],
                correctAnswer: "b",
                justification: "Transient states have finite expected visits. There is a non-zero probability the chain never returns after leaving.",
                wrongJustifications: {
                    a: "States visited infinitely often are recurrent.",
                    c: "The initial state can be transient or recurrent.",
                    d: "Transient states can be visited multiple times."
                }
            },
            {
                id: "t4-6",
                question: "What is the period of a state in a Markov Chain?",
                options: [
                    { id: "a", text: "Time between consecutive visits" },
                    { id: "b", text: "GCD of n where P^n_{ii} > 0" },
                    { id: "c", text: "Stationary probability of that state" },
                    { id: "d", text: "Number of outgoing transitions" }
                ],
                correctAnswer: "b",
                justification: "The period is the GCD of the set {n \u2265 1: P^n_{ii} > 0}. A state with period 1 is aperiodic.",
                wrongJustifications: {
                    a: "That describes recurrence time.",
                    c: "Stationary probability is a different concept.",
                    d: "Outgoing transitions relate to degree, not period."
                }
            },
            {
                id: "t4-7",
                question: "What does the Chapman-Kolmogorov equation describe?",
                options: [
                    { id: "a", text: "Multi-step transition probability relationships" },
                    { id: "b", text: "The stationary distribution" },
                    { id: "c", text: "Convergence rate" },
                    { id: "d", text: "Reward accumulation" }
                ],
                correctAnswer: "a",
                justification: "P^{m+n} = P^m \u00d7 P^n relates multi-step transition probabilities via matrix multiplication.",
                wrongJustifications: {
                    b: "Stationary distribution requires additional analysis.",
                    c: "Convergence rate depends on eigenvalues.",
                    d: "Rewards are not part of basic MC theory."
                }
            },
            {
                id: "t4-8",
                question: "What distinguishes a regular Markov Chain?",
                options: [
                    { id: "a", text: "Some P^k has all positive entries" },
                    { id: "b", text: "It is always deterministic" },
                    { id: "c", text: "It has no transient states" },
                    { id: "d", text: "It only has two states" }
                ],
                correctAnswer: "a",
                justification: "A regular chain has finite k where all entries of P^k are strictly positive, ensuring both irreducibility and aperiodicity.",
                wrongJustifications: {
                    b: "Regular chains are stochastic.",
                    c: "Regular chains can have transient states.",
                    d: "Regular chains can have many states."
                }
            },
            {
                id: "t4-9",
                question: "If P = [[0, 1], [1, 0]], what is the period?",
                options: [
                    { id: "a", text: "1" },
                    { id: "b", text: "2" },
                    { id: "c", text: "0" },
                    { id: "d", text: "\u221e" }
                ],
                correctAnswer: "b",
                justification: "This chain alternates deterministically. Returns to the starting state occur only in even steps, so GCD = 2.",
                wrongJustifications: {
                    a: "Period 1 requires non-zero self-loop probability.",
                    c: "Period is always a positive integer.",
                    d: "The period is finite and well-defined as 2."
                }
            },
            {
                id: "t4-10",
                question: "What does mixing time measure?",
                options: [
                    { id: "a", text: "Total number of states" },
                    { id: "b", text: "How quickly the chain converges to stationarity" },
                    { id: "c", text: "Maximum transition probability" },
                    { id: "d", text: "Number of absorbing states" }
                ],
                correctAnswer: "b",
                justification: "Mixing time quantifies the steps required for the chain\u2019s distribution to become close to the stationary distribution.",
                wrongJustifications: {
                    a: "State count is a structural property.",
                    c: "Max probability is unrelated to mixing time.",
                    d: "Absorbing state count is a topological property."
                }
            }
        ],
        recap: [
            "P^n gives n-step transition probabilities",
            "Ergodic chains converge to stationary distribution \u03c0",
            "Irreducible chains connect all states",
            "Transient states have finite expected visits",
            "Period is GCD of possible return step counts",
            "CK equation relates multi-step transitions",
            "Regular chains have P^k > 0 for some k",
            "Mixing time measures convergence speed"
        ],
        skillMapping: [
            { skill: "Computing n-step transition probabilities", level: "Applying" },
            { skill: "Analyzing chain structure", level: "Analyzing" },
            { skill: "Evaluating stationary distributions", level: "Evaluating" },
            { skill: "Understanding transient vs recurrent states", level: "Understanding" }
        ]
    },
    "Topic5_MarkovModel": {
        prerequisites: [
            "Markov Chain fundamentals",
            "MDP basics",
            "Concept of observability in systems",
            "Hidden states and emissions",
            "Control theory basics"
        ],
        mcqs: [
            {
                id: "t5-1",
                question: "What distinguishes an HMM from a Markov Chain?",
                options: [
                    { id: "a", text: "HMMs have partially observable states with emissions" },
                    { id: "b", text: "Markov Chains are always more complex" },
                    { id: "c", text: "HMMs do not satisfy the Markov property" },
                    { id: "d", text: "There is no difference" }
                ],
                correctAnswer: "a",
                justification: "HMMs have hidden states that generate observable emissions. Standard MCs assume fully observable states.",
                wrongJustifications: {
                    b: "HMMs are typically more complex.",
                    c: "HMMs still satisfy the Markov property.",
                    d: "The key difference is state observability."
                }
            },
            {
                id: "t5-2",
                question: "What determines if a system is a MC vs an MDP?",
                options: [
                    { id: "a", text: "Number of states" },
                    { id: "b", text: "Whether actions are controlled by an agent or autonomous" },
                    { id: "c", text: "The discount factor" },
                    { id: "d", text: "Matrix size" }
                ],
                correctAnswer: "b",
                justification: "MCs are autonomous (no agent); MDPs are controlled (agent selects actions).",
                wrongJustifications: {
                    a: "State count does not determine model type.",
                    c: "Both MCs and MDPs can have discount factors.",
                    d: "Matrix size does not determine the type."
                }
            },
            {
                id: "t5-3",
                question: "What is a POMDP?",
                options: [
                    { id: "a", text: "An MDP where states are directly visible" },
                    { id: "b", text: "An MDP with only indirect observations of the true state" },
                    { id: "c", text: "An MDP with no reward function" },
                    { id: "d", text: "A deterministic MDP" }
                ],
                correctAnswer: "b",
                justification: "In a POMDP, the agent receives observations that provide partial information about the hidden true state.",
                wrongJustifications: {
                    a: "Fully observable MDPs have directly visible states.",
                    c: "POMDPs still have reward functions.",
                    d: "POMDPs can be stochastic; observability is the issue."
                }
            },
            {
                id: "t5-4",
                question: "Which combination gives a standard MDP in the taxonomy?",
                options: [
                    { id: "a", text: "Autonomous + Fully Observable" },
                    { id: "b", text: "Controlled + Fully Observable" },
                    { id: "c", text: "Autonomous + Partially Observable" },
                    { id: "d", text: "Controlled + Partially Observable" }
                ],
                correctAnswer: "b",
                justification: "A standard MDP combines controlled dynamics with full observability.",
                wrongJustifications: {
                    a: "Autonomous + Fully Observable = MC.",
                    c: "Autonomous + Partially Observable = HMM.",
                    d: "Controlled + Partially Observable = POMDP."
                }
            },
            {
                id: "t5-5",
                question: "What is a belief state in a POMDP?",
                options: [
                    { id: "a", text: "The true hidden state" },
                    { id: "b", text: "A distribution over all possible states given observation history" },
                    { id: "c", text: "The agent\u2019s policy" },
                    { id: "d", text: "The most recent observation" }
                ],
                correctAnswer: "b",
                justification: "A belief state b(s) = P(S_t = s | O_1,...,O_t, A_1,...,A_{t-1}) represents the agent\u2019s knowledge.",
                wrongJustifications: {
                    a: "The true state is hidden; belief is the estimate.",
                    c: "The policy maps beliefs to actions.",
                    d: "The most recent observation is just one piece of evidence."
                }
            },
            {
                id: "t5-6",
                question: "Which application is best modeled as an HMM?",
                options: [
                    { id: "a", text: "Robot vacuum navigation" },
                    { id: "b", text: "Speech recognition" },
                    { id: "c", text: "Chess AI" },
                    { id: "d", text: "Thermostat control" }
                ],
                correctAnswer: "b",
                justification: "Speech recognition infers hidden words/phonemes from observable audio emissions.",
                wrongJustifications: {
                    a: "Robot navigation is typically an MDP.",
                    c: "Chess is fully observable.",
                    d: "Thermostat control is a simple control system."
                }
            },
            {
                id: "t5-7",
                question: "In a POMDP, the policy maps from:",
                options: [
                    { id: "a", text: "True states to actions" },
                    { id: "b", text: "Belief states to actions" },
                    { id: "c", text: "Observations to actions without state" },
                    { id: "d", text: "Rewards to actions" }
                ],
                correctAnswer: "b",
                justification: "Since the true state is unknown, the policy maps belief distributions over hidden states to actions.",
                wrongJustifications: {
                    a: "The true state is unknown in a POMDP.",
                    c: "The formal solution uses belief states.",
                    d: "Rewards are outcomes, not policy inputs."
                }
            },
            {
                id: "t5-8",
                question: "What makes POMDPs harder than MDPs?",
                options: [
                    { id: "a", text: "POMDPs have fewer states" },
                    { id: "b", text: "Belief space is continuous even for finite states" },
                    { id: "c", text: "POMDPs do not need value functions" },
                    { id: "d", text: "POMDPs are always deterministic" }
                ],
                correctAnswer: "b",
                justification: "Even with finite hidden states, the belief space is a continuous simplex, making exact planning much harder.",
                wrongJustifications: {
                    a: "POMDPs require more computation.",
                    c: "POMDPs use value functions over belief states.",
                    d: "POMDPs can be stochastic."
                }
            },
            {
                id: "t5-9",
                question: "Which model is Autonomous + Partially Observable?",
                options: [
                    { id: "a", text: "Markov Chain (MC)" },
                    { id: "b", text: "Hidden Markov Model (HMM)" },
                    { id: "c", text: "Markov Decision Process (MDP)" },
                    { id: "d", text: "POMDP" }
                ],
                correctAnswer: "b",
                justification: "HMMs combine autonomous dynamics with partial observability.",
                wrongJustifications: {
                    a: "MCs are autonomous but fully observable.",
                    c: "MDPs are controlled and fully observable.",
                    d: "POMDPs are controlled and partially observable."
                }
            },
            {
                id: "t5-10",
                question: "What does the emission matrix E(o|s) define in an HMM?",
                options: [
                    { id: "a", text: "Transition probabilities between hidden states" },
                    { id: "b", text: "Probability of observing o given hidden state s" },
                    { id: "c", text: "Initial state probabilities" },
                    { id: "d", text: "Reward for being in state s" }
                ],
                correctAnswer: "b",
                justification: "E(o|s) gives the probability of observing emission o when the hidden state is s.",
                wrongJustifications: {
                    a: "Transitions are given by P.",
                    c: "Initial distribution is \u03c0\u2080.",
                    d: "Rewards are part of MDPs, not standard HMMs."
                }
            }
        ],
        recap: [
            "Models classified by control (auto vs controlled) and observability (full vs partial)",
            "MC = Autonomous + Fully Observable",
            "HMM = Autonomous + Partially Observable",
            "MDP = Controlled + Fully Observable",
            "POMDP = Controlled + Partially Observable",
            "POMDPs use belief states over hidden states",
            "HMMs used in speech recognition and bioinformatics",
            "Belief space is continuous even for finite state spaces"
        ],
        skillMapping: [
            { skill: "Classifying Markov models", level: "Understanding" },
            { skill: "Differentiating MC, HMM, MDP, POMDP", level: "Applying" },
            { skill: "Analyzing partial observability implications", level: "Analyzing" },
            { skill: "Evaluating models for real-world problems", level: "Evaluating" }
        ]
    },
    "Topic6_MarkovMatrix": {
        prerequisites: [
            "Linear algebra basics (matrix multiplication)",
            "Markov Chain transition matrices",
            "Row-stochastic matrices",
            "Matrix powers",
            "Eigenvalues and eigenvectors"
        ],
        mcqs: [
            {
                id: "t6-1",
                question: "What must every row of a Markov transition matrix satisfy?",
                options: [
                    { id: "a", text: "Sum to 0" },
                    { id: "b", text: "Sum to 1" },
                    { id: "c", text: "Be identical" },
                    { id: "d", text: "Sum to the number of states" }
                ],
                correctAnswer: "b",
                justification: "Each row sums to 1 because it represents a probability distribution over next states.",
                wrongJustifications: {
                    a: "Sum 0 violates the probability axiom.",
                    c: "Rows need only sum to 1, not be identical.",
                    d: "Sum must be exactly 1."
                }
            },
            {
                id: "t6-2",
                question: "If P is a 3\u00d73 Markov matrix, what does P[1][2] represent?",
                options: [
                    { id: "a", text: "Probability of being in state 1" },
                    { id: "b", text: "Probability of transitioning from state 1 to state 2" },
                    { id: "c", text: "Reward for moving from state 2 to state 1" },
                    { id: "d", text: "Stationary probability of state 2" }
                ],
                correctAnswer: "b",
                justification: "Entry P[i][j] gives the probability of transitioning FROM state i TO state j in one step.",
                wrongJustifications: {
                    a: "Current state probability is a distribution vector.",
                    c: "Rewards are not part of the transition matrix.",
                    d: "Stationary probabilities come from \u03c0P = \u03c0."
                }
            },
            {
                id: "t6-3",
                question: "What does \u03bc \u00d7 P give?",
                options: [
                    { id: "a", text: "The stationary distribution" },
                    { id: "b", text: "The next time step distribution" },
                    { id: "c", text: "The matrix squared" },
                    { id: "d", text: "The reward vector" }
                ],
                correctAnswer: "b",
                justification: "\u03bc_{t+1} = \u03bc_t \u00d7 P gives the distribution over states at the next time step.",
                wrongJustifications: {
                    a: "Stationary distribution satisfies \u03c0 = \u03c0P.",
                    c: "P\u00b2 = P \u00d7 P, not \u03bc \u00d7 P.",
                    d: "Rewards are not in the transition matrix."
                }
            },
            {
                id: "t6-4",
                question: "If P[0][0] = 0.8, P[0][1] = 0.2, what must P[1][0] + P[1][1] equal?",
                options: [
                    { id: "a", text: "0.8" },
                    { id: "b", text: "0.2" },
                    { id: "c", text: "1.0" },
                    { id: "d", text: "Depends on values" }
                ],
                correctAnswer: "c",
                justification: "Each row must sum to 1. The sum of row 1 must be exactly 1.0, independent of row 0.",
                wrongJustifications: {
                    a: "0.8 is row 0\u2019s sum.",
                    b: "0.2 is just one entry in row 0.",
                    d: "The row-stochastic property fixes the sum to 1."
                }
            },
            {
                id: "t6-5",
                question: "What is the largest eigenvalue of a Markov transition matrix?",
                options: [
                    { id: "a", text: "It equals \u03b3" },
                    { id: "b", text: "It is always 1" },
                    { id: "c", text: "It measures mixing time" },
                    { id: "d", text: "It determines state count" }
                ],
                correctAnswer: "b",
                justification: "The largest eigenvalue of a row-stochastic matrix is always 1, with the corresponding left eigenvector being \u03c0.",
                wrongJustifications: {
                    a: "\u03b3 is a separate parameter.",
                    c: "The second eigenvalue determines mixing time.",
                    d: "Eigenvalues relate to dynamics, not state count."
                }
            },
            {
                id: "t6-6",
                question: "What does a doubly stochastic matrix satisfy?",
                options: [
                    { id: "a", text: "Rows and columns both sum to 1" },
                    { id: "b", text: "Only rows sum to 1" },
                    { id: "c", text: "Only columns sum to 1" },
                    { id: "d", text: "All entries are equal" }
                ],
                correctAnswer: "a",
                justification: "Doubly stochastic matrices have rows AND columns summing to 1, implying a uniform stationary distribution.",
                wrongJustifications: {
                    b: "That describes standard row-stochastic.",
                    c: "That describes column-stochastic.",
                    d: "Doubly stochastic does not imply equal entries."
                }
            },
            {
                id: "t6-7",
                question: "How to find the 3-step transition probability from i to j?",
                options: [
                    { id: "a", text: "Cube P[i][j]" },
                    { id: "b", text: "Entry (i,j) of P\u00b3" },
                    { id: "c", text: "Sum over k of P[i][k] \u00d7 P[k][j]" },
                    { id: "d", text: "Multiply P by itself three times" }
                ],
                correctAnswer: "b",
                justification: "Compute P\u00b3 = P \u00d7 P \u00d7 P and read entry (i,j).",
                wrongJustifications: {
                    a: "Cubing the entry does not account for paths.",
                    c: "That gives the 2-step probability.",
                    d: "P\u00b3 is correct, but entry (i,j) of P\u00b3 is the answer."
                }
            },
            {
                id: "t6-8",
                question: "What matrix gives deterministic alternating between two states?",
                options: [
                    { id: "a", text: "[[0.5, 0.5], [0.5, 0.5]]" },
                    { id: "b", text: "[[0, 1], [1, 0]]" },
                    { id: "c", text: "[[1, 0], [0, 1]]" },
                    { id: "d", text: "[[0, 0], [1, 1]]" }
                ],
                correctAnswer: "b",
                justification: "[[0,1],[1,0]] means from each state you deterministically go to the other state.",
                wrongJustifications: {
                    a: "This gives 50-50 transitions.",
                    c: "This is the identity matrix.",
                    d: "Row 0 sums to 0, violating row-stochastic."
                }
            },
            {
                id: "t6-9",
                question: "What does P^k > 0 (all positive) mean?",
                options: [
                    { id: "a", text: "The chain is regular" },
                    { id: "b", text: "The matrix is singular" },
                    { id: "c", text: "The chain has period k" },
                    { id: "d", text: "There are k absorbing states" }
                ],
                correctAnswer: "a",
                justification: "If P^k > 0 for some k, the chain is regular: irreducible, aperiodic, converging to unique stationarity.",
                wrongJustifications: {
                    b: "Positivity does not imply singularity.",
                    c: "All positive entries indicate aperiodicity.",
                    d: "Absorbing states would produce zero entries."
                }
            },
            {
                id: "t6-10",
                question: "What is the stationary distribution \u03c0 for a Markov matrix P?",
                options: [
                    { id: "a", text: "\u03c0 = P \u00d7 \u03c0" },
                    { id: "b", text: "\u03c0 = \u03c0 \u00d7 P" },
                    { id: "c", text: "\u03c0 = P\u00b2" },
                    { id: "d", text: "\u03c0 = P^T" }
                ],
                correctAnswer: "b",
                justification: "\u03c0 is a row vector satisfying \u03c0 = \u03c0P, representing long-run state occupancy probabilities.",
                wrongJustifications: {
                    a: "\u03c0 multiplies P on the left as a row vector.",
                    c: "P\u00b2 is the 2-step transition matrix.",
                    d: "P^T is the transpose."
                }
            }
        ],
        recap: [
            "Markov matrices are row-stochastic (each row sums to 1)",
            "P[i][j] is transition probability from i to j",
            "\u03bc_{t+1} = \u03bc_t \u00d7 P for distribution updates",
            "Largest eigenvalue is always 1",
            "P^n gives n-step transition probabilities",
            "Doubly stochastic matrices have rows and columns summing to 1",
            "Regular chains have P^k > 0 for some k",
            "Stationary distribution \u03c0 satisfies \u03c0 = \u03c0P"
        ],
        skillMapping: [
            { skill: "Working with Markov transition matrices", level: "Applying" },
            { skill: "Computing matrix powers", level: "Applying" },
            { skill: "Analyzing eigenvalues and stationarity", level: "Analyzing" },
            { skill: "Evaluating regularity and convergence", level: "Evaluating" }
        ]
    },
    "Topic7_MarkovMatricesInML": {
        prerequisites: [
            "Markov matrix fundamentals",
            "Bigram language model intuition",
            "Transition probability matrices",
            "Natural language processing basics",
            "PageRank algorithm concept"
        ],
        mcqs: [
            {
                id: "t7-1",
                question: "How are Markov matrices used in bigram language models?",
                options: [
                    { id: "a", text: "They store word meanings" },
                    { id: "b", text: "Each row gives probability of next word given current word" },
                    { id: "c", text: "They encode grammar rules" },
                    { id: "d", text: "They represent the vocabulary as one state" }
                ],
                correctAnswer: "b",
                justification: "In a bigram model, P(word_j | word_i) gives the probability that word_j follows word_i.",
                wrongJustifications: {
                    a: "Meanings are captured by embeddings.",
                    c: "Grammar is implicit, not explicitly encoded.",
                    d: "Each word is a separate state."
                }
            },
            {
                id: "t7-2",
                question: "Google\u2019s PageRank algorithm uses a Markov matrix where:",
                options: [
                    { id: "a", text: "States are web pages, transitions are hyperlinks" },
                    { id: "b", text: "States are search queries" },
                    { id: "c", text: "States are ads" },
                    { id: "d", text: "States are servers" }
                ],
                correctAnswer: "a",
                justification: "PageRank models web surfing as a Markov Chain over web pages connected by hyperlinks.",
                wrongJustifications: {
                    b: "PageRank models page-to-page, not queries.",
                    c: "PageRank is about web pages, not ads.",
                    d: "PageRank is about pages and hyperlinks."
                }
            },
            {
                id: "t7-3",
                question: "How are Markov matrices used in bioinformatics?",
                options: [
                    { id: "a", text: "Image segmentation" },
                    { id: "b", text: "Modeling DNA sequence evolution" },
                    { id: "c", text: "Training neural networks" },
                    { id: "d", text: "Storing patient records" }
                ],
                correctAnswer: "b",
                justification: "Substitution matrices model DNA base mutation probabilities over evolutionary time for sequence alignment.",
                wrongJustifications: {
                    a: "Image segmentation uses CV methods.",
                    c: "Neural network training uses different frameworks.",
                    d: "Patient records use databases."
                }
            },
            {
                id: "t7-4",
                question: "Why must rows of a bigram matrix sum to 1?",
                options: [
                    { id: "a", text: "To ensure invertibility" },
                    { id: "b", text: "Each row is a probability distribution over next words" },
                    { id: "c", text: "To make the matrix symmetric" },
                    { id: "d", text: "To guarantee unique text" }
                ],
                correctAnswer: "b",
                justification: "Each row gives the probability distribution of the next word following a specific current word.",
                wrongJustifications: {
                    a: "Row-stochastic matrices are not generally invertible.",
                    c: "Markov matrices need not be symmetric.",
                    d: "Row sum does not guarantee unique generation."
                }
            },
            {
                id: "t7-5",
                question: "What is the role of the damping factor in PageRank?",
                options: [
                    { id: "a", text: "To increase the number of pages" },
                    { id: "b", text: "To ensure irreducibility by adding random jump probability" },
                    { id: "c", text: "To encrypt transition data" },
                    { id: "d", text: "To reduce computational cost" }
                ],
                correctAnswer: "b",
                justification: "The damping factor adds uniform jump probability to any page, making the chain irreducible and aperiodic.",
                wrongJustifications: {
                    a: "Page count is fixed.",
                    c: "PageRank is not encryption.",
                    d: "Teleportation adds computation but is necessary."
                }
            },
            {
                id: "t7-6",
                question: "How can Markov matrices help in recommendation systems?",
                options: [
                    { id: "a", text: "Storing user passwords" },
                    { id: "b", text: "Modeling sequential user-item interactions" },
                    { id: "c", text: "Encrypting recommendation data" },
                    { id: "d", text: "Replacing the need for data" }
                ],
                correctAnswer: "b",
                justification: "Markov models capture sequential user behavior, predicting the next item a user might want.",
                wrongJustifications: {
                    a: "Password storage is unrelated.",
                    c: "Encryption is a separate concern.",
                    d: "Markov models still require data."
                }
            },
            {
                id: "t7-7",
                question: "What is a key limitation of first-order Markov text models?",
                options: [
                    { id: "a", text: "They require too much data" },
                    { id: "b", text: "They only consider the immediate previous word" },
                    { id: "c", text: "They are too computationally expensive" },
                    { id: "d", text: "They always generate the same text" }
                ],
                correctAnswer: "b",
                justification: "First-order models (bigrams) only condition on the last word, missing long-range dependencies.",
                wrongJustifications: {
                    a: "Bigram models have modest data needs.",
                    c: "Bigram models are very efficient.",
                    d: "They generate varied stochastic output."
                }
            },
            {
                id: "t7-8",
                question: "In a bigram model, what is a \u2018transition\u2019?",
                options: [
                    { id: "a", text: "Changing the document" },
                    { id: "b", text: "Probability of one word following another" },
                    { id: "c", text: "Moving between documents" },
                    { id: "d", text: "Switching languages" }
                ],
                correctAnswer: "b",
                justification: "A transition is P(next_word | current_word). The Markov matrix captures all word-to-word transitions.",
                wrongJustifications: {
                    a: "Document-level transitions are not bigram.",
                    c: "Bigram models are word-level.",
                    d: "Language switching is not in standard bigrams."
                }
            },
            {
                id: "t7-9",
                question: "Why is the PageRank stationary distribution important?",
                options: [
                    { id: "a", text: "It identifies broken links" },
                    { id: "b", text: "It assigns importance scores to each page" },
                    { id: "c", text: "It sorts results alphabetically" },
                    { id: "d", text: "It tracks browsing history" }
                ],
                correctAnswer: "b",
                justification: "Pages with higher stationary probability are deemed more important and rank higher in search results.",
                wrongJustifications: {
                    a: "Broken links are separate from ranking.",
                    c: "PageRank ranks by importance, not alphabetically.",
                    d: "PageRank is from link structure, not history."
                }
            },
            {
                id: "t7-10",
                question: "What does M[i][j] = 0.3 mean in a recommendation Markov matrix?",
                options: [
                    { id: "a", text: "User i rated item j with 30% satisfaction" },
                    { id: "b", text: "30% probability user views item j next after item i" },
                    { id: "c", text: "30% of users prefer i over j" },
                    { id: "d", text: "Items i and j are 30% similar" }
                ],
                correctAnswer: "b",
                justification: "M[i][j] is the probability of transitioning from item i to item j in the next interaction.",
                wrongJustifications: {
                    a: "Ratings are stored separately.",
                    c: "Preference comparison is different.",
                    d: "Similarity metrics differ from transitions."
                }
            }
        ],
        recap: [
            "Markov matrices model word transitions in bigram models",
            "PageRank uses a Markov matrix over web pages",
            "Bioinformatics uses substitution matrices for DNA evolution",
            "Bigram models capture only local word dependencies",
            "Damping factor in PageRank ensures irreducibility",
            "Recommendation systems use Markov models for sequential prediction",
            "Each row sums to 1 for valid probability distribution",
            "First-order models miss long-range text dependencies"
        ],
        skillMapping: [
            { skill: "Applying Markov matrices to language modeling", level: "Applying" },
            { skill: "Understanding PageRank analysis", level: "Understanding" },
            { skill: "Analyzing limitations of first-order models", level: "Analyzing" },
            { skill: "Evaluating applications across domains", level: "Evaluating" }
        ]
    },
    "Topic8_RewardAndReturns": {
        prerequisites: [
            "MDP fundamentals",
            "Concept of scalar reward signals",
            "Discounted sum intuition",
            "Basic probability and expectation",
            "Goal-oriented learning concepts"
        ],
        mcqs: [
            {
                id: "t8-1",
                question: "What is the return G_t in RL?",
                options: [
                    { id: "a", text: "The immediate reward at time t" },
                    { id: "b", text: "The discounted sum of all future rewards from t onward" },
                    { id: "c", text: "The number of steps until termination" },
                    { id: "d", text: "The action-value function Q(s,a)" }
                ],
                correctAnswer: "b",
                justification: "G_t = \u03a3 \u03b3^k R_{t+k+1} is the total discounted cumulative reward from time t onward.",
                wrongJustifications: {
                    a: "Immediate reward is just R_{t+1}.",
                    c: "Horizon length is separate from return.",
                    d: "Q is the expected return given state and action."
                }
            },
            {
                id: "t8-2",
                question: "If \u03b3 = 0.9 and rewards are [10, 20, 30], what is G_t?",
                options: [
                    { id: "a", text: "60" },
                    { id: "b", text: "10 + 0.9\u00d720 + 0.81\u00d730 = 52.3" },
                    { id: "c", text: "10 + 20 + 30 = 60 undiscounted" },
                    { id: "d", text: "10 \u00d7 0.9 \u00d7 20 \u00d7 0.81 \u00d7 30" }
                ],
                correctAnswer: "b",
                justification: "G_t = 10 + 0.9(20) + 0.9\u00b2(30) = 10 + 18 + 24.3 = 52.3.",
                wrongJustifications: {
                    a: "This ignores discounting.",
                    c: "This is undiscounted, but \u03b3 = 0.9 applies.",
                    d: "Discounting uses addition, not multiplication."
                }
            },
            {
                id: "t8-3",
                question: "The reward hypothesis states that:",
                options: [
                    { id: "a", text: "Rewards must always be positive" },
                    { id: "b", text: "All goals can be framed as maximizing expected cumulative reward" },
                    { id: "c", text: "Rewards are unnecessary" },
                    { id: "d", text: "Rewards must follow every action" }
                ],
                correctAnswer: "b",
                justification: "The reward hypothesis: any goal can be represented as maximizing the expected cumulative sum of a scalar reward.",
                wrongJustifications: {
                    a: "Rewards can be positive, negative, or zero.",
                    c: "Rewards are essential in RL.",
                    d: "Rewards can be sparse and delayed."
                }
            },
            {
                id: "t8-4",
                question: "Why is the discount factor \u03b3 used?",
                options: [
                    { id: "a", text: "To make rewards non-negative" },
                    { id: "b", text: "For convergence and reflecting future uncertainty" },
                    { id: "c", text: "To increase all rewards" },
                    { id: "d", text: "To eliminate value functions" }
                ],
                correctAnswer: "b",
                justification: "Discounting ensures finite returns in infinite horizons and reflects preference for immediate rewards.",
                wrongJustifications: {
                    a: "Discounting does not affect reward sign.",
                    c: "Discounting decreases future reward contribution.",
                    d: "Value functions are still needed."
                }
            },
            {
                id: "t8-5",
                question: "In an undiscounted episodic task (\u03b3 = 1), the return is:",
                options: [
                    { id: "a", text: "Always infinite" },
                    { id: "b", text: "The sum of rewards until episode termination" },
                    { id: "c", text: "Zero" },
                    { id: "d", text: "Undefined" }
                ],
                correctAnswer: "b",
                justification: "Episodic tasks terminate, so the sum is finite: G_t = R_{t+1} + R_{t+2} + ... + R_T.",
                wrongJustifications: {
                    a: "It is finite because the episode terminates.",
                    c: "Total reward is generally non-zero.",
                    d: "The return is well-defined."
                }
            },
            {
                id: "t8-6",
                question: "What is the difference between reward and return?",
                options: [
                    { id: "a", text: "They are the same" },
                    { id: "b", text: "Reward is immediate; return is cumulative discounted sum" },
                    { id: "c", text: "Return is the terminal reward" },
                    { id: "d", text: "Reward is the sum; return is individual" }
                ],
                correctAnswer: "b",
                justification: "R is immediate scalar feedback. G is the accumulated discounted sum of future rewards.",
                wrongJustifications: {
                    a: "They are distinct but related.",
                    c: "Return includes all future rewards.",
                    d: "The definitions are reversed."
                }
            },
            {
                id: "t8-7",
                question: "With \u03b3 = 0.95, what is the contribution of a reward 100 steps away?",
                options: [
                    { id: "a", text: "Full contribution (1.0)" },
                    { id: "b", text: "0.95^100 \u2248 0.0059, negligible" },
                    { id: "c", text: "Amplified by \u03b3" },
                    { id: "d", text: "Ignored completely" }
                ],
                correctAnswer: "b",
                justification: "\u03b3^k = 0.95^100 \u2248 0.0059, so the distant reward has almost no influence.",
                wrongJustifications: {
                    a: "Discounting reduces contribution.",
                    c: "\u03b3 reduces, not amplifies.",
                    d: "Very small but not exactly zero."
                }
            },
            {
                id: "t8-8",
                question: "What is reward shaping?",
                options: [
                    { id: "a", text: "Reducing the number of states" },
                    { id: "b", text: "Adding heuristic rewards to guide learning" },
                    { id: "c", text: "Eliminating negative rewards" },
                    { id: "d", text: "Replacing the transition function" }
                ],
                correctAnswer: "b",
                justification: "Reward shaping adds supplementary feedback to accelerate learning while preserving the optimal policy.",
                wrongJustifications: {
                    a: "Shaping affects rewards, not state space.",
                    c: "Existing negative rewards remain.",
                    d: "Transition functions are separate."
                }
            },
            {
                id: "t8-9",
                question: "Why must \u03b3 be less than 1 in continuing tasks?",
                options: [
                    { id: "a", text: "The agent ignores rewards otherwise" },
                    { id: "b", text: "The infinite sum may diverge" },
                    { id: "c", text: "Policy evaluation fails otherwise" },
                    { id: "d", text: "\u03b3 must always be less than 1" }
                ],
                correctAnswer: "b",
                justification: "\u03b3 < 1 ensures the infinite series of bounded rewards converges to a finite value.",
                wrongJustifications: {
                    a: "\u03b3 = 1 makes the agent care about all future rewards.",
                    c: "Average reward settings handle \u03b3 = 1.",
                    d: "Episodic tasks can use \u03b3 = 1."
                }
            },
            {
                id: "t8-10",
                question: "How does increasing \u03b3 from 0.9 to 0.99 affect behavior?",
                options: [
                    { id: "a", text: "The agent becomes more myopic" },
                    { id: "b", text: "The agent plans further into the future" },
                    { id: "c", text: "The agent stops learning" },
                    { id: "d", text: "The agent ignores all rewards" }
                ],
                correctAnswer: "b",
                justification: "Higher \u03b3 makes future rewards more valuable, so the agent plans further ahead.",
                wrongJustifications: {
                    a: "Higher \u03b3 makes the agent less myopic.",
                    c: "Learning continues with any valid \u03b3.",
                    d: "The agent still maximizes rewards."
                }
            }
        ],
        recap: [
            "Return G_t = \u03a3 \u03b3^k R_{t+k+1} is the discounted sum of future rewards",
            "The reward hypothesis: any goal maximizes expected cumulative reward",
            "\u03b3 \u2208 [0,1) for continuing tasks; \u03b3 = 1 for episodic tasks",
            "Discounting reflects time preference and future uncertainty",
            "Reward is immediate; return is cumulative",
            "\u03b3^k decays exponentially with horizon",
            "Reward shaping provides supplementary feedback",
            "Higher \u03b3 makes the agent more far-sighted"
        ],
        skillMapping: [
            { skill: "Understanding return calculation", level: "Applying" },
            { skill: "Differentiating reward from return", level: "Understanding" },
            { skill: "Analyzing the effect of \u03b3 on agent behavior", level: "Analyzing" },
            { skill: "Evaluating reward design strategies", level: "Evaluating" }
        ]
    },
    "Topic9_MarkovRewardProcess": {
        prerequisites: [
            "Markov Chain fundamentals",
            "Reward function concept",
            "Return and discounting",
            "Expected value calculations",
            "State value function intuition"
        ],
        mcqs: [
            {
                id: "t9-1",
                question: "What is a Markov Reward Process (MRP)?",
                options: [
                    { id: "a", text: "A Markov Chain with rewards added to transitions" },
                    { id: "b", text: "A Markov Chain with actions" },
                    { id: "c", text: "An MDP without states" },
                    { id: "d", text: "A supervised learning algorithm" }
                ],
                correctAnswer: "a",
                justification: "An MRP extends a Markov Chain by adding a reward function: (S, P, R, \u03b3).",
                wrongJustifications: {
                    b: "MRPs have no actions.",
                    c: "MRPs have states.",
                    d: "MRPs are mathematical models."
                }
            },
            {
                id: "t9-2",
                question: "How does an MRP differ from an MDP?",
                options: [
                    { id: "a", text: "MRPs have no reward function" },
                    { id: "b", text: "MRPs have no actions" },
                    { id: "c", text: "MRPs are always deterministic" },
                    { id: "d", text: "MRPs have more states" }
                ],
                correctAnswer: "b",
                justification: "MRPs are passive processes without agent actions. MDPs add the action space for decision-making.",
                wrongJustifications: {
                    a: "MRPs do have a reward function.",
                    c: "MRPs can be stochastic.",
                    d: "State count depends on the problem."
                }
            },
            {
                id: "t9-3",
                question: "What is the Bellman equation for an MRP?",
                options: [
                    { id: "a", text: "V(s) = R(s) + \u03b3 \u03a3_{s\u2032} P(s\u2032|s) V(s\u2032)" },
                    { id: "b", text: "V(s) = max_a Q(s,a)" },
                    { id: "c", text: "V(s) = \u03a3_a \u03c0(a|s) Q(s,a)" },
                    { id: "d", text: "V(s) = R(s)" }
                ],
                correctAnswer: "a",
                justification: "In an MRP, V(s) = R(s) + \u03b3 \u03a3 P(s\u2032|s) V(s\u2032). No actions or policies are involved.",
                wrongJustifications: {
                    b: "max over actions is for MDP optimality.",
                    c: "Policy averaging is for MDPs.",
                    d: "V(s) includes future rewards."
                }
            },
            {
                id: "t9-4",
                question: "In an MRP, what does P(s\u2032|s) represent?",
                options: [
                    { id: "a", text: "Probability of choosing the next state" },
                    { id: "b", text: "Autonomous transition probability" },
                    { id: "c", text: "Policy probability" },
                    { id: "d", text: "Reward probability" }
                ],
                correctAnswer: "b",
                justification: "P(s\u2032|s) is the autonomous transition probability. The chain evolves without agent intervention.",
                wrongJustifications: {
                    a: "The agent does not choose states.",
                    c: "Policies exist only in MDPs.",
                    d: "Reward probabilities are separate."
                }
            },
            {
                id: "t9-5",
                question: "What is the MRP tuple?",
                options: [
                    { id: "a", text: "(S, A, P, R, \u03b3)" },
                    { id: "b", text: "(S, P, R, \u03b3)" },
                    { id: "c", text: "(S, A, R, \u03b3)" },
                    { id: "d", text: "(P, R, \u03b3)" }
                ],
                correctAnswer: "b",
                justification: "An MRP is (S, P, R, \u03b3). Note the absence of action space A.",
                wrongJustifications: {
                    a: "This is the MDP tuple.",
                    c: "MRPs have P but no A.",
                    d: "MRPs must include the state space S."
                }
            },
            {
                id: "t9-6",
                question: "How is the MRP value function solved analytically?",
                options: [
                    { id: "a", text: "By gradient descent only" },
                    { id: "b", text: "V = (I - \u03b3P)^{-1} R via matrix inversion" },
                    { id: "c", text: "By random guessing" },
                    { id: "d", text: "MRPs cannot be solved" }
                ],
                correctAnswer: "b",
                justification: "V = R + \u03b3PV rearranges to (I - \u03b3P)V = R, so V = (I - \u03b3P)^{-1}R.",
                wrongJustifications: {
                    a: "Gradient descent is iterative; a closed form exists.",
                    c: "Random guessing is not a valid method.",
                    d: "MRPs have a closed-form analytic solution."
                }
            },
            {
                id: "t9-7",
                question: "What makes an MRP simpler than an MDP?",
                options: [
                    { id: "a", text: "Smaller state spaces" },
                    { id: "b", text: "No actions, so V is solved as a linear system" },
                    { id: "c", text: "Always zero rewards" },
                    { id: "d", text: "Always deterministic" }
                ],
                correctAnswer: "b",
                justification: "Without actions, the Bellman equation is linear: V = R + \u03b3PV, solvable by matrix inversion.",
                wrongJustifications: {
                    a: "State space size is independent of model type.",
                    c: "MRPs have non-zero reward functions.",
                    d: "MRPs can be stochastic."
                }
            },
            {
                id: "t9-8",
                question: "In an MRP, what is E[G_t | S_t = s]?",
                options: [
                    { id: "a", text: "R(s)" },
                    { id: "b", text: "V(s)" },
                    { id: "c", text: "P(s\u2032|s)" },
                    { id: "d", text: "\u03b3" }
                ],
                correctAnswer: "b",
                justification: "V(s) = E[G_t | S_t = s] is the expected return starting from state s.",
                wrongJustifications: {
                    a: "R(s) is just the immediate reward.",
                    c: "P(s\u2032|s) is a transition probability.",
                    d: "\u03b3 is a parameter."
                }
            },
            {
                id: "t9-9",
                question: "Which system is naturally modeled as an MRP?",
                options: [
                    { id: "a", text: "A chess-playing AI" },
                    { id: "b", text: "Stock price movements without trading decisions" },
                    { id: "c", text: "A robot learning to walk" },
                    { id: "d", text: "An automated game agent" }
                ],
                correctAnswer: "b",
                justification: "Stock prices evolve probabilistically without an agent\u2019s active decisions, making it a passive MRP.",
                wrongJustifications: {
                    a: "Chess involves active decisions (MDP).",
                    c: "Robotics involves active action selection.",
                    d: "Game-playing requires agent decisions."
                }
            },
            {
                id: "t9-10",
                question: "What does the Bellman equation V = R + \u03b3PV represent?",
                options: [
                    { id: "a", text: "V = R + \u03b3 \u00d7 P \u00d7 V as a matrix equation" },
                    { id: "b", text: "V = R + \u03b3 + P + V" },
                    { id: "c", text: "V = R \u00d7 \u03b3 \u00d7 P \u00d7 V" },
                    { id: "d", text: "V = R - \u03b3PV" }
                ],
                correctAnswer: "a",
                justification: "In matrix form: V = R + \u03b3PV, where V and R are vectors and P is the transition matrix.",
                wrongJustifications: {
                    b: "This incorrectly adds terms.",
                    c: "This incorrectly multiplies terms.",
                    d: "The sign is incorrect."
                }
            }
        ],
        recap: [
            "An MRP is (S, P, R, \u03b3): a Markov Chain with rewards",
            "Bellman equation for MRP: V = R + \u03b3PV",
            "Analytic solution: V = (I - \u03b3P)^{-1}R",
            "MRPs are linear systems, unlike non-linear MDPs",
            "V(s) = E[G_t | S_t = s] in an MRP",
            "MRPs model passive stochastic processes with rewards",
            "The agent is an observer, not a decision-maker",
            "MRPs bridge Markov Chains and full MDPs"
        ],
        skillMapping: [
            { skill: "Defining MRP structure", level: "Understanding" },
            { skill: "Solving MRP Bellman equations", level: "Applying" },
            { skill: "Analyzing MRP vs MDP relationships", level: "Analyzing" },
            { skill: "Evaluating processes for MRP modeling", level: "Evaluating" }
        ]
    },
    "Topic10_StateValueFunction": {
        prerequisites: [
            "MRP fundamentals and Bellman equation",
            "Expected return concept",
            "Policy concept in MDPs",
            "Discounting and returns",
            "Agent-environment interaction"
        ],
        mcqs: [
            {
                id: "t10-1",
                question: "What does V_\u03c0(s) represent?",
                options: [
                    { id: "a", text: "The immediate reward in state s" },
                    { id: "b", text: "Expected return from state s following policy \u03c0" },
                    { id: "c", text: "Transition probability from s" },
                    { id: "d", text: "Number of actions in state s" }
                ],
                correctAnswer: "b",
                justification: "V_\u03c0(s) = E_\u03c0[G_t | S_t = s] is the expected cumulative reward from state s under policy \u03c0.",
                wrongJustifications: {
                    a: "R(s) is immediate reward.",
                    c: "Transition probabilities are P.",
                    d: "Action counts are a property of state space."
                }
            },
            {
                id: "t10-2",
                question: "Why does V_\u03c0(s) depend on the policy?",
                options: [
                    { id: "a", text: "Different policies select different actions" },
                    { id: "b", text: "The policy changes transition probabilities" },
                    { id: "c", text: "The policy changes the state space" },
                    { id: "d", text: "Value is independent of policy" }
                ],
                correctAnswer: "a",
                justification: "Future actions determined by the policy affect expected rewards. A good policy gives higher state values.",
                wrongJustifications: {
                    b: "The policy does not change environment dynamics.",
                    c: "State space is defined by the MDP.",
                    d: "V_\u03c0 has subscript \u03c0 precisely because it depends on policy."
                }
            },
            {
                id: "t10-3",
                question: "What is the Bellman expectation equation for V_\u03c0(s)?",
                options: [
                    { id: "a", text: "V_\u03c0(s) = R(s) + \u03b3 \u03a3 P(s\u2032|s) V_\u03c0(s\u2032)" },
                    { id: "b", text: "V_\u03c0(s) = \u03a3_a \u03c0(a|s) \u03a3_{s\u2032} P(s\u2032|s,a)[R + \u03b3 V_\u03c0(s\u2032)]" },
                    { id: "c", text: "V_\u03c0(s) = max_a Q_\u03c0(s,a)" },
                    { id: "d", text: "V_\u03c0(s) = \u03a3_a Q_\u03c0(s,a)" }
                ],
                correctAnswer: "b",
                justification: "This expands over actions (weighted by \u03c0) and next states (weighted by P) for the expected return.",
                wrongJustifications: {
                    a: "This is the MRP equation without actions.",
                    c: "max gives the optimal value, not V_\u03c0.",
                    d: "Missing immediate reward and transitions."
                }
            },
            {
                id: "t10-4",
                question: "Can different policies yield different V(s) for the same state?",
                options: [
                    { id: "a", text: "No, state values are fixed" },
                    { id: "b", text: "Yes, because future actions determine returns" },
                    { id: "c", text: "Only for deterministic policies" },
                    { id: "d", text: "Only if the state space changes" }
                ],
                correctAnswer: "b",
                justification: "Different policies lead to different action selections, thus different expected future rewards.",
                wrongJustifications: {
                    a: "V_\u03c0 is policy-dependent.",
                    c: "Stochastic policies also produce different values.",
                    d: "State space is fixed."
                }
            },
            {
                id: "t10-5",
                question: "Why does V(s) increase near the goal under an optimal policy?",
                options: [
                    { id: "a", text: "Physical grid cells change" },
                    { id: "b", text: "The agent reliably reaches the goal from nearby states" },
                    { id: "c", text: "Transition probabilities become favorable" },
                    { id: "d", text: "The discount factor increases" }
                ],
                correctAnswer: "b",
                justification: "Under the optimal policy, the agent quickly reaches the goal from nearby states, collecting high rewards.",
                wrongJustifications: {
                    a: "The environment does not change.",
                    c: "Transition probabilities are fixed.",
                    d: "\u03b3 is a fixed parameter."
                }
            },
            {
                id: "t10-6",
                question: "How does the Bellman equation enable policy evaluation?",
                options: [
                    { id: "a", text: "It directly gives the optimal policy" },
                    { id: "b", text: "It expresses V_\u03c0(s) recursively, allowing iterative computation" },
                    { id: "c", text: "It eliminates need for transition probabilities" },
                    { id: "d", text: "It computes the policy directly" }
                ],
                correctAnswer: "b",
                justification: "The recursive relationship V_\u03c0(s) in terms of V_\u03c0(s\u2032) enables iterative policy evaluation.",
                wrongJustifications: {
                    a: "Policy evaluation computes V_\u03c0, not the optimal policy.",
                    c: "The equation requires P(s\u2032|s,a).",
                    d: "The equation evaluates a given policy."
                }
            },
            {
                id: "t10-7",
                question: "What does the subscript \u03c0 in V_\u03c0(s) remind us?",
                options: [
                    { id: "a", text: "Value is a probability" },
                    { id: "b", text: "Value is conditioned on following policy \u03c0" },
                    { id: "c", text: "Value is the same for all policies" },
                    { id: "d", text: "Value is the maximum possible" }
                ],
                correctAnswer: "b",
                justification: "The subscript \u03c0 explicitly conditions the expected return on following policy \u03c0.",
                wrongJustifications: {
                    a: "V is an expected return, not a probability.",
                    c: "V varies with different policies.",
                    d: "V* denotes optimal value."
                }
            },
            {
                id: "t10-8",
                question: "If V_\u03c0(s\u2081) = 9 and V_\u03c0(s\u2082) = 3, what can we infer?",
                options: [
                    { id: "a", text: "The agent always chooses s\u2081 over s\u2082" },
                    { id: "b", text: "s\u2081 yields more expected cumulative reward than s\u2082 under \u03c0" },
                    { id: "c", text: "s\u2082 has higher immediate reward" },
                    { id: "d", text: "The policy is optimal" }
                ],
                correctAnswer: "b",
                justification: "Higher V_\u03c0 means higher expected total discounted reward from that state under policy \u03c0.",
                wrongJustifications: {
                    a: "V_\u03c0 compares states, not action selection.",
                    c: "V includes future rewards, not just immediate.",
                    d: "Higher V does not imply optimality."
                }
            },
            {
                id: "t10-9",
                question: "What is the relationship between V_\u03c0(s) and Q_\u03c0(s,a)?",
                options: [
                    { id: "a", text: "V_\u03c0(s) = max_a Q_\u03c0(s,a)" },
                    { id: "b", text: "V_\u03c0(s) = \u03a3_a \u03c0(a|s) Q_\u03c0(s,a)" },
                    { id: "c", text: "V_\u03c0(s) = Q_\u03c0(s,a) for all a" },
                    { id: "d", text: "They are unrelated" }
                ],
                correctAnswer: "b",
                justification: "V_\u03c0(s) is the policy-weighted average of action-value functions.",
                wrongJustifications: {
                    a: "max gives V*, not V_\u03c0.",
                    c: "V equals the average of Q weighted by \u03c0.",
                    d: "They are closely related through the policy."
                }
            },
            {
                id: "t10-10",
                question: "In chess AI, what does high V_\u03c0(s) mean?",
                options: [
                    { id: "a", text: "Many pieces on the board" },
                    { id: "b", text: "Expected positive outcome under the engine\u2019s policy" },
                    { id: "c", text: "The position is complex" },
                    { id: "d", text: "The agent is in the opening phase" }
                ],
                correctAnswer: "b",
                justification: "V_\u03c0(s) is the expected outcome. High positive value means the engine expects a win from this position.",
                wrongJustifications: {
                    a: "Piece count is not value.",
                    c: "Complexity and value are different.",
                    d: "Game phase does not directly determine value."
                }
            }
        ],
        recap: [
            "V_\u03c0(s) = E_\u03c0[G_t | S_t = s] is the expected return from state s under \u03c0",
            "The Bellman expectation equation expresses V_\u03c0 recursively",
            "V_\u03c0(s) depends on the policy: better policies = higher values",
            "Same physical state has different values under different policies",
            "V_\u03c0(s) = \u03a3_a \u03c0(a|s) Q_\u03c0(s,a)",
            "Policy evaluation computes V_\u03c0 using the Bellman equation",
            "The subscript \u03c0 conditions the value on the behavior policy",
            "Higher V means higher expected cumulative reward"
        ],
        skillMapping: [
            { skill: "Understanding state-value function", level: "Understanding" },
            { skill: "Applying Bellman expectation equation", level: "Applying" },
            { skill: "Analyzing policy effects on state values", level: "Analyzing" },
            { skill: "Evaluating state values for decision-making", level: "Evaluating" }
        ]
    },
    "Topic11_ActionValueFunction": {
        prerequisites: [
            "State-value function V_\u03c0(s)",
            "Bellman expectation equation",
            "Policy concept",
            "Return and discounting",
            "MDP framework"
        ],
        mcqs: [
            {
                id: "t11-1",
                question: "What does Q_\u03c0(s,a) represent?",
                options: [
                    { id: "a", text: "Immediate reward for a in s" },
                    { id: "b", text: "Expected return after a in s, then following \u03c0" },
                    { id: "c", text: "Probability of a in s" },
                    { id: "d", text: "Visit count of (s,a)" }
                ],
                correctAnswer: "b",
                justification: "Q_\u03c0(s,a) = E_\u03c0[G_t | S_t = s, A_t = a] evaluates the specific action choice.",
                wrongJustifications: {
                    a: "R(s,a) is immediate reward.",
                    c: "Action probabilities are from the policy.",
                    d: "Visit counts are not Q-values."
                }
            },
            {
                id: "t11-2",
                question: "What is the key advantage of Q over V for action selection?",
                options: [
                    { id: "a", text: "Q is faster to compute" },
                    { id: "b", text: "Q directly compares actions without the transition model" },
                    { id: "c", text: "Q does not require rewards" },
                    { id: "d", text: "Q is always larger than V" }
                ],
                correctAnswer: "b",
                justification: "Q-values directly give expected return per action. Select a = argmax_a Q(s,a) without needing the model.",
                wrongJustifications: {
                    a: "Both require similar computation.",
                    c: "Q-values depend on rewards.",
                    d: "Q can be greater or less than V."
                }
            },
            {
                id: "t11-3",
                question: "What is the Bellman equation for Q_\u03c0(s,a)?",
                options: [
                    { id: "a", text: "Q = R + \u03b3 \u03a3 P[V_\u03c0(s\u2032)]" },
                    { id: "b", text: "Q = R + \u03b3 \u03a3 P \u03a3 \u03c0 Q(s\u2032,a\u2032)" },
                    { id: "c", text: "Q = max_a\u2032 Q(s,a\u2032)" },
                    { id: "d", text: "Q = V(s) for all a" }
                ],
                correctAnswer: "b",
                justification: "After taking a, the agent follows \u03c0: Q = R + \u03b3 \u03a3_{s\u2032} P(s\u2032|s,a) \u03a3_{a\u2032} \u03c0(a\u2032|s\u2032) Q(s\u2032,a\u2032).",
                wrongJustifications: {
                    a: "This needs policy averaging over next actions.",
                    c: "This is the optimality equation.",
                    d: "Q-values vary across actions."
                }
            },
            {
                id: "t11-4",
                question: "Why is Q-learning more practical than learning V(s) in model-free RL?",
                options: [
                    { id: "a", text: "Q converges faster" },
                    { id: "b", text: "Q enables action selection by argmax without transition model" },
                    { id: "c", text: "Q uses less memory" },
                    { id: "d", text: "V cannot be learned without a model" }
                ],
                correctAnswer: "b",
                justification: "With Q, select a = argmax_a Q(s,a). V(s) requires the model to know which action leads to which next state.",
                wrongJustifications: {
                    a: "Convergence depends on the algorithm.",
                    c: "Q uses |S|\u00d7|A| values, more than |S|.",
                    d: "Both can be learned model-free."
                }
            },
            {
                id: "t11-5",
                question: "How is V_\u03c0(s) related to Q_\u03c0(s,a)?",
                options: [
                    { id: "a", text: "V = min_a Q" },
                    { id: "b", text: "V = \u03a3_a \u03c0(a|s) Q(s,a)" },
                    { id: "c", text: "V = max_a Q" },
                    { id: "d", text: "V = Q(s, \u03c0(s))" }
                ],
                correctAnswer: "b",
                justification: "V_\u03c0(s) averages Q-values weighted by action selection probabilities under \u03c0.",
                wrongJustifications: {
                    a: "Min does not relate V to Q.",
                    c: "max gives V*, not V_\u03c0.",
                    d: "This works only for deterministic policies."
                }
            },
            {
                id: "t11-6",
                question: "What does a Q-table store in tabular RL?",
                options: [
                    { id: "a", text: "Transition probabilities" },
                    { id: "b", text: "Q-value for each (s,a) pair" },
                    { id: "c", text: "Policy probabilities" },
                    { id: "d", text: "Reward function" }
                ],
                correctAnswer: "b",
                justification: "A Q-table is |S|\u00d7|A| array of estimated expected returns for each state-action pair.",
                wrongJustifications: {
                    a: "Transition probabilities are in the model.",
                    c: "The policy is derived from Q-values.",
                    d: "Rewards are separate from Q-values."
                }
            },
            {
                id: "t11-7",
                question: "Why do different actions in the same state have different Q-values?",
                options: [
                    { id: "a", text: "Transition probabilities differ per action" },
                    { id: "b", text: "Each action leads to different expected future rewards" },
                    { id: "c", text: "Random assignment" },
                    { id: "d", text: "All Q-values are the same" }
                ],
                correctAnswer: "b",
                justification: "Different actions lead to different next states and thus different expected outcomes.",
                wrongJustifications: {
                    a: "Transition probabilities contribute but outcome differences matter.",
                    c: "Q-values are learned, not random.",
                    d: "Different actions typically have different Q-values."
                }
            },
            {
                id: "t11-8",
                question: "What is the greedy policy with respect to Q-values?",
                options: [
                    { id: "a", text: "Select action with smallest Q" },
                    { id: "b", text: "Select action with largest Q" },
                    { id: "c", text: "Random action selection" },
                    { id: "d", text: "Select based on transition probabilities" }
                ],
                correctAnswer: "b",
                justification: "The greedy policy selects argmax_a Q(s,a), exploiting current knowledge deterministically.",
                wrongJustifications: {
                    a: "Minimizing seeks worst outcomes.",
                    c: "Random selection is exploration.",
                    d: "Transitions are separate from Q-values."
                }
            },
            {
                id: "t11-9",
                question: "How does Q-learning update without a model?",
                options: [
                    { id: "a", text: "By computing transition matrix" },
                    { id: "b", text: "Q \u2190 Q + \u03b1[r + \u03b3 max_{a\u2032} Q(s\u2032,a\u2032) - Q]" },
                    { id: "c", text: "By asking a human supervisor" },
                    { id: "d", text: "Q-learning always requires a model" }
                ],
                correctAnswer: "b",
                justification: "Q-learning uses the TD update with immediate reward plus discounted max next Q-value as the target.",
                wrongJustifications: {
                    a: "Q-learning is model-free.",
                    c: "It learns from reward signals.",
                    d: "Q-learning is model-free."
                }
            },
            {
                id: "t11-10",
                question: "What is the key insight of using Q(s,a) for control?",
                options: [
                    { id: "a", text: "Q eliminates discounting" },
                    { id: "b", text: "Q enables model-free action selection by direct comparison" },
                    { id: "c", text: "Q uses fewer resources" },
                    { id: "d", text: "Q cannot be used for control" }
                ],
                correctAnswer: "b",
                justification: "Q-values embed both immediate and long-term consequences, enabling model-free action selection.",
                wrongJustifications: {
                    a: "Q-values use discounting.",
                    c: "Q uses more memory (|S|\u00d7|A|).",
                    d: "Q is designed for control."
                }
            }
        ],
        recap: [
            "Q_\u03c0(s,a) = expected return after a in s, then following \u03c0",
            "V_\u03c0(s) = \u03a3_a \u03c0(a|s) Q_\u03c0(s,a)",
            "Q enables direct action selection without a model",
            "Greedy policy: argmax_a Q(s,a)",
            "Q-learning is model-free via TD updates",
            "Q-table stores |S|\u00d7|A| values",
            "Different actions have different Q-values",
            "Q(s,a) is essential for model-free control"
        ],
        skillMapping: [
            { skill: "Understanding action-value function", level: "Understanding" },
            { skill: "Applying Q-learning updates", level: "Applying" },
            { skill: "Analyzing V(s) and Q(s,a) relationship", level: "Analyzing" },
            { skill: "Evaluating model-free control methods", level: "Evaluating" }
        ]
    },
    "Topic12_OptimalPolicy": {
        prerequisites: [
            "State-value and action-value functions",
            "Policy concept in MDPs",
            "Bellman expectation equation",
            "Bellman optimality principle",
            "Policy evaluation basics"
        ],
        mcqs: [
            {
                id: "t12-1",
                question: "What defines an optimal policy \u03c0* in an MDP?",
                options: [
                    { id: "a", text: "Minimizes steps to the goal" },
                    { id: "b", text: "Maximizes expected return from all states" },
                    { id: "c", text: "Maximizes immediate reward" },
                    { id: "d", text: "Never explores" }
                ],
                correctAnswer: "b",
                justification: "\u03c0* achieves maximum expected return from every state: V*(s) \u2265 V_\u03c0(s) for all s and all \u03c0.",
                wrongJustifications: {
                    a: "Minimizing steps is a specific objective.",
                    c: "Optimality considers long-term returns.",
                    d: "Exploration is for learning, not the final policy."
                }
            },
            {
                id: "t12-2",
                question: "What is the Bellman optimality equation for V*(s)?",
                options: [
                    { id: "a", text: "V* = max_a \u03a3 P[R + \u03b3 V*(s\u2032)]" },
                    { id: "b", text: "V* = \u03a3_a \u03c0(a|s) Q_\u03c0(s,a)" },
                    { id: "c", text: "V* = R + \u03b3 \u03a3 P V*(s\u2032)" },
                    { id: "d", text: "V* = max_a Q*(s,a)" }
                ],
                correctAnswer: "a",
                justification: "V* uses max over actions of the expected reward plus discounted next-state value.",
                wrongJustifications: {
                    a: "This is the optimality equation for V*.",
                    b: "This relates V and Q for a given policy.",
                    c: "This is the MRP equation without actions.",
                    d: "True but less explicit."
                }
            },
            {
                id: "t12-3",
                question: "How to derive the optimal policy from Q*(s,a)?",
                options: [
                    { id: "a", text: "\u03c0*(s) = argmin_a Q*(s,a)" },
                    { id: "b", text: "\u03c0*(s) = argmax_a Q*(s,a)" },
                    { id: "c", text: "\u03c0*(s) = average_a Q*(s,a)" },
                    { id: "d", text: "\u03c0*(s) = random action" }
                ],
                correctAnswer: "b",
                justification: "From Q*(s,a), the optimal policy selects the action with the highest Q-value in each state.",
                wrongJustifications: {
                    a: "Minimizing chooses the worst actions.",
                    c: "Averaging produces a mixed, not optimal policy.",
                    d: "Random selection is not optimal."
                }
            },
            {
                id: "t12-4",
                question: "What is policy iteration?",
                options: [
                    { id: "a", text: "Randomly trying policies" },
                    { id: "b", text: "Alternating policy evaluation and improvement" },
                    { id: "c", text: "Directly computing optimal policy" },
                    { id: "d", text: "Supervised policy learning" }
                ],
                correctAnswer: "b",
                justification: "Policy iteration alternates between evaluating V_\u03c0 and making \u03c0 greedy with respect to V_\u03c0.",
                wrongJustifications: {
                    a: "Random trials are not systematic.",
                    c: "Policy iteration is iterative.",
                    d: "It is dynamic programming."
                }
            },
            {
                id: "t12-5",
                question: "What does the policy improvement theorem guarantee?",
                options: [
                    { id: "a", text: "Random policies cannot improve" },
                    { id: "b", text: "Greedy policy w.r.t. V_\u03c0 is at least as good as \u03c0" },
                    { id: "c", text: "Policy evaluation converges in one step" },
                    { id: "d", text: "Optimal policy is always random" }
                ],
                correctAnswer: "b",
                justification: "If \u03c0\u2032 is greedy w.r.t. V_\u03c0, then V_{\u03c0\u2032}(s) \u2265 V_\u03c0(s) for all s.",
                wrongJustifications: {
                    a: "Any deterministic policy can improve unless optimal.",
                    c: "Evaluation typically requires multiple iterations.",
                    d: "Optimal policies are typically deterministic."
                }
            },
            {
                id: "t12-6",
                question: "What is value iteration?",
                options: [
                    { id: "a", text: "Applying Bellman optimality backup until convergence" },
                    { id: "b", text: "Evaluating a fixed policy" },
                    { id: "c", text: "Randomly sampling values" },
                    { id: "d", text: "Supervised learning" }
                ],
                correctAnswer: "a",
                justification: "Value iteration repeatedly applies V_{k+1}(s) = max_a \u03a3 P[R + \u03b3 V_k(s\u2032)] until convergence to V*.",
                wrongJustifications: {
                    b: "That describes policy evaluation.",
                    c: "Random sampling is not value iteration.",
                    d: "Value iteration is dynamic programming."
                }
            },
            {
                id: "t12-7",
                question: "Why does an optimal policy always exist for finite MDPs?",
                options: [
                    { id: "a", text: "All policies are equally good" },
                    { id: "b", text: "Finitely many deterministic policies; improvement converges" },
                    { id: "c", text: "Optimal policies do not always exist" },
                    { id: "d", text: "Because of the Markov property" }
                ],
                correctAnswer: "b",
                justification: "With |A|^|S| possible policies, the policy improvement theorem guarantees convergence to an optimal one.",
                wrongJustifications: {
                    a: "Policies vary widely in quality.",
                    c: "Optimal policies are guaranteed for finite MDPs.",
                    d: "The Markov property enables tractability."
                }
            },
            {
                id: "t12-8",
                question: "How does policy iteration differ from value iteration?",
                options: [
                    { id: "a", text: "Policy iteration fully evaluates each policy; value iteration combines steps" },
                    { id: "b", text: "Value iteration evaluates policies" },
                    { id: "c", text: "There is no difference" },
                    { id: "d", text: "Policy iteration is model-free" }
                ],
                correctAnswer: "a",
                justification: "Policy iteration alternates full evaluation and improvement. Value iteration performs one backup per iteration, combining both.",
                wrongJustifications: {
                    b: "This reverses the definitions.",
                    c: "They are distinct algorithms.",
                    d: "Both are dynamic programming methods."
                }
            },
            {
                id: "t12-9",
                question: "In the Bellman optimality equation, why do we use max over actions?",
                options: [
                    { id: "a", text: "To choose the best action at each state" },
                    { id: "b", text: "To average over all actions" },
                    { id: "c", text: "To minimize the value" },
                    { id: "d", text: "To select actions randomly" }
                ],
                correctAnswer: "a",
                justification: "max selects the action yielding the highest expected return, defining the optimal value function.",
                wrongJustifications: {
                    b: "Averaging defines V_\u03c0, not V*.",
                    c: "Minimizing would choose the worst action.",
                    d: "Random selection does not give optimal values."
                }
            },
            {
                id: "t12-10",
                question: "What is the Bellman optimality equation for Q*?",
                options: [
                    { id: "a", text: "Q* = R + \u03b3 \u03a3 P max_{a\u2032} Q*(s\u2032,a\u2032)" },
                    { id: "b", text: "Q* = R + \u03b3 \u03a3 P V_\u03c0(s\u2032)" },
                    { id: "c", text: "Q* = R + \u03b3 V*(s\u2032)" },
                    { id: "d", text: "Q* = max_a Q*(s,a)" }
                ],
                correctAnswer: "a",
                justification: "Q*(s,a) = R + \u03b3 \u03a3 P(s\u2032|s,a) max_{a\u2032} Q*(s\u2032,a\u2032) — immediate reward plus expected optimal future value.",
                wrongJustifications: {
                    b: "This uses V_\u03c0, not optimal.",
                    c: "Missing expectation over next states.",
                    d: "This is a tautology."
                }
            }
        ],
        recap: [
            "\u03c0* maximizes expected return from all states",
            "Bellman optimality equation for V* uses max over actions",
            "Bellman optimality equation for Q* uses max over next actions",
            "\u03c0*(s) = argmax_a Q*(s,a)",
            "Policy iteration alternates evaluation and improvement",
            "Policy improvement theorem guarantees monotonic improvement",
            "Value iteration applies Bellman optimality backup",
            "Optimal policy exists for any finite MDP"
        ],
        skillMapping: [
            { skill: "Understanding optimal policy definition", level: "Understanding" },
            { skill: "Applying Bellman optimality equations", level: "Applying" },
            { skill: "Analyzing policy vs value iteration", level: "Analyzing" },
            { skill: "Evaluating optimality guarantees", level: "Evaluating" }
        ]
    },
    "Topic13_MDPExamples": {
        prerequisites: [
            "Complete MDP framework understanding",
            "Markov property and chains",
            "Reward and return concepts",
            "State and action value functions",
            "Policy and optimality concepts"
        ],
        mcqs: [
            {
                id: "t13-1",
                question: "Which board game is a classic example of an MDP?",
                options: [
                    { id: "a", text: "Tic-Tac-Toe with discrete states and actions" },
                    { id: "b", text: "A purely random dice game with no choices" },
                    { id: "c", text: "A game of pure chance with no agent" },
                    { id: "d", text: "Solitaire with no strategic decisions" }
                ],
                correctAnswer: "a",
                justification: "Tic-Tac-Toe has well-defined states (board positions), actions (placing marks), and rewards (win/lose), making it a natural MDP.",
                wrongJustifications: {
                    b: "No agent decisions means it is a Markov Chain, not MDP.",
                    c: "Pure chance without decisions is not a decision process.",
                    d: "Solitaire has limited strategic decisions."
                }
            },
            {
                id: "t13-2",
                question: "In the recycling robot MDP example, what states are typically used?",
                options: [
                    { id: "a", text: "High battery and Low battery" },
                    { id: "b", text: "Search, Wait, and Recharge" },
                    { id: "c", text: "Full, Empty, and Charging" },
                    { id: "d", text: "Morning, Afternoon, Evening" }
                ],
                correctAnswer: "a",
                justification: "The recycling robot MDP has two states representing the robot\u2019s battery level: High and Low.",
                wrongJustifications: {
                    b: "These are actions, not states.",
                    c: "Close but the standard formulation uses High/Low.",
                    d: "Time of day is not the state variable."
                }
            },
            {
                id: "t13-3",
                question: "What is a key challenge in modeling real-world systems as MDPs?",
                options: [
                    { id: "a", text: "MDPs require too few states" },
                    { id: "b", text: "Defining the state to satisfy the Markov property" },
                    { id: "c", text: "MDPs cannot model stochastic systems" },
                    { id: "d", text: "MDPs do not allow multiple actions" }
                ],
                correctAnswer: "b",
                justification: "Ensuring the state captures all necessary information for the Markov property to hold is often the hardest modeling challenge.",
                wrongJustifications: {
                    a: "MDPs can handle many states.",
                    c: "MDPs are designed for stochastic systems.",
                    d: "MDPs support multiple actions per state."
                }
            },
            {
                id: "t13-4",
                question: "In the Gridworld MDP, what does a typical reward function assign?",
                options: [
                    { id: "a", text: "+100 for goal, -50 for obstacles, -1 per step" },
                    { id: "b", text: "Random values to all cells" },
                    { id: "c", text: "Zero reward everywhere" },
                    { id: "d", text: "Reward proportional to grid coordinates" }
                ],
                correctAnswer: "a",
                justification: "Standard Gridworld uses +100 for reaching the goal, large negative for obstacles, and a small step penalty to encourage efficiency.",
                wrongJustifications: {
                    b: "Rewards are designed, not random.",
                    c: "Zero everywhere provides no learning signal.",
                    d: "Coordinates do not determine rewards."
                }
            },
            {
                id: "t13-5",
                question: "Which of the following is NOT typically modeled as an MDP?",
                options: [
                    { id: "a", text: "A robot navigating a maze" },
                    { id: "b", text: "A chess-playing agent" },
                    { id: "c", text: "A linear regression model for house prices" },
                    { id: "d", text: "An inventory management system" }
                ],
                correctAnswer: "c",
                justification: "Linear regression is a supervised learning method, not a sequential decision-making process with states, actions, and rewards.",
                wrongJustifications: {
                    a: "Robot navigation is a classic MDP.",
                    b: "Chess is a discrete MDP.",
                    d: "Inventory management involves sequential decisions under uncertainty."
                }
            },
            {
                id: "t13-6",
                question: "In the Lunar Lander MDP, what is the action space?",
                options: [
                    { id: "a", text: "Continuous force vector" },
                    { id: "b", text: "Discrete: do nothing, fire left, fire main, fire right" },
                    { id: "c", text: "Single binary decision" },
                    { id: "d", text: "No actions (passive process)" }
                ],
                correctAnswer: "b",
                justification: "The Lunar Lander in OpenAI Gym has 4 discrete actions: do nothing, fire left engine, fire main engine, and fire right engine.",
                wrongJustifications: {
                    a: "While continuous versions exist, the standard Gym version is discrete.",
                    c: "There are 4 actions, not 1.",
                    d: "This is an MDP with active control."
                }
            },
            {
                id: "t13-7",
                question: "What makes Snake and Ladders NOT a full MDP?",
                options: [
                    { id: "a", text: "It has too many states" },
                    { id: "b", text: "The player has no real strategic choices (decisions)" },
                    { id: "c", text: "It has no rewards" },
                    { id: "d", text: "It is deterministic" }
                ],
                correctAnswer: "b",
                justification: "Snakes and Ladders is purely random (dice rolls) with no agent decisions, making it a Markov Chain, not an MDP.",
                wrongJustifications: {
                    a: "State count is not the limiting factor.",
                    c: "Winning/losing provides implicit rewards.",
                    d: "It is stochastic (dice-based)."
                }
            },
            {
                id: "t13-8",
                question: "In the short-corner gridworld example, why are corner states interesting?",
                options: [
                    { id: "a", text: "They have the most actions available" },
                    { id: "b", text: "They have fewer actions, affecting value propagation" },
                    { id: "c", text: "They are unreachable" },
                    { id: "d", text: "They have the highest rewards" }
                ],
                correctAnswer: "b",
                justification: "Corner states have only 2 actions instead of 4, which affects how quickly the agent can leave and how value propagates.",
                wrongJustifications: {
                    a: "Corners have fewer actions.",
                    c: "Corners are reachable.",
                    d: "Rewards are not determined by position alone."
                }
            },
            {
                id: "t13-9",
                question: "What is an example of a real-world MDP with continuous state space?",
                options: [
                    { id: "a", text: "Tic-Tac-Toe" },
                    { id: "b", text: "Autonomous vehicle control" },
                    { id: "c", text: "Chess" },
                    { id: "d", text: "Snakes and Ladders" }
                ],
                correctAnswer: "b",
                justification: "Autonomous driving has continuous states (position, velocity, acceleration, steering angle) requiring function approximation to solve.",
                wrongJustifications: {
                    a: "Tic-Tac-Toe has discrete states.",
                    c: "Chess has discrete states.",
                    d: "Snakes and Ladders has discrete states."
                }
            },
            {
                id: "t13-10",
                question: "Why is the Mountain Car problem a good MDP example?",
                options: [
                    { id: "a", text: "It has a simple state space (position, velocity) with delayed rewards" },
                    { id: "b", text: "It has no reward function" },
                    { id: "c", text: "It is deterministic" },
                    { id: "d", text: "It has only one state" }
                ],
                correctAnswer: "a",
                justification: "Mountain Car is a classic MDP with 2D continuous state (position and velocity), discrete actions, and sparse delayed reward for reaching the goal.",
                wrongJustifications: {
                    b: "It has a reward function (goal reached).",
                    c: "It has stochastic elements.",
                    d: "It has a continuous state space."
                }
            }
        ],
        recap: [
            "Tic-Tac-Toe, Gridworld, and Lunar Lander are classic MDP examples",
            "The recycling robot MDP uses High/Low battery states",
            "Defining Markovian state representations is a key challenge",
            "Gridworld rewards: +100 goal, -50 obstacle, -1 per step",
            "Snakes and Ladders is a Markov Chain (no decisions), not an MDP",
            "Mountain Car has continuous states with delayed sparse rewards",
            "Real-world robotics involves continuous state and action spaces",
            "Proper reward design is critical for successful MDP modeling"
        ],
        skillMapping: [
            { skill: "Identifying MDP examples in practice", level: "Understanding" },
            { skill: "Applying MDP formulation to real problems", level: "Applying" },
            { skill: "Analyzing state representation challenges", level: "Analyzing" },
            { skill: "Evaluating reward design in example MDPs", level: "Evaluating" }
        ]
    }
};
